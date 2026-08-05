// admin/components/dynamic/DynamicFormFields.tsx
"use client";
import React from "react";
import Image from "next/image";
import { S } from "../../lib/styles";
import type { ModelSchema } from "../../api/admin";
import { ImagePickerField } from "../image-picker/ImagePickerField";
import type { AdminFile } from "../image-picker/FilePickerModal";
import { BooleanField } from "./fields/BooleanField";
import { SelectField } from "./fields/SelectField";
import { RelationField } from "./fields/RelationField";
import { FileField } from "./fields/FileField";
import { TextField } from "./fields/TextField";
import { StringField } from "./fields/StringField";

interface FieldRendererProps {
  field: ModelSchema["fields"][0];
  value: unknown;
  error?: string;
  relationOptions: { value: number | string; label: string }[];
  initialImageUrl: string | null;
  isEditMode: boolean;
  onChange: (name: string, value: unknown) => void;
  onSelectMultipleFiles?: (files: AdminFile[]) => void;
}

export function FieldRenderer({
  field,
  value,
  error,
  relationOptions,
  initialImageUrl,
  isEditMode,
  onChange,
  onSelectMultipleFiles,
}: FieldRendererProps) {
  const style = { ...S.input, ...(error ? S.inputError : {}) };

  // ── Boolean ──────────────────────────────────────────────
  if (field.type === "boolean") {
    return <BooleanField field={field} value={value} onChange={onChange} />;
  }

  // ── Select (Single and Multiple) ─────────────────────────
  if (field.type === "select") {
    return <SelectField field={field} value={value} style={style} onChange={onChange} />;
  }

  // ── Image / Video relation field → ImagePickerField ──────────────
  if (field.type === "relation" && field.related_endpoint === "/api/files/") {
    const isVideoField = field.name === "video_id";
    const previewUrlKey = isVideoField ? "video_file_url" : "image_url";
    const initialUrl = isVideoField
      ? undefined  // video fields don't have an initialImageUrl from the standard prop
      : initialImageUrl;
    return (
      <ImagePickerField
        value={(value as number) ?? null}
        initialImageUrl={initialUrl}
        isVideoField={isVideoField}
        onChange={(fileId, previewUrl) => {
          onChange(field.name, fileId);
          if (previewUrl) {
            onChange(previewUrlKey, previewUrl);
          }
        }}
        onSelectMultiple={onSelectMultipleFiles}
      />
    );
  }

  // ── Relation (Single and Multiple) ───────────────────────
  if (field.type === "relation") {
    return (
      <RelationField
        field={field}
        value={value}
        style={style}
        relationOptions={relationOptions}
        onChange={onChange}
      />
    );
  }

  // ── Textarea ─────────────────────────────────────────────
  if (field.type === "text") {
    return <TextField field={field} value={value} style={style} onChange={onChange} />;
  }

  // ── File upload (legacy) ─────────────────────────────────
  if (field.type === "file") {
    return (
      <FileField
        field={field}
        value={value}
        style={style}
        isEditMode={isEditMode}
        onChange={onChange}
      />
    );
  }

  // ── Default: string/number inputs ────────────────────────
  return <StringField field={field} value={value} style={style} onChange={onChange} />;
}
