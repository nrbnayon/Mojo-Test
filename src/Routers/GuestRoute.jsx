import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestRoute;
