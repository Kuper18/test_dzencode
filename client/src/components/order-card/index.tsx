import { Button, Card, Col, Row } from 'react-bootstrap';

import { format } from 'date-fns';
import { List } from 'lucide-react';
import { setOrderId } from '../../features/inventory/slice';
import useDeleteOrder from '../../hooks/use-delete-order';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { Order } from '../../types';
import DeleteDialog from '../delete-dialog';
import './index.scss';

type Props = {
  order: Order;
};

const OrderCard = ({ order }: Props) => {
  const prices = order.total_prices ?? {};
  const { selectedOrderId } = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();
  const { mutate } = useDeleteOrder();

  const handleOpen = (id: number) => {
    dispatch(setOrderId(id));
  };

  const handleDelete = (id: number) => {
    mutate(id);
  };

  return (
    <>
      <Card
        className={`order-card shadow-none ${order.id === selectedOrderId ? 'border-primary' : ''}`}
      >
        <Card.Body className="p-3 px-lg-4">
          <Row className="align-items-center g-3">
            <Col xs={12} md>
              <Card.Title>{order.title}</Card.Title>
            </Col>

            <Col xs={6} md="auto">
              <div className="order-card__products">
                <Button
                  onClick={() => handleOpen(order.id)}
                  variant="outline-primary"
                >
                  <List />
                </Button>

                {!selectedOrderId && (
                  <div>
                    <div className="order-card__product-count">
                      {order.total_products}
                    </div>
                    <div className="order-card__muted">
                      {order.total_products === 1 ? 'Product' : 'Products'}
                    </div>
                  </div>
                )}
              </div>
            </Col>

            <Col xs={6} md="auto" className="order-card__date">
              <span className="order-card__muted">
                {format(order.created_at, 'dd / MM')}
              </span>
              <br />
              <span className="order-card__muted">
                {format(order.created_at, 'dd / MMM / yyyy')}
              </span>
            </Col>

            {!selectedOrderId && (
              <>
                <Col xs={10} md="auto" className="order-card__prices">
                  {Object.keys(prices).length > 0 ? (
                    Object.entries(prices).map(([currency, value]) => (
                      <div key={currency} className="order-card__price">
                        <span>{value}</span>
                        <span className="order-card__currency">{currency}</span>
                      </div>
                    ))
                  ) : (
                    <span className="order-card__muted">No prices</span>
                  )}
                </Col>

                <Col xs={2} md="auto" className="text-end">
                  <DeleteDialog
                    action={() => handleDelete(order.id)}
                    title="Delete Order"
                  />
                </Col>
              </>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderCard;
