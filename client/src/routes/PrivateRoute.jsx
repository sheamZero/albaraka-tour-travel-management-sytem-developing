import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    console.log(location)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate
            state={{ from: location.pathname }}
            to="/signin"
            replace={true}
        />
    }

    return children;
};

export default PrivateRoute;