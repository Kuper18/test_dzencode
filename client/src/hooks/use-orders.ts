import OrderApi from '../api/order';
import QUERY_KEYS from '../constants/query-keys';
import useAppQuery from './use-app-query';

const useOrders = () => {
  return useAppQuery({
    queryKey: [QUERY_KEYS.orderList],
    queryFn: () => OrderApi.getOrders(),
  });

};

export default useOrders;
