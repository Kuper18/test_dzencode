import { format } from 'date-fns';
import { Badge, Card, Col, Image, Row } from 'react-bootstrap';

import type { Product } from '../../types';
import DeleteDialog from '../delete-dialog';
import './index.scss';
import useDeleteProduct from '../../hooks/use-delet-product';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { mutate } = useDeleteProduct();

  const onDelete = () => {
    mutate(product.id);
  };

  return (
    <Card className="product-card dashboard__card shadow-none">
      <Card.Body className="p-3 px-lg-4">
        <Row className="align-items-center g-3">
          <Col xs={12} sm="auto">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                className="product-card__image"
                rounded
              />
            ) : (
              <div className="product-card__image product-card__image--empty">
                No image
              </div>
            )}
          </Col>

          <Col xs={12} sm md>
            <div className="product-card__muted">Order: {product.order}</div>
            <Card.Title className="mb-1">{product.title}</Card.Title>
            <div className="product-card__type">
              {product.type || 'Uncategorized'}
            </div>
          </Col>

          <Col xs={6} md="auto">
            <Badge bg={product.is_new ? 'success' : 'secondary'}>
              {product.is_new ? 'New' : 'Used'}
            </Badge>
          </Col>

          <Col xs={6} md="auto" className="product-card__guarantee">
            <div className="product-card__muted">Guarantee</div>
            <div>{format(product.guarantee_start, 'dd / MMM / yyyy')}</div>
            <div>{format(product.guarantee_end, 'dd / MMM / yyyy')}</div>
          </Col>

          <Col xs={10} md="auto" className="product-card__prices">
            {product.prices.map((price) => (
              <div key={price.id} className="product-card__price">
                <span>{price.value}</span>
                <span className="product-card__currency">{price.currency}</span>
                {price.is_default && (
                  <span className="product-card__default">*</span>
                )}
              </div>
            ))}
          </Col>

          <Col xs={2} md="auto" className="text-end">
            <DeleteDialog action={() => onDelete()} title="Delete Product" />
          </Col>
        </Row>

        {product.specification && (
          <div className="product-card__specification mt-2">
            {product.specification}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
