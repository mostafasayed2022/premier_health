import { ContactHero, ContactInfo, ContactForm } from "@/components/contact";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export const generateMetadata = generatePageMetadata("contact");

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <div className="flex flex-col bg-slate-50/60 min-h-screen">
      <ContactHero />

      <section className="luxury-container py-12 md:py-20 pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Contact Information & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                {t("title") || "Get in Touch"}
              </h2>
              <p className="text-sm text-foreground/80 font-medium">
                {t("subtitle") || "We're here to answer your questions and assist you with your healthcare needs."}
              </p>
            </div>
            <ContactInfo />
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-accent/20 rounded-3xl p-6 sm:p-10 shadow-md shadow-primary/5">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                {t("sendMessage") || "Send us a Message"}
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
