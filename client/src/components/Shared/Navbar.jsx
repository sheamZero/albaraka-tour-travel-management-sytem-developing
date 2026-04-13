import { Menu, X, User, Search, Globe } from "lucide-react";
import { useState } from "react";
import Container from "./Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import useAdmin from "../../hooks/useAdmin";
// import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();
    
const dashboardPath = user
  ? isAdmin
    ? "/dashboard/admin"
    : "/dashboard/user"
  : "/signin";

    const menuItems = [
        { name: "Home", link: "/" },
        { name: "Packages", link: "/packages" },
        { name: "Destinations", link: "/destinations" },
        { name: "About Us", link: "/about" },
        { name: "Contact", link: "/contact" },
    ];

    if (isAdminLoading) return <p>loading.................</p>

    return (
        <div className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-sm shadow-sm border-b border-border">
            <Container>
                <nav className="flex items-center justify-between py-4 md:py-4">

                    {/* logo & menu button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {
                                isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />
                            }
                        </button>


                        {/* <NavLink to="/" className="flex items-center gap-1">
                          <img className="h-10 md:h-12 w-auto object-contain" src={logo} alt="Albaraka Tour & Travel Logo" />
                        </NavLink> */}
                        <NavLink to="/" className="flex items-center gap-1">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Globe className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold">
                                <span className="text-primary">Albaraka</span>
                                {/* <span className="text-secondary md:hidden"> Tour & Travel</span> */}
                            </h1>
                        </NavLink>
                    </div>

                    {/* desktop menu items  */}
                    <div className="hidden md:block">
                        <ul className="flex items-center gap-6 lg:gap-8">
                            {menuItems.map((item, idx) => (
                                <li key={idx}>
                                    <NavLink
                                        to={item.link}
                                        className={({ isActive }) =>
                                            `text-base font-medium transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary" : "text-text"
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* right side  */}
                    <div className="flex items-center">
                        {
                            user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Avatar>
                                                <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} alt={user?.displayName || "User"} />
                                                <AvatarFallback>{user?.displayName?.slice(0, 2).toUpperCase() || "LR"}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 p-4 mt-3" align="end">
                                        <DropdownMenuLabel className='text-center text-base font-semibold text-black'>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                onClick={() => navigate(dashboardPath)}
                                                className="hover:bg-primary/10 text-base">
                                                <BadgeCheckIcon />
                                                Dashboard
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-primary/10 text-base">
                                                <CreditCardIcon />
                                                Billing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-primary/10 text-base">
                                                <BellIcon />
                                                Notifications
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={signOutUser}
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700 justify-center text-base">
                                            <LogOutIcon />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    to={"/signin"}
                                    className="flex items-center gap-1 md:gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105 cursor-pointer"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </Link>
                            )
                        }
                    </div>
                </nav>

                {/* mobile menu dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-5">
                        <ul className="flex flex-col gap-3">
                            {
                                menuItems.map((item, idx) => (
                                    <li key={idx}>
                                        <NavLink
                                            to={item.link}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block py-2 px-3 rounded-lg transition-colors ${isActive
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-text hover:bg-muted"
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                            <li className="pt-2">
                                <Link
                                    to={"/signin"}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                                >
                                    <User className="w-4 h-4" />
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Navbar;