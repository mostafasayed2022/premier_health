"use client";

import { useState } from "react";
import { useAppointments } from "@/lib/api/hooks";
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function PatientAppointments() {
  const { data: appointments, isLoading, isError, refetch } = useAppointments();
  const [filter, setFilter] = useState<"all" | "Upcoming" | "Confirmed" | "Completed">("all");

  const filteredAppointments = appointments?.filter((apt) => {
    if (filter === "all") return true;
    return apt.status.toLowerCase() === filter.toLowerCase();
  });

  const handleCancelAppointment = (id: string) => {
    toast.success(`Appointment ${id} request submitted for cancellation.`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Loading your consultations...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-sm font-semibold text-foreground mb-3">Unable to load appointments</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border">
        <div>
          <h3 className="text-base font-bold text-foreground">Consultations & Bookings</h3>
          <p className="text-xs text-muted-foreground">View and manage your upcoming and past medical visits</p>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border/50">
          {(["all", "Confirmed", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "all" ? "All Visits" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      {!filteredAppointments || filteredAppointments.length === 0 ? (
        <div className="p-12 text-center bg-card rounded-2xl border border-border">
          <Calendar className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <h4 className="text-base font-bold text-foreground mb-1">No Consultations Found</h4>
          <p className="text-xs text-muted-foreground">You do not have any appointments matching this status.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => {
            const isConfirmed = apt.status.toLowerCase() === "confirmed" || apt.status.toLowerCase() === "upcoming";
            const isCompleted = apt.status.toLowerCase() === "completed";

            return (
              <div
                key={apt.id}
                className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <User className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-base text-foreground">{apt.service}</h4>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          isConfirmed
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : isCompleted
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {isConfirmed ? <CheckCircle className="w-3 h-3" /> : isCompleted ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {apt.status}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-foreground/80">Doctor: {apt.doctor || "Dr. Elena Vance"}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{apt.branch}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground block">Fee</span>
                    <span className="text-sm font-bold text-foreground">${apt.amount}</span>
                  </div>

                  {isConfirmed && (
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="px-3.5 py-1.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Cancel Visit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
