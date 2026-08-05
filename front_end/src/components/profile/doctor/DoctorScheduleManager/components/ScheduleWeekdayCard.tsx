import { Calendar, Clock, MapPin, Trash2, User } from "lucide-react";
import { AvailabilitySlot, DoctorProfileBooking, Appointment } from "@/lib/types";

interface ScheduleWeekdayCardProps {
  day: AvailabilitySlot["weekday"];
  daySlots: AvailabilitySlot[];
  upcomingApts: Appointment[];
  profileBookings: DoctorProfileBooking[];
  onDeleteSlot: (id: string) => void;
}

export function ScheduleWeekdayCard({
  day,
  daySlots,
  upcomingApts,
  profileBookings,
  onDeleteSlot,
}: ScheduleWeekdayCardProps) {
  const isWorkingDay = daySlots.length > 0;
  const hasBookings = upcomingApts.length > 0 || profileBookings.length > 0;

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isWorkingDay
          ? "bg-card border-border shadow-xs"
          : "bg-muted/20 border-border/40 opacity-70"
      }`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <div className="flex items-center gap-2">
          <Calendar className={`w-4 h-4 ${isWorkingDay ? "text-emerald-500" : "text-muted-foreground"}`} />
          <h4 className="font-bold text-sm text-foreground">{day}</h4>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
            isWorkingDay ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
          }`}
        >
          {isWorkingDay ? `${daySlots.length} Shift` : "Off Day"}
        </span>
      </div>

      {isWorkingDay ? (
        <div className="space-y-3">
          {daySlots.map((slot) => (
            <div
              key={slot.id}
              className="p-3 rounded-xl bg-muted/40 border border-border/50 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <span className="text-[10px] text-muted-foreground">({slot.slotDurationMinutes} min/slot)</span>
                </div>
                {slot.branchName && (
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    <span>{slot.branchName}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onDeleteSlot(slot.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                title="Remove slot"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic text-center py-2">No availability configured</p>
      )}

      {/* Booked Appointments section */}
      {hasBookings && (
        <div className="mt-4 pt-3 border-t border-border space-y-2">
          <h5 className="text-[11px] font-bold text-foreground flex items-center gap-1.5 mb-2">
            <User className="w-3.5 h-3.5 text-blue-500" /> Bookings ({upcomingApts.length + profileBookings.length})
          </h5>
          <div className="space-y-1.5">
            {profileBookings.map((b) => (
              <div key={b.id} className="p-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[11px]">
                <div className="flex justify-between items-center text-blue-700 font-semibold mb-0.5">
                  <span>{b.startTime?.slice(0, 5)} - {b.endTime?.slice(0, 5)}</span>
                  <span className="text-[9px] bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-medium">{b.date}</span>
                </div>
                <div className="font-medium text-foreground">{b.patientName}</div>
                <div className="text-muted-foreground flex justify-between">
                  <span>{b.serviceName}</span>
                  <span className="font-semibold">${b.fee}</span>
                </div>
              </div>
            ))}
            {upcomingApts.map((apt) => (
              <div key={apt.id} className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs">
                <div className="font-semibold text-blue-700 flex justify-between items-center mb-0.5">
                  <span>{apt.time}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/20">{apt.date}</span>
                </div>
                <div className="text-blue-900 font-medium truncate">{(apt as any).customerName || apt.doctor || "Patient"}</div>
                <div className="text-blue-600/80 text-[10px] truncate">{apt.service}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
