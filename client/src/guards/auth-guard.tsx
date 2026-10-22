import { Navigate, Outlet } from 'react-router';
import CLIENT_ROUTES from '../constants/client-routes';
import useUserProfile from '../hooks/use-user-profile';
import { Spinner } from 'react-bootstrap';

const AuthGuard = () => {
  const { profile, isLoading } = useUserProfile();

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  return profile ? <Outlet /> : <Navigate to={CLIENT_ROUTES.login} replace />;
};

export default AuthGuard;
