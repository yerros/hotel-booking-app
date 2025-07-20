import { getProfile, login, register } from '@/services/auth';
import { Customer } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      // refetch profile after login
      queryClient.setQueryData<Customer>(['me'], data.data);
    },
  });
};

export const useProfile = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: getProfile,
  });
