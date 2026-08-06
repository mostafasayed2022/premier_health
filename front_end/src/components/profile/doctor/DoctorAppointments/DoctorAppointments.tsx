"use client";

import { useState } from "react";
import { useAppointments, useRescheduleBooking } from "@/lib/api/hooks";
import { DoctorProfileBooking, Appointment } from "@/lib/types";

import dynamic from "next/dynamic";
import { AppointmentsFilterBar, FilterType } from "./components/AppointmentsFilterBar";
import { AppointmentCard } from "./components/AppointmentCard";
import { AppointmentsEmptyState } from "./components/AppointmentsEmptyState";
import { AppointmentsLoadingState, AppointmentsErrorState } from "./components/AppointmentsStates";

const RescheduleModal = dynamic(() =>
  import("./components/RescheduleModal").then((m) => m.RescheduleModal)
);

const DEMO_BOOKINGS: Appointment[] = [
  {
    id: "apt-101",
    customerName: "Sarah Al-Mansoor",
    customerPhone: "+971501234567",
    department: "Dermatology",
    service: "Dermatology Consultation & Skin Analysis",
    date: "2026-07-30",
    time: "10:30 AM",
    endTime: "11:00 AM",
    branch: "Fairmont Nile City Branch",
    doctor: "Sarah Al-Mansoor (Patient)",
    amount: 150,
    status: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "apt-102",
    customerName: "Ahmed Mahmoud",
    customerPhone: "+971507654321",
    department: "Wellness",
    service: "HydraFacial Glow & Vitamin IV Drip",
    date: "2026-08-01",
    time: "02:00 PM",
    endTime: "02:45 PM",
    branch: "Zayed Medical Hub",
    doctor: "Ahmed Mahmoud (Patient)",
    amount: 280,
    status: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "apt-103",
    customerName: "Mariam Hassan",
    customerPhone: "+971509998887",
    department: "Dermatology",
    service: "Laser Skin Resurfacing",
    date: "2026-07-25",
    time: "11:00 AM",
    endTime: "11:30 AM",
    branch: "Fifth Settlement Clinic",
    doctor: "Mariam Hassan (Patient)",
    amount: 320,
    status: "Confirmed",
    paymentStatus: "Paid",
  },
];

export function DoctorAppointments() {
  const {
    data: rawAppointments,
    isLoading,
    isError,
    refetch,
  } = useAppointments();
  
  const [filter, setFilter] = useState<FilterType>("all");

  const [selectedBooking, setSelectedBooking] =
    useState<DoctorProfileBooking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleStartTime, setRescheduleStartTime] = useState("");
  const [rescheduleEndTime, setRescheduleEndTime] = useState("");
  
  const rescheduleMutation = useRescheduleBooking();

  const appointments =
    rawAppointments && rawAppointments.length > 0
      ? rawAppointments
      : DEMO_BOOKINGS;

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status.toLowerCase() === filter.toLowerCase();
  });

  const handleRescheduleClick = (apt: Appointment) => {
    setSelectedBooking({
      id: apt.id,
      patientName:
        (apt as any).customerName ||
        apt.doctor ||
        "Patient",
      patientPhone: (apt as any).customerPhone || "",
      serviceName: apt.service,
      branchName: apt.branch,
      date: apt.date,
      startTime: apt.time,
      endTime: apt.endTime || "",
      status: apt.status,
      fee: String(apt.amount),
      notes: "",
    });
    setRescheduleDate(apt.date);
    setRescheduleStartTime(apt.time.slice(0, 5));
    
    const parts = apt.time.split(":");
    let defaultEnd = "";
    if (apt.endTime) {
      defaultEnd = apt.endTime.slice(0, 5);
    } else if (parts.length >= 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const newM = (m + 30) % 60;
      const newH = h + Math.floor((m + 30) / 60);
      defaultEnd = `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
    } else {
      defaultEnd = "12:00";
    }
    setRescheduleEndTime(defaultEnd);
  };

  if (isLoading) {
    return <AppointmentsLoadingState />;
  }

  if (isError) {
    return <AppointmentsErrorState refetch={refetch} />;
  }

  return (
    <div className="space-y-6">
      <AppointmentsFilterBar filter={filter} setFilter={setFilter} />

      {!filteredAppointments || filteredAppointments.length === 0 ? (
        <AppointmentsEmptyState />
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <AppointmentCard 
              key={apt.id} 
              apt={apt} 
              onRescheduleClick={handleRescheduleClick} 
            />
          ))}
        </div>
      )}

      <RescheduleModal
        selectedBooking={selectedBooking}
        setSelectedBooking={setSelectedBooking}
        rescheduleDate={rescheduleDate}
        setRescheduleDate={setRescheduleDate}
        rescheduleStartTime={rescheduleStartTime}
        setRescheduleStartTime={setRescheduleStartTime}
        rescheduleEndTime={rescheduleEndTime}
        setRescheduleEndTime={setRescheduleEndTime}
        rescheduleMutation={rescheduleMutation}
        refetch={refetch}
      />
    </div>
  );
}
