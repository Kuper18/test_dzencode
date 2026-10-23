import OrderApi from '../api/order';
import QUERY_KEYS from '../constants/query-keys';
import useAppQuery from './use-app-query';

const useOrders = () => {
  const { data: orders, ...rest } = useAppQuery({
    queryKey: [QUERY_KEYS.orderList],
    queryFn: () => OrderApi.getOrders(),
  });

  return { orders, ...rest };
};

export default useOrders;
