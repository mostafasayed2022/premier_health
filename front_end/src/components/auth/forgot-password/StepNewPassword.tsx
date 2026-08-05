import { Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useStepNewPasswordLogic } from '@/hooks/auth/useForgotPasswordFlow';
import { T } from '@/i18n/T';
import { useLocale } from 'next-intl';

interface StepNewPasswordProps {
  email: string;
  otp: string;
}

export function StepNewPassword({ email, otp }: StepNewPasswordProps) {
  const { form, mutation, onSubmit, showPassword, setShowPassword } = useStepNewPasswordLogic(email, otp);
  const { register, formState: { errors } } = form;
  const locale = useLocale();

  const placeholders: Record<string, string> = {
    en: "Enter new password",
    ar: "أدخل كلمة المرور الجديدة",
    de: "Neues Passwort eingeben",
    es: "Introduzca la nueva contraseña",
    fr: "Saisir le nouveau mot de passe",
    it: "Inserisci la nuova password",
    tr: "Yeni şifreyi girin"
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <T en="Create New Password" ar="إنشاء كلمة مرور جديدة" de="Neues Passwort erstellen" es="Crear nueva contraseña" fr="Créer un nouveau mot de passe" it="Crea una nuova password" tr="Yeni Şifre Oluştur" />
        </h2>
        <p className="text-gray-500 text-sm">
          <T en="Your new password must be different from previous used passwords." ar="يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمات المرور السابقة." de="Ihr neues Passwort muss sich von zuvor verwendeten Passwörtern unterscheiden." es="Su nueva contraseña debe ser diferente de las contraseñas utilizadas anteriormente." fr="Votre nouveau mot de passe doit être différent des mots de passe précédents." it="La tua nuova password deve essere diversa dalle password utilizzate in precedenza." tr="Yeni şifreniz daha önce kullanılan şifrelerden farklı olmalıdır." />
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">
          <T en="New Password" ar="كلمة المرور الجديدة" de="Neues Passwort" es="Nueva contraseña" fr="Nouveau mot de passe" it="Nuova password" tr="Yeni Şifre" />
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('new_password')}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholders[locale] || placeholders.en}
            className={`block w-full pl-10 pr-10 py-3 border ${
              errors.new_password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
        {errors.new_password && (
          <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>
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
            <T en="Reset Password" ar="إعادة تعيين كلمة المرور" de="Passwort zurücksetzen" es="Restablecer contraseña" fr="Réinitialiser le mot de passe" it="Reimposta la password" tr="Şifreyi Sıfırla" /> <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
          </span>
        )}
      </button>
    </form>
  );
}

