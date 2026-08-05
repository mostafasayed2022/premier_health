// ─── Mock Data (re-exported from canonical location) ──────────────────────────
// The actual mock data remains in src/lib/mockData.ts to avoid
// duplicating 1300+ lines. This module simply re-exports it.

export {
  MOCK_DEPARTMENTS,
  MOCK_DOCTORS,
  MOCK_SERVICES,
  MOCK_BRANCHES,
  MOCK_APPOINTMENTS,
  MOCK_PAYMENTS,
  MOCK_TESTIMONIALS,
  MOCK_GALLERY,
} from "../mockData";
