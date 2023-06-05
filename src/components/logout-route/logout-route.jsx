import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function LogoutRoute ({element}) {
  const isLogin = localStorage.getItem("refreshToken");

  return !isLogin ? element : <Navigate to="/"/>;
}

LogoutRoute.propTypes = {
  element: PropTypes.element.isRequired
};

export default LogoutRoute;