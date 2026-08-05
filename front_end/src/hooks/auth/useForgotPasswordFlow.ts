import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/utils/error';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { 
  forgotPasswordEmailSchema, ForgotPasswordEmailData,
  forgotPasswordOtpSchema, ForgotPasswordOtpData,
  forgotPasswordResetSchema, ForgotPasswordResetData
} from '@/lib/validations/auth';

// --- Step 1: Email Form Logic ---
export const useStepEmailLogic = (initialEmail: string, onSuccess: (email: string) => void) => {
  const form = useForm<ForgotPasswordEmailData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: initialEmail },
  });

  const mutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: (_, variables) => {
      toast.success('OTP sent to your email');
      onSuccess(variables.email);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to send OTP'));
    }
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, mutation, onSubmit };
};

// --- Step 2: OTP Form Logic ---
export const useStepOtpLogic = (email: string, initialOtp: string, onSuccess: (otp: string) => void) => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const form = useForm<ForgotPasswordOtpData>({
    resolver: zodResolver(forgotPasswordOtpSchema),
    defaultValues: { code: initialOtp },
  });

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyPasswordResetOtp,
    onSuccess: (_, variables) => {
      toast.success('OTP verified successfully!');
      onSuccess(variables.code);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Invalid OTP'));
    }
  });

  const resendMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: () => {
      toast.success('A new OTP has been sent to your email');
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to resend OTP'));
    }
  });

  const onSubmit = form.handleSubmit((data) => verifyMutation.mutate({ email, code: data.code }));
  const handleResend = () => resendMutation.mutate({ email });

  return { form, verifyMutation, resendMutation, onSubmit, handleResend, countdown };
};

// --- Step 3: New Password Form Logic ---
export const useStepNewPasswordLogic = (email: string, otp: string) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ForgotPasswordResetData>({
    resolver: zodResolver(forgotPasswordResetSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.confirmPasswordReset,
    onSuccess: () => {
      toast.success('Password reset successfully!');
      
      // Clear session storage as the flow is complete
      sessionStorage.removeItem('forgot_password_step');
      sessionStorage.removeItem('forgot_password_email');
      sessionStorage.removeItem('forgot_password_otp');
      
      router.push('/login');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to reset password'));
    }
  });

  const onSubmit = form.handleSubmit((data) => 
    mutation.mutate({ email, code: otp, new_password: data.new_password })
  );

  return { form, mutation, onSubmit, showPassword, setShowPassword };
};
