import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Spinner from "../Pages/Shared/Spinner/Spinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdminLoading, isAdmin } = useAdmin();

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Spinner />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
