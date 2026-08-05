"use client";

import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import { T } from "@/i18n/T";

export function DoctorExcellenceSection() {
  const pillars = [
    {
      icon: Stethoscope,
      title: (
        <T
          en="Board-Certified Excellence"
          ar="اعتماد وخبرة سريرية"
          de="Zertifizierte Exzellenz"
          es="Excelencia Certificada"
          fr="Excellence Certifiée"
          it="Eccellenza Certificata"
          tr="Sertifikalı Mükemmeliyet"
        />
      ),
      desc: (
        <T
          en="Strict international medical standards and continuous specialized research."
          ar="معايير طبية دولية صارمة وأبحاث سريرية مستمرة."
          de="Strenge internationale medizinische Standards und kontinuierliche Forschung."
          es="Estrictos estándares médicos internacionales e investigación continua."
          fr="Normes médicales internationales strictes et recherche continue."
          it="Rigorosi standard medici internazionali e ricerca continua."
          tr="Katı uluslararası tıbbi standartlar ve sürekli araştırma."
        />
      ),
    },
    {
      icon: ShieldCheck,
      title: (
        <T
          en="Tailored Healthcare Protocols"
          ar="خطط علاجية مخصصة"
          de="Maßgeschneiderte Behandlungspläne"
          es="Planes Personalizados"
          fr="Plans Personnalisés"
          it="Piani Personalizzati"
          tr="Kişiselleştirilmiş Planlar"
        />
      ),
      desc: (
        <T
          en="Customized protocols matching your unique biological profile and health goals."
          ar="بروتوكولات علاجية مخصصة تناسب احتياجاتك البيولوجية وأهدافك."
          de="Individuelle Protokolle für Ihr biologisches Profil und Ihre Ziele."
          es="Protocolos personalizados según su perfil biológico y metas."
          fr="Protocole personnalisé selon votre profil biologique et vos objectifs."
          it="Protocolli personalizzati in base al tuo profilo e ai tuoi obiettivi."
          tr="Biyolojik profilinize ve hedeflerinize uygun özel protokoller."
        />
      ),
    },
    {
      icon: Sparkles,
      title: (
        <T
          en="Next-Gen Medical Innovation"
          ar="أحدث التقنيات والابتكارات"
          de="Medizinische Innovation"
          es="Innovación Médica"
          fr="Innovation Médicale"
          it="Innovazione Medica"
          tr="Tıbbi İnovasyon"
        />
      ),
      desc: (
        <T
          en="FDA-approved, state-of-the-art diagnostic and therapeutic equipment."
          ar="أحدث الأجهزة التشخيصية والعلاجية المعتمدة عالمياً لأقصى درجات الأمان."
          de="FDA-zugelassene, hochmoderne diagnostische und therapeutische Geräte."
          es="Equipos de diagnóstico y terapia de vanguardia aprobados por la FDA."
          fr="Équipements de diagnostic et de thérapie de pointe approuvés FDA."
          it="Apparecchiature diagnostiche e terapeutiche approvate dalla FDA."
          tr="FDA onaylı, son teknoloji teşhis ve tedavi ekipmanları."
        />
      ),
    },
    {
      icon: HeartHandshake,
      title: (
        <T
          en="Discreet Luxury Experience"
          ar="خصوصية وراحة مطلقة"
          de="Diskrete Luxuserfahrung"
          es="Experiencia de Lujo Discreta"
          fr="Expérience de Luxe Discrète"
          it="Esperienza di Lusso Discreta"
          tr="Gizli ve Lüks Deneyim"
        />
      ),
      desc: (
        <T
          en="Private clinical suites and dedicated coordinators for complete peace of mind."
          ar="أجنحة خاصة ورعاية مخصصة لضمان الراحة والخصوصية التامة."
          de="Private klinische Suiten und engagierte Betreuer für höchste Diskretion."
          es="Suites privadas y coordinadores dedicados para su total tranquilidad."
          fr="Suites privées et coordinateurs dédiés pour une discrétion absolue."
          it="Suite private e coordinatori dedicati per la massima riservatezza."
          tr="Tam gizlilik ve konfor için özel süitler ve özel koordinatörler."
        />
      ),
    },
  ];

  return (
    <section className="luxury-container py-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          <Sparkles size={12} className="text-accent" />
          <T
            en="Pillars of Excellence"
            ar="ركائز التميز الطبي"
            de="Säulen der Exzellenz"
            es="Pilares de Excelencia"
            fr="Piliers d'Excellence"
            it="Pilastri di Eccellenza"
            tr="Mükemmeliyet İlkeleri"
          />
        </span>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-tight mb-3">
          <T
            en="World-Class Medical Mastery & Patient Care"
            ar="إتقان طبي عالمي ورعاية صحية متكاملة"
            de="Medizinische Meisterschaft & Patientenbetreuung"
            es="Maestría Médica Global y Cuidado del Paciente"
            fr="Maîtrise Médicale Mondiale & Soins aux Patients"
            it="Maestria Medica Globale e Cura del Paziente"
            tr="Dünya Standartlarında Tıbbi Uzmanlık ve Hasta Bakımı"
          />
        </h2>

        <div className="h-[2px] w-16 bg-accent mx-auto mb-4" />

        <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-medium">
          <T
            en="Combining clinical expertise with cutting-edge medical technology for exceptional outcomes."
            ar="نجمع بين الخبرة السريرية وأحدث التقنيات الطبية لتقديم نتائج استثنائية."
            de="Kombination klinischer Expertise mit neuester Technologie für optimale Ergebnisse."
            es="Combinando experiencia clínica con tecnología médica de vanguardia para excelentes resultados."
            fr="Allier expertise clinique et technologies médicales de pointe pour des résultats d'exception."
            it="Unire l'esperienza clinica a tecnologie mediche all'avanguardia per risultati eccellenti."
            tr="Üstün sonuçlar için klinik uzmanlığı son teknolojiyle birleştiriyoruz."
          />
        </p>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-7 border border-accent/15 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 card-gold-accent flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent">
                  <Icon size={26} />
                </div>

                <h3 className="text-lg font-serif font-bold text-primary mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs text-foreground/70 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
