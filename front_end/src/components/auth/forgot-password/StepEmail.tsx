import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useStepEmailLogic } from '@/hooks/auth/useForgotPasswordFlow';
import { T } from '@/i18n/T';
import { useLocale } from 'next-intl';

interface StepEmailProps {
  initialEmail: string;
  onSuccess: (email: string) => void;
}

export function StepEmail({ initialEmail, onSuccess }: StepEmailProps) {
  const { form, mutation, onSubmit } = useStepEmailLogic(initialEmail, onSuccess);
  const { register, formState: { errors } } = form;
  const locale = useLocale();

  const placeholders: Record<string, string> = {
    en: "Enter your email",
    ar: "أدخل بريدك الإلكتروني",
    de: "Geben Sie Ihre E-Mail ein",
    es: "Introduzca su correo electrónico",
    fr: "Entrez votre adresse email",
    it: "Inserisci la tua email",
    tr: "E-postanızı girin"
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <T en="Forgot Password?" ar="هل نسيت كلمة المرور؟" de="Passwort vergessen?" es="¿Olvidó su contraseña?" fr="Mot de passe oublié?" it="Password dimenticata?" tr="Şifrenizi mi Unuttunuz?" />
        </h2>
        <p className="text-gray-500 text-sm">
          <T en="No worries, we'll send you reset instructions." ar="لا تقلق، سنرسل لك تعليمات إعادة التعيين." de="Keine Sorge, wir senden Ihnen Anweisungen zum Zurücksetzen." es="No se preocupe, le enviaremos instrucciones de restablecimiento." fr="Ne vous inquiétez pas, nous vous enverrons des instructions de réinitialisation." it="Nessun problema, ti invieremo le istruzioni per il ripristino." tr="Endişelenmeyin, size sıfırlama talimatlarını göndereceğiz." />
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">
          <T en="Email" ar="البريد الإلكتروني" de="E-Mail" es="Correo electrónico" fr="Email" it="Email" tr="E-posta" />
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('email')}
            type="email"
            placeholder={placeholders[locale] || placeholders.en}
            className={`block w-full pl-10 pr-3 py-3 border ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <span className="flex items-center gap-1">
            <T en="Send OTP" ar="إرسال رمز التحقق" de="OTP senden" es="Enviar OTP" fr="Envoyer l'OTP" it="Invia OTP" tr="OTP Gönder" /> <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
          </span>
        )}
      </button>
    </form>
  );
}

