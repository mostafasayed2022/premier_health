import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";

export const useRequestOtpMutation = () => {
  return useMutation({
    mutationFn: authApi.requestPasswordReset,
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: authApi.verifyPasswordResetOtp,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.confirmPasswordReset,
  });
};

