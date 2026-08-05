"use client";
// admin/components/ui/DeleteConfirm.tsx
import React from "react";
import { S } from "../../lib/styles";

interface DeleteConfirmProps {
  record: Record<string, unknown>;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export function DeleteConfirm({ record, onConfirm, onCancel, loading }: DeleteConfirmProps) {
  const label = String(record?.name ?? record?.title ?? record?.username ?? `ID ${record?.id}`);
  return (
    <div style={{textAlign:"center",padding:"8px 0"}}>
      <div style={{fontSize:42,marginBottom:16}}>⚠️</div>
      <p style={{opacity:.8,marginBottom:8}}>You are about to permanently delete</p>
      <p style={{fontWeight:700,fontSize:18,color:"#f87171",marginBottom:20}}>"{label}"</p>
      <p style={{opacity:.5,fontSize:13,marginBottom:24}}>This action cannot be undone.</p>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <button style={{...S.btn,...S.btnGhost}} onClick={onCancel}>Cancel</button>
        <button style={{...S.btn,background:"#ef4444",color:"#fff",border:"none"}}
          onClick={onConfirm} disabled={loading}>
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
