import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader/DashboardHeader";
import { useState } from "react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <div
                className={`fixed lg:static top-0 left-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0`}
            >
               <DashboardSidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 lg:hidden z-40"
                />
            )}

            {/* Right side */}
            <div className="flex flex-col flex-1 overflow-hidden">

                <DashboardHeader toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto bg-primary/10 ">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;