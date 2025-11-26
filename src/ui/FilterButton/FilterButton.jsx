"use client";
import React, { useState } from "react";
import { Button, FilterModal } from "@/ui";
import { CiFilter } from "react-icons/ci";

export default function FilterButton({ 
  tableData = [], 
  columns = [],
  onApply = null 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        icon={CiFilter}
        onClick={() => setIsOpen(true)}
      >
        Filter
      </Button>
      {isOpen && (
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApply={(filters) => {
            onApply?.(filters);
            setIsOpen(false);
          }}
          tableData={tableData}
          columns={columns}
        />
      )}
    </>
  );
}

