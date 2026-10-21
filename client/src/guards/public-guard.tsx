import { Navigate, Outlet } from 'react-router';
import CLIENT_ROUTES from '../constants/client-routes';

const PublicGuard = () => {
  if (false) return 'loading...';

  return false ? <Navigate to={CLIENT_ROUTES.home} replace /> : <Outlet />;
};

export default PublicGuard;
