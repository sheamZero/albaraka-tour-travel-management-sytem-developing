import { Bell, SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const DashboardHeader = ({ toggleSidebar }) => {
const {user} = useAuth();
const {isAdmin} = useAdmin();
    const role = isAdmin ? "Admin" : "User";

    console.log(user)

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-20 py-4 bg-white border-b border-secondary shadow-sm">

            {/* LEFT */}
            <div className="flex items-center gap-3">

                {/* Mobile menu button */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-2xl text-primary"
                >
                    <SquareChevronRight />
                </button>

                <h2 className="hidden md:block text-2xl font-bold text-primary">
                    Dashboard
                </h2>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">

                <div className="text-right hidden sm:block">
                    <p className="font-medium text-sm">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>

                <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-primary object-cover"
                />

                <button className="text-primary hover:text-primary/80 transition">
                    <Bell size={22} />
                </button>

            </div>
        </header>
    );
};

export default DashboardHeader;