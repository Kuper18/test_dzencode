import { Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import CLIENT_ROUTES from '../../../constants/client-routes';
import ProfileInfo from '../../profile-info';
import AuthApi from '../../../api/auth';
import QUERY_KEYS from '../../../constants/query-keys';

import './index.scss';

const navigationItems = [
  { label: 'Products', path: CLIENT_ROUTES.home },
  { label: 'Orders', path: CLIENT_ROUTES.orders },
];

type Props = {
  onNavigate?: () => void;
};

const NavigationMenu = ({ onNavigate }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onLogout = () => {
    AuthApi.logout();
    queryClient.setQueryData([QUERY_KEYS.userProfile], null);
    navigate(CLIENT_ROUTES.login);
  };

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

      <Button onClick={onLogout} variant="link" className="text-danger mt-3">
        Logout
      </Button>
    </div>
  );
};

export default NavigationMenu;
