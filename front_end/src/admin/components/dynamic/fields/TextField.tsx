import React from "react";
import type { ModelSchema } from "../../../api/admin";

interface TextFieldProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  style: React.CSSProperties;
  onChange: (name: string, value: unknown) => void;
}

export const TextField = React.memo(function TextField({
  field,
  value,
  style,
  onChange,
}: TextFieldProps) {
  return (
    <textarea
      style={{ ...style, minHeight: 100, resize: "vertical" }}
      value={value as string}
      onChange={(e) => onChange(field.name, e.target.value)}
    />
  );
});
