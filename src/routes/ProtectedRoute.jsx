import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";



const ProtectedRoute = ({ children }) => {
  const { user, authReady } = useSelector((store) => store?.user);
  const location = useLocation();
 
  if (!authReady) {
    return <div className="min-h-screen flex items-center justify-center">
      Checking session...
    </div>;
  }
  if (!user ) {
    return (<Navigate to="/login" replace state={{ from: location.pathname }} />);
  }
  return children;
};



export default ProtectedRoute;
