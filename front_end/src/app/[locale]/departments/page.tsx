import { DepartmentsHero, DepartmentGrid } from "@/components/departments";
import { generatePageMetadata } from "@/lib/seo";

export const generateMetadata = generatePageMetadata("departments");
export const revalidate = 86400;

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function DepartmentsPage() {
  const messages: any = await getMessages();
  return (
    <NextIntlClientProvider messages={{ Departments: messages.Departments, Common: messages.Common }}>
      <div className="flex flex-col bg-background min-h-screen pb-20">
        <DepartmentsHero />
        <div className="luxury-container">
          <DepartmentGrid />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
