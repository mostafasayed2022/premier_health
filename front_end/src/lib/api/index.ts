// ─── API Module Barrel Export ──────────────────────────────────────────────────
//
// Central export point for the entire API layer.
// Also re-exports types and data for backward compatibility with existing
// imports from "@/lib/api".

// API client
export { api } from "./client";

// Raw endpoint functions
export {
  getDepartments,
  getDepartmentBySlug,
  getServices,
  getServicesByDepartment,
  getServiceBySlug,
  getBranches,
  getBranchesByService,
  getGallery,
  getBranchGallery,
  getTestimonials,
  getDoctors,
  getDoctorsByBranch,
  getDoctorBySlug,
  getAvailableSlots,
  createBooking,
  getBookingStatus,
  bookAppointment,
  getAppointments,
  getPayments,
} from "./endpoints";

// Merge & mapping helpers
export {
  mergeDept,
  mergeSvc,
  mergeBranch,
  mergeDoc,
  mapBooking,
} from "./helpers";

// Query keys & staleTime config
export { queryKeys, staleTime } from "./queryKeys";

// TanStack Query hooks, types & ApiError
export {
  ApiError,
  useDepartments,
  useDepartmentBySlug,
  useServices,
  useServiceBySlug,
  useBranches,
  useDoctors,
  useAvailableSlots,
  useGallery,
  useBranchGallery,
  useTestimonials,
  useAppointments,
  useBookingStatus,
  usePayments,
  useCreateBooking,
  useBookAppointment,
  usePrefetchServices,
  usePrefetchDoctors,
  useDoctorBySlug,
} from "./hooks";

export type {
  CreateBookingPayload,
  CreateBookingResult,
  BookingStatusResult,
} from "./hooks";

// ─── Backward compatibility re-exports ────────────────────────────────────────
export * from "@/lib/types";
export * from "@/lib/data";

// Barrel export كامل

// Backward compatibility ممتاز

// Re-exports منظم
