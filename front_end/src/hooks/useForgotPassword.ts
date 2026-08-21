import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

export const useRequestOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await api.post('/password-reset/request/', data);
      return response.data;
    },
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      const response = await api.post('/password-reset/verify/', data);
      return response.data;
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; code: string; new_password: string }) => {
      const response = await api.post('/password-reset/confirm/', data);
      return response.data;
    },
  });
};
