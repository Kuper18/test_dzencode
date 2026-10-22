import useOrders from '../hooks/use-orders';

const Order = () => {
  useOrders();

  return <div>Order page</div>;
};

export default Order;
