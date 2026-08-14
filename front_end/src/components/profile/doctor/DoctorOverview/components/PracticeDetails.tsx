import { DoctorProfileDetails } from "@/lib/types";
import {
  Stethoscope,
  Award,
  ShieldCheck,
  Mail,
  FileText,
  BadgeCheck,
  Briefcase,
} from "lucide-react";
import { SectionHeader, InfoItem } from "./DoctorOverviewSubcomponents";
import { T } from "@/i18n/T";

interface PracticeDetailsProps {
  doctor: DoctorProfileDetails;
}

export function PracticeDetails({ doctor }: PracticeDetailsProps) {
  const specialty = doctor.specialty || doctor.specialization || "Dermatology & Aesthetic Medicine";
  const position = doctor.position || "Senior Clinical Specialist";
  const license = doctor.licenseNumber || "DHA-LIC-2024-09881";
  const experienceYears = doctor.experienceYears ? `${doctor.experienceYears} Years` : "14+ Years";

  return (
    <div className="lg:col-span-7 bg-white border border-[#e8e0d5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
      <SectionHeader
        icon={Stethoscope}
        title={
          <T
            en="Practice & Clinical Credentials"
            ar="البيانات والاعتمادات الطبية"
            de="Klinische Qualifikationen"
            es="Credenciales Clínicas"
            fr="Qualifications Cliniques"
            it="Credenziali Cliniche"
            tr="Klinik Yetkinlikler"
            ru="Клиническая квалификация"
          />
        }
        subtitle={
          <T
            en="Verified medical specialization and professional registration"
            ar="التخصص الطبي والترخيص المهني المعتمد"
            de="Verifizierte medizinische Spezialisierung und Registrierung"
            es="Especialización médica y registro profesional verificado"
            fr="Spécialisation médicale et enregistrement professionnel vérifié"
            it="Specializzazione medica e registrazione professionale verificata"
            tr="Doğrulanmış tıbbi uzmanlık ve mesleki kayıt"
            ru="Подтвержденная медицинская специализация и регистрация"
          />
        }
        iconBg="#eef2f5"
        iconColor="#385366"
      />

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <InfoItem
          icon={Stethoscope}
          label={
            <T
              en="Specialty"
              ar="التخصص الطبي"
              de="Fachgebiet"
              es="Especialidad"
              fr="Spécialité"
              it="Specialità"
              tr="Uzmanlık Alanı"
              ru="Специализация"
            />
          }
          value={specialty}
        />

        <InfoItem
          icon={Briefcase}
          label={
            <T
              en="Title / Position"
              ar="المسمى / المنصب المهني"
              de="Titel / Position"
              es="Título / Cargo"
              fr="Titre / Position"
              it="Titolo / Posizione"
              tr="Ünvan / Pozisyon"
              ru="Должность"
            />
          }
          value={position}
        />

        <InfoItem
          icon={BadgeCheck}
          label={
            <T
              en="Medical License Number"
              ar="رقم الترخيص الطبي"
              de="Lizenznummer"
              es="Número de Licencia"
              fr="Numéro de Licence"
              it="Numero di Licenza"
              tr="Lisans Numarası"
              ru="Номер лицензии"
            />
          }
          value={license}
        />

        <InfoItem
          icon={Award}
          label={
            <T
              en="Clinical Experience"
              ar="الخبرة المهنية"
              de="Berufserfahrung"
              es="Experiencia Clínica"
              fr="Expérience Clinique"
              it="Esperienza Clinica"
              tr="Klinik Deneyim"
              ru="Клинический опыт"
            />
          }
          value={experienceYears}
        />

        <InfoItem
          icon={Mail}
          label={
            <T
              en="Official Doctor Email"
              ar="البريد الإلكتروني المهني"
              de="Offizielle E-Mail"
              es="Correo Oficial"
              fr="Email Officiel"
              it="Email Ufficiale"
              tr="Resmi E-posta"
              ru="Официальный email"
            />
          }
          value={doctor.email || "—"}
        />

        <InfoItem
          icon={ShieldCheck}
          iconColor="#2d7a55"
          label={
            <T
              en="Accreditation Status"
              ar="حالة الاعتماد الطبي"
              de="Akkreditierungsstatus"
              es="Estado de Acreditación"
              fr="Statut d'Accréditation"
              it="Stato di Accreditamento"
              tr="Akreditasyon Durumu"
              ru="Статус аккредитации"
            />
          }
          value={
            <T
              en="Verified Practitioner"
              ar="طبيب معتمد وموثق"
              de="Verifizierter Arzt"
              es="Médico Verificado"
              fr="Praticien Vérifié"
              it="Medico Verificato"
              tr="Doğrulanmış Hekim"
              ru="Верифицированный врач"
            />
          }
          badge={
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          }
        />
      </div>

      {/* Biography */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1e293b]">
          <FileText className="w-4 h-4 text-[#c8a96b]" />
          <span>
            <T
              en="Clinical Biography & Background"
              ar="السيرة المهنية والنبذة الطبية"
              de="Klinische Biografie"
              es="Biografía Clínica"
              fr="Biographie Clinique"
              it="Biografia Clinica"
              tr="Klinik Özgeçmiş"
              ru="Клиническая биография"
            />
          </span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#f7f2ea]/70 to-[#fff8ee]/70 border border-[#e8d5a8]/60 text-xs sm:text-sm text-[#4a5568] leading-relaxed shadow-2xs">
          {doctor.bio || (
            <T
              en="Dedicated medical specialist committed to providing world-class patient care, continuous clinical excellence, and state-of-the-art treatments at Premier Health."
              ar="طبيب وأخصائي متميز ملتزم بتقديم أرقى مستويات الرعاية الصحية وخدمة المرضى وفق أحدث المعايير الطبية العالمية في بريمير هيلث."
              de="Engagierter Facharzt, der sich für erstklassige Patientenversorgung und modernste Behandlungen bei Premier Health einsetzt."
              es="Especialista médico dedicado y comprometido con la excelencia clínica y los tratamientos más avanzados en Premier Health."
              fr="Spécialiste médical dévoué offrant des soins de premier ordre et des traitements de pointe chez Premier Health."
              it="Specialista medico dedicato a fornire cure d'eccellenza e trattamenti all'avanguardia presso Premier Health."
              tr="Premier Health'te birinci sınıf hasta bakımı ve en son tedavileri sunmaya kendini adamış uzman hekim."
              ru="Опытный специалист, обеспечивающий высочайшие стандарты медицинской помощи и передовые методы лечения в Premier Health."
            />
          )}
        </div>
      </div>
    </div>
  );
}

