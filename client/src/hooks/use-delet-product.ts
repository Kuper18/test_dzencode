import { useQueryClient } from '@tanstack/react-query';
import ProductApi from '../api/product';
import QUERY_KEYS from '../constants/query-keys';
import { useAppSelector } from '../redux/hooks';
import useAppMutation from './use-app-mutation';

const useDeleteProduct = () => {
  const { selectedOrderId } = useAppSelector((state) => state.inventory);
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (id: number) => ProductApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.productList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderDetail, selectedOrderId],
      });
    },
    onError: () => {
      console.error('Faled to delete product.');
    },
  });
};

export default useDeleteProduct;
