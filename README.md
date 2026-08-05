# PremierCare Modified Files & Code Backup

This README contains a complete backup of all the configurations, source code, and assets that were modified, fixed, or created during the integration of the Next.js Frontend and Django Backend.

---

## Table of Contents
1. [Frontend: Environment Variables (`.env.local`)](#1-frontend-envlocal)
2. [Frontend: Types definitions (`src/lib/types.ts`)](#2-frontend-srclibtypests)
3. [Frontend: API Client (`src/lib/api.ts`)](#3-frontend-srclibapits)
4. [Frontend: Admin Shell Layout (`src/admin/components/AdminShell.tsx`)](#4-frontend-srcadmincomponentsadminshelltsx)
5. [Frontend: Admin Login Layout (`src/app/(admin)/admin/login/layout.tsx`)](#5-frontend-srcappadminadminloginlayouttsx)
6. [Frontend: Admin Login Page (`src/app/(admin)/admin/login/page.tsx`)](#6-frontend-srcappadminadminloginpagetsx)
7. [Backend: Django Main URLs (`premierhealthcare/urls.py`)](#7-backend-premierhealthcarepremierhealthcareurlspy)
8. [Backend: Django Client Views (`client/views.py`)](#8-backend-premierhealthcareclientviewspy)
9. [Backend: Django Wizard Serializers (`client/wizard_serializers.py`)](#9-backend-premierhealthcareclientwizard_serializerspy)
10. [Backend: Django Base Admin ViewSet (`core/viewsets.py`)](#10-backend-premierhealthcarecoreviewsetspy)
11. [Frontend: Mock Data Fallback (`src/lib/mockData.ts`)](#11-frontend-srclibmockdatats)

---

## 1. Frontend: `.env.local`
*Path:* `front_end/.env.local`
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000/api/
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## 2. Frontend: `src/lib/types.ts`
*Path:* `front_end/src/lib/types.ts`
```typescript
export interface Doctor {
  id: string;
  name: string;
  name_ar: string;
  specialty: string;
  specialty_ar: string;
  position: string;
  position_ar: string;
  languages: string[];
  languages_ar: string[];
  experience: number;
  gender: "Male" | "Female";
  branch: string;
  branch_ar: string;
  slug: string;
  bio: string;
  bio_ar: string;
  photo: string;
  certifications: string[];
  certifications_ar: string[];
  schedule: string[];
  rating: number;
  patients: number;
  education: string[];
  specializations: string[];
}

export interface Department {
  id: string;
  name: string;
  name_ar: string;
  slug: string;
  doctorsCount: number;
  description: string;
  description_ar: string;
  photo: string;
}

export interface Service {
  id: string;
  name: string;
  name_ar: string;
  slug: string;
  photo: string;
  price: number;
  description: string;
  description_ar: string;
  ingredients?: string;
  ingredients_ar?: string;
  category: string; // matches department slug
  benefits: string[];
  benefits_ar: string[];
  process: string[];
  process_ar: string[];
  faq: { q: string; q_ar: string; a: string; a_ar: string }[];
}

export interface Branch {
  id: string;
  name: string;
  name_ar: string;
  address: string;
  address_ar: string;
  phone: string;
  hours: string;
  hours_ar: string;
  mapEmbed: string;
  mapUrl: string;
  photo: string;
  country: string;
  services: string[];
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  department: string;
  service: string;
  branch: string;
  doctor: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Rescheduled" | "Cancelled";
  amount: number;
  paymentStatus: "Unpaid" | "Paid";
  paymentMethod?: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  customerName: string;
  amount: number;
  method: string;
  date: string;
  status: "Succeeded" | "Pending" | "Failed";
}

export interface WizardSlot {
  date: string;        // "YYYY-MM-DD"
  start_time: string;  // "HH:MM:SS"
  end_time: string;
}
```

---

## 3. Frontend: `src/lib/api.ts`
*Path:* `front_end/src/lib/api.ts`
```typescript
import axios from "axios";
import {
  Department,
  Doctor,
  Service,
  Branch,
  Appointment,
  Payment,
  WizardSlot,
} from "./types";
import * as MockData from "./mockData";

const {
  MOCK_DEPARTMENTS,
  MOCK_DOCTORS,
  MOCK_SERVICES,
  MOCK_BRANCHES,
  MOCK_APPOINTMENTS,
  MOCK_PAYMENTS,
} = MockData;

// Re-export everything so other files keep working with the same imports
export * from "./types";
export * from "./mockData";

// API Base URL - points to local Django server by default
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// ─── MERGE HELPERS ────────────────────────────────────────────────────────────

function mergeDept(d: any): Department {
  const m = MOCK_DEPARTMENTS.find(
    (x: { id: any; slug: any }) =>
      String(x.id) === String(d.id) ||
      x.slug === d.slug ||
      (d.slug && x.slug === d.slug) ||
      (String(d.id) === "1" && x.id === "dep1") ||
      (String(d.id) === "2" && x.id === "dep2") ||
      (String(d.id) === "3" && x.id === "dep3") ||
      (String(d.id) === "4" && x.id === "dep4")
  );
  return {
    ...m,
    ...d,
    id: String(d.id),
    name_ar: d.name_ar || m?.name_ar || d.name,
    description_ar: d.description_ar || m?.description_ar || d.description,
    photo:
      m?.photo ||
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
  } as Department;
}

function mergeSvc(s: any): Service {
  const m = MOCK_SERVICES.find(
    (x: { id: any; name: any; slug: any }) =>
      String(x.id) === String(s.id) ||
      x.slug === s.slug ||
      (s.slug && x.slug === s.slug) ||
      (s.name && x.name.toLowerCase().replace(/\s+/g, "") === s.name.toLowerCase().replace(/\s+/g, ""))
  );
  return {
    ...m,
    ...s,
    id: String(s.id),
    price: s.price ?? s.default_fee ?? m?.price ?? 150,
    name_ar: s.name_ar || m?.name_ar || s.name,
    description_ar: s.description_ar || m?.description_ar || s.description,
    photo:
      m?.photo ||
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600",
  } as Service;
}

function mergeBranch(b: any): Branch {
  const m = MOCK_BRANCHES.find(
    (x: { id: any; name: any }) =>
      String(x.id) === String(b.id) ||
      x.name === b.name ||
      (b.name && x.name.toLowerCase().replace(/\s+/g, "") === b.name.toLowerCase().replace(/\s+/g, "")) ||
      (String(b.id) === "1" && x.id === "br1") ||
      (String(b.id) === "2" && x.id === "br2") ||
      (String(b.id) === "3" && x.id === "br3") ||
      (String(b.id) === "4" && x.id === "br4")
  );
  return {
    ...m,
    ...b,
    id: String(b.id),
    name_ar: b.name_ar || m?.name_ar || b.name,
    address_ar: b.address_ar || m?.address_ar || b.address,
    photo:
      m?.photo ||
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  } as Branch;
}

function mergeDoc(d: any): Doctor {
  const m = MOCK_DOCTORS.find(
    (x: { id: any; name: any; slug: any }) =>
      String(x.id) === String(d.id) ||
      x.slug === d.slug ||
      (d.slug && x.slug === d.slug) ||
      (d.name && x.name.toLowerCase().replace(/\s+/g, "") === d.name.toLowerCase().replace(/\s+/g, "")) ||
      (String(d.id) === "1" && x.id === "doc1") ||
      (String(d.id) === "2" && x.id === "doc2") ||
      (String(d.id) === "3" && x.id === "doc3") ||
      (String(d.id) === "4" && x.id === "doc4")
  );
  return {
    ...m,
    ...d,
    id: String(d.id),
    name: d.name || m?.name || `Dr. ${d.id}`,
    name_ar: d.name_ar || m?.name_ar || d.name,
    specialty: d.specialization || d.specialty || m?.specialty || "",
    specialty_ar: d.specialty_ar || m?.specialty_ar || d.specialization || "",
    position: d.position || m?.position || "Medical Specialist",
    position_ar: d.position_ar || m?.position_ar || "أخصائي طبي",
    bio: d.bio || m?.bio || "",
    bio_ar: d.bio_ar || m?.bio_ar || d.bio || "",
    photo:
      d.photo ||
      m?.photo ||
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    effective_fee: d.effective_fee,
  } as Doctor;
}

// ─── EXPORTED API FUNCTIONS ───────────────────────────────────────────────────

/** Step 1: GET /api/wizard/departments/ */
export const getDepartments = async (): Promise<Department[]> => {
  try {
    const { data } = await api.get<any[]>("wizard/departments/");
    return data.map(mergeDept);
  } catch {
    return MOCK_DEPARTMENTS;
  }
};

/** Step 2: GET /api/wizard/departments/<id>/services/ */
export const getServices = async (
  categorySlugOrId?: string | number,
): Promise<Service[]> => {
  try {
    if (!categorySlugOrId) {
      const { data } = await api.get<any[]>("services/");
      return data.map(mergeSvc);
    }
    let deptId: string | number = categorySlugOrId;
    if (
      typeof categorySlugOrId === "string" &&
      isNaN(Number(categorySlugOrId))
    ) {
      const depts = await getDepartments();
      const found = depts.find((d) => d.slug === categorySlugOrId);
      if (!found)
        return MOCK_SERVICES.filter(
          (s: { category: string }) => s.category === String(categorySlugOrId),
        );
      deptId = found.id;
    }
    const { data } = await api.get<any[]>(
      `wizard/departments/${deptId}/services/`,
    );
    return data.map(mergeSvc);
  } catch {
    if (categorySlugOrId)
      return MOCK_SERVICES.filter(
        (s: { category: string }) => s.category === String(categorySlugOrId),
      );
    return MOCK_SERVICES;
  }
};

export const getServiceBySlug = async (
  slug: string,
): Promise<Service | undefined> => {
  try {
    const { data } = await api.get<any>(`services/${slug}/`);
    return mergeSvc(data);
  } catch {
    return MOCK_SERVICES.find((s: { slug: string }) => s.slug === slug);
  }
};

/** Step 3: GET /api/wizard/services/<id>/branches/ */
export const getBranches = async (
  serviceId?: string | number,
): Promise<Branch[]> => {
  try {
    if (serviceId) {
      const { data } = await api.get<any[]>(
        `wizard/services/${serviceId}/branches/`,
      );
      return data.map(mergeBranch);
    }
    const { data } = await api.get<any[]>("branches/");
    return data.map(mergeBranch);
  } catch {
    return MOCK_BRANCHES;
  }
};

/** Step 4: GET /api/wizard/branches/<id>/doctors/?service_id=<id> */
export const getDoctors = async (filters?: {
  branchId?: string | number;
  serviceId?: string | number;
  search?: string;
  department?: string;
  branch?: string;
}): Promise<Doctor[]> => {
  try {
    if (filters?.branchId) {
      const params: Record<string, any> = {};
      if (filters.serviceId) params.service_id = filters.serviceId;
      const { data } = await api.get<any[]>(
        `wizard/branches/${filters.branchId}/doctors/`,
        { params },
      );
      return data.map(mergeDoc);
    }
    const { data } = await api.get<any[]>("doctors/", { params: filters });
    return data.map(mergeDoc);
  } catch {
    let result = [...MOCK_DOCTORS];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialty.toLowerCase().includes(q),
      );
    }
    if (filters?.department) {
      const dep = filters.department.toLowerCase();
      result = result.filter((doc) => {
        const sp = doc.specialty.toLowerCase();
        if (dep === "iv-therapy")
          return sp.includes("iv") || sp.includes("wellness");
        if (dep === "dermatology") return sp.includes("derm");
        if (dep === "aesthetics") return sp.includes("aesthetic");
        if (dep === "body-contouring")
          return sp.includes("body") || sp.includes("sculpt");
        return false;
      });
    }
    if (filters?.branch) {
      const br = filters.branch.toLowerCase();
      result = result.filter((doc) => doc.branch.toLowerCase().includes(br));
    }
    return result;
  }
};

export const getDoctorBySlug = async (
  slug: string,
): Promise<Doctor | undefined> => {
  try {
    const { data } = await api.get<any>(`doctors/${slug}/`);
    return mergeDoc(data);
  } catch {
    return MOCK_DOCTORS.find((doc: { slug: string }) => doc.slug === slug);
  }
};

/** Step 5: GET /api/wizard/doctors/<id>/slots/?branch_id=<id>&date_from=...&date_to=... */
export const getAvailableSlots = async (params: {
  doctorId: string | number;
  branchId: string | number;
  dateFrom?: string;
  dateTo?: string;
}): Promise<WizardSlot[]> => {
  try {
    const { data } = await api.get<WizardSlot[]>(
      `wizard/doctors/${params.doctorId}/slots/`,
      {
        params: {
          branch_id: params.branchId,
          date_from: params.dateFrom,
          date_to: params.dateTo,
        },
      },
    );
    return data;
  } catch {
    return [];
  }
};

/** Final: POST /api/bookings/create/ (requires patient JWT) */
export const createBooking = async (payload: {
  doctor: number;
  service: number;
  branch: number;
  date: string;
  start_time: string;
  token: string;
}): Promise<{ booking: any; payment_url: string }> => {
  const { token, ...body } = payload;
  const { data } = await api.post("bookings/create/", body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// ─── Legacy wrappers ──────────────────────────────────────────────────────────

export const bookAppointment = async (
  appointmentData: Partial<Appointment>,
): Promise<Appointment> => {
  try {
    const { data } = await api.post<Appointment>(
      "appointments/",
      appointmentData,
    );
    return data;
  } catch {
    const appt: Appointment = {
      id: `ap-${Math.floor(100 + Math.random() * 900)}`,
      customerName: appointmentData.customerName || "Bespoke Guest",
      customerPhone: appointmentData.customerPhone || "",
      department: appointmentData.department || "",
      service: appointmentData.service || "",
      branch: appointmentData.branch || "",
      doctor: appointmentData.doctor || "",
      date: appointmentData.date || new Date().toISOString().split("T")[0],
      time: appointmentData.time || "10:00 AM",
      status: "Confirmed",
      amount: appointmentData.amount || 150,
      paymentStatus: appointmentData.paymentStatus || "Unpaid",
      paymentMethod: appointmentData.paymentMethod,
    };
    MOCK_APPOINTMENTS.push(appt);
    return appt;
  }
};

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const { data } = await api.get<Appointment[]>("appointments/");
    return data;
  } catch {
    return MOCK_APPOINTMENTS;
  }
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const { data } = await api.get<Payment[]>("payments/");
    return data;
  } catch {
    return MOCK_PAYMENTS;
  }
};
```

---

## 4. Frontend: `src/admin/components/AdminShell.tsx`
*Path:* `front_end/src/admin/components/AdminShell.tsx`
```tsx
"use client";
// admin/components/AdminShell.tsx
// Client-side shell: wraps pages with AuthProvider, handles auth redirect, shows Sidebar.
import React, { useState, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Sidebar } from "./Sidebar";
import { schemaApi } from "../api/admin";
import type { SchemaListing } from "../api/admin";
import { Icon } from "../lib/icons";
import { S } from "../lib/styles";
import "../styles/admin.css";

// ─── Inner shell (needs auth context) ─────────────────────────────────────
function InnerShell({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [schemas, setSchemas] = useState<SchemaListing[]>([]);

  // Load sidebar schema listing
  useEffect(() => {
    if (isAuthenticated) {
      schemaApi
        .listing()
        .then((s) => setSchemas(s))
        .catch(() => {});
    }
  }, [isAuthenticated]);

  // Auth redirect — send unauthenticated users to login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  // While login page is active, just render its children without the shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show spinner while verifying token
  if (isLoading) {
    return (
      <div className="admin-root" style={{ ...S.centerFlex, height: "100vh" }}>
        {Icon.spinner}
      </div>
    );
  }

  // Not authenticated yet → render nothing (redirect is in flight)
  if (!isAuthenticated) return null;

  // Determine current model from pathname
  const match = pathname.match(/^\/admin\/([^/]+)/);
  const currentModel = match ? match[1] : null;
  const isFilesPage = pathname === "/admin/files";

  return (
    <div className="admin-root" style={S.shell}>
      <Sidebar
        schemas={schemas}
        currentModel={isFilesPage ? null : currentModel}
      />
      <main style={S.mainContent}>{children}</main>
    </div>
  );
}

// ─── Public shell wrapper ─────────────────────────────────────────────────
export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <InnerShell>{children}</InnerShell>
    </AuthProvider>
  );
}
```

---

## 5. Frontend: `src/app/(admin)/admin/login/layout.tsx`
*Path:* `front_end/src/app/(admin)/admin/login/layout.tsx`
```tsx
// app/(admin)/admin/login/layout.tsx
// Login page has its own isolated layout — NO AdminShell here.
// AdminShell would trigger auth redirect and cause an infinite redirect loop.
import type { ReactNode } from "react";
import { AuthProvider } from "@/admin/context/AuthContext";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
```

---

## 6. Frontend: `src/app/(admin)/admin/login/page.tsx`
*Path:* `front_end/src/app/(admin)/admin/login/page.tsx`
```tsx
"use client";
// app/(admin)/admin/login/page.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/admin/context/AuthContext";
import { S } from "@/admin/lib/styles";
import { Icon } from "@/admin/lib/icons";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.username, form.password);
      router.replace("/admin");
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <div style={{ ...S.loginLogo, alignItems: "center" }}>
          <img
            src="/logo/logo1.jpg"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt="PremierCare"
          />
          <span style={S.logoText}>PREMIERCARE</span>
        </div>
        <p style={S.loginSub}>Luxury Concierge Management Console</p>
        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <label style={S.label}>Username</label>
          <input
            style={S.input}
            type="text"
            autoFocus
            placeholder="admin"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            required
          />
          <label style={S.label}>Password</label>
          <input
            style={S.input}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            required
          />
          {error && <div style={S.errorBanner}>{error}</div>}
          <button
            style={{ ...S.btn, ...S.btnPrimary, marginTop: 8 }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {Icon.spinner} Authenticating…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## 7. Backend: `premierhealthcare/urls.py`
*Path:* `front_end/premierhealthcare/premierhealthcare/urls.py`
```python
from premierhealthcare import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from client.views import AdminTokenObtainPairView, AdminTokenVerifyView, AdminLogoutView
from core.views import admin_index

from apps.schema.registry import registry
from rest_framework.routers import DefaultRouter
from rest_framework import serializers
from core.viewsets import AdminModelViewSet

# Dynamically generate DRF Serializers and ViewSets for all registered AdminSchema models
def get_dynamic_router():
    router = DefaultRouter()
    EXPLICIT_ROUTES = {"products", "categories", "users", "files"}
    
    # Ensure registry autodiscovery is triggered
    registry.autodiscover()
    
    for q_name, schema_class in list(registry.all().items()):
        model = schema_class.model
        endpoint = schema_class.endpoint
        if not endpoint:
            continue
        
        # Get standard route name: /api/departments/ -> departments
        route_name = endpoint.strip("/")
        if route_name.startswith("api/"):
            route_name = route_name[4:].strip("/")
            
        if route_name in EXPLICIT_ROUTES:
            continue
            
        # Create dynamic ModelSerializer
        serializer_class = type(
            f"Dynamic{model.__name__}Serializer",
            (serializers.ModelSerializer,),
            {
                "Meta": type("Meta", (object,), {"model": model, "fields": "__all__"})
            }
        )
        
        # Create dynamic AdminModelViewSet with admin-level JWT permissions
        viewset_class = type(
            f"Dynamic{model.__name__}ViewSet",
            (AdminModelViewSet,),
            {
                "queryset": model.objects.all(),
                "serializer_class": serializer_class,
                "search_fields": getattr(schema_class, "search_fields", []),
                "ordering": getattr(schema_class, "ordering", ["-id"]),
            }
        )
        
        router.register(route_name, viewset_class, basename=route_name)
    return router

dynamic_router = get_dynamic_router()

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/', include('client.urls')),

    # Auth
    path("api/auth/login/",   AdminTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/verify/",  AdminTokenVerifyView.as_view(),     name="token_verify"),
    path("api/auth/refresh/", TokenRefreshView.as_view(),         name="token_refresh"),
    path("api/auth/logout/",  AdminLogoutView.as_view(),          name="token_logout"),
    re_path(r'^admin/.*$', admin_index, name='admin_index'),
    
    # Resource APIs
    path("api/", include("apps.products.urls")),
    path("api/", include("apps.files.urls")),
    path("api/schema/", include("apps.schema.urls")),
    
    # Dynamic CRUD routes for registry-managed tables
    path("api/", include(dynamic_router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

---

## 8. Backend: `client/views.py`
*Path:* `front_end/premierhealthcare/client/views.py`
<details>
<summary>Click to view client/views.py code</summary>

```python
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import RoleTokenObtainPairSerializer, NotificationSerializer,BookingCreateSerializer, BookingSerializer,AdminTokenObtainPairSerializer, AdminUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.utils import timezone
from .models import Booking, Payment, BookingStatus, PaymentStatus, Doctor, Notification , CustomUser
from .permissions import IsPatient
from .services import PaymobService,NotificationService
from core.viewsets import AdminModelViewSet



# views.py — updated CreateBookingView

from .models import DoctorService, BranchService
# wizard_views.py
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone

from .models import Department, Service, Branch, Doctor, DoctorAvailability, Booking
from .wizard_serializers import (
    DepartmentSerializer, ServiceSerializer, BranchSerializer,
    DoctorPublicSerializer, AvailableSlotSerializer,
)


class DepartmentListView(APIView):
    """Step 1: GET /api/wizard/departments/"""
    permission_classes = [AllowAny]

    def get(self, request):
        departments = Department.objects.filter(is_active=True)
        return Response(DepartmentSerializer(departments, many=True).data)


class ServiceListView(APIView):
    """Step 2: GET /api/wizard/departments/<department_id>/services/"""
    permission_classes = [AllowAny]

    def get(self, request, department_id):
        services = Service.objects.filter(department_id=department_id, is_active=True)
        return Response(ServiceSerializer(services, many=True).data)


class BranchListView(APIView):
    """Step 3: GET /api/wizard/services/<service_id>/branches/"""
    permission_classes = [AllowAny]

    def get(self, request, service_id):
        branches = Branch.objects.filter(services__id=service_id, is_active=True).distinct()
        serializer = BranchSerializer(branches, many=True, context={"service_id": service_id})
        return Response(serializer.data)


class DoctorListView(APIView):
    """Step 4: GET /api/wizard/branches/<branch_id>/doctors/?service=<service_id>"""
    permission_classes = [AllowAny]

    def get(self, request, branch_id):
        service_id = request.query_params.get("service")
        if not service_id:
            return Response({"detail": "service query param is required."}, status=400)

        doctors = Doctor.objects.filter(
            branches__id=branch_id,
            services__id=service_id,
        ).distinct()
        serializer = DoctorPublicSerializer(
            doctors, many=True,
            context={"service_id": service_id, "branch_id": branch_id},
        )
        return Response(serializer.data)


class AvailableSlotsView(APIView):
    """
    Step 5: GET /api/wizard/doctors/<doctor_id>/slots/?branch=<branch_id>&date=YYYY-MM-DD

    Computes open slots for one day by taking the doctor's availability
    window at that branch and subtracting already-booked slots.
    """
    permission_classes = [AllowAny]

    def get(self, request, doctor_id):
        branch_id = request.query_params.get("branch")
        date_str = request.query_params.get("date")
        if not branch_id or not date_str:
            return Response({"detail": "branch and date query params are required."}, status=400)

        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({"detail": "date must be YYYY-MM-DD."}, status=400)

        weekday = date.weekday()
        availabilities = DoctorAvailability.objects.filter(
            doctor_id=doctor_id, branch_id=branch_id, weekday=weekday,
        )
        if not availabilities.exists():
            return Response([])

        booked = set(
            Booking.objects.filter(
                doctor_id=doctor_id, branch_id=branch_id, date=date,
                status__in=["pending_payment", "confirmed"],
            ).values_list("start_time", flat=True)
        )

        slots = []
        for avail in availabilities:
            cursor = datetime.combine(date, avail.start_time)
            end = datetime.combine(date, avail.end_time)
            step = timedelta(minutes=avail.slot_duration_minutes)
            while cursor + step <= end:
                if cursor.time() not in booked:
                    slots.append({
                        "date": date,
                        "start_time": cursor.time(),
                        "end_time": (cursor + step).time(),
                    })
                cursor += step

        return Response(AvailableSlotSerializer(slots, many=True).data)
class CreateBookingView(APIView):
    permission_classes = [IsAuthenticated, IsPatient]

    @transaction.atomic
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        doctor = serializer.validated_data['doctor']
        service = serializer.validated_data['service']
        branch = serializer.validated_data['branch']

        booking = serializer.save(
            patient=request.user.patient_profile,
            fee=self._resolve_fee(doctor, service, branch),
        )

        paymob = PaymobService()
        try:
            result = paymob.init_payment(booking, request.user)
        except Exception as e:
            booking.delete()
            return Response({"detail": f"Payment init failed: {str(e)}"},
                             status=status.HTTP_502_BAD_GATEWAY)

        Payment.objects.create(
            booking=booking,
            amount=booking.fee,
            paymob_order_id=result['order_id'],
            payment_token=result['payment_token'],
        )

        NotificationService.notify_booking_created(booking)

        return Response({
            "booking": BookingSerializer(booking).data,
            "payment_url": result['iframe_url'],
        }, status=status.HTTP_201_CREATED)

    def _resolve_fee(self, doctor: Doctor, service, branch):
        """
        Fee resolution priority: doctor-specific override > branch-specific
        override > service default. This mirrors the same priority the
        wizard's DoctorPublicSerializer.get_effective_fee() uses, so what
        the patient sees in Step 4 is exactly what they're charged.
        """
        ds = DoctorService.objects.filter(doctor=doctor, service=service).first()
        if ds and ds.fee_override is not None:
            return ds.fee_override
        bs = BranchService.objects.filter(branch=branch, service=service).first()
        if bs:
            return bs.effective_fee
        return service.default_fee

class PaymobWebhookView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        hmac_received = request.query_params.get("hmac")
        if not hmac_received:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        paymob = PaymobService()
        if not paymob.verify_hmac(request.data, hmac_received):
            return Response({"detail": "Invalid HMAC"}, status=status.HTTP_403_FORBIDDEN)

        obj = request.data.get("obj", request.data)
        merchant_order_id = obj.get("order", {}).get("merchant_order_id")
        success = obj.get("success")

        if not merchant_order_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        booking = get_object_or_404(
            Booking.objects.select_related("patient__user", "doctor__user"),
            id=merchant_order_id,
        )
        payment = get_object_or_404(Payment, booking=booking)
        payment.raw_webhook_payload = request.data
        payment.paymob_transaction_id = obj.get("id")

        if success:
            payment.status = PaymentStatus.PAID
            payment.paid_at = timezone.now()
            booking.status = BookingStatus.CONFIRMED
            payment.save()
            booking.save()
            NotificationService.notify_booking_confirmed(booking)
        else:
            payment.status = PaymentStatus.FAILED
            booking.status = BookingStatus.CANCELLED
            payment.save()
            booking.save()
            NotificationService.notify_booking_cancelled(booking, reason="Payment failed")

        return Response(status=status.HTTP_200_OK)


class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'patient':
            return Booking.objects.filter(patient=user.patient_profile).order_by('-date')
        elif user.role == 'doctor':
            return Booking.objects.filter(doctor=user.doctor_profile).order_by('-date')
        return Booking.objects.none()


class RoleTokenObtainPairView(TokenObtainPairView):
    serializer_class = RoleTokenObtainPairSerializer


# --- Notification endpoints ---

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Notification.objects.filter(recipient=self.request.user)
            .select_related("booking")
        )


class MarkNotificationReadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        # scoped to request.user to prevent IDOR — a user can't mark
        # someone else's notification as read by guessing a UUID
        updated = Notification.objects.filter(
            pk=pk, recipient=request.user
        ).update(is_read=True)
        if not updated:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)


class MarkAllNotificationsReadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        Notification.objects.filter(
            recipient=request.user, is_read=False
        ).update(is_read=True)
        return Response(status=status.HTTP_200_OK)
    


from rest_framework_simplejwt.views import TokenVerifyView

class AdminTokenVerifyView(TokenVerifyView):
    """Verify token validity. Returns 200 if valid, 401 if not."""
    permission_classes = [AllowAny]


class AdminLogoutView(APIView):
    """
    Blacklists the refresh token on logout.
    Requires: { "refresh": "<token>" } in body.
    """
    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AdminUserViewSet(AdminModelViewSet):
    """
    CRUD for admin user management.
    Only superusers can manage other users.
    """
    queryset = CustomUser.objects.filter(is_staff=True).order_by("-id")
    serializer_class = AdminUserSerializer
    search_fields = ["username", "email", "first_name", "last_name"]
    ordering_fields = ["id", "username"]

    def get_permissions(self):
        # Creating/deleting users requires superuser
        from rest_framework.permissions import IsAdminUser
        from core.permissions import IsSuperUser
        if self.action in ("create", "destroy"):
            return [IsSuperUser()]
        return [IsAdminUser()]    
```
</details>

---

## 9. Backend: `client/wizard_serializers.py`
*Path:* `front_end/premierhealthcare/client/wizard_serializers.py`
```python
from rest_framework import serializers
from .models import Department, Service, Branch, Doctor, DoctorAvailability, BranchService, DoctorService

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name", "slug", "description", "icon"]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "slug", "description", "duration_minutes", "default_fee"]

class BranchSerializer(serializers.ModelSerializer):
    effective_fee = serializers.SerializerMethodField()

    class Meta:
        model = Branch
        fields = ["id", "name", "address", "city", "phone", "latitude", "longitude", "effective_fee"]

    def get_effective_fee(self, obj):
        service_id = self.context.get("service_id")
        if not service_id:
            return None
        bs = BranchService.objects.filter(branch=obj, service_id=service_id).first()
        return bs.effective_fee if bs else None

class DoctorPublicSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.get_full_name", read_only=True)
    effective_fee = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = ["id", "name", "specialization", "bio", "effective_fee"]

    def get_effective_fee(self, obj):
        service_id = self.context.get("service_id")
        if not service_id:
            return None
        ds = DoctorService.objects.filter(doctor=obj, service_id=service_id).first()
        if ds and ds.fee_override is not None:
            return ds.fee_override
        branch_id = self.context.get("branch_id")
        if branch_id:
            bs = BranchService.objects.filter(branch_id=branch_id, service_id=service_id).first()
            if bs:
                return bs.effective_fee
        return None

class AvailableSlotSerializer(serializers.Serializer):
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
```

---

## 10. Backend: `core/viewsets.py`
*Path:* `front_end/premierhealthcare/core/viewsets.py`
```python
"""
Base ViewSet that all admin resource ViewSets inherit from.

Provides:
- JWT authentication enforcement
- IsAdminUser permission
- Standardized error responses
- Audit logging hooks (pre/post save)
"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

logger = logging.getLogger(__name__)


class AdminModelViewSet(viewsets.ModelViewSet):
    """
    Drop-in replacement for ModelViewSet with admin-level auth enforced.
    All resource viewsets inherit from this.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    # Subclasses set this to enable per-model search fields
    search_fields: list[str] = []
    ordering_fields: list[str] = ["id"]
    ordering = ["-id"]

    def update(self, request, *args, **kwargs):
        logger.info(f"PATCH data: {request.data}")

        response = super().update(request, *args, **kwargs)
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            logger.error(f"Validation errors: {response.data}")
        return response
    
    def perform_create(self, serializer):
        instance = serializer.save()
        logger.info(
            "ADMIN_CREATE | model=%s | id=%s | user=%s",
            instance.__class__.__name__,
            instance.pk,
            self.request.user.username,
        )

    def perform_update(self, serializer):
        instance = serializer.save()
        logger.info(
            "ADMIN_UPDATE | model=%s | id=%s | user=%s",
            instance.__class__.__name__,
            instance.pk,
            self.request.user.username,
        )

    def perform_destroy(self, instance):
        logger.info(
            "ADMIN_DELETE | model=%s | id=%s | user=%s",
            instance.__class__.__name__,
            instance.pk,
            self.request.user.username,
        )
        instance.delete()

    def handle_exception(self, exc):
        response = super().handle_exception(exc)
        # Normalize all error bodies to {"error": "...", "detail": ...}
        if response is not None and not isinstance(response.data, dict):
            response.data = {"error": str(response.data)}
        return response
```

---

## 11. Frontend: `src/lib/mockData.ts`
*Path:* `front_end/src/lib/mockData.ts`
<details>
<summary>Click to view src/lib/mockData.ts code (Over 1200 lines)</summary>

```typescript
import { Department, Doctor, Service, Branch, Appointment, Payment } from "./types";

// MOCK DATASETS (Fallback if Django API is offline)
export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: "dep1",
    name: "IV Drip Therapy",
    name_ar: "العلاج بالتقطير الوريدي",
    slug: "iv-therapy",
    doctorsCount: 3,
    description:
      "Rejuvenating vitamin and nutrient infusions delivered directly to your bloodstream for maximum absorption.",
    description_ar:
      "تسريب الفيتامينات والمغذيات مباشرة في مجرى الدم لضمان أقصى درجات الامتصاص والاستفادة.",
    photo: "/Departments/iv_theapy.webp",
  },
  {
    id: "dep2",
    name: "Dermatology",
    name_ar: "الأمراض الجلدية",
    slug: "dermatology",
    doctorsCount: 2,
    description:
      "Expert diagnostic care for skin conditions, anti-aging therapies, and medical dermatology solutions.",
    description_ar:
      "رعاية تشخيصية متخصصة للأمراض الجلدية وعلاجات مكافحة الشيخوخة والحلول الطبية المتكاملة.",
    photo: "/Departments/dermatology.webp",
  },
  {
    id: "dep3",
    name: "Aesthetics",
    name_ar: "الطب التجميلي",
    slug: "aesthetics",
    doctorsCount: 2,
    description:
      "Non-surgical clinical aesthetic enhancements, premium fillers, wrinkle reduction, and volume restoration.",
    description_ar:
      "تحسينات تجميلية سريرية غير جراحية، فيلر ممتاز، تقليل التجاعيد واستعادة حيوية البشرة.",
    photo: "/Departments/Aesthetics.webp",
  },
  {
    id: "dep4",
    name: "Body Contouring",
    name_ar: "نحت وتنسيق القوام",
    slug: "body-contouring",
    doctorsCount: 1,
    description:
      "State-of-the-art body sculpting, localized fat reduction, and advanced tissue tightening protocols.",
    description_ar:
      "أحدث تقنيات نحت الجسم، تقليل الدهون الموضعية، وبروتوكولات شد الترهلات المتطورة.",
    photo: "/Departments/body_medical.webp",
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Ahmed Refaat",
    name_ar: "د. أحمد رفعت",
    specialty: "Dermatology & Aesthetics",
    specialty_ar: "الأمراض الجلدية والتجميل",
    position: "Senior Medical Consultant",
    position_ar: "استشاري أول الطب الجلدي",
    languages: ["English", "Arabic"],
    languages_ar: ["الإنجليزية", "العربية"],
    experience: 16,
    gender: "Male",
    branch: "Fairmont Nile City",
    branch_ar: "فيرمونت نايل سيتي",
    slug: "dr-ahmed-refaat",
    bio: "Dr. Ahmed Refaat is a board-certified dermatologist with over 16 years of clinical experience specializing in advanced fractional laser therapies, clinical skincare, and biological skin stimulators.",
    bio_ar:
      "الدكتور أحمد رفعت هو استشاري جلدية وتجميل حاصل على البورد مع أكثر من 16 عاماً من الخبرة في العلاج بالليزر التجميلي والمحفزات الحيوية للبشرة.",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    certifications: [
      "MD in Clinical Dermatology",
      "European Board of Dermatology",
      "Laser Specialist Certification",
    ],
    certifications_ar: [
      "دكتوراه الجلدية السريرية",
      "البورد الأوروبي للأمراض الجلدية",
      "شهادة متخصص العلاج بالليزر",
    ],
    schedule: [
      "Monday: 10:00 AM - 04:00 PM",
      "Wednesday: 02:00 PM - 08:00 PM",
      "Saturday: 12:00 PM - 06:00 PM",
    ],
    rating: 4.9,
    patients: 2400,
    education: [
      "MD, Faculty of Medicine, Cairo University",
      "Fellowship in Dermatology, London (2012)",
      "European Board of Dermatology — Berlin (2014)",
    ],
    specializations: [
      "Fractional CO2 Laser Resurfacing",
      "Biostimulator Injections (Sculptra, Radiesse)",
      "Medical-grade Chemical Peels",
      "HydraFacial & Skin Boosters",
    ],
  },
  {
    id: "doc2",
    name: "Dr. Layla Kamel",
    name_ar: "د. ليلى كامل",
    specialty: "Aesthetics & Derma",
    specialty_ar: "التجميل والجلدية",
    position: "Aesthetic Specialist",
    position_ar: "أخصائية الطب التجميلي",
    languages: ["English", "Arabic", "French"],
    languages_ar: ["الإنجليزية", "العربية", "الفرنسية"],
    experience: 11,
    gender: "Female",
    branch: "EDNC Sodic",
    branch_ar: "سوديك EDNC",
    slug: "dr-layla-kamel",
    bio: "Dr. Layla is renowned for her artistic touch in aesthetic medicine. She specializes in full-face liquid lifts, Botox contouring, advanced fillers, and facial thread treatments.",
    bio_ar:
      "تشتهر الدكتورة ليلى بلمستها الفنية في الطب التجميلي. وهي متخصصة في شد الوجه غير الجراحي، كونتور البوتوكس، والفيلر المتطور.",
    photo:
      "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600",
    certifications: [
      "MSc in Aesthetic Medicine (London)",
      "American Academy of Aesthetic Medicine",
      "Thread Lifting Expert Certification",
    ],
    certifications_ar: [
      "ماجستير الطب التجميلي (لندن)",
      "عضوية الأكاديمية الأمريكية لطب التجميل",
      "شهادة خبير شد الوجه بالخيوط",
    ],
    schedule: [
      "Sunday: 11:00 AM - 05:00 PM",
      "Tuesday: 01:00 PM - 07:00 PM",
      "Thursday: 10:00 AM - 04:00 PM",
    ],
    rating: 5.0,
    patients: 1800,
    education: [
      "MBBCh, Faculty of Medicine, Ain Shams University",
      "MSc Aesthetic Medicine, Royal College London (2017)",
      "AAAM Fellowship — Los Angeles (2019)",
    ],
    specializations: [
      "Full-face Liquid Facelift",
      "Botox Contouring & Slimming",
      "Advanced Dermal Fillers (Juvederm, Restylane)",
      "PDO Thread Lifting",
    ],
  },
  {
    id: "doc3",
    name: "Dr. Marcus Vance",
    name_ar: "د. ماركوس فانس",
    specialty: "IV Therapy & Wellness",
    specialty_ar: "العلاج الوريدي والصحة العامة",
    position: "Clinical Director of Nutrition",
    position_ar: "المدير الطبي لقسم التغذية والوريد",
    languages: ["English", "German"],
    languages_ar: ["الإنجليزية", "الألمانية"],
    experience: 19,
    gender: "Male",
    branch: "Arkan Plaza",
    branch_ar: "أركان بلازا",
    slug: "dr-marcus-vance",
    bio: "Dr. Marcus Vance is an international authority on cellular rejuvenation and molecular nutrition, developing bespoke IV formulations such as NAD+ and anti-oxidant therapies.",
    bio_ar:
      "الدكتور ماركوس فانس هو خبير دولي في تجديد الخلايا والتغذية الجزيئية، ومبتكر لبروتوكولات التقطير الوريدي المتقدمة مثل NAD+ ومضادات الأكسدة.",
    photo:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    certifications: [
      "Board in Anti-Aging Medicine",
      "MD in Clinical Wellness & Nutrition",
      "International IV Therapy Association",
    ],
    certifications_ar: [
      "البورد في طب مكافحة الشيخوخة",
      "دكتوراه التغذية والصحة السريرية",
      "الجمعية الدولية لعلاجات التقطير الوريدي",
    ],
    schedule: [
      "Monday: 09:00 AM - 03:00 PM",
      "Thursday: 03:00 PM - 09:00 PM",
      "Saturday: 10:00 AM - 04:00 PM",
    ],
    rating: 4.8,
    patients: 3200,
    education: [
      "MD, University of Munich, Germany",
      "Fellowship, Anti-Aging & Regenerative Medicine (2009)",
      "IV Therapy Certification, World Health Academy (2015)",
    ],
    specializations: [
      "NAD+ & Cellular Rejuvenation Protocols",
      "Bespoke IV Nutrition Formulations",
      "Immunology & Functional Medicine",
      "Myers Cocktail & Micronutrient Therapy",
    ],
  },
  {
    id: "doc4",
    name: "Dr. Yasmin Zayed",
    name_ar: "د. ياسمين زايد",
    specialty: "Body Contouring & Slimming",
    specialty_ar: "تنسيق القوام والتخسيس",
    position: "Lead Sculpting Specialist",
    position_ar: "أخصائية نحت القوام وتنسيق الجسم",
    languages: ["English", "Arabic", "Spanish"],
    languages_ar: ["الإنجليزية", "العربية", "الإسبانية"],
    experience: 9,
    gender: "Female",
    branch: "Fairmont Nile City",
    branch_ar: "فيرمونت نايل سيتي",
    slug: "dr-yasmin-zayed",
    bio: "Dr. Yasmin Zayed is specialized in non-surgical lipolysis, cryolipolysis, HIFU, and focused ultrasound treatments designed to achieve structured skin-tightening and contouring.",
    bio_ar:
      "الدكتورة ياسمين زايد متخصصة في نحت الجسم غير الجراحي، إذابة الدهون بالتجميد، الهايفو، والموجات فوق الصوتية المركزة لشد الجلد.",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    certifications: [
      "BSc in Physical Therapy & Contouring",
      "Board of Aesthetic Body Sculpting",
      "HIFU Advanced Practitioner Diploma",
    ],
    certifications_ar: [
      "بكالوريوس العلاج الطبيعي وتنسيق القوام",
      "البورد الأمريكي لنحت الجسم التجميلي",
      "دبلوم ممارس الهايفو المتقدم",
    ],
    schedule: [
      "Sunday: 12:00 PM - 06:00 PM",
      "Tuesday: 10:00 AM - 04:00 PM",
      "Friday: 02:00 PM - 08:00 PM",
    ],
    rating: 4.7,
    patients: 1200,
    education: [
      "BSc Physical Therapy, Cairo University",
      "Board of Aesthetic Body Sculpting — Dubai (2021)",
      "HIFU Advanced Practitioner Diploma — UK (2022)",
    ],
    specializations: [
      "Non-surgical Body Sculpting (Cryolipolysis)",
      "HIFU Skin Tightening",
      "RF Body Contouring",
      "Lymphatic Drainage & Post-op Care",
    ],
  },
];

export const MOCK_SERVICES: Service[] = [
  // IV Therapy (14 items as requested)
  {
    id: "iv-nad",
    name: "NAD+ Cell Rejuvenation Drip",
    name_ar: "تقطير NAD+ لتجديد الخلايا",
    slug: "nad-drip",
    photo: "/Treatments/nad.webp",
    price: 450,
    description:
      "NAD+ IV Therapy directly delivers Nicotinamide Adenine Dinucleotide to rejuvenate cells, boost cellular energy, and improve cognitive function.",
    description_ar:
      "يعمل محلول NAD+ على إيصال أنزيم نيكوتيناميد أدينين ثنائي النيوكليوتيد مباشرة لتجديد خلايا الجسم وتعزيز طاقة الدماغ ووظائف الإدراك.",
    ingredients: "NAD+ Enzyme, Hydrating Normal Saline base",
    ingredients_ar: "إنزيم NAD+، قاعدة محلول ملحي مرطب طبيعي",
    category: "iv-therapy",
    benefits: [
      "Rejuvenates cells",
      "Boosts brain function",
      "Supports anti-aging",
      "Increases energy levels",
    ],
    benefits_ar: [
      "تجديد الخلايا التالفة",
      "تحسين وظائف الدماغ والتركيز",
      "دعم مكافحة الشيخوخة",
      "زيادة مستويات الطاقة",
    ],
    process: [
      "Doctor consultation & vital check",
      "Administering IV line in luxury lounge (90-120 mins)",
      "Post-drip hydration check",
    ],
    process_ar: [
      "استشارة الطبيب وفحص العلامات الحيوية",
      "بدء التقطير الوريدي في استراحة النخبة (90-120 دقيقة)",
      "فحص الترطيب بعد الجلسة",
    ],
    faq: [
      {
        q: "How often should I get NAD+?",
        q_ar: "كم مرة يجب أن أحصل على NAD+؟",
        a: "For optimal anti-aging, a loading protocol of 3-4 drips in 2 weeks is recommended, followed by monthly maintenance.",
        a_ar: "لتحقيق أفضل نتائج مكافحة الشيخوخة، يوصى ببروتوكول مكثف من 3-4 جلسات خلال أسبوعين، تليها جلسة صيانة شهرية.",
      },
    ],
  },
  {
    id: "iv-myers",
    name: "Myers Cocktail Drip",
    name_ar: "حقنة كوكتيل مايرز الوريدية",
    slug: "myers-cocktail",
    price: 250,
    photo: "/Treatments/myers.webp",
    description:
      "A revitalizing blend of essential vitamins and minerals designed to boost energy, restore cellular hydration, and speed recovery.",
    description_ar:
      "مزيج من الفيتامينات والمعادن الأساسية المصممة لزيادة الطاقة، استعادة ترطيب الخلايا وتسريع الشفاء.",
    ingredients: "Vitamin C, Magnesium, B-Complex, Calcium",
    ingredients_ar: "فيتامين سي، مغنيسيوم، مركب فيتامين ب، كالسيوم",
    category: "iv-therapy",
    benefits: [
      "Improves immune health",
      "Reduces chronic fatigue",
      "Restores hydration",
      "Restores vitality",
    ],
    benefits_ar: [
      "تحسين الصحة المناعية",
      "تقليل التعب المزمن",
      "استعادة الترطيب المثالي",
      "استعادة الحيوية والنشاط",
    ],
    process: [
      "Vital signs assessment",
      "Infusion in executive lounge (45 mins)",
      "Aftercare guidelines summary",
    ],
    process_ar: [
      "تقييم العلامات الحيوية",
      "جلسة التسريب في صالون النخبة (45 دقيقة)",
      "ملخص نصائح الرعاية اللاحقة",
    ],
    faq: [
      {
        q: "What is Myers Cocktail?",
        q_ar: "ما هو كوكتيل مايرز؟",
        a: "It is the gold standard of IV wellness drips, used since the 1960s to treat fatigue and immune issues.",
        a_ar: "هو المعيار الذهبي لمحاليل العافية الوريدية، ويستخدم منذ الستينيات لعلاج الإجهاد والمشاكل المناعية.",
      },
    ],
  },
  {
    id: "iv-bariatric",
    name: "Bariatric Optimization Drip",
    name_ar: "محلول دعم عمليات التكميم والتحوير",
    slug: "bariatric-drip",
    price: 300,
    photo: "/Treatments/Bariatric.webp",

    description:
      "Highly absorbed nutrient cocktail formulated for recovery and metabolic health after gastric sleeve or gastric bypass operations.",
    description_ar:
      "كوكتيل مغذيات سريع الامتصاص مصمم خصيصاً للتعافي والصحة الأيضية بعد عمليات تكميم أو تحويل مسار المعدة.",
    ingredients: "Vitamin B12, Folate, Iron, Zinc, Multi-vitamins",
    ingredients_ar: "فيتامين ب12، فولات، حديد، زنك، فيتامينات متعددة",
    category: "iv-therapy",
    benefits: [
      "Addresses nutrient deficiencies",
      "Boosts metabolism",
      "Maintains energy levels",
      "Protects hair and nails",
    ],
    benefits_ar: [
      "يعالج النقص الغذائي الحاد",
      "يعزز عملية التمثيل الغذائي",
      "يحافظ على مستويات الطاقة",
      "يحمي الشعر والأظافر من التساقط",
    ],
    process: [
      "Blood work review (if available)",
      "Infusion under specialist supervision (60 mins)",
    ],
    process_ar: [
      "مراجعة تحاليل الدم (إن وجدت)",
      "جلسة التسريب تحت إشراف الأخصائي (60 دقيقة)",
    ],
    faq: [
      {
        q: "Why do bariatric patients need this?",
        q_ar: "لماذا يحتاج مرضى جراحات السمنة لهذا المحلول؟",
        a: "Bypassing the digestive system prevents oral vitamins from fully absorbing. IV bypasses the stomach completely.",
        a_ar: "تجاوز الجهاز الهضمي يمنع الفيتامينات الفموية من الامتصاص الكامل. المحلول يغذي الدم مباشرة ويحميك من الهبوط.",
      },
    ],
  },
  {
    id: "iv-gluta",
    name: "Gluta Detox Drip",
    name_ar: "محلول الجلوتاثيون للتخلص من السموم",
    slug: "gluta-drip",
    price: 280,
    photo: "/Treatments/Detox.webp",

    description:
      "Detoxifies the body, boosts metabolism, and enhances skin clarity by reducing oxidative stress and toxins.",
    description_ar:
      "يخلص الجسم من السموم، يعزز الأيض، ويزيد نقاء البشرة عن طريق تقليل الإجهاد التأكسدي والسموم المتراكمة.",
    ingredients: "High-dose Glutathione, Vitamin C, Normal Saline",
    ingredients_ar: "جرعة عالية من الجلوتاثيون، فيتامين سي، محلول ملحي متوازن",
    category: "iv-therapy",
    benefits: [
      "Detoxifies liver and cells",
      "Increases skin clarity",
      "Enhances collagen synthesis",
    ],
    benefits_ar: [
      "تطهير الكبد والخلايا من السموم",
      "زيادة إشراق ونقاء البشرة",
      "تحفيز إنتاج الكولاجين الطبيعي",
    ],
    process: ["Hydration consultation", "Infusion session (45-60 mins)"],
    process_ar: ["استشارة الترطيب ونقاء البشرة", "جلسة التسريب (45-60 دقيقة)"],
    faq: [
      {
        q: "How many sessions are needed?",
        q_ar: "كم عدد الجلسات المطلوبة؟",
        a: "For skin whitening and liver detox, 5 to 10 sessions spaced weekly yield visible radiance.",
        a_ar: "للتفتيح وإزالة سموم الكبد، تعطي 5 إلى 10 جلسات أسبوعية نتائج واضحة وبشرة متوهجة.",
      },
    ],
  },
  {
    id: "iv-immunity",
    name: "Immunity Boost Drip",
    name_ar: "محلول تعزيز المناعة الفائق",
    slug: "immunity-boost-drip",
    price: 220,
    photo:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",

    description:
      "Strengthens the immune system, helping the body combat allergies, chronic stress, body aches, and viruses.",
    description_ar:
      "يقوي جهاز المناعة، ويساعد الجسم في مكافحة الحساسية، الإجهاد المزمن، آلام الجسم والالتهابات.",
    ingredients: "Vitamin C, Zinc, Selenium, Hydrating Fluids",
    ingredients_ar: "فيتامين سي بجرعة عالية، زنك، سيلينيوم، سوائل ترطيب",
    category: "iv-therapy",
    benefits: [
      "Strengthens defenses",
      "Reduces allergy symptoms",
      "Combats chronic exhaustion",
    ],
    benefits_ar: [
      "تقوية دفاعات الجسم الطبيعية",
      "تقليل أعراض الحساسية والموسمية",
      "مكافحة التعب والإجهاد المزمن",
    ],
    process: ["Doctor assessment", "IV administration (45 mins)"],
    process_ar: ["تقييم الطبيب العام", "إعطاء المحلول الوريدي (45 دقيقة)"],
    faq: [],
  },
  {
    id: "iv-ginkgo",
    name: "Ginkgo Biloba Brain Booster",
    name_ar: "محلول الجينكو بيلوبا لتنشيط الذاكرة",
    slug: "ginkgo-drip",
    price: 270,
    photo:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",

    description:
      "Improves cognitive function and memory. Increases blood flow making you feel energetic and focused.",
    description_ar:
      "يحسن الوظائف الإدراكية والذاكرة. يزيد تدفق الدم للدماغ مما يمنحك الطاقة والتركيز والنشاط اليومي.",
    ingredients: "Ginkgo Biloba extract, Vitamin B-Complex, Saline",
    ingredients_ar: "مستخلص الجينكو بيلوبا، مركب فيتامين ب، محلول ملحي",
    category: "iv-therapy",
    benefits: [
      "Enhances memory & concentration",
      "Improves physical stamina",
      "Increases microcirculation",
    ],
    benefits_ar: [
      "تعزيز الذاكرة والتركيز",
      "تحسين القدرة على التحمل البدني",
      "زيادة الدورة الدموية الدقيقة",
    ],
    process: ["Vitals check", "Slow infusion (60 mins)"],
    process_ar: ["فحص الضغط والنبض", "تسريب بطيء وهادئ (60 دقيقة)"],
    faq: [],
  },
  {
    id: "iv-hero",
    name: "Hero Premier Drip",
    name_ar: "محلول هيرو بريمير الفائق للرجال",
    slug: "hero-premier-drip",
    price: 500,
    photo:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",

    description:
      "A special drip designed for men acting as an energy and brain booster. Enhances endurance, concentration, and performance.",
    description_ar:
      "محلول خاص للرجال يعمل كمحفز للطاقة والذكاء. يعزز التحمل البدني، التركيز، والأداء العام.",
    ingredients:
      "Ginkgo Biloba, L-Arginine, Vitamin B-Complex, Zinc, Sodium Chloride Saline",
    ingredients_ar: "جينكو بيلوبا، إل-أرجينين، مركب فيتامين ب، زنك، محلول ملحي",
    category: "iv-therapy",
    benefits: [
      "Enhances physical endurance",
      "Improves brain focus",
      "Supports testosterone and zinc levels",
    ],
    benefits_ar: [
      "زيادة القدرة على التحمل البدني",
      "تحسين التركيز واليقظة الذهنية",
      "دعم مستويات الزنك والتستوستيرون",
    ],
    process: [
      "Private suite check-in",
      "Medical vital reading",
      "Infusion (75 mins)",
    ],
    process_ar: [
      "الدخول للجناح الخاص",
      "قراءة المؤشرات الحيوية الطبية",
      "بدء التسريب (75 دقيقة)",
    ],
    faq: [],
  },
  {
    id: "iv-recovery",
    name: "Recovery & Hydration Drip",
    name_ar: "محلول الاستشفاء والترطيب السريع",
    slug: "recovery-drip",
    price: 240,
    photo:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",

    description:
      "A vital blend to speed up recovery, rehydrate, and restore electrolytes after travel, illness, or intense fatigue.",
    description_ar:
      "مزيج حيوي لتسريع التعافي وإعادة الترطيب واستعادة الكهارل بعد السفر الطويل أو المرض أو الإجهاد الشديد.",
    ingredients: "Electrolytes, Vitamin C, B-Complex, Hydration fluids",
    ingredients_ar: "كهارل متوازنة، فيتامين سي، مركب فيتامين ب، سوائل ترطيب",
    category: "iv-therapy",
    benefits: [
      "Instant dehydration relief",
      "Combats travel fatigue",
      "Speeds recovery post-illness",
    ],
    benefits_ar: [
      "علاج فوري للجفاف والارهاق",
      "مكافحة تعب السفر واختلاف التوقيت",
      "تسريع الشفاء والتعافي بعد المرض",
    ],
    process: ["Assessment", "IV infusion (45 mins)"],
    process_ar: ["تقييم سريع", "التسريب الوريدي (45 دقيقة)"],
    faq: [],
  },
  {
    id: "iv-tokyo",
    name: "Tokyo Whitening & Anti-Aging Drip",
    name_ar: "محلول طوكيو للتفتيح ومحاربة التجاعيد",
    slug: "tokyo-drip",
    price: 350,
    photo:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",

    description:
      "Premium Japanese-inspired drip with high antioxidants for skin lightening, whitening, and amino acids to boost stamina.",
    description_ar:
      "محلول ياباني متميز يحتوي على مضادات أكسدة عالية لتفتيح البشرة ومحاربة الشيخوخة وأحماض أمينية لتعزيز الطاقة.",
    ingredients: "Glutathione, Vitamin C, B-Complex, L-Carnitine, Amino acids",
    ingredients_ar:
      "جلوتاثيون ياباني، فيタミン سي، ب-مركب، إل-كارنيتين، أحماض أمينية",
    category: "iv-therapy",
    benefits: [
      "Whitens and evens skin tone",
      "Increases metabolism",
      "Improves cellular repair",
    ],
    benefits_ar: [
      "تفتيح وتوحيد لون البشرة",
      "زيادة سرعة حرق الدهون والأيض",
      "تحسين إصلاح الخلايا الذاتي",
    ],
    process: ["Skin consult", "Infusion (60 mins)"],
    process_ar: ["استشارة البشرة والترطيب", "جلسة التسريب (60 دقيقة)"],
    faq: [],
  },
  {
    id: "iv-antistress",
    name: "Anti-Stress & Muscle Relax Drip",
    name_ar: "محلول الاسترخاء ومكافحة الإجهاد العصبي",
    slug: "anti-stress-drip",
    price: 260,
    photo:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",

    description:
      "A natural blend of vitamins and amino acids to calm nerves, relax tense muscles, and reduce anxiety levels.",
    description_ar:
      "مزيج طبيعي من الفيتامينات والأحماض الأمينية لتهدئة الأعصاب وإرخاء العضلات المتشنجة وتقليل مستويات التوتر.",
    ingredients: "Magnesium, Taurine, B-Complex, Vitamin C",
    ingredients_ar: "مغنيسيوم بجرعة مهدئة، تاورين، فيتامين ب مركب، فيتامين سي",
    category: "iv-therapy",
    benefits: [
      "Relaxes tense muscles",
      "Reduces anxiety & promotes deep sleep",
      "Calms the nervous system",
    ],
    benefits_ar: [
      "إرخاء العضلات المشدودة",
      "تقليل القلق والمساعدة على النوم العميق",
      "تهدئة الجهاز العصبي المتعب",
    ],
    process: ["Stress factor consult", "Therapeutic infusion (60 mins)"],
    process_ar: [
      "استشارة تحديد عوامل التوتر",
      "التسريب العلاجي المريح (60 دقيقة)",
    ],
    faq: [],
  },
  {
    id: "iv-selenium",
    name: "Selenium Thyroid Drip",
    name_ar: "محلول السيلينيوم لدعم الغدة والمناعة",
    slug: "selenium-drip",
    price: 210,
    photo:
      "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600",
    description:
      "Essential mineral drip to regulate metabolic processes, support thyroid gland function, and strengthen hair follicles.",
    description_ar:
      "محلول معدني أساسي لتنظيم عمليات التمثيل الغذائي ودعم وظيفة الغدة الدرقية وتقوية بصيلات الشعر من الجذور.",
    ingredients: "Selenium trace minerals, Sodium chloride saline",
    ingredients_ar: "معدن السيلينيوم النادر، محلول ملح الصوديوم المائي",
    category: "iv-therapy",
    benefits: [
      "Supports thyroid metabolic health",
      "Strengthens hair roots",
      "High antioxidant support",
    ],
    benefits_ar: [
      "دعم الصحة الأيضية للغدة الدرقية",
      "تقوية جذور وبصيلات الشعر",
      "مضاد أكسدة قوي جداً للخلايا",
    ],
    process: ["Assessment", "IV drip session (45 mins)"],
    process_ar: ["فحص سريع للعلامات", "جلسة التنقيط الوريدي (45 دقيقة)"],
    faq: [],
  },
  {
    id: "iv-skinwhite",
    name: "Skin Whitening Drip",
    name_ar: "محلول تبييض ونضارة البشرة",
    slug: "skin-whitening-drip",
    price: 320,
    photo:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600",
    description:
      "Contains a potent blend of antioxidants to lighten skin tone, fade dark spots, and reveal radiant, even-toned skin.",
    description_ar:
      "يحتوي على مزيج قوي من مضادات الأكسدة لتفتيح لون البشرة، إزالة البقع الداكنة وتوحيد لون البشرة.",
    ingredients:
      "High-concentration Glutathione, Collagen peptide booster, Vitamin C",
    ingredients_ar: "جلوتاثيون عالي التركيز، محفز ببتيد الكولاجين، فيتامين سي",
    category: "iv-therapy",
    benefits: [
      "Fades pigmentation & dark spots",
      "Evens out skin tone",
      "Restores youthful glow",
    ],
    benefits_ar: [
      "إخفاء التصبغات والبقع الداكنة",
      "توحيد لون خلايا البشرة بالكامل",
      "استعادة نضارة وتوهج الشباب",
    ],
    process: ["Tone assessment", "Infusion in private suite (60 mins)"],
    process_ar: [
      "تقييم درجة لون البشرة",
      "جلسة التسريب في جناح خاص (60 دقيقة)",
    ],
    faq: [],
  },
  {
    id: "iv-mega",
    name: "Mega Premier Drip",
    name_ar: "محلول ميجا بريمير الطبي الفائق",
    slug: "mega-premier-drip",
    price: 480,
    photo:
      "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=600",
    description:
      "Maximum strength multi-vitamin and mineral infusion. Restores complete hydration, strength, and immunity.",
    description_ar:
      "محلول الفيتامينات والمعادن بتركيزه الأقصى. يعيد الترطيب والقوة والنشاط الفائق للجسم بالكامل.",
    ingredients: "Double-dose Vitamins, Amino acids, Trace minerals, Magnesium",
    ingredients_ar: "فيتامينات مضاعفة، أحماض أمينية، معادن نادرة، مغنيسيوم",
    category: "iv-therapy",
    benefits: [
      "Maximum nutrient replenishment",
      "Combats chronic exhaustion",
      "Deep cellular recovery",
    ],
    benefits_ar: [
      "تعويض أقصى للمغذيات المفقودة",
      "مكافحة التعب المزمن والهبوط",
      "استشفاء خلوي عميق جداً",
    ],
    process: ["Specialist check", "Mega infusion session (90 mins)"],
    process_ar: ["فحص الأخصائي الدقيق", "جلسة التسريب الكبرى (90 دقيقة)"],
    faq: [],
  },
  {
    id: "iv-lpremier",
    name: "L-Premier Energy booster",
    name_ar: "محلول إل-بريمير لتعزيز الطاقة وحرق الدهون",
    slug: "l-premier-drip",
    price: 400,
    photo:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    description:
      "Energy booster drip designed for athletes and wellness clients. Promotes cellular energy and speeds muscle recovery.",
    description_ar:
      "محلول معزز للطاقة مصمم للرياضيين وعملاء الصحة النخبة. يحفز حرق الدهون وسرعة تعافي العضلات.",
    ingredients: "L-Arginine, L-Carnitine, Vitamin B-Complex, Saline",
    ingredients_ar: "إل-أرجينين، إل-كارنيتين، فيتامينات ب المركبة، محلول ملحي",
    category: "iv-therapy",
    benefits: [
      "Increases athletic endurance",
      "Speeds up muscle recovery",
      "Promotes fat metabolism",
    ],
    benefits_ar: [
      "زيادة قدرة التحمل الرياضي",
      "تسريع استشفاء العضلات بعد التمارين",
      "تعزيز حرق الدهون الخلوية",
    ],
    process: ["Fitness review", "Infusion session (60 mins)"],
    process_ar: ["مراجعة أهداف اللياقة", "جلسة التسريب (60 دقيقة)"],
    faq: [],
  },
  {
    id: "der-hydra",
    name: "Premium Hydrafacial",
    name_ar: "جلسة الهيدرافيشيل الممتازة للوجه",
    slug: "hydrafacial",
    price: 150,
    photo:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",

    description:
      "A non-invasive multi-step treatment that combines cleansing, exfoliation, extraction, hydration, and antioxidant protection.",
    description_ar:
      "علاج غير جراحي متعدد الخطوات يجمع بين التنظيف والتقشير والاستخلاص والترطيب والحماية بمضادات الأكسدة.",
    category: "dermatology",
    benefits: [
      "Deeply cleanses pores",
      "Improves skin texture",
      "Delivers instant hydration",
    ],
    benefits_ar: [
      "تنظيف عميق للمسامات",
      "تحسين ملمس ونعومة الجلد",
      "منح ترطيب فوري مذهل للبشرة",
    ],
    process: [
      "Cleanse & Peel",
      "Extract & Hydrate",
      "Fuse & Protect with serums",
    ],
    process_ar: [
      "التنظيف والتقشير اللطيف",
      "الاستخلاص والترطيب بالمسامات",
      "تغذية وحماية البشرة بالأمصال المغذية",
    ],
    faq: [],
  },
  {
    id: "der-carbon",
    name: "Carbon Laser Peel",
    name_ar: "جلسة التقشير الكربوني بالليزر",
    slug: "carbon-laser",
    price: 180,
    photo:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",

    description:
      "A revolutionary laser treatment that is highly beneficial for acne-prone skin, oily skin, and uneven skin tone.",
    description_ar:
      "علاج ثوري بالليزر مفيد جداً للبشرة المعرضة لحب الشباب، البشرة الدهنية، وتوحيد تباين لون الجلد.",
    category: "dermatology",
    benefits: [
      "Reduces pore size",
      "Cleanses oil and sebum",
      "Stimulates collagen production",
    ],
    benefits_ar: [
      "تقليل وتضييق المسام الواسعة",
      "تنظيف الدهون والزيوت الزائدة بالوجه",
      "تحفيز إنتاج كولاجين البشرة",
    ],
    process: [
      "Application of thin carbon lotion",
      "Laser pulses capture carbon particles and impurities",
      "Soothing cooling mask application",
    ],
    process_ar: [
      "وضع طبقة رقيقة من لوشن الكربون الأسود",
      "إطلاق نبضات الليزر للتخلص من الكربون والشوائب",
      "وضع قناع التبريد والترطيب المهدئ",
    ],
    faq: [],
  },
  {
    id: "der-filler",
    name: "Filler & Botox Enhancements",
    name_ar: "علاجات البوتوكس والفيلر الفاخرة",
    slug: "filler-botox",
    price: 350,
    photo:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",

    description:
      "Injectable fillers and wrinkle-relaxing Botox tailored to lift contours, smooth fine lines, and restore facial volume.",
    description_ar:
      "حقن الفيلر التجميلية والبوتوكس المرخي للعضلات والمصمم خصيصاً لرفع الملامح وتنعيم التجاعيد التعبيرية واستعادة حجم الوجه.",
    category: "aesthetics",
    benefits: [
      "Smoothes wrinkles",
      "Restores youthful facial volume",
      "Provides immediate contour lifting",
    ],
    benefits_ar: [
      "تنعيم خطوط وتجاعيد الوجه",
      "استعادة حجم ملامح الوجه الطبيعي",
      "توفير شد ورفع فوري للوجنتين والشفاه",
    ],
    process: [
      "Anatomic facial mapping",
      "Applying topical anesthetic",
      "Precision injection by consultant (20-30 mins)",
    ],
    process_ar: [
      "تحديد الملامح التشريحية للوجه",
      "وضع مخدر موضعي لطيف",
      "الحقن الدقيق بواسطة الطبيب الاستشاري (20-30 دقيقة)",
    ],
    faq: [],
  },
  {
    id: "der-booster",
    name: "Skin Boosters Treatment",
    name_ar: "إبر نضارة وترطيب البشرة (Skin Boosters)",
    slug: "skin-boosters",
    price: 290,
    photo:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",

    description:
      "Infuses the skin with high-concentration hyaluronic acid and essential nutrients to enhance moisture, glow, and elasticity.",
    description_ar:
      "حقن الوجه بحمض الهيالورونيك عالي التركيز والمغذيات الحيوية لتعزيز الرطوبة العميقة والنضارة والمرونة الطبيعية.",
    category: "aesthetics",
    benefits: [
      "Deep dermal hydration",
      "Enhances natural radiance",
      "Smoothes fine dry lines",
    ],
    benefits_ar: [
      "ترطيب عميق لطبقات الجلد الداخلية",
      "تعزيز الإشراق واللمعان الطبيعي",
      "تنعيم الخطوط الدقيقة الناتجة عن الجفاف",
    ],
    process: [
      "Skincare clean",
      "Micro-injections across target zones",
      "Calming gel massage",
    ],
    process_ar: [
      "تنظيف البشرة وتعقيمها",
      "حقن مجهري دقيق في المناطق المستهدفة",
      "تدليك لطيف بجل التبريد المهدئ",
    ],
    faq: [],
  },
  {
    id: "der-biostim",
    name: "Collagen Biostimulators",
    name_ar: "حقن محفزات الكولاجين الحيوية (Radiesse/Sculptra)",
    slug: "biostimulators",
    price: 600,
    photo:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600",

    description:
      "Injectable treatments using advanced Sculptra or Radiesse to trigger natural long-term collagen synthesis, restoring structural tightness.",
    description_ar:
      "حقن تجميلية متطورة باستخدام راديس أو سكلبترا لتحفيز إنتاج الكولاجين الذاتي طويل الأمد واستعادة شد وتماسك البشرة.",
    category: "aesthetics",
    benefits: [
      "Stimulates long-term collagen growth",
      "Rebuilds facial volume naturally",
      "Improves skin thickness and elasticity",
    ],
    benefits_ar: [
      "تحفيز نمو الكولاجين لسنوات طويلة",
      "إعادة بناء ملامح الوجه بشكل طبيعي تدريجي",
      "تحسين سماكة ومرونة الجلد المشدود",
    ],
    process: [
      "Volume assessment",
      "Mapping injection coordinates",
      "Injections (30 mins)",
    ],
    process_ar: [
      "تقييم الحجم وتحديد الترهلات",
      "رسم نقاط الحقن بدقة",
      "إجراء حقن المحفزات (30 دقيقة)",
    ],
    faq: [],
  },
  {
    id: "der-fractional",
    name: "Fractional Laser Resurfacing",
    name_ar: "جلسة الفراكشنال ليزر لتجديد البشرة",
    slug: "fractional-laser",
    price: 250,
    photo:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600",

    description:
      "Advanced laser treatment that targets damaged skin cells, erasing acne scars, wrinkles, and sun spots.",
    description_ar:
      "علاج متطور بالليزر يستهدف خلايا البشرة التالفة، لإزالة آثار حب الشباب والتجاعيد وتصبغات الشمس.",
    category: "dermatology",
    benefits: [
      "Drastically reduces acne scars",
      "Smoothes deep wrinkles",
      "Evens skin pigmentations",
    ],
    benefits_ar: [
      "تقليل آثار وحفر حب الشباب بشكل كبير",
      "تنعيم التجاعيد العميقة بالوجه",
      "توحيد لون تصبغات الجلد",
    ],
    process: [
      "Anesthetic cream mask (30 mins)",
      "Laser scanner therapy (20 mins)",
      "Applying healing soothing cream",
    ],
    process_ar: [
      "وضع كريم مخدر موضعي (30 دقيقة)",
      "جلسة العلاج بالليزر (20 دقيقة)",
      "وضع كريم ترميم وترطيب طبي مهدئ",
    ],
    faq: [],
  },
  {
    id: "der-threads",
    name: "Luxury Thread Lift",
    name_ar: "جلسة شد الوجه والرقبة بالخيوط التجميلية",
    slug: "threads",
    price: 450,
    photo:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",

    description:
      "Minimally invasive lift using dissolvable polydioxanone (PDO) threads to reposition sagging tissue and define jawlines.",
    description_ar:
      "عملية شد غير جراحية بسيطة باستخدام خيوط البوليديوكسانون (PDO) القابلة للذوبان لشد الجلد المترهل وتحديد الفك.",
    category: "aesthetics",
    benefits: [
      "Immediate mechanical lifting effect",
      "Stimulates cellular collagen synthesis",
      "Redefines jawlines and cheeks",
    ],
    benefits_ar: [
      "تأثير شد ميكانيكي فوري واضح",
      "تحفيز خلايا البشرة لإنتاج الكولاجين",
      "تحديد خطوط الفك والخدين بشكل محدد",
    ],
    process: [
      "Disinfection & local anesthesia",
      "Threading sutures placement via cannula",
      "Post-treatment ice cooling and care plan",
    ],
    process_ar: [
      "التعقيم الكامل والتخدير الموضعي اللطيف",
      "وضع خيوط الشد عبر الكانيولا المخصصة",
      "التبريد بالثلج بعد العملية ووضع خطة الرعاية اللاحقة",
    ],
    faq: [],
  },
  {
    id: "der-hifu",
    name: "HIFU Non-Surgical Lift",
    name_ar: "جلسة الهايفو (HIFU) لشد الوجه والرقبة",
    slug: "hifu",
    photo:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
    price: 400,
    description:
      "High-Intensity Focused Ultrasound targeting deep structural skin layers to lift and tighten without incisions or downtime.",
    description_ar:
      "تقنية الموجات فوق الصوتية المركزة عالية الكثافة التي تستهدف طبقات الجلد العميقة لشدها ورفعها بدون أي جراحة أو فترة تعافي.",
    category: "body-contouring",
    benefits: [
      "Tightens deep muscle and skin structures",
      "Completely non-invasive with zero downtime",
      "Lifts cheeks, brows, and double chins",
    ],
    benefits_ar: [
      "شد عضلات الوجه العميقة والجلد بالكامل",
      "غير جراحي وآمن تماماً بدون تعطل عن العمل",
      "رفع الخدود والحواجب والتخلص من اللغد",
    ],
    process: [
      "Ultrasound gel application",
      "HIFU device passes emitting thermal waves",
      "Applying sunscreen and cooling serum",
    ],
    process_ar: [
      "وضع جل الموجات فوق الصوتية الخاص",
      "تمرير جهاز الهايفو لبث النبضات الحرارية العميقة",
      "وضع كريم الحماية من الشمس وسيروم التبريد",
    ],
    faq: [],
  },
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: "br1",
    name: "Fairmont Nile City",
    name_ar: "فيرمونت نايل سيتي",
    address: "Fairmont Nile City Hotel, Nile Corniche, Cairo, Egypt",
    address_ar: "فندق فيرمونت نايل سيتي، كورنيش النيل، القاهرة، مصر",
    phone: "+20 120 064 4663",
    hours: "09:00 AM - 09:00 PM (Daily)",
    hours_ar: "09:00 ص - 09:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1118122394747!2d31.226330076296766!3d30.062333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840e676101c51%3A0xc3f3b92cbfa9e7b!2sFairmont%20Nile%20City!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg",
    mapUrl: "https://www.google.com/maps/place/Premier+Health/@30.0723728,31.2267631,18z/data=!4m6!3m5!1s0x1458413b92031a19:0xe4dfaac55744481b!8m2!3d30.0719202!4d31.2275839!16s%2Fg%2F11fjy46mpx?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
    photo:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    country: "Egypt 🇪🇬",
    services: ["IV Therapy", "Dermatology", "Aesthetics", "Body Contouring"],
  },
  {
    id: "br2",
    name: "EDNC Sodic",
    name_ar: "سوديك EDNC",
    address: "EDNC Commercial Complex, Sodic Development, New Cairo, Egypt",
    address_ar: "مجمع EDNC التجاري، مشروع سوديك، القاهرة الجديدة، مصر",
    phone: "+20 120 064 4663",
    hours: "10:00 AM - 10:00 PM (Daily)",
    hours_ar: "10:00 ص - 10:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.1235122394747!2d31.486330076296766!3d30.023333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823126fefeb8b%3A0x6e9f16d1cd78df22!2sEDNC%20Sodic!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg",
    mapUrl: "https://google.com/maps?q=2G87+5RC+D+solutions,+Eastown,+New+Cairo+1,+Cairo+Government+4728114&ftid=0x1458230004fbc3e3:0x98b9fb5e4bf6a4f4&entry=gps&shh=CAE&lucs=,94297699,94275415,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI2LjAzLjEuODU1MjUwMDQwMBgAIIgnKkgsOTQyOTc2OTksOTQyNzU0MTUsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVH&skid=f7e4aece-800e-42dc-9b0c-031178891e80&g_st=ic",
    photo:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    country: "Egypt 🇪🇬",
    services: ["IV Therapy", "Aesthetics", "Dermatology"],
  },
  {
    id: "br3",
    name: "Arkan Plaza",
    name_ar: "أركان بلازا",
    address: "Building 4, Arkan Plaza, Sheikh Zayed City, Giza, Egypt",
    address_ar: "مبنى 4، أركان بلازا، مدينة الشيخ زايد، الجيزة، مصر",
    phone: "+20 120 064 4663",
    hours: "10:00 AM - 10:00 PM (Daily)",
    hours_ar: "10:00 ص - 10:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.5123122394747!2d30.996330076296766!3d29.983333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145851234fefeb8b%3A0x6e9f16d1cd78df23!2sArkan%20Plaza!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg",
    mapUrl: "https://www.google.com/maps?q=Arkan+Plaza,+El-Bostan,+First+Al+Sheikh+Zayed,+Giza+Governorate+3242304&ftid=0x14585b0525c31285:0xe916bcf3ee2db2ad&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,47071704,94218641,94282134,100799877,94286869&g_ep=CAISEjI2LjE3LjIuOTAyNzg4MTI0MBgAINeCAypJLDk0Mjk3Njk5LDk0MxM1MTcfMDllNTQzNTFjZjA5NWUyZSZzaG5kbD0tMSZzb3VyY2U9c2gveC9rcC9sb2NhbC8zJmVudHJ5cG9pbnQ9c2gveC9rcC9sb2NhbA%3D%3D&skid=2551fc83-1da8-4ec7-9379-9b5f7b7fcff0&g_st=ic",
    photo:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=800",
    country: "Egypt 🇪🇬",
    services: ["IV Therapy", "Dermatology"],
  },
  {
    id: "br4",
    name: "Dubai Medical Harbour",
    name_ar: "مرسى دبي الطبي",
    address: "Penthouse Level, Marina Heights, Dubai Marina, UAE",
    address_ar:
      "طابق البنتهاوس، مارينا هايتس، مرسى دبي، الإمارات العربية المتحدة",
    phone: "+971 50 120 0313",
    hours: "09:00 AM - 09:00 PM (Daily)",
    hours_ar: "09:00 ص - 09:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6123122394747!2d55.136330076296766!3d25.083333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1234fefeb8b%3A0x6e9f16d1cd78df24!2sDubai%20Marina!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae",
    mapUrl: "https://maps.google.com/?q=Dubai+Marina+Medical+Centre",
    photo:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    country: "UAE 🇦🇪",
    services: ["IV Therapy", "Aesthetics", "Dermatology", "Body Contouring"],
  },
];

export const MOCK_TESTIMONIALS = [
  {
    id: "t1",
    name: "Yasmine Mansour",
    name_ar: "ياسمين منصور",
    role: "Business Executive",
    role_ar: "رائدة أعمال",
    rating: 5,
    text: "The NAD+ drip therapy at Premier Health Fairmont is extraordinary. I felt a surge of mental clarity and energy within hours. The luxury suites are incredibly private and comfortable.",
    text_ar:
      "علاج NAD+ الوريدي في فرع فيرمونت استثنائي. شعرت بوضوح ذهني ونشاط رائع خلال ساعات فقط. أجنحة العلاج خاصة جداً ومريحة للغاية وتليق بالنخبة.",
  },
  {
    id: "t2",
    name: "Karim Hegazi",
    name_ar: "كريم حجازي",
    role: "Professional Athlete",
    role_ar: "رياضي محترف",
    rating: 5,
    text: "For post-training recovery, the L-Premier drip is my absolute go-to. Bypassing digestion means direct absorption, giving me immediate muscle recovery. Exceptional standards.",
    text_ar:
      "للاستشفاء بعد التمارين الشاقة، محلول إل-بريمير هو خياري المفضل دائماً. وصول المغذيات للدم مباشرة يمنح عضلاتي تعافياً فورياً. مستوى رائع من الخدمة.",
  },
  {
    id: "t3",
    name: "Nadine El-Sayegh",
    name_ar: "نادين الصايغ",
    role: "Beauty & Anti-Aging Client",
    role_ar: "عميلة الطب التجميلي",
    rating: 5,
    text: "I visited Dr. Layla for skin boosters and filler. The results are incredibly natural, and the clinic's design is more like an Apple-level wellness sanctuary. Truly world-class.",
    text_ar:
      "زرت د. ليلى للحصول على إبر النضارة والفيلر. النتيجة طبيعية للغاية وتصاميم العيادة تشبه ملاذات العافية الراقية لأبل. تجربة عالمية فاخرة بكل المقاييس.",
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "ap-819",
    customerName: "Farida Rostom",
    customerPhone: "+20 100 123 4567",
    department: "Dermatology",
    service: "Premium Hydrafacial",
    branch: "Fairmont Nile City",
    doctor: "Dr. Ahmed Refaat",
    date: "2026-06-25",
    time: "11:00 AM",
    status: "Confirmed",
    amount: 150,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "ap-820",
    customerName: "Sherif Younes",
    customerPhone: "+20 111 987 6543",
    department: "IV Drip Therapy",
    service: "NAD+ Cell Rejuvenation Drip",
    branch: "Arkan Plaza",
    doctor: "Dr. Marcus Vance",
    date: "2026-06-26",
    time: "03:00 PM",
    status: "Pending",
    amount: 450,
    paymentStatus: "Unpaid",
  },
  {
    id: "ap-821",
    customerName: "Mariam Roushdy",
    customerPhone: "+971 52 444 8888",
    department: "Aesthetics",
    service: "Filler & Botox Enhancements",
    branch: "EDNC Sodic",
    doctor: "Dr. Layla Kamel",
    date: "2026-06-28",
    time: "01:00 PM",
    status: "Rescheduled",
    amount: 350,
    paymentStatus: "Paid",
    paymentMethod: "Apple Pay",
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-101",
    appointmentId: "ap-819",
    customerName: "Farida Rostom",
    amount: 150,
    method: "Credit Card",
    date: "2026-06-24",
    status: "Succeeded",
  },
  {
    id: "pay-102",
    appointmentId: "ap-821",
    customerName: "Mariam Roushdy",
    amount: 350,
    method: "Apple Pay",
    date: "2026-06-24",
    status: "Succeeded",
  },
];
```
</details>
