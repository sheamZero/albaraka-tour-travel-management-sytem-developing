import { Globe, X, Home, Package, MapPin, Info, Phone, LayoutDashboard, BookOpen, Heart, User, Settings, Calendar, CreditCard, Star, LogOut, User2, Package2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { useAuth } from "../../../hooks/useAuth";

const DashboardSidebar = ({ onClose }) => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const { signOutUser } = useAuth();

  const userMenuItems = [
    { name: "User Home", link: "/dashboard/user", icon: Home },
    { name: "My Bookings", link: "/dashboard/user/my-bookings", icon: Calendar },
    { name: "Payment History", link: "/dashboard/user/payment-history", icon: CreditCard },
    { name: "My Reviews", link: "/dashboard/user/my-reviews", icon: Star },
    { name: "Profile", link: "/dashboard/user/profile", icon: User },
  ];

  const adminMenuItems = [
    { name: "Admin Home", link: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Add Package", link: "/dashboard/admin/add-package", icon: Package2 },

    { name: "All Bookings", link: "/dashboard/admin/all-bookings", icon: BookOpen },
    { name: "Manage Users", link: "/dashboard/admin/manage-users", icon: User2 },
  ];

  const publicMenuItems = [
    { name: "Home", link: "/", icon: Home },
    { name: "Packages", link: "/packages", icon: Package },
    { name: "Destinations", link: "/destinations", icon: MapPin },
    { name: "About Us", link: "/about", icon: Info },
    { name: "Contact", link: "/contact", icon: Phone },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  if (isAdminLoading) return <p>loading...</p>;

  return (
    <div className="w-full h-full bg-white border-r flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="p-4 flex items-center justify-between border-b">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">Albaraka</h1>
        </NavLink>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="lg:hidden text-gray-600 hover:text-red-500"
        >
          <X size={24} />
        </button>
      </div>

      {/* USER / ADMIN MENU */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.link}
            end={item.link === "/dashboard/user" || item.link === "/dashboard/admin"}
            onClick={onClose}   // ✅ CLOSE SIDEBAR ON CLICK
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t" />

      {/* PUBLIC MENU */}
      <nav className="p-4 space-y-1">
        {publicMenuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.link}
            end
            onClick={onClose}   // ✅ ALSO CLOSE HERE
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 mt-auto border-t">
        <button
          onClick={signOutUser}
          className="flex items-center gap-3 justify-center w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;