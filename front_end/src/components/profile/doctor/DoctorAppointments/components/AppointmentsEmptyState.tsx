"use client";

import { Calendar } from "lucide-react";
import { T } from "@/i18n/T";

export function AppointmentsEmptyState() {
  return (
    <div className="p-12 text-center bg-card rounded-2xl border border-border">
      <Calendar className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
      <h4 className="text-base font-bold text-foreground mb-1">
        <T
          en="No Assigned Bookings Found"
          ar="لا توجد حجوزات مسجلة باسمك حالياً"
          de="Keine zugewiesenen Buchungen gefunden"
          es="No se encontraron reservas asignadas"
          fr="Aucune réservation assignée trouvée"
          it="Nessuna prenotazione assegnata trovata"
          tr="Atanmış Rezervasyon Bulunamadı"
          ru="Назначенных записей не найдено"
        />
      </h4>
      <p className="text-xs text-muted-foreground">
        <T
          en="New patient bookings will appear here automatically once created."
          ar="ستظهر حجوزات المرضى الجدد هنا تلقائياً فور تأكيد الحجز."
          de="Neue Patientenbuchungen werden nach der Erstellung automatisch hier angezeigt."
          es="Las nuevas reservas de pacientes aparecerán aquí automáticamente una vez creadas."
          fr="Les nouvelles réservations de patients apparaîtront ici automatiquement une fois créées."
          it="Le nuove prenotazioni dei pazienti appariranno qui automaticamente una volta create."
          tr="Yeni hasta rezervasyonları oluşturulduktan sonra burada otomatik olarak görünecektir."
          ru="Новые записи пациентов появятся здесь автоматически после создания."
        />
      </p>
    </div>
  );
}
