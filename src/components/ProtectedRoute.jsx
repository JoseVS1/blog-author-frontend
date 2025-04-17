import { Navigate } from "react-router";

export const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/login" replace />;
      }
    
      return children;
}
