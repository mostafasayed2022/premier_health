// admin/components/dynamic/NestedTable.tsx
"use client";
import React from "react";
import type { ModelSchema } from "../../api/admin";

interface NestedTableProps {
  field: ModelSchema["fields"][0];
  data?: Array<Record<string, unknown>>;
  parentId?: string | number;
}

function formatNestedValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (v instanceof Date) return v.toLocaleString("en-GB");
  return String(v);
}

export function NestedTable({ field, data, parentId }: NestedTableProps) {
  const rows = data || [];
  const columns = field.nested_fields || [];
  if (!columns.length) return <span>No structure</span>;

  const qualifiedName = field.related_model_qualified_name;

  return (
    <div
      style={{
        border: "1px solid rgba(200, 169, 107, 0.2)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(153, 134, 117, 0.04)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#F7F2EA", borderBottom: "1px solid rgba(200, 169, 107, 0.15)" }}>
            {columns.map((col) => (
              <th
                key={col.name}
                style={{
                  padding: "10px 14px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textAlign: "left",
                  color: "#5A4E3E",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {col.label}
              </th>
            ))}
            <th style={{ width: 60, backgroundColor: "#F7F2EA" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, idx) => (
              <tr key={idx} style={{ borderTop: "1px solid #f1f5f9" }}>
                {columns.map((col) => (
                  <td
                    key={col.name}
                    style={{
                      padding: "8px 12px",
                      fontSize: "13px",
                      color: "#334155",
                    }}
                  >
                    {formatNestedValue(row[col.name])}
                  </td>
                ))}
                <td style={{ padding: "8px 12px", textAlign: "center" }}>
                  <a
                    href={
                      qualifiedName && row.id
                        ? `/admin/${qualifiedName.toLowerCase()}/?edit=${row.id}&doctor=${parentId ?? ""}`
                        : "#"
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#C8A96B",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    title="Edit this availability"
                  >
                    ✏️ Edit
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontStyle: "italic",
                }}
              >
                No records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
