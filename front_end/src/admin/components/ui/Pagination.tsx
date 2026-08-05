"use client";
// admin/components/ui/Pagination.tsx
import React from "react";
import { S } from "../../lib/styles";

interface PaginationProps {
  count: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ count, currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div style={S.pagination}>
      <span style={S.paginationInfo}>{count} records · Page {currentPage} of {totalPages}</span>
      <div style={{display:"flex",gap:6}}>
        <button style={{...S.btn,...S.btnGhost,padding:"6px 12px"}}
          disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← Prev</button>
        <button style={{...S.btn,...S.btnGhost,padding:"6px 12px"}}
          disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
      </div>
    </div>
  );
}
