"use client";
// app/(admin)/admin/login/page.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/admin/context/AuthContext";
import { S } from "@/admin/lib/styles";
import { Icon } from "@/admin/lib/icons";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.username, form.password);
      router.replace("/admin");
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <div style={{ ...S.loginLogo, alignItems: "center" }}>
          <Image
            src="/logo/logo1.jpg"
            alt="PremierCare"
            width={42}
            height={42}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={S.logoText}>PREMIERCARE</span>
        </div>
        <p style={S.loginSub}>Luxury Concierge Management Console</p>
        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <label style={S.label}>Username</label>
          <input
            style={S.input}
            type="text"
            autoFocus
            placeholder="admin"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            required
          />
          <label style={S.label}>Password</label>
          <input
            style={S.input}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            required
          />
          {error && <div style={S.errorBanner}>{error}</div>}
          <button
            style={{ ...S.btn, ...S.btnPrimary, marginTop: 8 }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {Icon.spinner} Authenticating…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
