import React from "react";

interface FilesPageHeroProps {
  totalFiles: number;
}

export const FilesPageHero = React.memo(function FilesPageHero({ totalFiles }: FilesPageHeroProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1F3D5A 0%, #0F172A 100%)",
        borderRadius: 22,
        padding: "28px 32px",
        color: "#FFFFFF",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.15)",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(200, 169, 107, 0.25)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle, rgba(200, 169, 107, 0.22) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(200, 169, 107, 0.15)",
              border: "1px solid rgba(200, 169, 107, 0.3)",
              padding: "4px 12px",
              borderRadius: 9999,
              fontSize: 10,
              fontWeight: 700,
              color: "#C8A96B",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 10,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10B981" }} />
            Storage Module • Files &amp; Media
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "var(--admin-heading, serif)",
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Files &amp; Media Storage
          </h1>
          <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 4, marginBottom: 0 }}>
            Upload, organize, and manage Cloudinary &amp; local media assets.
          </p>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-[#C8A96B]">
            📁 {totalFiles} Total Files
          </span>
        </div>
      </div>
    </div>
  );
});
