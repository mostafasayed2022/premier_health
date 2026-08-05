import React from "react";
import type { ModelSchema } from "../../../api/admin";

interface BooleanFieldProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  onChange: (name: string, value: boolean) => void;
}

export const BooleanField = React.memo(function BooleanField({
  field,
  value,
  onChange,
}: BooleanFieldProps) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(field.name, e.target.checked)}
        style={{ width: 16, height: 16, accentColor: "#22d3ee" }}
      />
      <span style={{ fontSize: 14, opacity: 0.8 }}>
        {value ? "Enabled" : "Disabled"}
      </span>
    </label>
  );
});
