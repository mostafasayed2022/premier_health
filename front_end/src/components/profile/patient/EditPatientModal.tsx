"use client";

import { useState } from "react";
import { PatientProfile, UpdatePatientPayload } from "@/lib/types";
import { useUpdatePatientProfile } from "@/lib/api/hooks";
import { Save, Loader2, X, User } from "lucide-react";
import { toast } from "sonner";
import { T } from "@/i18n/T";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
}

export function EditPatientModal({
  isOpen,
  onClose,
  patient,
}: EditPatientModalProps) {
  const [firstName, setFirstName] = useState(patient.firstName || "");
  const [lastName, setLastName] = useState(patient.lastName || "");
  const [phone, setPhone] = useState(patient.phone || "");
  const [dateOfBirth, setDateOfBirth] = useState(patient.dateOfBirth || "");
  const [gender, setGender] = useState<UpdatePatientPayload["gender"]>(
    (patient.gender as any) || "female",
  );

  const updateMutation = useUpdatePatientProfile({
    onSuccess: () => {
      toast.success("Patient profile updated successfully!");
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile.");
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdatePatientPayload = {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
    };

    updateMutation.mutate(payload);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-white border border-[#e8e0d5] text-sm text-[#1e293b] placeholder-[#959ead] font-medium outline-none focus:ring-2 focus:ring-[#385366]/30 focus:border-[#385366] transition-all";

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#e8e0d5] p-6 sm:p-7 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e8e0d5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#eef2f5] text-[#385366] flex items-center justify-center shadow-2xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1e293b]">
                <T
                  en="Edit Patient Profile"
                  ar="تعديل بيانات الملف الشخصي"
                  de="Patientenprofil bearbeiten"
                  es="Editar Perfil del Paciente"
                  fr="Modifier le Profil Patient"
                  it="Modifica Profilo Paziente"
                  tr="Hasta Profilini Düzenle"
                  ru="Редактировать профиль пациента"
                />
              </h3>
              <p className="text-xs text-[#959ead]">
                <T
                  en="Update your personal profile information"
                  ar="تحديث بياناتك الشخصية المسجلة"
                  de="Aktualisieren Sie Ihre persönlichen Profilinformationen"
                  es="Actualice su información de perfil personal"
                  fr="Mettez à jour vos informations de profil"
                  it="Aggiorna le informazioni del tuo profilo personale"
                  tr="Kişisel profil bilgilerinizi güncelleyin"
                  ru="Обновите данные вашего личного профиля"
                />
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#f7f2ea] text-[#959ead] hover:text-[#1e293b] hover:bg-[#e8e0d5] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                <T
                  en="First Name *"
                  ar="الاسم الأول *"
                  de="Vorname *"
                  es="Nombre *"
                  fr="Prénom *"
                  it="Nome *"
                  tr="Ad *"
                  ru="Имя *"
                />
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                placeholder="e.g. John"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                <T
                  en="Last Name *"
                  ar="اسم العائلة *"
                  de="Nachname *"
                  es="Apellido *"
                  fr="Nom de famille *"
                  it="Cognome *"
                  tr="Soyad *"
                  ru="Фамилия *"
                />
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                placeholder="e.g. Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                <T
                  en="Phone Number"
                  ar="رقم الهاتف"
                  de="Telefonnummer"
                  es="Teléfono"
                  fr="Téléphone"
                  it="Telefono"
                  tr="Telefon Numarası"
                  ru="Номер телефона"
                />
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="+20 123 456 7890"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                <T
                  en="Date of Birth"
                  ar="تاريخ الميلاد"
                  de="Geburtsdatum"
                  es="Fecha de Nacimiento"
                  fr="Date de Naissance"
                  it="Data di Nascita"
                  tr="Doğum Tarihi"
                  ru="Дата рождения"
                />
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                <T
                  en="Gender"
                  ar="النوع / الجنس"
                  de="Geschlecht"
                  es="Género"
                  fr="Genre"
                  it="Genere"
                  tr="Cinsiyet"
                  ru="Пол"
                />
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className={inputClass}
              >
                <option value="Male">Male / ذكر</option>
                <option value="Female">Female / أنثى</option>
                <option value="Other">Other / آخر</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e0d5]">
            <button
              type="button"
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#4a5568] hover:bg-[#f7f2ea] transition-colors cursor-pointer"
            >
              <T
                en="Cancel"
                ar="إلغاء"
                de="Abbrechen"
                es="Cancelar"
                fr="Annuler"
                it="Annulla"
                tr="İptal"
                ru="Отмена"
              />
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-md cursor-pointer disabled:opacity-50 transition-all hover:opacity-95"
              style={{ backgroundColor: "#385366" }}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <T
                    en="Saving..."
                    ar="جاري الحفظ..."
                    de="Speichern..."
                    es="Guardando..."
                    fr="Enregistrement..."
                    it="Salvataggio..."
                    tr="Kaydediliyor..."
                    ru="Сохранение..."
                  />
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <T
                    en="Save Changes"
                    ar="حفظ التعديلات"
                    de="Änderungen speichern"
                    es="Guardar cambios"
                    fr="Enregistrer"
                    it="Salva modifiche"
                    tr="Değişiklikleri Kaydet"
                    ru="Сохранить изменения"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

