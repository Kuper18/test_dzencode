import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type ApiError = {
  message: string;
};

const useAppMutation = <TData, TVariables>(
  options: UseMutationOptions<TData, AxiosError<ApiError>, TVariables>
) => {
  return useMutation<TData, AxiosError<ApiError>, TVariables>({
    ...options,
    onError: (error, variables, context, mutation) => {
      const message = error.response?.data.message ?? 'Something went wrong';
      console.error(message);
      options.onError?.(error, variables, context, mutation);
    },
  });
};

export default useAppMutation;
