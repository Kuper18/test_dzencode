import { useEffect } from 'react';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type ApiError = {
  message: string;
};

const useAppQuery = <TData>(
  options: UseQueryOptions<TData, AxiosError<ApiError>>
) => {
  const query = useQuery<TData, AxiosError<ApiError>>(options);

  useEffect(() => {
    if (!query.isError) return;
    const message =
      query.error.response?.data.message ?? 'Something went wrong';
    console.error(message);
  }, [query.isError, query.error]);

  return query;
};

export default useAppQuery;
