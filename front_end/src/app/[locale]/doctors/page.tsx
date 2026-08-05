import { generatePageMetadata } from "@/lib/seo";
import { DoctorsPageClient } from "@/components/doctors/DoctorsPageClient";

export const generateMetadata = generatePageMetadata("doctors");

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function DoctorsPage() {
  const messages: any = await getMessages();
  return (
    <NextIntlClientProvider messages={{ Doctors: messages.Doctors, Common: messages.Common, Booking: messages.Booking }}>
      <DoctorsPageClient />
    </NextIntlClientProvider>
  );
}
