// import { Navigate, useLocation } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";
// import { useAuth } from "../hooks/useAuth";

// const AdminRoute = ({ children }) => {
//     const location = useLocation();
//     const { user, isLoading } = useAuth();
//     const { isAdmin, isAdminLoading } = useAdmin();

//     if (isLoading || isAdminLoading) {
//         return <p>loading ........</p>
//     }

//     if (user && isAdmin) {
//         return children
//     }

//     return <Navigate to={"/signin"} state={{ from: location }} replace />
// };

// export default AdminRoute;


// routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, isLoading } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();
    
    // loading state
    if (isLoading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2">Checking permissions...</p>
                </div>
            </div>
        );
    }
    
    // user নেই
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    
    // user আছে কিন্তু admin না
    if (user && !isAdmin) {
        // ইউজারকে তাদের ড্যাশবোর্ডে redirect করুন
        return <Navigate to="/dashboard/user" replace />;
    }
    
    // admin verified
    if (user && isAdmin) {
        return children;
    }
    
    // fallback
    return <Navigate to="/signin" replace />;
};

export default AdminRoute;