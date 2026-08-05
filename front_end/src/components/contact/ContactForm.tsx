"use client";

import { useState, useEffect } from "react";
import { getBranches, Branch } from "@/lib/api";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { ContactFormData } from "./types";
import { useLocale, useTranslations } from "next-intl";

export function ContactForm() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("Contact");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    getBranches().then((data) => {
      if (data && data.length > 0) {
        setBranches(data);
      }
    });
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    branch: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-accent" />
        </div>
        <h3 className="text-2xl font-serif text-primary mb-2">
          {t("msgSent")}
        </h3>
        <p className="text-sm text-foreground/80 max-w-sm">
          {t("msgSentSuccess")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/80">
            {t("formName")} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-accent/20 text-sm focus:outline-none focus:border-accent bg-beige/50 text-primary font-medium transition-colors"
            placeholder={t("placeholderName")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/80">
            {t("formEmail")} <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-accent/20 text-sm focus:outline-none focus:border-accent bg-beige/50 text-primary font-medium transition-colors"
            placeholder={t("placeholderEmail")}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/80">
            {t("formPhone")}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-accent/20 text-sm focus:outline-none focus:border-accent bg-beige/50 text-primary font-medium transition-colors"
            placeholder={t("placeholderPhone")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/80">
            {t("preferredBranch")}
          </label>
          <select
            value={formData.branch}
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-accent/20 text-sm focus:outline-none focus:border-accent bg-beige/50 text-primary font-medium transition-colors"
          >
            <option value="">{t("selectBranch")}</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {isAr ? b.name_ar : b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/80">
          {t("formMsg")} <span className="text-accent">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-accent/20 text-sm focus:outline-none focus:border-accent bg-beige/50 text-primary font-medium transition-colors resize-none"
          placeholder={t("placeholderMessage")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:pointer-events-none active:scale-95"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {loading ? t("sending") : t("send")}
      </button>
    </form>
  );
}
