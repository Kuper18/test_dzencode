import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router';

import CLIENT_ROUTES from '../../../constants/client-routes';
import ProfileInfo from '../../profile-info';
import './index.scss';

const navigationItems = [
  { label: 'Products', path: CLIENT_ROUTES.home },
  { label: 'Orders', path: CLIENT_ROUTES.orders },
];

type Props = {
  onNavigate?: () => void;
};

const NavigationMenu = ({ onNavigate }: Props) => {
  return (
    <div className="dashboard__sidebar-content">
      <ProfileInfo />

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
};

export default NavigationMenu;
