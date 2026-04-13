import { Globe, Home, Package, MapPin, Info, Phone, LayoutDashboard, BookOpen, Heart, User, Settings, Calendar, CreditCard, Star, LogOut, User2, Package2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
    const isAdmin = false;
    const publicMenuItems = [
        { name: "Home", link: "/", icon: Home },
        { name: "Packages", link: "/packages", icon: Package },
        { name: "Destinations", link: "/destinations", icon: MapPin },
        { name: "About Us", link: "/about", icon: Info },
        { name: "Contact", link: "/contact", icon: Phone },
    ];

    const userMenuItems = [
        { name: "User Home", link: "/dashboard", icon: Home },
        { name: "My Bookings", link: "/bookings", icon: Calendar },
        { name: "Payment History", link: "/payments", icon: CreditCard },
        { name: "My Reviews", link: "/user/reviews", icon: Star },
        { name: "Profile", link: "/user/profile", icon: User },
    ];

    const adminMenuItems = [
        { name: "Admin Home", link: "/dashboard", icon: LayoutDashboard },
        { name: "Manage Packages", link: "/admin/packages", icon: Package2 },
        { name: "Manage Destinations", link: "/admin/destinations", icon: MapPin },
        { name: "Manage Users", link: "/admin/users", icon: User2 },
        { name: "All Bookings", link: "/admin/bookings", icon: BookOpen },
        { name: "Reviews", link: "/admin/reviews", icon: Star },
    ]

    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    return (
        <div className="w-full h-full bg-white border-r flex flex-col overflow-hidden ">

            {/* Logo */}
            <div className="p-4 flex flex-col items-center justify-center">
                <NavLink to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                        <Globe className="w-5 h-5 text-primary-foreground" />
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        <span className="text-primary">Albaraka</span>
                    </h1>
                </NavLink>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* User Menu */}
            <nav className="p-4">
                {/* <p className="text-xs uppercase text-gray-400 px-2 mb-2 tracking-wider">
                    User Menu
                </p> */}

                <ul className="space-y-1">
                    {
                        menuItems.map((item, idx) => (
                            <NavLink
                                to={item.link}
                                key={idx}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all
                                    ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-text hover:bg-primary/10 hover:text-primary"}`
                                }
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </NavLink>
                        ))
                    }
                </ul>
            </nav>

            <div className="border-t border-gray-200"></div>

            {/* Public Menu */}
            <nav className="p-4">
                {/* <p className="text-xs uppercase text-gray-400 px-2 mb-2 tracking-wider">
                    Explore
                </p> */}

                <ul className="space-y-1">
                    {
                        publicMenuItems.map((item, idx) => (
                            <NavLink
                                to={item.link}
                                key={idx}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all
                                    ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-text hover:bg-primary/10 hover:text-primary"}`
                                }
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </NavLink>
                        ))
                    }
                </ul>
            </nav>

            {/* sidebar bottom */}
            <div className="p-4 mt-auto border-t">
                <button className="flex items-center gap-4 justify-center bg-red-500 hover:bg-red-600 w-full px-3 py-3 rounded-full text-white font-medium transition-all">
                    <span>Logout</span>
                    <LogOut size={20} />
                </button>
            </div>

        </div>
    );
};

export default DashboardSidebar;