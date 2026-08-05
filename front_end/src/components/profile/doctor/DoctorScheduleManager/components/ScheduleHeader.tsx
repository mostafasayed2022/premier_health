import { CheckCircle2, Plus } from "lucide-react";
import { AvailabilitySlot } from "@/lib/types";

interface ScheduleHeaderProps {
  slots: AvailabilitySlot[];
  onSave?: (slots: AvailabilitySlot[]) => void;
  onAddClick: () => void;
}

export function ScheduleHeader({ slots, onSave, onAddClick }: ScheduleHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border">
      <div>
        <h3 className="text-base font-bold text-foreground">Weekly Clinical Availability</h3>
        <p className="text-xs text-muted-foreground">Manage your working days, consultation hours, and session durations</p>
      </div>

      <div className="flex items-center gap-3">
        {onSave && (
          <button
            onClick={() => onSave(slots)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Save Schedule
          </button>
        )}
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Availability Slot
        </button>
      </div>
    </div>
  );
}
