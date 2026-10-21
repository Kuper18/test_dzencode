import { Navigate, Outlet } from 'react-router';
import CLIENT_ROUTES from '../constants/client-routes';

const AuthGuard = () => {
  if (false) return 'loading...';

  return true ? <Outlet /> : <Navigate to={CLIENT_ROUTES.login} replace />;
};

export default AuthGuard;
