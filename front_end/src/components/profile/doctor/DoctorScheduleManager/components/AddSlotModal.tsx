import { AvailabilitySlot } from "@/lib/types";

interface AddSlotModalProps {
  weekday: AvailabilitySlot["weekday"];
  setWeekday: (w: AvailabilitySlot["weekday"]) => void;
  startTime: string;
  setStartTime: (t: string) => void;
  endTime: string;
  setEndTime: (t: string) => void;
  duration: string;
  setDuration: (d: string) => void;
  branchName: string;
  setBranchName: (b: string) => void;
  setBranchId?: (id: number) => void;
  availableBranches?: Array<{ id: number; name: string; city?: string }>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const weekdaysList: AvailabilitySlot["weekday"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function AddSlotModal({
  weekday,
  setWeekday,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  duration,
  setDuration,
  branchName,
  setBranchName,
  setBranchId,
  availableBranches,
  onClose,
  onSubmit,
}: AddSlotModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-3xl border border-border p-6 shadow-md space-y-5 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Add Availability Slot</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1">
              Day of Week *
            </label>
            <select
              value={weekday}
              onChange={(e) => setWeekday(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
            >
              {weekdaysList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                End Time *
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Slot Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Branch Location *
              </label>
              {availableBranches && availableBranches.length > 0 ? (
                <select
                  value={branchName}
                  onChange={(e) => {
                    const name = e.target.value;
                    setBranchName(name);
                    const found = availableBranches.find((b) => b.name === name);
                    if (found && setBranchId) {
                      setBranchId(found.id);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
                >
                  {availableBranches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name} {b.city ? `(${b.city})` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md cursor-pointer"
            >
              Save Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
