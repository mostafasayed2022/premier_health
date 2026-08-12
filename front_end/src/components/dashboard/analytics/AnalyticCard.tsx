"use client";

import { motion } from "framer-motion";
import type { CardConfig } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  config: CardConfig;
  value: number;
  index: number;
}

// ─── PremierCare Logo Brand Styling Helpers ────────────────────────────────────

function getCardStyles(variant: CardConfig["themeVariant"] = "gold") {
  switch (variant) {
    case "navy":
      return {
        cardStyle: {
          background: "linear-gradient(135deg, #1F3D5A 0%, #152A3F 100%)",
          border: "1px solid rgba(200, 169, 107, 0.3)",
          boxShadow: "0 10px 30px rgba(31, 61, 90, 0.18)",
        },
        accentLine: "linear-gradient(to right, #C8A96B, #DFCA9B, #C8A96B)",
        iconBgStyle: {
          background: "rgba(200, 169, 107, 0.2)",
          color: "#DFCA9B",
        },
        liveBadgeStyle: {
          background: "rgba(200, 169, 107, 0.25)",
          color: "#DFCA9B",
        },
        labelColor: "#A2B4C7",
        valueColor: "#FFFFFF",
      };

    case "beige":
      return {
        cardStyle: {
          background: "#F7F2EA",
          border: "1px solid rgba(200, 169, 107, 0.25)",
          boxShadow: "0 6px 20px rgba(153, 134, 117, 0.08)",
        },
        accentLine: "linear-gradient(to right, #998675, #C8A96B, #998675)",
        iconBgStyle: {
          background: "rgba(153, 134, 117, 0.15)",
          color: "#998675",
        },
        liveBadgeStyle: {
          background: "rgba(153, 134, 117, 0.15)",
          color: "#5A4E3E",
        },
        labelColor: "#64748B",
        valueColor: "#1F3D5A",
      };

    case "gold":
    default:
      return {
        cardStyle: {
          background: "#FFFFFF",
          border: "1px solid rgba(200, 169, 107, 0.35)",
          boxShadow: "0 8px 25px rgba(200, 169, 107, 0.12)",
        },
        accentLine: "linear-gradient(to right, #C8A96B, #DFCA9B, #B69557)",
        iconBgStyle: {
          background: "rgba(200, 169, 107, 0.14)",
          color: "#C8A96B",
        },
        liveBadgeStyle: {
          background: "rgba(200, 169, 107, 0.15)",
          color: "#998675",
        },
        labelColor: "#5A4E3E",
        valueColor: "#1F3D5A",
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AnalyticCard({ config, value, index }: Props) {
  const Icon = config.icon;
  const displayValue = config.format
    ? config.format(value)
    : value.toLocaleString();

  const styles = getCardStyles(config.themeVariant);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-5 cursor-default transition-all duration-300"
        style={styles.cardStyle}
      >
        {/* Top Gold Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-90"
          style={{ background: styles.accentLine }}
        />

        {/* Subtle Decorative Backdrop Circle */}
        <div
          className="absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-15"
          style={{ background: styles.iconBgStyle.color }}
        />

        <div className="flex items-start justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200"
            style={styles.iconBgStyle}
          >
            <Icon size={22} />
          </div>

          <span
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md"
            style={styles.liveBadgeStyle}
          >
            Live
          </span>
        </div>

        <div className="mt-4">
          <p
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: styles.labelColor }}
          >
            {config.label}
          </p>
          <h3
            className="mt-1 text-3xl font-black tracking-tight"
            style={{ color: styles.valueColor }}
          >
            {displayValue}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
