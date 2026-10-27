import { useQueryClient } from '@tanstack/react-query';
import OrderApi from '../api/order';
import QUERY_KEYS from '../constants/query-keys';
import type { CreateOrderPayload } from '../types';
import useAppMutation from './use-app-mutation';

const useCreateOrder = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (data: CreateOrderPayload) => OrderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderList],
      });
      onSuccess();
    },
    onError: () => {
      console.error('Faild to create order.');
    },
  });
};

export default useCreateOrder;
