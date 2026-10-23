import { Modal as BootstrapModal } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import { setOpenProductForm } from '../../features/inventory/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

type Props = {
  children: React.ReactNode;
  title: string;
  buttonTittle?: string;
};

const Modal = ({ children, title, buttonTittle }: Props) => {
  const dispatch = useAppDispatch();
  const { isOpenProductForm } = useAppSelector((state) => state.inventory);

  return (
    <>
      <Button
        size="sm"
        variant="outline-success"
        onClick={() => dispatch(setOpenProductForm(true))}
      >
        {buttonTittle ?? 'Add'}
      </Button>

      <BootstrapModal
        show={isOpenProductForm}
        size="lg"
        onHide={() => dispatch(setOpenProductForm(false))}
        dialogClassName="modal-90w"
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{children}</BootstrapModal.Body>
      </BootstrapModal>
    </>
  );
};

export default Modal;
