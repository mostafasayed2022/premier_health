// ─── Profile Domain Types ───────────────────────────────────────────────────

export interface PatientProfile {
  // Identity (from CustomUser)
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;

  // Contact & Personal (from Patient model)
  phone: string; // phone_number
  dateOfBirth: string; // date_of_birth
  gender: "male" | "female" | "other" | "";
  // address: string;

  // Computed stats
  totalAppointments: number;
  completedVisits: number;

  // Optional fields for UI compat
  avatar?: string;
  bloodType?: string;
  allergies?: string[];
  medicalHistory?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  totalDocuments?: number;
}

export interface AvailabilitySlot {
  id: string;
  weekday: string; // "Monday", "Tuesday", …
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  slotDurationMinutes: number;
  branchId?: string;
  branchName?: string;
}

export interface DoctorProfileBooking {
  id: string;
  patientName: string;
  patientPhone: string;
  serviceName: string;
  branchName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  fee: string;
  notes: string;
}

export interface DoctorProfileDetails {
  id: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string; // specialization
  specialty?: string;
  bio: string;
  licenseNumber: string;
  photo: string; // image_url

  // Relations (read-only names)
  branches: string[]; // branches_names
  branchesDetail?: Array<{ id: number; name: string; city?: string }>;
  services: string[]; // services_names

  availability: AvailabilitySlot[];
  bookings?: DoctorProfileBooking[];

  // Optional legacy / mock fields kept for backward compat
  phone?: string;
  position?: string;
  consultationFee?: number;
  rating?: number;
  experienceYears?: number;
  patientsTreated?: number;
  languages?: string[];
  certifications?: string[];
  education?: string[];
}

export interface PatientMedicalRecord {
  id: string;
  patientId: string;
  title: string;
  category: "Lab Result" | "Prescription" | "Imaging" | "Doctor Note" | "Other";
  doctorName?: string;
  date: string;
  fileUrl: string;
  fileSize?: string;
  notes?: string;
}

export type UpdatePatientPayload = Partial<
  Pick<
    PatientProfile,
    "firstName" | "lastName" | "phone" | "dateOfBirth" | "gender" | "avatar"
  >
> & {
  /** Integer PK of the uploaded File object — maps to `image_id` on the backend */
  imageId?: number;
};

export type UpdateDoctorPayload = Partial<
  Pick<
    DoctorProfileDetails,
    | "firstName"
    | "lastName"
    | "specialization"
    | "specialty"
    | "position"
    | "licenseNumber"
    | "consultationFee"
    | "bio"
    | "photo"
    | "availability"
  >
> & {
  /** Integer PK of the uploaded File object — maps to `image_id` on the backend */
  imageId?: number;
};
