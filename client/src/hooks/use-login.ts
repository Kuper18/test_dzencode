import useAppMutation from './use-app-mutation';
import type { LoginPayload } from '../api/types';
import AuthApi from '../api/auth';
import type { UseFormSetError } from 'react-hook-form';
import type { LoginFormData } from '../schemas/auth';
import queryClient from '../lib/react-query';
import QUERY_KEYS from '../constants/query-keys';

interface ApiError {
  detail?: string;
}

const useLogin = (setError: UseFormSetError<LoginFormData>) => {

  return useAppMutation({
    mutationFn: (data: LoginPayload) => AuthApi.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userProfile],
      });
    },
    onError: (error) => {
      const errorData = error?.response?.data as ApiError;

      setError('root.server', {
        type: 'server',
        message:
          errorData?.detail ||
          error.message ||
          'Login failed. Please try again.',
      });
    },
  });
};

export default useLogin;
