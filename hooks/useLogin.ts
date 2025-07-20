import { login } from '@/services/auth'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}
