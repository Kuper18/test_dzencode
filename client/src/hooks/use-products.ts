import ProductApi from '../api/product';
import QUERY_KEYS from '../constants/query-keys';
import { useAppSelector } from '../redux/hooks';
import useAppQuery from './use-app-query';

const useProducts = () => {
  const { productType } = useAppSelector((state) => state.inventory);

  const { data: products, ...rest } = useAppQuery({
    queryKey: [QUERY_KEYS.productList, productType],
    queryFn: ({ signal }) =>
      ProductApi.getProducts({
        signal,
        params: { 'product-type': productType },
      }),
  });

  return { products, ...rest };
};

export default useProducts;
