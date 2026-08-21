import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";

export function FooterContact() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-serif text-sm uppercase tracking-wider text-accent font-semibold border-b border-white/10 pb-2">
        {t("Contact.info")}
      </h4>
      <div className="flex flex-col gap-3 text-xs text-slate-300">
        <div className="flex items-start gap-2.5">
          <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1.5">
            <a
              href="https://www.google.com/maps/place/Premier+Health/@30.0719202,31.2275839,17z/data=!3m1!4b1!4m6!3m5!1s0x1458413b92031a19:0xe4dfaac55744481b!8m2!3d30.0719202!4d31.2275839"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {t("Contact.fairmontAddress") || "Fairmont Nile City, Cairo"}
            </a>
            <a
              href="https://www.google.com/maps/place/Arkan+Plaza/@30.0194029,31.0045291,17z/data=!3m1!4b1!4m6!3m5!1s0x14585b0525c31285:0xe916bcf3ee2db2ad!8m2!3d30.0194029!4d31.0045291"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {t("Contact.arkanAddress") || "Arkan Plaza, Sheikh Zayed"}
            </a>
            <a
              href="https://www.google.com/maps?q=2G87+5RC+D+solutions,+Eastown,+New+Cairo+1,+Cairo+Governorate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {t("Contact.sodicAddress") || "EDNC Sodic, Fifth Settlement"}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
          <div className="flex items-start gap-2.5">
            <Phone size={15} className="text-accent shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 text-[11px]">
              <a href="tel:+201111977705" className="hover:text-accent transition-colors">
                <span className="text-white/60">فيرمونت نايل سيتي: </span>
                <span dir="ltr" className="font-bold text-white">+20 11 11977705</span>
              </a>
              <a href="tel:+201111977713" className="hover:text-accent transition-colors">
                <span className="text-white/60">أركان بلازا (الشيخ زايد): </span>
                <span dir="ltr" className="font-bold text-white">+20 11 11977713</span>
              </a>
              <a href="tel:+201111977712" className="hover:text-accent transition-colors">
                <span className="text-white/60">سوديك EDNC (التجمع): </span>
                <span dir="ltr" className="font-bold text-white">+20 11 11977712</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Mail size={15} className="text-accent shrink-0" />
          <a href="mailto:info@premierhealthclinics.com" className="hover:text-accent transition-colors">
            info@premierhealthclinics.com
          </a>
        </div>

        <a
          href="https://wa.me/201111977705"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 text-xs font-bold transition-all duration-300 shadow-md"
        >
          <MessageSquare size={14} />
          <span>{t("Contact.whatsapp")}</span>
        </a>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <a
            href="https://linktr.ee/premierhealthclinic?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn4vU--2mfzGGjubFPdudDSEFScndLbKctChOsfVkTwqmHFuVAnWXk0pRt9L8_aem_cDBEalVTbqUG3HJ5ELmR5A"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2 text-[11px] font-bold transition-all duration-300 border border-white/10"
          >
            <span>Linktree</span>
          </a>
          <a
            href="https://www.threads.com/@premierhealth.clinics?xmt=AQG0Wb3l_o78YEFG5CsuzU0Q91_J_dN9r3EzKcaTsa6Peu4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2 text-[11px] font-bold transition-all duration-300 border border-white/10"
          >
            <span>Threads</span>
          </a>
          <a
            href="https://www.tiktok.com/@premierhealthclinics"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2 text-[11px] font-bold transition-all duration-300 border border-white/10"
          >
            <span>TikTok</span>
          </a>
          <a
            href="https://www.snapchat.com/@premier.health?share_id=inVm7XArR_w&locale=en-GB"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2 text-[11px] font-bold transition-all duration-300 border border-white/10"
          >
            <span>Snapchat</span>
          </a>
          <a
            href="https://www.google.com/search?client=safari&hl=en-eg&sxsrf=ALiCzsYe7w__J5YT0kbjpTX0pf9lCL6qpw:1656257145699&q=Premier+Care&ludocid=16492088125003417627&gsas=1&client=safari&lsig=AB86z5VbyTY4DN7nfpzAGrbJfjP1&kgs=09e54351cf095e2e&shndl=-1&source=sh/x/kp/local/3&entrypoint=sh/x/kp/local"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2 text-[11px] font-bold transition-all duration-300 border border-white/10 col-span-2"
          >
            <span>Google Listing</span>
          </a>
        </div>
      </div>
    </div>
  );
}
