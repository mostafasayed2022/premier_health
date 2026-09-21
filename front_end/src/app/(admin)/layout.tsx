import type { ReactNode } from "react";
import { Providers } from "@/app/providers";
export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
