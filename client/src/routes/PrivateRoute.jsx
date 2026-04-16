import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    // IMPORTANT: wait for Firebase
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return children
    }

    return <Navigate to="/signin" replace state={{ from: location }} />;
};
export default PrivateRoute;