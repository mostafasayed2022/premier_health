// ─── Skeleton Card Loader ─────────────────────────────────────────────────────

export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5 animate-pulse"
      style={{
        background: "#FAF9F6",
        border: "1px solid rgba(200, 169, 107, 0.2)",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="h-11 w-11 rounded-xl"
          style={{ background: "rgba(200, 169, 107, 0.15)" }}
        />
        <div
          className="h-5 w-10 rounded-md"
          style={{ background: "rgba(200, 169, 107, 0.15)" }}
        />
      </div>
      <div className="mt-4 space-y-2">
        <div
          className="h-3 w-24 rounded"
          style={{ background: "rgba(200, 169, 107, 0.12)" }}
        />
        <div
          className="h-8 w-16 rounded"
          style={{ background: "rgba(31, 61, 90, 0.15)" }}
        />
      </div>
    </div>
  );
}
