"use client";

import { useState, useEffect } from "react";
import { AvailabilitySlot, DoctorProfileBooking } from "@/lib/types";
import { useAppointments } from "@/lib/api/hooks";
import { toast } from "sonner";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { ScheduleWeekdayCard } from "./components/ScheduleWeekdayCard";
import { AddSlotModal } from "./components/AddSlotModal";

interface DoctorScheduleManagerProps {
  initialSlots?: AvailabilitySlot[];
  bookings?: DoctorProfileBooking[];
  availableBranches?: Array<{ id: number; name: string; city?: string }>;
  onSave?: (slots: AvailabilitySlot[]) => void;
}

const DEFAULT_SLOTS: AvailabilitySlot[] = [
  { id: "slot-1", weekday: "Monday", startTime: "09:00", endTime: "17:00", slotDurationMinutes: 30, branchName: "Dubai Marina Flagship" },
  { id: "slot-2", weekday: "Tuesday", startTime: "10:00", endTime: "18:00", slotDurationMinutes: 30, branchName: "Dubai Marina Flagship" },
  { id: "slot-3", weekday: "Wednesday", startTime: "09:00", endTime: "17:00", slotDurationMinutes: 30, branchName: "Abu Dhabi Corniche Center" },
  { id: "slot-4", weekday: "Thursday", startTime: "09:00", endTime: "16:00", slotDurationMinutes: 30, branchName: "Dubai Marina Flagship" },
  { id: "slot-5", weekday: "Saturday", startTime: "11:00", endTime: "16:00", slotDurationMinutes: 45, branchName: "Dubai Marina Flagship" },
];

export function DoctorScheduleManager({ initialSlots, bookings, availableBranches, onSave }: DoctorScheduleManagerProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(
    initialSlots !== undefined ? initialSlots : DEFAULT_SLOTS
  );
  const { data: rawAppointments } = useAppointments();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (initialSlots !== undefined) {
      setSlots(initialSlots);
    }
  }, [initialSlots]);

  const [weekday, setWeekday] = useState<AvailabilitySlot["weekday"]>("Monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState("30");
  const [branchName, setBranchName] = useState(availableBranches?.[0]?.name || "Dubai Marina Flagship");
  const [branchId, setBranchId] = useState<number | undefined>(availableBranches?.[0]?.id);

  const handleDeleteSlot = (id: string) => {
    const updated = slots.filter((s) => s.id !== id);
    setSlots(updated);
    if (onSave) {
      onSave(updated);
    } else {
      toast.success("Schedule slot removed.");
    }
  };

  const handleAddSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (startTime >= endTime) {
      toast.error("Start time must be earlier than end time.");
      return;
    }

    // Overlap conflict detection check
    const hasConflict = slots.some(
      (s) =>
        s.weekday === weekday &&
        ((startTime >= s.startTime && startTime < s.endTime) ||
          (endTime > s.startTime && endTime <= s.endTime) ||
          (startTime <= s.startTime && endTime >= s.endTime))
    );

    if (hasConflict) {
      toast.error(`Conflict detected! You already have an overlapping slot on ${weekday}.`);
      return;
    }

    const selectedBranchName =
      branchName || (availableBranches?.[0]?.name ?? "Dubai Marina Flagship");
    const selectedBranchId = branchId
      ? String(branchId)
      : availableBranches?.[0]?.id
        ? String(availableBranches[0].id)
        : undefined;

    const newSlot: AvailabilitySlot = {
      id: `slot-${Date.now()}`,
      weekday,
      startTime,
      endTime,
      slotDurationMinutes: Number(duration),
      branchName: selectedBranchName,
      branchId: selectedBranchId,
    };

    const updated = [...slots, newSlot];
    setSlots(updated);
    setShowAddModal(false);
    if (onSave) {
      onSave(updated);
    } else {
      toast.success(`Availability slot added for ${weekday}!`);
    }
  };

  const weekdaysList: AvailabilitySlot["weekday"][] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-6">
      <ScheduleHeader slots={slots} onSave={onSave} onAddClick={() => setShowAddModal(true)} />

      {/* Weekday Accordion / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weekdaysList.map((day) => {
          const daySlots = slots.filter((s) => {
            if (!s.weekday) return false;
            return s.weekday.toLowerCase().slice(0, 3) === day.toLowerCase().slice(0, 3);
          });
          
          // Filter upcoming appointments for this weekday
          const upcomingApts = (rawAppointments || []).filter(apt => {
            if (!apt.date) return false;
            const aptDate = new Date(apt.date);
            const aptWeekday = aptDate.toLocaleDateString("en-US", { weekday: "long" });
            const isUpcoming = aptDate >= new Date(new Date().setHours(0,0,0,0));
            return aptWeekday === day && isUpcoming && (apt.status === "Confirmed" || apt.status === "Pending");
          });

          // Filter bookings that match this weekday timezone-safely
          const profileBookings = (bookings || []).filter((b) => {
            if (!b.date) return false;
            const [year, month, dayVal] = b.date.split("-").map(Number);
            const dateObj = new Date(year, month - 1, dayVal);
            const aptWeekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });
            return aptWeekday.toLowerCase() === day.toLowerCase();
          });

          return (
            <ScheduleWeekdayCard
              key={day}
              day={day}
              daySlots={daySlots}
              upcomingApts={upcomingApts}
              profileBookings={profileBookings}
              onDeleteSlot={handleDeleteSlot}
            />
          );
        })}
      </div>

      {showAddModal && (
        <AddSlotModal
          weekday={weekday}
          setWeekday={setWeekday}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          duration={duration}
          setDuration={setDuration}
          branchName={branchName}
          setBranchName={setBranchName}
          setBranchId={setBranchId}
          availableBranches={availableBranches}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSlotSubmit}
        />
      )}
    </div>
  );
}
