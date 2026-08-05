import React from "react";
import Image from "next/image";
import type { ModelSchema } from "../../../api/admin";

interface FileFieldProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  style: React.CSSProperties;
  isEditMode: boolean;
  onChange: (name: string, value: unknown) => void;
}

export const FileField = React.memo(function FileField({
  field,
  value,
  style,
  isEditMode,
  onChange,
}: FileFieldProps) {
  const isImg = field.name.includes("photo") || field.name.includes("image");
  const currentUrl = typeof value === "string" ? value : "";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {currentUrl ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isImg ? (
            <Image
              src={currentUrl}
              alt="Current Preview"
              width={64}
              height={64}
              style={{
                borderRadius: 8,
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              unoptimized
            />
          ) : (
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              File: {currentUrl.split("/").pop()}
            </span>
          )}
        </div>
      ) : null}
      <input
        style={style}
        type="file"
        accept={isImg ? "image/*" : undefined}
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange(field.name, file || null);
        }}
        required={field.required && !isEditMode}
      />
    </div>
  );
});
