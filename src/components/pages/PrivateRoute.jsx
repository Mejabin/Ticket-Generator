import PropTypes from "prop-types";

import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  const isAuthenticated = JSON.parse(user)

const authenticate = isAuthenticated.email == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1AZ21haWwuY29tIn0.HF2-qWH4UnDgeuQ6gLkim71Q8lLq-c3oxuR_leI-dOg"
  const location = useLocation();

  if (authenticate) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
}

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};