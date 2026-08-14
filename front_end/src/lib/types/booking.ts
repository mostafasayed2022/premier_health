// ─── Booking-specific types ───────────────────────────────────────────────────

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  department: string;
  service: string;
  branch: string;
  doctor: string;
  date: string;
  time: string;
  endTime?: string;
  status: "Pending" | "Confirmed" | "Rescheduled" | "Cancelled" | "Completed" | "Pending Payment";
  amount: number;
  paymentStatus: "Unpaid" | "Paid";
  paymentMethod?: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  customerName: string;
  amount: number;
  method: string;
  date: string;
  status: "Succeeded" | "Pending" | "Failed";
}
