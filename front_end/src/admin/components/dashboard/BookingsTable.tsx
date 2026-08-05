"use client";
// admin/components/dashboard/BookingsTable.tsx
import React, { useMemo } from "react";
import { flexRender, type ColumnDef } from "@tanstack/react-table";
import { Icon } from "../../lib/icons";
import { useBookingsTable } from "../../hooks/useBookingsTable";
import {
  badgeGreen,
  badgeYellow,
  badgeRed,
  badgeGray,
  actionBtnStyle,
  containerStyle,
  searchBarStyle,
  searchWrapStyle,
  searchInputStyle,
  tableStyle,
  thStyle,
  tdStyle,
  paginationStyle,
  btnPageStyle,
  emptyCellStyle,
} from "./styles";

interface BookingsTableProps {
  bookings: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}



// ─── Component ───────────────────────────────────────────────────────────────
export const BookingsTable = React.memo(function BookingsTable({ bookings, onEdit, onDelete }: BookingsTableProps) {
  // Column definitions live here — JSX is valid in .tsx
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Booking Ref",
        cell: (info) => (
          <span style={{ fontFamily: "monospace", fontSize: 11, whiteSpace: "nowrap" }} title={String(info.getValue())}>
            {String(info.getValue()).substring(0, 8)}…
          </span>
        ),
      },
      {
        accessorKey: "patient",
        header: "Patient",
        cell: (info) => {
          const val = info.getValue() as any;
          return val?.user?.username || val?.username || String(val || "Guest");
        },
      },
      {
        accessorKey: "doctor",
        header: "Doctor",
        cell: (info) => {
          const val = info.getValue() as any;
          return val?.user?.username || val?.username || String(val || "Staff");
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => String(info.getValue() ?? ""),
      },
      {
        accessorKey: "start_time",
        header: "Time",
        cell: (info) => String(info.getValue()).substring(0, 5),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = String(info.getValue()).toLowerCase();
          const style =
            status === "confirmed"       ? badgeGreen  :
            status === "pending_payment" ? badgeYellow :
            status === "cancelled"       ? badgeRed    : badgeGray;
          return <span style={style}>{status.replace("_", " ")}</span>;
        },
      },
      {
        accessorKey: "fee",
        header: "Fee",
        cell: (info) => (
          <span style={{ fontWeight: "bold" }}>
            ${Number(info.getValue()).toFixed(2)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            {onEdit && (
              <button onClick={() => onEdit(info.row.original)} style={actionBtnStyle} title="Edit">
                {Icon.edit}
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(info.row.original)}
                style={{ ...actionBtnStyle, color: "#EF4444" }}
                title="Delete"
              >
                {Icon.trash}
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDelete],
  );

  // Pure-logic hook: no JSX inside
  const { table, globalFilter, setGlobalFilter } = useBookingsTable({
    data: bookings,
    columns,
  });

  return (
    <div style={containerStyle}>
      {/* Search */}
      <div style={searchBarStyle}>
        <div style={searchWrapStyle}>
          {Icon.search}
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search bookings..."
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container" style={{ overflowX: "auto", width: "100%", maxWidth: "100%", WebkitOverflowScrolling: "touch", paddingBottom: 8 }}>
        <table style={tableStyle}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    onClick={h.column.getToggleSortingHandler()}
                    style={{ ...thStyle, cursor: h.column.getCanSort() ? "pointer" : "default" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getCanSort() && (
                        <span style={{ fontSize: 9, opacity: 0.5 }}>
                          {h.column.getIsSorted() === "asc" ? " 🔼" : h.column.getIsSorted() === "desc" ? " 🔽" : " ↕️"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} style={{ transition: "background-color 0.15s" }}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={tdStyle}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={emptyCellStyle}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={paginationStyle}>
        <div style={{ fontSize: 12, color: "#64748B" }}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} style={btnPageStyle}>Previous</button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} style={btnPageStyle}>Next</button>
        </div>
      </div>
    </div>
  );
});

