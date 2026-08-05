import React from "react";
import type { ModelSchema } from "../../../api/admin";

interface StringFieldProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  style: React.CSSProperties;
  onChange: (name: string, value: unknown) => void;
}

export const StringField = React.memo(function StringField({
  field,
  value,
  style,
  onChange,
}: StringFieldProps) {
  const inputType =
    field.type === "email"
      ? "email"
      : field.type === "url"
        ? "url"
        : field.type === "number"
          ? "number"
          : field.type === "datetime"
            ? "datetime-local"
            : field.type === "date"
              ? "date"
              : "text";

  return (
    <input
      style={style}
      type={inputType}
      value={value as string}
      onChange={(e) => onChange(field.name, e.target.value)}
      maxLength={field.max_length}
      required={field.required}
    />
  );
});
