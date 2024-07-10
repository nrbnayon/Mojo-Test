import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
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
