import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
                <DashboardSidebar />
            </div>

            {/* Right side */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Header */}
                <DashboardHeader />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-primary/10 p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;