"use client";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

interface UseBookingsTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
}

/**
 * Pure-logic hook — no JSX.
 * Column definitions (with JSX cell renderers) live in BookingsTable.tsx.
 */
export function useBookingsTable<TData>({
  data,
  columns,
  pageSize = 10,
}: UseBookingsTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return { table, globalFilter, setGlobalFilter };
}
