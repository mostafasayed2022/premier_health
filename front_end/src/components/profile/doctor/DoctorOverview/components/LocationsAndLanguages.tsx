import { DoctorProfileDetails } from "@/lib/types";
import { MapPin, Globe, CheckCircle2, Building, Sparkles } from "lucide-react";
import { SectionHeader } from "./DoctorOverviewSubcomponents";
import { T } from "@/i18n/T";

interface LocationsAndLanguagesProps {
  doctor: DoctorProfileDetails;
}

export function LocationsAndLanguages({ doctor }: LocationsAndLanguagesProps) {
  const branches =
    doctor.branches && doctor.branches.length > 0
      ? doctor.branches
      : ["Fairmont Nile City", "EDNC Sodic (New Cairo)"];

  const languages =
    doctor.languages && doctor.languages.length > 0
      ? doctor.languages
      : ["Arabic (Native)", "English (Fluent)"];

  const services = doctor.services || [];

  return (
    <div className="lg:col-span-5 space-y-5">
      
      {/* ── 1. Practice Locations ── */}
      <div className="bg-white border border-[#e8e0d5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <SectionHeader
          icon={MapPin}
          title={
            <T
              en="Practice Locations"
              ar="فروع ومراكز العيادات"
              de="Praxisstandorte"
              es="Ubicaciones de Práctica"
              fr="Lieux de Consultation"
              it="Sedi di Visita"
              tr="Klinik Lokasyonları"
              ru="Адреса приемов"
            />
          }
          subtitle={
            <T
              en="Premier Health affiliated medical centres"
              ar="المراكز الطبية المعتمدة التابعة لبريمير هيلث"
              de="Mit Premier Health verbundene Zentren"
              es="Centros médicos afiliados a Premier Health"
              fr="Centres médicaux affiliés à Premier Health"
              it="Centri medici affiliati a Premier Health"
              tr="Premier Health bağlantılı tıp merkezleri"
              ru="Медицинские центры Premier Health"
            />
          }
          iconBg="#edf7ee"
          iconColor="#2d7a55"
        />

        <div className="space-y-2.5">
          {branches.map((branch) => (
            <div
              key={branch}
              className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f7f2ea]/60 border border-[#e8e0d5]/80 hover:bg-[#f7f2ea] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#2d7a55] shrink-0 border border-[#e8e0d5]/60 shadow-2xs">
                  <Building className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1e293b] truncate">
                  {branch}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                <T en="Active" ar="متاح" de="Aktiv" es="Activo" fr="Actif" it="Attivo" tr="Aktif" ru="Активен" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Languages Spoken ── */}
      <div className="bg-white border border-[#e8e0d5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <SectionHeader
          icon={Globe}
          title={
            <T
              en="Languages Spoken"
              ar="اللغات المتقنة"
              de="Gesprochene Sprachen"
              es="Idiomas"
              fr="Langues Parlées"
              it="Lingue Parlate"
              tr="Konuşulan Diller"
              ru="Языки общения"
            />
          }
          subtitle={
            <T
              en="Consultation languages available for patients"
              ar="لغات تقديم الاستشارات الطبية للمرضى"
              de="Verfügbare Sprachen für Konsultationen"
              es="Idiomas de consulta disponibles"
              fr="Langues de consultation disponibles"
              it="Lingue di consultazione disponibili"
              tr="Hastalar için uygun konsültasyon dilleri"
              ru="Языки консультаций для пациентов"
            />
          }
          iconBg="#fff8ee"
          iconColor="#a38448"
        />

        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#f7f2ea] text-[#385366] border border-[#e8e0d5] shadow-2xs"
            >
              <Globe className="w-3 h-3 text-[#c8a96b]" />
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. Clinical Services / Procedures ── */}
      {services.length > 0 && (
        <div className="bg-white border border-[#e8e0d5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <SectionHeader
            icon={Sparkles}
            title={
              <T
                en="Clinical Services"
                ar="الخدمات والإجراءات الطبية"
                de="Klinische Leistungen"
                es="Servicios Clínicos"
                fr="Services Cliniques"
                it="Servizi Clinici"
                tr="Klinik Hizmetler"
                ru="Клинические услуги"
              />
            }
            subtitle={
              <T
                en="Specialized medical services offered"
                ar="الخدمات التخصصية المقدمة للمرضى"
                de="Angebotene spezialisierte Leistungen"
                es="Servicios médicos especializados"
                fr="Services médicaux spécialisés"
                it="Servizi medici specializzati"
                tr="Sunulan uzman tıbbi hizmetler"
                ru="Специализированные медицинские услуги"
              />
            }
            iconBg="#eef2f5"
            iconColor="#385366"
          />

          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#e8e0d5] text-[#1e293b] shadow-2xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96b]" />
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

