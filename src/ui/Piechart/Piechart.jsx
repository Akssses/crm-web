"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import s from "./PieChart.module.scss";
import { Container } from "@/ui";

const data = [
  { name: "ОПЛАЧЕНО", value: 42, color: "#00d4aa" },
  { name: "В РАБОТЕ", value: 42, color: "#3b82f6" },
  { name: "ОЖИДАЕТ ОПЛАТЫ", value: 42, color: "#fbbf24" },
  { name: "ВОЗВРАТ", value: 42, color: "#ff9500" },
  { name: "АННУЛЯЦИЯ", value: 42, color: "#ef4444" },
];

const COLORS = data.map((item) => item.color);

export default function PieChartComponent() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={s.tooltip}>
          <p className={s.tooltipText}>{payload[0].name}</p>
          <p className={s.tooltipValue}>{payload[0].value} заказов</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className={s.legend}>
        {payload.map((entry, index) => {
          const item = data[index];
          return (
            <div key={`legend-${index}`} className={s.legendItem}>
              <div
                className={s.legendColor}
                style={{ backgroundColor: entry.color }}
              ></div>
              <div className={s.legendContent}>
                <p className={s.legendLabel}>{entry.value}</p>
                <p className={s.legendValue}>42 заказа (37.5%)</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={s.chartWrapper}>
      <div className={s.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={s.legend}>
        {data.map((item, index) => (
          <div key={`legend-${index}`} className={s.legendItem}>
            <div
              className={s.legendColor}
              style={{ backgroundColor: item.color }}
            ></div>
            <div className={s.legendContent}>
              <p className={s.legendLabel}>{item.name}</p>
              <p className={s.legendValue}>42 заказа (37.5%)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
