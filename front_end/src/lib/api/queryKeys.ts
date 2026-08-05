// ─── Query Keys Factory & staleTime Configuration ────────────────────────────
//
// Centralized query key management following TanStack Query best practices.
// Each key is a readonly tuple for type safety and automatic cache invalidation.

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const queryKeys = {
  // ── Departments ───────────────────────────────────────
  departments: {
    all: ["departments"] as const,
    bySlug: (slug: string) => ["departments", "detail", slug] as const,
  },

  // Booking
  bookingDepartments: {
    all: ["booking", "departments"] as const,
  },
  // ── Services ──────────────────────────────────────────
  services: {
    all: ["services"] as const,
    bySlug: (slug: string) => ["services", "detail", slug] as const,
  },

  bookingServices: {
    byDepartment: (departmentId: string | number) =>
      ["booking", "services", departmentId] as const,
  },
  // ── Branches ──────────────────────────────────────────
  branches: {
    all: ["branches"] as const,
    bySlug: (slug: string) => ["branches", "detail", slug] as const,
  },

  bookingBranches: {
    byService: (serviceId: string | number) =>
      ["booking", "branches", serviceId] as const,
  },

  // ── Doctors ───────────────────────────────────────────
  doctors: {
    all: ["doctors"] as const,
    filtered: (filters?: {
      search?: string;
      department?: string;
      branch?: string;
    }) => ["doctors", "filtered", filters] as const,

    bySlug: (slug: string) =>
      ["doctors", "detail", slug] as const,
  },

  bookingDoctors: {
    byBranch: (
      branchId: string | number,
      serviceId?: string | number,
    ) =>
      ["booking", "doctors", branchId, serviceId] as const,
  },
  // ── Slots ─────────────────────────────────────────────
  slots: {
    byDoctorAndBranch: (
      doctorId: string | number,
      branchId: string | number,
    ) => ["slots", doctorId, branchId] as const,
  },
  // ── Gallery ───────────────────────────────────────────
  gallery: {
    all: ["gallery"] as const,
  },

  // ── Testimonials ──────────────────────────────────────
  testimonials: {
    all: ["testimonials"] as const,
  },

  // ── Appointments / Bookings ───────────────────────────
  appointments: {
    all: ["appointments"] as const,
  },

  // ── Booking Status ────────────────────────────────────
  bookingStatus: {
    byId: (bookingId: string) =>
      ["bookingStatus", bookingId] as const,
  },

  // ── Payments ──────────────────────────────────────────
  payments: {
    all: ["payments"] as const,
  },

  // ── Patient Profile ───────────────────────────────────
  patientProfile: {
    me: ["profile", "patient", "me"] as const,
  },

  // ── Doctor Profile ────────────────────────────────────
  doctorProfile: {
    me: ["profile", "doctor", "me"] as const,
    public: (id: string) =>
      ["profile", "doctor", "public", id] as const,
  },

  // ── Patient Medical Records ───────────────────────────
  patientRecords: {
    all: ["patientRecords"] as const,
  },

  // ── Doctor Schedule ───────────────────────────────────
  doctorSchedule: {
    me: ["doctorSchedule", "me"] as const,
  },
} as const;

// ─── staleTime Configuration (in milliseconds) ───────────────────────────────
//
// Controls how long cached data is considered "fresh" before a background
// refetch is triggered. Tuned per-entity based on how frequently data changes.

export const staleTime = {
  /** Departments rarely change — 10 minutes */
  departments: 10 * 60 * 1000,

  /** Services — 5 minutes */
  services: 5 * 60 * 1000,

  /** Branches are very static — 10 minutes */
  branches: 10 * 60 * 1000,

  /** Doctors — 3 minutes (availability may change) */
  doctors: 3 * 60 * 1000,

  /** Slots change frequently — 30 seconds */
  slots: 30 * 1000,

  /** Gallery is mostly static — 10 minutes */
  gallery: 10 * 60 * 1000,

  /** Testimonials are mostly static — 10 minutes */
  testimonials: 10 * 60 * 1000,

  /** Appointments need relatively fresh data — 1 minute */
  appointments: 60 * 1000,

  /** Booking status needs very fresh data — 15 seconds */
  bookingStatus: 15 * 1000,

  /** Payments — 1 minute */
  payments: 60 * 1000,

  /** Patient & Doctor Profiles — 5 minutes */
  profiles: 5 * 60 * 1000,

  /** Patient Records — 3 minutes */
  patientRecords: 3 * 60 * 1000,

  /** Doctor Schedule — 2 minutes */
  doctorSchedule: 2 * 60 * 1000,
} as const;

// أحسن حاجة عملتها! 👏

// Query keys factory محترف

// staleTime مظبوط لكل entity

// Type-safe مع as const
