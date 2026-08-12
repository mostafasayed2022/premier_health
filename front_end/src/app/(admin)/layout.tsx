import type { ReactNode } from "react";
import { Providers } from "@/app/providers";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";

export default function AdminGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManagerScript />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <GoogleTagManagerNoScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
