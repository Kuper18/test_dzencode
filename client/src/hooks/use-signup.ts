import { useQueryClient } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import AuthApi from '../api/auth';
import QUERY_KEYS from '../constants/query-keys';
import type { SignupFormData } from '../schemas/auth';
import type { SignupPayload } from '../types';
import useAppMutation from './use-app-mutation';

interface ApiError {
  email?: string[];
  first_name?: string[];
  last_name?: string[];
  password?: string[];
}

const useSignup = (setError: UseFormSetError<SignupFormData>) => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (data: SignupPayload) => AuthApi.signup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userProfile],
      });
    },
    onError: (error) => {
      const errorData = error.response?.data as ApiError;

      setError('root.server', {
        type: 'server',
        message:
          errorData?.email?.[0] ||
          error.message ||
          'Signup failed. Please try again.',
      });
    },
  });
};

export default useSignup;
