import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-[#1F3D5A] py-24">
        <div className="luxury-container relative z-10 text-center">
          <h1 className="text-5xl font-serif text-white mb-4">
            {t("Policy.privacyTitle")}
          </h1>
          <div className="h-[2px] w-24 bg-[#C8A96B] mx-auto" />
          <p className="text-white/60 text-xs mt-4 uppercase tracking-widest">
            {t("Policy.lastUpdated")}
          </p>
        </div>
      </section>

      <section className="luxury-container py-16 pb-24">
        <div className="max-w-3xl mx-auto prose prose-headings:font-serif prose-headings:text-[#1F3D5A] prose-p:text-[#1E293B]/75 prose-p:leading-relaxed">
          <h2>{t("Policy.infoCollect")}</h2>
          <p>{t("Policy.infoCollectText")}</p>

          <h2>{t("Policy.howUseInfo")}</h2>
          <p>{t("Policy.howUseInfoText")}</p>

          <h2>{t("Policy.dataSec")}</h2>
          <p>{t("Policy.dataSecText")}</p>

          <h2>{t("Policy.thirdParty")}</h2>
          <p>{t("Policy.thirdPartyText")}</p>

          <h2>{t("Policy.cookies")}</h2>
          <p>{t("Policy.cookiesText")}</p>

          <h2>{t("Policy.rights")}</h2>
          <p>{t("Policy.rightsText")}</p>

          <h2>{t("Policy.contactText") ? t("Policy.contactText").split(" ")[0] === "For" ? "Contact Us" : "التواصل معنا" : "Contact Us"}</h2>
          <p>{t("Policy.contactPrivacyText")}</p>
        </div>
      </section>
    </div>
  );
}
