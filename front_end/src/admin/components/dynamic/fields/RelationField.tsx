import React from "react";
import type { ModelSchema } from "../../../api/admin";
import TagMultiSelect from "../TagMultiSelect";

interface RelationFieldProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  style: React.CSSProperties;
  relationOptions: { value: number | string; label: string }[];
  onChange: (name: string, value: unknown) => void;
}

export const RelationField = React.memo(function RelationField({
  field,
  value,
  style,
  relationOptions,
  onChange,
}: RelationFieldProps) {
  if (field.multiple) {
    const selectedIds = Array.isArray(value) ? (value as number[]) : [];
    return (
      <div className="form-group">
        <label className="block text-sm font-medium mb-1">{field.label}</label>
        <TagMultiSelect
          endpoint={field.related_endpoint ?? ""}
          value={selectedIds}
          onChange={(newIds) => onChange(field.name, newIds)}
          placeholder={`Select ${field.label}`}
          labelField="name"
        />
      </div>
    );
  }

  return (
    <select
      style={style}
      value={value as string}
      onChange={(e) => onChange(field.name, e.target.value)}
    >
      <option value="">— None —</option>
      {relationOptions.map((o) => (
        <option key={String(o.value)} value={String(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  );
});
