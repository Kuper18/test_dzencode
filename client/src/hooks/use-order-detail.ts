import OrderApi from '../api/order';
import QUERY_KEYS from '../constants/query-keys';
import { useAppSelector } from '../redux/hooks';
import useAppQuery from './use-app-query';

const useOrderDetail = () => {
  const { selectedOrderId } = useAppSelector((state) => state.inventory);

  const { data: orderDetail, ...rest } = useAppQuery({
    queryKey: [QUERY_KEYS.orderDetail, selectedOrderId],
    queryFn: ({ signal }) => OrderApi.getOrderById(selectedOrderId, { signal }),
    enabled: !!selectedOrderId,
  });

  return { orderDetail, ...rest };
};

export default useOrderDetail;
