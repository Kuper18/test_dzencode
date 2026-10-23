import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
import type { OrderDetail } from '../../types';
import ProductItem from '../product-item';
import ProductForm from '../product-form';
import Modal from '../product-modal/modal';
import './index.scss';
import { useAppDispatch } from '../../redux/hooks';
import { setOrderId } from '../../features/inventory/slice';

type Props = {
  order: OrderDetail;
};

const OrderDetailCard = ({ order }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="order-detail-card shadow-none">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <Card.Title className="mb-1">{order.title}</Card.Title>
            <Card.Subtitle className="text-body-secondary small">
              Order #{order.id}
            </Card.Subtitle>
          </div>

          <div className="d-flex gap-2">
            <Modal title="Create product">
              <ProductForm initialOrderId={order.id} />
            </Modal>
            <Button
              onClick={() => dispatch(setOrderId(null))}
              variant="outline-danger"
            >
              Close info
            </Button>
          </div>
        </div>

        {order.description && (
          <Card.Text className="mt-3 mb-0">{order.description}</Card.Text>
        )}

        <hr />

        <h6 className="mb-2">Order total</h6>

        <div className="d-flex flex-wrap gap-2">
          {Object.entries(order.total_prices ?? {}).map(([currency, value]) => (
            <Badge
              key={currency}
              bg="light"
              text="dark"
              className="fs-6 fw-medium"
            >
              {value} {currency}
            </Badge>
          ))}
        </div>

        <hr />

        <h6 className="mb-3">Products</h6>

        {order.products.length > 0 ? (
          <div className="list-container border rounded">
            <ListGroup variant="flush" style={{ maxHeight: '100vh' }}>
              {order.products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ListGroup>
          </div>
        ) : (
          <p className="text-body-secondary mb-0">No products in this order.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderDetailCard;
