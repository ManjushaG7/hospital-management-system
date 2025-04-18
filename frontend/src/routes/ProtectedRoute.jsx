import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role, loading } = useContext(AuthContext);  

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  
  const isAllowed = allowedRoles.includes(role);

  return token && isAllowed ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
