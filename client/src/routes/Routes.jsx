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
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../pages/Dashboard/UserDashboard/UserHome/UserHome";
import MyBookings from "../pages/Dashboard/UserDashboard/MyBookings/MyBookings";
import PaymentHistory from "../pages/Dashboard/UserDashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import AddPackage from "../pages/Dashboard/AdminDashboard/AddPackage/AddPackage";
import AllBookings from "../pages/Dashboard/AdminDashboard/AllBookings/AllBookings";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import Categories from "../pages/Categories/Categories";

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
                element: (
                    <Packages />
                )
            },
            {
                path: "/packageDetails/:id",
                element: <PackageDetails />
            },
            {
                path: "/categories",
                element: <Categories/>
            },
            // {
            //     path: "/destinations",
            //     element: <Destinations />
            // },
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
    },

    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [

            // USER DASHBOARD
            {
                path: "user",
                children: [
                    {
                        index: true,
                        element: <UserHome />
                    },
                    {
                        path: "my-bookings",
                        element: <MyBookings />
                    },
                    {
                        path: "payment-history",
                        element: <PaymentHistory />
                    }
                ]
            },

            // ADMIN DASHBOARD
            {
                path: "admin",

                children: [
                    {
                        path: "",
                        element: (
                            <AdminRoute>
                                <AdminHome />
                            </AdminRoute>
                        )
                    },
                    {
                        path: "add-package",
                        element: (
                            <AdminRoute>
                                <AddPackage />
                            </AdminRoute>
                        )
                    },
                    {
                        path: "manage-users",
                        element: (
                            <AdminRoute>
                                <ManageUsers />
                            </AdminRoute>
                        )
                    },
                    {
                        path: "all-bookings",
                        element: (
                            <AdminRoute>
                                <AllBookings />
                            </AdminRoute>
                        )
                    }
                ]
            }

        ]
    }
]);

export default router;











