import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/auth/Signin/Signin";
import SignUp from "../pages/auth/SignUp/SignUp";
import Packages from "../pages/Packages/Packages";
import Destinations from "../pages/Destinations/Destinations";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import PackageDetails from "../pages/PackageDetails/PackageDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/packages",
                element: <Packages />
            },
            {
                path: "/packageDetails/:id",
                element: <PackageDetails />
            },
            {
                path: "/destinations",
                element: <Destinations />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/signup",
                element: <SignUp />
            }
        ]
    }
]);

export default router;