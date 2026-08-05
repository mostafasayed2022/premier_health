import React from "react";
import type { ModelSchema } from "../../../api/admin";

interface SelectFieldProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  style: React.CSSProperties;
  onChange: (name: string, value: unknown) => void;
}

export const SelectField = React.memo(function SelectField({
  field,
  value,
  style,
  onChange,
}: SelectFieldProps) {
  if (field.multiple) {
    const selected = Array.isArray(value) ? value.map(String) : [];
    return (
      <select
        multiple
        style={{ ...style, minHeight: 100 }}
        value={selected}
        onChange={(e) =>
          onChange(
            field.name,
            Array.from(e.target.selectedOptions).map((o) => o.value),
          )
        }
      >
        {field.choices?.map((c) => (
          <option key={String(c.value)} value={String(c.value)}>
            {c.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <select
      style={style}
      value={value as string}
      onChange={(e) => onChange(field.name, e.target.value)}
    >
      <option value="">— Select —</option>
      {field.choices?.map((c) => (
        <option key={String(c.value)} value={String(c.value)}>
          {c.label}
        </option>
      ))}
    </select>
  );
});
