import { Trash } from 'lucide-react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
  title: string;
  action: () => void;
};

function DeleteDialog({ title, action }: Props) {
  const [show, setShow] = useState(false);

  const onDelete = () => {
    action();
    setShow(false);
  };

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        variant="link"
        className="text-danger"
      >
        <Trash />
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>

          <div className="d-flex gap-2">
            <Button variant="danger" onClick={onDelete}>
              Confirm
            </Button>
            <Button variant="outline-primary" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteDialog;
