// app/(admin)/admin/login/layout.tsx
// Login page is nested under AdminLayout but renders without shell layout formatting.
import type { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
