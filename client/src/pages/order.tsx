import { useEffect } from 'react';
import OrderCard from '../components/order-card';
import useOrders from '../hooks/use-orders';

import { setOrderId } from '../features/inventory/slice';
import useOrderDetail from '../hooks/use-order-detail';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import OrderDetailCard from '../components/order-detail';

import OrderTopHeader from '../components/order-top-header';
import './index.scss';
import { Spinner } from 'react-bootstrap';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { selectedOrderId } = useAppSelector((state) => state.inventory);
  const { orders } = useOrders();
  const { orderDetail, isLoading } = useOrderDetail();

  useEffect(() => {
    dispatch(setOrderId(null));
  }, [dispatch]);

  return (
    <section
      className={`orders-layout ${selectedOrderId ? 'orders-layout--open' : ''}`}
    >
      <div className="orders-layout__list">
        <OrderTopHeader orders={orders?.length ?? 0} />
        <div className="d-flex flex-column gap-2">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="orders-layout__details">
          <div className="orders-layout__details-inner">
            {selectedOrderId && orderDetail && (
              <OrderDetailCard order={orderDetail} />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default OrdersPage;
