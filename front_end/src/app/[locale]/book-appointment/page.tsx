import { generatePageMetadata } from "@/lib/seo";
import { BookAppointmentClient } from "@/components/booking/BookAppointmentClient";

export const generateMetadata = generatePageMetadata("book-appointment");

export default function BookAppointmentPage() {
  return <BookAppointmentClient />;
}
