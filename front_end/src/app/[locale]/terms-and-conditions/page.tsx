import { getTranslations } from "next-intl/server";

export default async function TermsPage() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-[#1F3D5A] py-24">
        <div className="luxury-container relative z-10 text-center">
          <h1 className="text-5xl font-serif text-white mb-4">
            {t("Policy.termsTitle")}
          </h1>
          <div className="h-[2px] w-24 bg-[#C8A96B] mx-auto" />
          <p className="text-white/60 text-xs mt-4 uppercase tracking-widest">
            {t("Policy.lastUpdated")}
          </p>
        </div>
      </section>

      <section className="luxury-container py-16 pb-24">
        <div className="max-w-3xl mx-auto prose prose-headings:font-serif prose-headings:text-[#1F3D5A] prose-p:text-[#1E293B]/75 prose-p:leading-relaxed">
          <h2>{t("Policy.termsUse")}</h2>
          <p>{t("Policy.termsUseText")}</p>

          <h2>{t("Policy.medServices")}</h2>
          <p>{t("Policy.medServicesText")}</p>

          <h2>{t("Policy.cancellation")}</h2>
          <p>{t("Policy.cancellationText")}</p>

          <h2>{t("Policy.medLiability")}</h2>
          <p>{t("Policy.medLiabilityText")}</p>

          <h2>{t("Policy.paymentRefund")}</h2>
          <p>{t("Policy.paymentRefundText")}</p>

          <h2>{t("Policy.intellectualProp")}</h2>
          <p>{t("Policy.intellectualPropText")}</p>

          <h2>{t("Policy.contactText") ? t("Policy.contactText").split(" ")[0] === "For" ? "Contact Us" : "التواصل معنا" : "Contact Us"}</h2>
          <p>{t("Policy.contactText")}</p>
        </div>
      </section>
    </div>
  );
}
