// ─── Backward-compatibility shim ──────────────────────────────────────────────
// This file re-exports from the new modular structure so all existing
// imports like `from "@/lib/api"` continue to work without changes.
export * from "./api/index";