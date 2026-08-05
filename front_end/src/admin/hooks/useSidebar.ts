"use client";
// admin/hooks/useSidebar.ts
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../lib/icons";
import { useAuth } from "../context/AuthContext";
import type { SchemaListing } from "../api/admin";

export interface GroupDef {
  id: string;
  label: string;
  icon: React.ReactNode;
  matches: string[];
}

export const GROUPS: GroupDef[] = [
  {
    id: "branches",
    label: "Branches & Clinics",
    icon: Icon.building,
    matches: ["branchservice", "branch_service", "branchservices", "branch", "branches"],
  },
  {
    id: "services",
    label: "Departments & Services",
    icon: Icon.stethoscope,
    matches: ["department", "departments", "service", "services"],
  },
  {
    id: "doctors",
    label: "Doctors & Staff",
    icon: Icon.doctor,
    matches: ["doctoravailability", "doctor_availabilities", "doctoravailabilities", "doctor", "doctors", "slot", "slots"],
  },
  {
    id: "bookings",
    label: "Bookings & Patients",
    icon: Icon.calendar,
    matches: ["booking", "bookings", "appointment", "appointments", "patient", "patients", "user", "users"],
  },
  {
    id: "media",
    label: "Gallery & Reviews",
    icon: Icon.image,
    matches: ["branchgallery", "branchgalleries", "branch_gallery", "galleryitem", "galleryitems", "gallery", "testimonialitem", "testimonialitems", "testimonial", "testimonials"],
  },
];

export const getItemIcon = (name: string) => {
  const low = name.toLowerCase();
  if (low.includes("branchservice") || low.includes("branch_service")) return Icon.buildingService;
  if (low.includes("branch")) return Icon.building;
  if (low.includes("department")) return Icon.stethoscope;
  if (low.includes("service")) return Icon.service;
  if (low.includes("availabil") || low.includes("slot") || low.includes("schedule")) return Icon.clock;
  if (low.includes("doctor")) return Icon.doctor;
  if (low.includes("booking") || low.includes("appointment")) return Icon.calendar;
  if (low.includes("gallery") || low.includes("photo") || low.includes("image")) return Icon.image;
  if (low.includes("testimonial") || low.includes("review")) return Icon.star;
  if (low.includes("user") || low.includes("patient") || low.includes("profile")) return Icon.user;
  if (low.includes("file")) return Icon.file;
  return Icon.folder;
};

interface UseSidebarProps {
  schemas?: SchemaListing[];
  currentModel?: string | null;
  onClose?: () => void;
}

export function useSidebar({ schemas, currentModel, onClose }: UseSidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Track expanded dropdown groups (Default ALL closed)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Auto-expand group containing current active model
  useEffect(() => {
    if (!currentModel) return;
    const curLow = currentModel.toLowerCase();
    const activeGrp = GROUPS.find((g) => g.matches.some((m) => curLow.includes(m) || m.includes(curLow)));
    if (activeGrp) {
      setOpenGroups((prev) => ({ ...prev, [activeGrp.id]: true }));
    }
  }, [currentModel]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const navigate = (to: string) => {
    router.push(to);
    if (onClose) onClose();
  };

  const isActive = (path: string) => pathname === path;

  // Group schemas into defined groups vs un-grouped schemas
  const schemaList = schemas || [];
  
  const groupedSchemas: Array<{
    group: GroupDef;
    items: SchemaListing[];
  }> = [];

  const assignedNames = new Set<string>();

  GROUPS.forEach((g) => {
    const items = schemaList.filter((s) => {
      const nameLow = s.name.toLowerCase();
      return g.matches.some((m) => nameLow === m || nameLow.includes(m) || m.includes(nameLow));
    });
    if (items.length > 0) {
      groupedSchemas.push({ group: g, items });
      items.forEach((it) => assignedNames.add(it.name.toLowerCase()));
    }
  });

  const unGroupedSchemas = schemaList.filter(
    (s) => !assignedNames.has(s.name.toLowerCase())
  );

  return {
    user,
    logout,
    openGroups,
    toggleGroup,
    groupedSchemas,
    unGroupedSchemas,
    navigate,
    isActive,
    getItemIcon,
  };
}
