"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Award, ShieldCheck, UserCheck } from "lucide-react";
import { T } from "@/i18n/T";

export function DoctorsHero() {
  const t = useTranslations("Doctors");

  const highlights = [
    {
      icon: Award,
      text: (
        <T
          en="15+ Years Avg. Experience"
          ar="خبرة سريرية لا تقل عن ١٥ عاماً"
          de="15+ Jahre Erfahrung"
          es="15+ Años de Experiencia"
          fr="15+ Ans d'Expérience"
          it="15+ Anni di Experienza"
          tr="15+ Yıl Deneyim"
          ru="15+ лет ср. опыта"
        />
      ),
    },
    {
      icon: ShieldCheck,
      text: (
        <T
          en="International Certifications"
          ar="اعتمادات ومؤهلات دولية"
          de="Zertifizierte Expertise"
          es="Certificaciones Internacionales"
          fr="Certifications Internationales"
          it="Certificazioni Internazionali"
          tr="Uluslararası Sertifikalar"
          ru="Международные сертификаты"
        />
      ),
    },
    {
      icon: UserCheck,
      text: (
        <T
          en="Personalized Care Protocols"
          ar="رعاية صحية مخصصة بالكامل"
          de="Individuelle Pflege"
          es="Cuidado Personalizado"
          fr="Soins Personnalisés"
          it="Cura Personalizzata"
          tr="Kişiye Özel Bakım"
          ru="Индивидуальные протоколы"
        />
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fcfbf9] via-[#f7f2ea] to-[#fcfbf9] rounded-3xl sm:rounded-[2.5rem] border border-accent/20 mb-8 sm:mb-10 shadow-md text-primary">
      {/* Ambient Soft Gold Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="luxury-container relative z-10 py-8 sm:py-12 md:py-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 text-left rtl:text-right">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold shadow-sm">
              <Sparkles size={12} className="text-accent" />
              <T
                en="Our Elite Medical Faculty"
                ar="نخبة الأطباء والاستشاريين"
                de="Unsere Elite-Mediziner"
                es="Facultad Médica de Élite"
                fr="Corps Médical d'Élite"
                it="Facoltà Medica d'Élite"
                tr="Seçkin Tıbbi Kadromuz"
                ru="Наша элитная медицинская команда"
              />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-primary leading-tight"
          >
            <T
              en="Meet Our World-Class Specialists"
              ar="نخبة من كبار الأطباء والاستشاريين"
              de="Treffen Sie unsere Weltklasse-Spezialisten"
              es="Conozca a Nuestros Especialistas Globales"
              fr="Rencontrez Nos Spécialistes Mondiaux"
              it="Incontra i Nostri Specialisti Mondiali"
              tr="Dünya Standartlarındaki Uzmanlarımızla Tanışın"
              ru="Познакомьтесь с нашими специалистами мирового уровня"
            />
          </motion.h1>

          <div className="h-[2px] w-16 sm:w-20 bg-accent" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/80 text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-xl"
          >
            <T
              en="Dedicated board-certified physicians, surgeons, and aesthetic experts committed to delivering personalized excellence and transformative care."
              ar="فريق من الأطباء والاستشاريين المعتمدين دولياً المكرسين لتقديم أعلى مستويات الرعاية الصحية والتجميلية المخصصة لكل مريض."
              de="Zertifizierte Ärzte und Ästhetik-Experten für individuelle Exzellenz."
              es="Médicos y expertos estéticos dedicados a brindar excelencia personalizada."
              fr="Médecins et experts esthétiques dédiés à une excellence personnalisée."
              it="Medici ed esperti estetici dedicati a una cura personalizzata d'eccellenza."
              tr="Kişiselleştirilmiş mükemmellik sunmaya adanmış uzman hekimlerimiz."
              ru="Сертифицированные врачи, хирурги и эксперты эстетической медицины, стремящиеся предоставить персонализированный уход высшего класса."
            />
          </motion.p>

          {/* Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 sm:pt-2"
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 bg-white border border-accent/15 rounded-2xl p-2.5 sm:p-3 shadow-sm hover:border-accent/40 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Icon size={15} />
                  </div>
                  <span className="text-[11px] sm:text-xs text-primary font-bold leading-tight">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Side: Warm Luxury Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full max-w-[440px] mx-auto lg:max-w-none"
        >
          <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-[2rem] overflow-hidden border border-accent/20 p-2 sm:p-2.5 bg-white shadow-md group">
            <div className="relative h-full w-full rounded-xl sm:rounded-[1.5rem] overflow-hidden">
              <Image
                src="/doctor/doctor.webp"
                alt="Premier Health Medical Faculty"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Glass Label */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-white/60 rounded-xl p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-primary font-serif">
                    <T
                      en="Premier Health Faculty"
                      ar="كادر بريمير هيلث الطبي"
                      de="Premier Health Mediziner"
                      es="Facultad Premier Health"
                      fr="Corps Médical Premier Health"
                      it="Corpo Medico Premier Health"
                      tr="Premier Health Tıbbi Kadrosu"
                      ru="Медицинский состав Premier Health"
                    />
                  </span>
                </div>
                <span className="text-[10px] text-accent font-bold tracking-wider uppercase bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                  <T
                    en="Top Rated"
                    ar="الأعلى تقييماً"
                    de="Top Bewertet"
                    es="Mejor Valorado"
                    fr="Mieux Noté"
                    it="Più Votato"
                    tr="En Yüksek Puanlı"
                    ru="Высший рейтинг"
                  />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
