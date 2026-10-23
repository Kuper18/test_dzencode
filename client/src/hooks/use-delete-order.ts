import OrderApi from '../api/order';
import QUERY_KEYS from '../constants/query-keys';
import queryClient from '../lib/react-query';
import useAppMutation from './use-app-mutation';

const useDeleteOrder = () => {
  return useAppMutation({
    mutationFn: (id: number) => OrderApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.productList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderList],
      });
    },
    onError: () => {
      console.error('Faled to delete order.');
    },
  });
};

export default useDeleteOrder;
