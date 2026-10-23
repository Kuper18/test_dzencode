import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';
import { orderSchema, type OrderFormValues } from '../../schemas/order';
import useCreateOrder from '../../hooks/use-create-order';

type Props = {
  onSuccess: () => void;
}

const CreateOrderForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { mutate: createOrder } = useCreateOrder(onSuccess)

 

  const handleFormSubmit = async (data: OrderFormValues) => {
    createOrder(data)
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3" controlId="order-title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter order title"
            isInvalid={!!errors.title}
            {...register('title')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="order-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter order description"
            isInvalid={!!errors.description}
            {...register('description')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Order'}
        </Button>
    </Form>
  );
};

export default CreateOrderForm;
