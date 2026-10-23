import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CreateOrderForm from '../create-order-form';

type Props = {
  orders: number;
};

const OrderTopHeader = ({ orders }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1>Orders: {orders}</h1>

      <Button variant="success" onClick={handleShow}>
        Create Order
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrderForm onSuccess={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderTopHeader;
