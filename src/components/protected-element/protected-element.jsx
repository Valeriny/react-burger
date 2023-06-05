import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { getCookie } from "../../utils/cookie";

function ProtectedRoute ({element}) {
  const location = useLocation();
  const isLogin = getCookie("accessToken");

  return isLogin ? element : <Navigate to="/login" state={{ from: location}}/>;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired
};

export default ProtectedRoute;