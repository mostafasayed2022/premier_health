// app/(admin)/layout.tsx
// Root layout for the admin route group.
// No i18n, no Navbar/Footer — completely isolated from the main app.
// Must provide <html> and <body> since this group bypasses the [locale] layout.
import type { ReactNode } from "react";

export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
