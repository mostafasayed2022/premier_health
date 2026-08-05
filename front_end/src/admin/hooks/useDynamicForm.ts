// admin/hooks/useDynamicForm.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "../api/client";
import type { ModelSchema } from "../api/admin";

interface UseDynamicFormProps {
  schema: ModelSchema;
  initial: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
}

type RelationOptions = Record<
  string,
  { value: number | string; label: string }[]
>;

export function useDynamicForm({
  schema,
  initial,
  onSubmit,
}: UseDynamicFormProps) {
  const editableFields = schema.fields.filter((f) => !f.read_only);
  const readonlyNestedFields = schema.fields.filter(
    (f) => f.read_only && f.type === "nested_list",
  );

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const init: Record<string, unknown> = {};
    editableFields.forEach((f) => {
      const raw = initial?.[f.name];
      init[f.name] =
        raw != null && typeof raw === "object" && "id" in (raw as object)
          ? (raw as Record<string, unknown>).id
          : (raw ?? "");
    });
    return init;
  });

  const [relationOptions, setRelationOptions] = useState<RelationOptions>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Fetch relation options ──────────────────────────────────
  useEffect(() => {
    editableFields.forEach(async (f) => {
      if (
        f.type === "relation" &&
        f.related_endpoint &&
        f.related_endpoint !== "/api/files/"
      ) {
        try {
          const params: Record<string, string | number> = { page_size: 200 };
          if (f.filters) {
            Object.assign(params, f.filters);
          }
          const res = await api.get<{ results: Record<string, unknown>[] }>(
            f.related_endpoint,
            params,
          );
          const opts = (res.results || []).map((item) => ({
            value: item.id as number,
            label: String(item.name ?? item.title ?? item.username ?? item.id),
          }));
          setRelationOptions((prev) => ({ ...prev, [f.name]: opts }));
        } catch {
          /* ignore */
        }
      }
    });
  }, [schema.name]);

  // ── Set a single field value ────────────────────────────────
  const set = useCallback((name: string, value: unknown) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => {
      const n = { ...e };
      delete n[name];
      return n;
    });
  }, []);

  // ── Validate all required fields ────────────────────────────
  const validate = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {};
    editableFields.forEach((f) => {
      if (
        f.required &&
        !f.nullable &&
        (values[f.name] === "" || values[f.name] == null)
      ) {
        errs[f.name] = `${f.label} is required`;
      }
    });
    return errs;
  }, [editableFields, values]);

  // ── Submit handler ──────────────────────────────────────────
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      const payload: Record<string, unknown> = {};
      editableFields.forEach((f) => {
        let v = values[f.name];
        if (f.type === "file" && typeof v === "string") {
          return;
        }
        if (v === "" || v == null) {
          payload[f.name] = null;
          return;
        }
        if (f.type === "number") v = Number(v);
        if (f.type === "boolean") v = Boolean(v);
        payload[f.name] = v;
      });
      onSubmit(payload);
    },
    [editableFields, values, validate, onSubmit],
  );

  return {
    editableFields,
    readonlyNestedFields,
    values,
    relationOptions,
    errors,
    set,
    setValues,
    handleSubmit,
    initial,
    schema,
  };
}
