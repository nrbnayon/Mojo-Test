import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Spinner from "../Pages/Shared/Spinner/Spinner";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
