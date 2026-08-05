import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getDepartments,
  getServicesByDepartment,
  getBranchesByService,
  getDoctorsByBranch,
  Department,
  Service,
  Branch,
  Doctor,
} from "@/lib/api";
import { usePatientAuth } from "@/context/PatientAuthContext";
import { toast } from "sonner";
import { BookingData } from "./types";

interface UseStep7ConfirmProps {
  booking: BookingData;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}

export function useStep7Confirm({ booking, onEmailChange, onPhoneChange }: UseStep7ConfirmProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("Booking");

  const { patientUser, isAuthenticated, login, register, logout } = usePatientAuth();
  
  // Auth view mode: "guest" | "login" | "register"
  const [authMode, setAuthMode] = useState<"guest" | "login" | "register">("guest");

  // Form states
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [authLoading, setAuthLoading] = useState(false);

  // Entities from API
  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    getDepartments().then((data) => {
      if (data && data.length > 0) setDepartments(data);
    });
    if (booking.department) {
      getServicesByDepartment(Number(booking.department)).then((data) => {
        if (data && data.length > 0) setServices(data);
      });
    }
    if (booking.service) {
      getBranchesByService(Number(booking.service)).then((data) => {
        if (data && data.length > 0) setBranches(data);
      });
    }
    if (booking.branch) {
      getDoctorsByBranch(Number(booking.branch), Number(booking.service)).then((data) => {
        if (data && data.length > 0) setDoctors(data);
      });
    }
  }, [booking.department, booking.service, booking.branch]);

  // Sync logged in user details to booking state
  useEffect(() => {
    if (isAuthenticated && patientUser) {
      if (booking.email !== patientUser.email) {
        onEmailChange(patientUser.email);
      }
      if (booking.phone !== patientUser.phone_number) {
        onPhoneChange(patientUser.phone_number);
      }
    }
  }, [isAuthenticated, patientUser, booking.email, booking.phone, onEmailChange, onPhoneChange]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      await login(loginForm.username, loginForm.password);
      toast.success(isAr ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
      setAuthMode("guest"); // Go back to guest tab which is now authenticated
    } catch (err: any) {
      toast.error(err.response?.data?.detail || err.message || "Login failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      await register({
        email: registerForm.email,
        password: registerForm.password,
        phoneNumber: registerForm.phone,
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
      });
      toast.success(isAr ? "تم إنشاء الحساب بنجاح!" : "Account created successfully!");
      setAuthMode("guest");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || err.message || "Registration failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const dept = departments.find(
    (d) => String(d.id) === String(booking.department) || d.slug === String(booking.department)
  );

  const svc = services.find(
    (s) => String(s.id) === String(booking.service) || s.slug === String(booking.service)
  );

  const branch = branches.find(
    (b) => String(b.id) === String(booking.branch) || b.name === String(booking.branch)
  );

  const doc = doctors.find(
    (d) => String(d.id) === String(booking.doctor) || d.slug === String(booking.doctor)
  );

  const getPaymentLabel = (method: string) => {
    if (method === "cash") return t("payCash");
    if (method === "card") return t("payCard");
    if (method === "insurance") return t("payInsurance");
    if (method === "paymob") return t("payOnline");
    return method;
  };

  return {
    isAr,
    t,
    authMode,
    setAuthMode,
    loginForm,
    setLoginForm,
    registerForm,
    setRegisterForm,
    authLoading,
    patientUser,
    isAuthenticated,
    logout,
    handleLoginSubmit,
    handleRegisterSubmit,
    dept,
    svc,
    branch,
    doc,
    getPaymentLabel,
  };
}
