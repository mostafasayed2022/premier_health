"use client";

import React from "react";
import Image from "next/image";
import { Users, Star, MapPin, Stethoscope, Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SPECIALISTS = [
  { id: "1", name: "Dr. Elena Vance", specialty: "Aesthetic Dermatology", rating: 4.95, branch: "Dubai Marina", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300", status: "Available Today" },
  { id: "2", name: "Dr. Marcus Thorne", specialty: "Regenerative Medicine", rating: 4.90, branch: "Abu Dhabi Corniche", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300", status: "In Session" },
  { id: "3", name: "Dr. Sarah Paul", specialty: "IV Wellness Therapy", rating: 4.88, branch: "Dubai Marina", photo: "https://images.unsplash.com/photo-1594824813566-88855ce78c4c?auto=format&fit=crop&q=80&w=300", status: "Available Today" },
];

export default function SpecialistsDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Clinic Specialists</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Directory of lead physicians, dermatologists & clinical team.</p>
        </div>
        <Button size="sm" className="rounded-xl gap-1.5 text-xs self-start sm:self-auto">
          <Plus size={14} /> Add Specialist
        </Button>
      </div>

      {/* Grid of Specialists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SPECIALISTS.map((doc) => (
          <Card key={doc.id} className="border-none shadow-xs hover:shadow-md transition-all bg-white dark:bg-slate-900 p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <Image src={doc.photo} alt={doc.name} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{doc.name}</h3>
                <p className="text-xs text-primary font-semibold flex items-center gap-1">
                  <Stethoscope size={13} /> {doc.specialty}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={12} className="fill-amber-500" /> {doc.rating}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {doc.branch}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                {doc.status}
              </span>
              <Button variant="outline" size="sm" className="text-xs rounded-xl">Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
