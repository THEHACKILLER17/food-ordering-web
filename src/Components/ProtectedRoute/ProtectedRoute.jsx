import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const ProtectedRoute = ({ children, setShowLogin }) => {
  const { token } = useContext(StoreContext);

  useEffect(() => {
    if (!token) {
      setShowLogin(true);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;