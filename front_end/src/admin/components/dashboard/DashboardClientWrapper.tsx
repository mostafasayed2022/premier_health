"use client";
// admin/components/dashboard/DashboardClientWrapper.tsx
// Fetches schemas client-side and renders Dashboard.
import React, { useState, useEffect } from "react";
import { Dashboard } from "./Dashboard";
import { schemaApi } from "../../api/admin";
import type { SchemaListing } from "../../api/admin";
import { Icon } from "../../lib/icons";
import { S } from "../../lib/styles";

export function DashboardClientWrapper() {
  const [schemas, setSchemas] = useState<SchemaListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schemaApi.listing()
      .then(s => { setSchemas(s); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={S.centerFlex}>{Icon.spinner}<span style={{marginLeft:12,opacity:.6}}>Loading…</span></div>
  );

  return <Dashboard schemas={schemas} />;
}
