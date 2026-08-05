// admin/components/dynamic/DynamicForm.tsx
"use client";
import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import { formatFieldLabel } from "../../lib/utils";
import { useDynamicForm } from "../../hooks/useDynamicForm";
import { FieldRenderer } from "./DynamicFormFields";
import { NestedTable } from "./NestedTable";
import type { ModelSchema } from "../../api/admin";

import type { AdminFile } from "../image-picker/FilePickerModal";

interface DynamicFormProps {
  schema: ModelSchema;
  initial: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  loading: boolean;
  onSelectMultipleFiles?: (files: AdminFile[], currentValues: Record<string, unknown>) => void;
}

export function DynamicForm({
  schema,
  initial,
  onSubmit,
  onCancel,
  loading,
  onSelectMultipleFiles,
}: DynamicFormProps) {
  const {
    editableFields,
    readonlyNestedFields,
    values,
    relationOptions,
    errors,
    set,
    handleSubmit,
  } = useDynamicForm({ schema, initial, onSubmit });

  return (
    <form
      onSubmit={handleSubmit}
      style={S.formGrid}
      className="admin-form-grid"
    >
      {/* Editable fields */}
      {editableFields.map((f) => (
        <div key={f.name} style={S.formField}>
          <label style={S.label}>
            {formatFieldLabel(f.name, f.label)}
            {f.required && (
              <span style={{ color: "#f87171", marginLeft: 4 }}>*</span>
            )}
          </label>
          <FieldRenderer
            field={f}
            value={values[f.name]}
            error={errors[f.name]}
            relationOptions={relationOptions[f.name] || []}
            initialImageUrl={
              f.name === "video_id"
                ? ((initial?.["video_file_url"] as string) ?? null)
                : ((initial?.["image_url"] as string) ?? null)
            }
            isEditMode={!!initial}
            onChange={set}
            onSelectMultipleFiles={(files) => onSelectMultipleFiles?.(files, values)}
          />
          {errors[f.name] && <div style={S.fieldError}>{errors[f.name]}</div>}
          {f.help_text && <div style={S.helpText}>{f.help_text}</div>}
        </div>
      ))}

      {/* Read‑only nested tables */}
      {readonlyNestedFields.map((f) => (
        <div key={f.name} style={{ gridColumn: "1 / -1", marginBottom: 24 }}>
          <label style={{ ...S.label, marginBottom: 8, display: "block" }}>
            {formatFieldLabel(f.name, f.label)}
          </label>
          <NestedTable
            field={f}
            data={
              initial?.[f.name] as Array<Record<string, unknown>> | undefined
            }
            parentId={(initial?.id as string | number) ?? undefined}
          />
        </div>
      ))}

      {/* Action buttons */}
      <div
        style={{
          gridColumn: "1/-1",
          display: "flex",
          gap: 10,
          justifyContent: "flex-end",
          marginTop: 8,
        }}
      >
        <button
          type="button"
          style={{ ...S.btn, ...S.btnGhost }}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{ ...S.btn, ...S.btnPrimary }}
          disabled={loading}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {Icon.spinner} Saving…
            </span>
          ) : initial ? (
            "Update Record"
          ) : (
            "Create Record"
          )}
        </button>
      </div>
    </form>
  );
}
