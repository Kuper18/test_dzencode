import { Button, Container, Navbar } from 'react-bootstrap';

type Props = {
  onOpen: (val: boolean) => void;
};

const TopBar = ({ onOpen }: Props) => {
  return (
    <Navbar bg="primary" variant="dark" className="topbar shadow-sm">
      <Container fluid className="px-3 px-lg-4">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-light"
            className="d-md-none"
            aria-label="Open navigation menu"
            aria-controls="mobile-sidebar"
            onClick={() => onOpen(true)}
          >
            <span aria-hidden="true">☰</span>
          </Button>

          <Navbar.Brand className="fw-bold mb-0">MyApp</Navbar.Brand>
        </div>

        <Navbar.Text className="text-white d-none d-sm-block">
          Welcome to your workspace
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default TopBar;
