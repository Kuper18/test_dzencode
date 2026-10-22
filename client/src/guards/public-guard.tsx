import { Navigate, Outlet } from 'react-router';
import CLIENT_ROUTES from '../constants/client-routes';
import useUserProfile from '../hooks/use-user-profile';
import { Spinner } from 'react-bootstrap';

const PublicGuard = () => {
  const { profile, isLoading } = useUserProfile();

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner color='primary' animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  return profile ? <Navigate to={CLIENT_ROUTES.home} replace /> : <Outlet />;
};

export default PublicGuard;
