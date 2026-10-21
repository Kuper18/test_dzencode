import {
  Image,
  Nav
} from 'react-bootstrap';
import { NavLink } from 'react-router';

import CLIENT_ROUTES from '../../../constants/client-routes';
import './index.scss';

const navigationItems = [
  { label: 'Products', path: CLIENT_ROUTES.home },
  { label: 'Orders', path: CLIENT_ROUTES.orders },
];

type Props = {
  onNavigate?: () => void;
}

const NavigationMenu = ({ onNavigate }: Props) => (
  <div className="dashboard__sidebar-content">
    <div className="d-flex flex-column align-items-center gap-3 mb-4 py-2 text-center">
      <Image
        roundedCircle
        src="https://placehold.co/64x64?text=JD"
        alt="John Doe"
        width={56}
        height={56}
      />

      <div className="overflow-hidden w-100">
        <div className="fw-semibold">John Doe</div>
        <small className="text-secondary text-break">
          john.doe@example.com
        </small>
      </div>
    </div>

    <Nav className="flex-column gap-2">
      {navigationItems.map(({ label, path }) => (
        <NavLink
          to={path}
          key={path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `nav-link dashboard__sidebar-link rounded px-3 py-2 ${
              isActive ? 'active' : ''
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </Nav>
  </div>
);

export default NavigationMenu;
