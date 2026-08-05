"use client";
// admin/components/ui/Toast.tsx
import { useCallback } from "react";
import { toast } from "sonner";

type ToastType = "success" | "error" | "info";

export function useToast() {
  const show = useCallback((msg: string, type: ToastType = "success") => {
    if (type === "error") {
      toast.error(msg);
    } else if (type === "info") {
      toast.info(msg);
    } else {
      toast.success(msg);
    }
  }, []);
  return { toast: null, show };
}

export function Toast({ toast: _ }: { toast: any }) {
  return null;
}
