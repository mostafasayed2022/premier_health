import { KeyRound, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { useStepOtpLogic } from "@/hooks/auth/useForgotPasswordFlow";
import { T } from "@/i18n/T";
import { useLocale } from "next-intl";

interface StepOtpProps {
  email: string;
  initialOtp: string;
  onSuccess: (otp: string) => void;
  onBack: () => void;
}

export function StepOtp({
  email,
  initialOtp,
  onSuccess,
  onBack,
}: StepOtpProps) {
  const {
    form,
    verifyMutation,
    resendMutation,
    onSubmit,
    handleResend,
    countdown,
  } = useStepOtpLogic(email, initialOtp, onSuccess);
  const {
    register,
    formState: { errors },
  } = form;
  const locale = useLocale();

  const placeholders: Record<string, string> = {
    en: "Enter 6-digit code",
    ar: "أدخل الرمز المكون من 6 أرقام",
    de: "Geben Sie den 6-stelligen Code ein",
    es: "Introduzca el código de 6 dígitos",
    fr: "Entrez le code à 6 chiffres",
    it: "Inserisci il codice a 6 cifre",
    tr: "6 haneli kodu girin"
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8 relative">
        <button
          onClick={onBack}
          className="absolute left-0 top-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <T en="Check Your Email" ar="تحقق من بريدك الإلكتروني" de="Überprüfen Sie Ihre E-Mail" es="Revise su correo electrónico" fr="Vérifiez votre e-mail" it="Controlla la tua email" tr="E-postanızı Kontrol Edin" />
        </h2>
        <p className="text-gray-500 text-sm">
          <T en="We've sent a code to" ar="لقد أرسلنا رمزًا إلى" de="Wir haben einen Code gesendet an" es="Hemos enviado un código a" fr="Nous avons envoyé un code à" it="Abbiamo inviato un codice a" tr="Şuraya bir kod gönderdik:" />{" "}
          <span className="font-semibold text-gray-800">{email}</span>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            <T en="OTP Code" ar="رمز التحقق (OTP)" de="OTP-Code" es="Código OTP" fr="Code OTP" it="Codice OTP" tr="OTP Kodu" />
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register("code")}
              type="text"
              placeholder={placeholders[locale] || placeholders.en}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.code
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-accent"
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow text-center text-lg tracking-widest`}
              maxLength={6}
            />
          </div>
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={verifyMutation.isPending}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {verifyMutation.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-1">
              <T en="Verify Code" ar="التحقق من الرمز" de="Code verifizieren" es="Verificar código" fr="Vérifier le code" it="Verifica codice" tr="Kodu Doğrula" /> <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
            </span>
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          <T en="Didn't receive the code?" ar="لم تصلك الرسالة؟" de="Code nicht erhalten?" es="¿No recibió el código?" fr="Vous n'avez pas reçu le code ?" it="Non hai ricevuto il codice?" tr="Kod gelmedi mi?" />{" "}
          {countdown > 0 ? (
            <span className="text-gray-400 font-medium">
              <T en={`Resend in ${countdown}s`} ar={`إعادة الإرسال خلال ${countdown} ثانية`} de={`Erneut senden in ${countdown}s`} es={`Reenviar en ${countdown}s`} fr={`Renvoyer dans ${countdown}s`} it={`Invia di nuovo tra ${countdown}s`} tr={`Tekrar gönder: ${countdown}sn`} />
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="text-accent hover:text-accent/80 font-medium focus:outline-none transition-colors"
            >
              {resendMutation.isPending ? (
                <T en="Sending..." ar="جاري الإرسال..." de="Senden..." es="Enviando..." fr="Envoi en cours..." it="Invio in corso..." tr="Gönderiliyor..." />
              ) : (
                <T en="Resend Code" ar="إعادة إرسال الرمز" de="Code erneut senden" es="Reenviar código" fr="Renvoyer le code" it="Invia di nuovo il codice" tr="Kodu Tekrar Gönder" />
              )}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
