// ─── Booking / Payment status mappers ─────────────────────────────────────────

export const mapBookingStatus = (status: string) => {
  const map: Record<string, string> = {
    pending_payment: "Pending Payment",
    confirmed:       "Confirmed",
    cancelled:       "Cancelled",
    completed:       "Completed",
  };
  return map[status] ?? status;
};

export const mapPaymentStatus = (status: string) => {
  const map: Record<string, string> = {
    pending:   "Unpaid",
    paid:      "Paid",
    failed:    "Failed",
    refunded:  "Refunded",
  };
  return map[status] ?? status;
};
