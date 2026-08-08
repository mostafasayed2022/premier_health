// Step5DateTime.tsx — remove expandSlots entirely, use backend data directly
"use client";
import { useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getAvailableSlots, WizardSlot } from "@/lib/api";
import { Calendar, Clock, Loader2, AlertCircle } from "lucide-react";

interface Step5DateTimeProps {
  selectedDate: string;
  selectedTime: string;
  onSelect: (date: string, time: string) => void;
  doctorId: string | number;
  branchId: string | number;
}

export function Step5DateTime({ selectedDate, selectedTime, onSelect, doctorId, branchId }: Step5DateTimeProps) {
  const t = useTranslations("Booking");
  const locale = useLocale();

  const [slots, setSlots] = useState<WizardSlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doctorId || !branchId) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getAvailableSlots({ doctorId: Number(doctorId), branchId: Number(branchId) })
      .then((data) => { if (!cancelled) setSlots(data ?? []); })
      .catch(() => { if (!cancelled) setSlots([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [doctorId, branchId]);

  const availableDates = useMemo(
    () => Array.from(new Set(slots.map((s) => s.date))).sort(),
    [slots]
  );

  const activeDate = selectedDate || (availableDates[0] ?? "");

  const availableTimes = useMemo(() => {
    if (!activeDate) return [];
    return slots
      .filter((s) => s.date === activeDate)
      .map((s) => s.start_time.substring(0, 5))
      .sort();
  }, [slots, activeDate]);

  const handleDateClick = (date: string) => {
    const timesForDate = slots.filter((s) => s.date === date).map((s) => s.start_time.substring(0, 5));
    const newTime = timesForDate.includes(selectedTime) ? selectedTime : "";
    onSelect(date, newTime);
  };

  const parseDateParts = (dateStr: string) => {
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const weekday = d.toLocaleDateString(locale, { weekday: "short" });
      const day = parts[2];
      const month = d.toLocaleDateString(locale, { month: "short" });
      return { weekday, day, month };
    }
    return { weekday: "", day: dateStr, month: "" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-foreground/60 gap-3">
        <Loader2 size={22} className="animate-spin text-accent" />
        <span className="text-sm font-medium">{t("loadingSlots")}</span>
      </div>
    );
  }

  if (!doctorId || !branchId) return null;

  if (availableDates.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-accent/20 bg-beige/30">
        <Calendar size={32} className="mx-auto text-accent/50 mb-2" />
        <p className="text-sm text-foreground/60 font-medium">{t("noSlots")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Date Picker Section */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Calendar size={15} className="text-accent" />
          <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-primary">
            {t("selectDate")}
          </h4>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
          {availableDates.map((date) => {
            const isSelected = date === activeDate;
            const { weekday, day, month } = parseDateParts(date);

            return (
              <button
                key={date}
                type="button"
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-white border-accent/20 text-foreground/80 hover:border-accent hover:shadow-md"
                }`}
              >
                <span
                  className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? "text-amber-300" : "text-accent"
                  }`}
                >
                  {weekday}
                </span>
                <span className="text-base sm:text-xl font-serif font-bold my-0.5">
                  {day}
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium opacity-80">
                  {month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Clock size={15} className="text-accent" />
          <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-primary">
            {t("selectTime")}
          </h4>
        </div>

        {availableTimes.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
            {availableTimes.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => onSelect(activeDate, time)}
                  className={`py-2.5 px-1.5 sm:py-3 sm:px-2 rounded-xl border-2 text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1 sm:gap-1.5 ${
                    isSelected
                      ? "bg-accent text-white border-accent shadow-lg shadow-accent/20 scale-105"
                      : "bg-white border-accent/20 text-primary hover:border-accent hover:shadow-md"
                  }`}
                >
                  <Clock size={12} className={isSelected ? "text-white" : "text-accent"} />
                  <span>{time}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-foreground/60 italic py-4">
            {t("noSlots")}
          </p>
        )}
      </div>
    </div>
  );
}