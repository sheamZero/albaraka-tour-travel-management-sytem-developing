import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
    const location = useLocation();
    const isSigninSignup = location.pathname.includes("/signin") || location.pathname.includes("/signup");
    // console.log("from main layouts", isSigninSignup)


    return (
        <div>
            {
                !isSigninSignup && <Navbar />
            }

            <Outlet />

            {
                !isSigninSignup && <Footer />
            }
        </div>
    );
};

export default MainLayout;