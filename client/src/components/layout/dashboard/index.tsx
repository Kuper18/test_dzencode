import { useState } from 'react';
import {
  Col,
  Offcanvas,
  Row
} from 'react-bootstrap';
import { Outlet } from 'react-router';

import './index.scss';
import NavigationMenu from './navigation-menu';
import TopBar from '../../top-bar';

const DashboardLayout = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <div className="dashboard-layout">
      <TopBar onOpen={setShowMobileMenu} />

      <Offcanvas
        id="mobile-sidebar"
        show={showMobileMenu}
        onHide={closeMobileMenu}
        placement="start"
        className="dashboard__mobile-sidebar d-md-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">MyApp</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-3">
          <NavigationMenu onNavigate={closeMobileMenu} />
        </Offcanvas.Body>
      </Offcanvas>

      <Row className="dashboard-body g-0 flex-nowrap">
        <Col
          md={3}
          lg={2}
          className="dashboard__sidebar bg-white border-end p-3 d-none d-md-block"
        >
          <NavigationMenu />
        </Col>

        <Col xs={12} md={9} lg={10} className="dashboard__content p-3 p-lg-4">
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardLayout;
