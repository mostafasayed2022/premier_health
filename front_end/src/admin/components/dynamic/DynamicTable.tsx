"use client";
// admin/components/dynamic/DynamicTable.tsx
import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import type { ModelSchema } from "../../api/admin";
import { formatFieldLabel } from "../../lib/utils";
import Image from "next/image";

interface DynamicTableProps {
  schema: ModelSchema;
  data?: Record<string, unknown>[];
  loading: boolean;
  onEdit: (row: Record<string, unknown>) => void;
  onDelete: (row: Record<string, unknown>) => void;
}

export const DynamicTable = React.memo(function DynamicTable({
  schema,
  data,
  onEdit,
  onDelete,
  loading,
}: DynamicTableProps) {
  const listFields = React.useMemo(() => {
    return schema.fields.filter((f) =>
      schema.list_display.includes(f.name),
    );
  }, [schema]);



  if (loading)
    return (
      <div style={S.tableLoadingWrap}>
        {Icon.spinner}
        <span style={{ marginLeft: 12, opacity: 0.6 }}>Loading records…</span>
      </div>
    );

  return (
    <div className="admin-table-container" style={S.tableWrap}>
      <table style={S.table}>
        <thead>
          <tr>
            {listFields.map((f) => (
              <th key={f.name} style={S.th}>
                {formatFieldLabel(f.name, f.label)}
              </th>
            ))}
            <th style={{ ...S.th, width: 100, textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && (
            <tr>
              <td colSpan={listFields.length + 1} style={S.emptyCell}>
                No records found
              </td>
            </tr>
          )}
          {data?.map((row, i) => (
            <tr key={(row.id as string) ?? i} style={S.tr}>
              {listFields.map((f) => (
                <td key={f.name} style={S.td}>
                  {renderCell(f, row[f.name])}
                </td>
              ))}
              <td style={{ ...S.td, textAlign: "right" }}>
                <button
                  style={S.actionBtn}
                  onClick={() => onEdit(row)}
                  title="Edit"
                >
                  {Icon.edit}
                </button>
                <button
                  style={{ ...S.actionBtn, ...S.actionBtnDanger }}
                  onClick={() => onDelete(row)}
                  title="Delete"
                >
                  {Icon.trash}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function renderCell(field: ModelSchema["fields"][0], value: unknown) {
  if (value == null || value === "")
    return <span style={{ opacity: 0.35 }}>—</span>;

  const valStr = String(value);
  const fieldName = field.name.toLowerCase();

  // 1. Booleans (type == 'boolean', or starts with 'is_', or 'active')
  if (
    field.type === "boolean" ||
    typeof value === "boolean" ||
    fieldName.startsWith("is_") ||
    fieldName === "active"
  ) {
    const isTrue =
      Boolean(value) && value !== "false" && value !== 0 && value !== "0";
    return isTrue ? (
      <span style={S.badge.green}>{Icon.check} Active</span>
    ) : (
      <span style={S.badge.red}>{Icon.x} Inactive</span>
    );
  }

  // 2. Image / Photo / Cloudinary URLs
  const isImageUrl =
    fieldName.includes("image") ||
    fieldName.includes("photo") ||
    fieldName.includes("avatar") ||
    fieldName.includes("picture") ||
    (typeof value === "string" &&
      (value.includes("cloudinary.com") ||
        /\.(jpg|jpeg|png|webp|avif|gif|svg)(\?.*)?$/i.test(value)));

  if (isImageUrl && typeof value === "string" && value.startsWith("http")) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid rgba(200, 169, 107, 0.25)",
            background: "#FAF9F6",
            flexShrink: 0,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          }}
        >
          <Image
            src={value}
            alt={field.label || "Thumbnail"}
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#64748b",
            maxWidth: 160,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={value}
        >
          {value.split("/").pop() || value}
        </span>
      </div>
    );
  }

  // 3. Regular HTTP Links
  if (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  ) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#C8A96B",
          fontWeight: 600,
          fontSize: 12,
          textDecoration: "underline",
          maxWidth: 180,
          display: "inline-block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={value}
      >
        {value.replace(/^https?:\/\//, "")}
      </a>
    );
  }

  // 4. Select Choices
  if (field.type === "select") {
    const choice = field.choices?.find((c) => c.value === value);
    return <span style={S.badge.gray}>{choice?.label ?? valStr}</span>;
  }

  // 5. Datetime & Date
  if (field.type === "datetime") {
    return (
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12,
          color: "#475569",
        }}
      >
        {new Date(valStr).toLocaleString("en-GB")}
      </span>
    );
  }

  if (field.type === "date") {
    return (
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12,
          color: "#475569",
        }}
      >
        {new Date(valStr).toLocaleDateString("en-GB")}
      </span>
    );
  }

  // 6. Currency / Prices / Amounts
  if (
    field.type === "number" &&
    (fieldName.includes("price") ||
      fieldName.includes("fee") ||
      fieldName.includes("amount"))
  ) {
    return (
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontWeight: 700,
          color: "#1F3D5A",
        }}
      >
        ${Number(value).toFixed(2)}
      </span>
    );
  }

  // 7. Slugs & IDs
  if (
    fieldName.includes("slug") ||
    fieldName === "id" ||
    fieldName.endsWith("_id")
  ) {
    return (
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12,
          fontWeight: 600,
          color: "#1F3D5A",
        }}
      >
        {valStr}
      </span>
    );
  }

  // 8. Description / Multiline Text Clamp
  if (
    fieldName.includes("description") ||
    fieldName.includes("bio") ||
    valStr.length > 45
  ) {
    return (
      <div
        style={{
          maxWidth: 260,
          fontSize: 12,
          lineHeight: "1.45",
          color: "#475569",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={valStr}
      >
        {valStr}
      </div>
    );
  }

  return (
    <span style={{ color: "#1E293B", fontSize: 13, fontWeight: 500 }}>
      {valStr}
    </span>
  );
}
