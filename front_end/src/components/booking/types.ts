export interface BookingData {
  department: string;
  service: string;
  branch: string;
  doctor: string;
  date: string;
  time: string;
  payment: string;
  email: string;
  phone: string;
}

export interface BookingRequest {
  doctor: number;
  service: number;
  branch: number;
  date: string;
  start_time: string;
  payment_method: string;
  email?: string;
  phone?: string;
  token?: string;
}

export interface BookingResponse {
  id: number;
  payment_url?: string;
  status: string;
  // ... باقي الحقول
}

export interface BookingStatusResponse {
  status: "confirmed" | "cancelled" | "processing" | "pending";
  booking_id: string;
}