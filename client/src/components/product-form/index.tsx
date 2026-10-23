import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import useProductCreate from '../../hooks/use-product-create';
import { productSchema, type ProductFormValues } from '../../schemas/product';
import type { ProductPayload } from '../../types';

type Props = {
  initialOrderId?: number;
};

const ProductForm = ({ initialOrderId }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      serial_number: '',
      is_new: false,
      type: '',
      specification: '',
      guarantee_start: '',
      guarantee_end: '',
      order: `${initialOrderId ?? ''}`,
      prices: [
        {
          value: '',
          currency: 'USD',
          is_default: true,
        },
        {
          value: '',
          currency: 'UAH',
          is_default: false,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'prices',
  });

  const prices = useWatch({ control, name: 'prices' }) ?? [];
  const { mutate: createProduct, isPending } = useProductCreate(setError);

  const submitForm = async ({ image, ...values }: ProductFormValues) => {
    const payload: ProductPayload = {
      ...values,
      serial_number: Number(values.serial_number),
      order: Number(values.order),
    };
    createProduct({ payload, image: image?.[0] });
  };

  return (
    <Card className="product-form dashboard__card shadow-none">
      <Card.Body className="p-3 p-lg-4">
        <Form noValidate onSubmit={handleSubmit(submitForm)}>
          <Row className="g-3">
            <Col xs={12} md={8}>
              <Form.Group>
                <Form.Label>Product title *</Form.Label>
                <Form.Control
                  {...register('title')}
                  placeholder="e.g. MacBook Pro"
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Label>Serial number *</Form.Label>
                <Form.Control
                  {...register('serial_number')}
                  inputMode="numeric"
                  placeholder="e.g. 10025"
                  isInvalid={!!errors.serial_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.serial_number?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Type *</Form.Label>
                <Form.Control
                  {...register('type')}
                  placeholder="e.g. Laptop"
                  isInvalid={!!errors.type}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="d-flex align-items-start mt-5">
              <Form.Check
                {...register('is_new')}
                type="switch"
                label="New product"
                className="mb-2"
              />
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Specification *</Form.Label>
                <Form.Control
                  {...register('specification')}
                  as="textarea"
                  rows={3}
                  placeholder="Product specifications..."
                  isInvalid={!!errors.specification}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.specification?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Product image *</Form.Label>
                <Form.Control
                  {...register('image')}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Guarantee start *</Form.Label>
                <Form.Control
                  {...register('guarantee_start')}
                  type="date"
                  isInvalid={!!errors.guarantee_start}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.guarantee_start?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Guarantee end *</Form.Label>
                <Form.Control
                  {...register('guarantee_end')}
                  type="date"
                  isInvalid={!!errors.guarantee_end}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.guarantee_end?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Order ID *</Form.Label>
                <Form.Control
                  {...register('order')}
                  inputMode="numeric"
                  placeholder="Enter an existing order ID"
                  isInvalid={!!errors.order}
                  readOnly={!!initialOrderId}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.order?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <hr className="my-4" />

          <div className="mb-3">
            <h5 className="mb-1">Prices *</h5>
            <small className="text-body-secondary">
              Enter both prices and select one default currency.
            </small>
          </div>

          {fields.map((field, index) => (
            <Row key={field.id} className="g-2 align-items-start mb-3">
              <Col xs={12} sm={5}>
                <Form.Group>
                  <Form.Label>{field.currency} amount *</Form.Label>
                  <Form.Control
                    {...register(`prices.${index}.value`)}
                    inputMode="decimal"
                    placeholder="0.00"
                    isInvalid={!!errors.prices?.[index]?.value}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.prices?.[index]?.value?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={6} sm={3}>
                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control value={field.currency} readOnly />
                </Form.Group>
              </Col>

              <Col className="mt-5" xs={6} sm={4}>
                <Form.Check
                  type="radio"
                  name="default-price"
                  label="Default price"
                  checked={!!prices[index]?.is_default}
                  onChange={() => {
                    fields.forEach((_, priceIndex) => {
                      setValue(
                        `prices.${priceIndex}.is_default`,
                        priceIndex === index,
                        { shouldValidate: true }
                      );
                    });
                    clearErrors('prices');
                  }}
                />
              </Col>
            </Row>
          ))}

          {typeof errors.prices?.message === 'string' && (
            <div className="text-danger small mb-3">
              {errors.prices.message}
            </div>
          )}

          {errors.root?.server && (
            <div className="text-danger small mb-3">
              {errors?.root?.server?.message}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              className="d-flex justify-content-center align-items-center gap-1"
              type="submit"
              disabled={isPending}
            >
              {isPending && (
                <Spinner
                  size="sm"
                  className="border-2"
                  animation="border"
                  role="status"
                />
              )}
              Create product
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductForm;
