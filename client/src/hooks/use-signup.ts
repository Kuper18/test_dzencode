import type { SignupPayload } from '../types/api';
import AuthApi from '../api/auth';
import useAppMutation from './use-app-mutation';
import type { SignupFormData } from '../schemas/auth';
import type { UseFormSetError } from 'react-hook-form';
import queryClient from '../lib/react-query';
import QUERY_KEYS from '../constants/query-keys';

interface ApiError {
  email?: string[];
  first_name?: string[];
  last_name?: string[];
  password?: string[];
}

const useSignup = (setError: UseFormSetError<SignupFormData>) => {
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
