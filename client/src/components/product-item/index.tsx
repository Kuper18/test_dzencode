import { format } from 'date-fns';
import { Badge, Col, Row, Image } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/esm/ListGroup';

import type { Product } from '../../types';

import './index.scss';

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => (
  <ListGroup.Item className="p-3">
    <Row className="g-3">
      <Col xs={12} sm="auto">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            className="product-item__image"
            rounded
          />
        ) : (
          <div className="product-item__image product-item__image--empty">
            No image
          </div>
        )}
      </Col>

      <Col xs={12} sm>
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <div className="min-w-0">
            <h6 className="mb-1">{product.title}</h6>
            <small className="text-body-secondary">
              Serial number: {product.serial_number}
            </small>
          </div>

          <Badge bg={product.is_new ? 'success' : 'secondary'}>
            {product.is_new ? 'New' : 'Used'}
          </Badge>
        </div>

        <Row className="g-2 small mb-3">
          <Col xs={5} className="text-body-secondary">
            Type
          </Col>
          <Col xs={7} className="text-end">
            {product.type || '—'}
          </Col>

          <Col xs={5} className="text-body-secondary">
            Specification
          </Col>
          <Col xs={7} className="text-end text-break">
            {product.specification || '—'}
          </Col>

          <Col xs={5} className="text-body-secondary">
            Guarantee
          </Col>
          <Col xs={7} className="text-end">
            {format(product.guarantee_start, 'dd/MMM/yyyy')}
            {' - '}
            {format(product.guarantee_end, 'dd/MMM/yyyy')}
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-2">
          {product.prices.map((price) => (
            <Badge
              key={price.id}
              bg={price.is_default ? 'primary' : 'light'}
              text={price.is_default ? undefined : 'dark'}
              className="fw-normal"
            >
              {price.value} {price.currency}
            </Badge>
          ))}
        </div>
      </Col>
    </Row>
  </ListGroup.Item>
);

export default ProductItem;
