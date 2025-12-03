"use client";
import React, { useEffect, useState } from "react";
import s from "./UITable.module.scss";
import {
  MdMoreVert,
  MdAdd,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

export default function UITable({
  Icon: icon = null,
  type = "default",
  columns = [],
  rows = [],
  showCheckbox = true,
  onAddClick = null,
  onRowAction = null,
  onRowClick = null,
  addButtonText = "Добавить",
  enableCardView = true,
  responsiveBreakpoint = 768,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCardMode, setIsCardMode] = useState(false);

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((_, i) => i));
    }
  };

  const toggleSelectRow = (index) => {
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleRowClick = (row, rowIdx, e) => {
    // Если кликнули на checkbox или action button - не открываем модал
    if (
      e.target.closest(`.${s.checkbox}`) ||
      e.target.closest(`.${s.actionButton}`)
    ) {
      return;
    }
    onRowClick?.(row, rowIdx);
  };

  const isAllSelected = selectedRows.length === rows.length && rows.length > 0;
  const isPartialSelected =
    selectedRows.length > 0 && selectedRows.length < rows.length;

  useEffect(() => {
    if (!enableCardView) return;
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsCardMode(window.innerWidth <= responsiveBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [enableCardView, responsiveBreakpoint]);

  const renderCardRows = () => (
    <div className={s.cardStack}>
      {rows.length === 0 ? (
        <div className={s.emptyState}>
          <p>Нет данных для отображения</p>
        </div>
      ) : (
        rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`${s.cardRow} ${onRowClick ? s.clickable : ""}`}
            onClick={(e) => handleRowClick(row, rowIdx, e)}
          >
            {columns.map((col) => {
              const value = col.render
                ? col.render(row[col.key], row, rowIdx)
                : row[col.key];
              return (
                <div key={col.key} className={s.cardCell}>
                  <span className={s.cardLabel}>{col.label}</span>
                  <span className={s.cardValue}>{value || "—"}</span>
                </div>
              );
            })}
            {onRowAction && (
              <div className={s.cardActions}>
                <button
                  className={s.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowAction(row, rowIdx);
                  }}
                >
                  <MdMoreVert size={18} />
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      {isCardMode && enableCardView ? (
        renderCardRows()
      ) : (
        <div className={s.tableWrapper}>
          <div className={s.tableInner}>
            {/* Header */}
            <div className={s.tableHeader}>
              <div className={s.headerRow}>
                {showCheckbox && (
                  <div className={s.checkboxHeader}>
                    <button
                      className={s.checkbox}
                      onClick={toggleSelectAll}
                      title="Выбрать все"
                    >
                      {isAllSelected ? (
                        <MdCheckBox className={s.checkboxIcon} />
                      ) : isPartialSelected ? (
                        <div className={s.checkboxPartial} />
                      ) : (
                        <MdCheckBoxOutlineBlank className={s.checkboxIcon} />
                      )}
                    </button>
                  </div>
                )}
                {columns.map((col, idx) => (
                  <span
                    key={idx}
                    className={s.headerCell}
                    style={{
                      flex: col.width ? `0 0 ${col.width}` : col.flex || 1,
                      ...col.style,
                    }}
                  >
                    {col.label}
                  </span>
                ))}
                {onRowAction && <div className={s.actionHeader}></div>}
              </div>
            </div>

            {/* Body */}
            <div className={s.tableBody}>
              {rows.length === 0 ? (
                <div className={s.emptyState}>
                  <p>Нет данных для отображения</p>
                </div>
              ) : (
                rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`${s.bodyRow} ${
                      selectedRows.includes(rowIdx) ? s.selected : ""
                    } ${onRowClick ? s.clickable : ""}`}
                    onClick={(e) => handleRowClick(row, rowIdx, e)}
                  >
                    {showCheckbox && (
                      <div className={s.checkboxCell}>
                        <button
                          className={s.checkbox}
                          onClick={() => toggleSelectRow(rowIdx)}
                        >
                          {selectedRows.includes(rowIdx) ? (
                            <MdCheckBox className={s.checkboxIcon} />
                          ) : (
                            <MdCheckBoxOutlineBlank
                              className={s.checkboxIcon}
                            />
                          )}
                        </button>
                      </div>
                    )}
                    {columns.map((col, colIdx) => (
                      <div
                        key={colIdx}
                        className={s.bodyCell}
                        style={{
                          flex: col.width ? `0 0 ${col.width}` : col.flex || 1,
                          ...col.style,
                        }}
                      >
                        {col.render ? (
                          col.render(row[col.key], row, rowIdx)
                        ) : (
                          <span className={s.cellContent}>{row[col.key]}</span>
                        )}
                      </div>
                    ))}
                    {onRowAction && (
                      <div className={s.actionCell}>
                        <button
                          className={s.actionButton}
                          onClick={() => onRowAction(row, rowIdx)}
                          title="Действия"
                        >
                          <MdMoreVert size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
