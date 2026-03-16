import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  // Temporarily allowed all access for UI development
  // const { token } = useSelector((state) => state.auth);
  // const location = useLocation();

  // if (!token) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
