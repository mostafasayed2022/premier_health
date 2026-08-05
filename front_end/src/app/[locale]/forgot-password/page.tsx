import { ForgotPasswordFlow } from '@/components/auth/forgot-password/ForgotPasswordFlow';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { T } from "@/i18n/T";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#FAF9F6] via-[#F4EFE6] to-[#EAE3D2] flex items-center justify-center p-6 select-none font-sans relative overflow-hidden">
      {/* Glowing luxury background decorations */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] top-[-10%] left-[-10%] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] bottom-[-20%] right-[-10%] pointer-events-none" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-md pt-12 pb-8 px-4 sm:px-8 flex flex-col relative overflow-hidden card-gold-accent transition-all duration-300 hover:shadow-md">
        {/* Back Link */}
        <Link
          href="/login"
          className="absolute top-6 left-6 text-[10px] uppercase tracking-wider font-bold text-slate-400 hover:text-primary flex items-center gap-1 transition-all bg-white/60 border border-slate-100 hover:border-slate-200 px-3 py-1 rounded-full shadow-sm z-10"
        >
          <ArrowLeft size={12} className="shrink-0" />
          <T en="Back to Login" ar="العودة لتسجيل الدخول" de="Zurück zur Anmeldung" es="Volver al inicio de sesión" fr="Retour à la connexion" it="Torna al login" tr="Giriş Sayfasına Dön" />
        </Link>

        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center gap-2.5 mt-2 mb-6">
          <div className="relative overflow-hidden rounded-full border border-accent/15 p-0.5 bg-beige/50 shadow-sm">
            <Image
              src="/logo/logo1.jpg"
              alt="Premier Health"
              width={55}
              height={55}
              className="rounded-full object-contain"

            />
          </div>
          <h2 className="text-lg font-bold tracking-wider text-primary font-serif">
            <span className="text-[#998675]">PREMIER</span>
            <span className="text-[#385366] font-light ml-1.5 rtl:mr-1.5">
              HEALTH
            </span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
            <T en="Secure Password Recovery" ar="استعادة كلمة المرور الآمنة" de="Sichere Passwortwiederherstellung" es="Recuperación segura de contraseña" fr="Récupération sécurisée du mot de passe" it="Recupero sicuro della password" tr="Güvenli Şifre Kurtarma" />
          </p>
        </div>

        <div className="w-full">
          <ForgotPasswordFlow />
        </div>
      </div>
    </div>
  );
}
