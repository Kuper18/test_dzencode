import ProductApi from '../api/product';
import QUERY_KEYS from '../constants/query-keys';
import queryClient from '../lib/react-query';
import useAppMutation from './use-app-mutation';

const useDeleteProduct = () => {
  return useAppMutation({
    mutationFn: (id: number) => ProductApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.productList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderList],
      });
    },
    onError: () => {
      console.error('Faled to delete product.');
    },
  });
};

export default useDeleteProduct;
