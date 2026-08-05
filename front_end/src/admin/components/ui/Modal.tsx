"use client";
// admin/components/ui/Modal.tsx
import React, { useEffect, type ReactNode } from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div style={S.modalOverlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={S.modalCard} className="admin-modal-card">
        <div style={S.modalHeader}>
          <h3 style={S.modalTitle}>{title}</h3>
          <button style={S.modalClose} onClick={onClose}>{Icon.x}</button>
        </div>
        <div style={S.modalBody}>{children}</div>
      </div>
    </div>
  );
}
