import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LayoutDashboard, Activity, FolderOpen, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../assets/logo.jpeg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img src={logo} alt="PaintSurgeon Logo" className="h-10 sm:h-12 w-auto flex-shrink-0" />
          <span className="font-display text-lg sm:text-2xl font-bold uppercase text-gradient truncate">
            Paintsurgeon
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-ui text-sm tracking-wide uppercase transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Admin Menu - Only visible when authenticated */}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 font-ui text-sm tracking-wide uppercase transition-colors hover:text-primary text-muted-foreground focus:outline-none">
                <User size={18} />
                <span>Admin</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard" className="flex items-center cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/activity" className="flex items-center cursor-pointer">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Activity Log</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/categories" className="flex items-center cursor-pointer">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <span>Categories</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`font-ui text-lg uppercase tracking-wide transition-colors ${
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Admin Menu - Mobile */}
              {isAuthenticated && (
                <>
                  <div className="border-t border-border my-2"></div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Admin Menu
                  </div>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="font-ui text-lg uppercase tracking-wide transition-colors text-muted-foreground flex items-center gap-2"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/activity"
                    onClick={() => setOpen(false)}
                    className="font-ui text-lg uppercase tracking-wide transition-colors text-muted-foreground flex items-center gap-2"
                  >
                    <Activity size={18} />
                    Activity Log
                  </Link>
                  <Link
                    to="/admin/categories"
                    onClick={() => setOpen(false)}
                    className="font-ui text-lg uppercase tracking-wide transition-colors text-muted-foreground flex items-center gap-2"
                  >
                    <FolderOpen size={18} />
                    Categories
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="font-ui text-lg uppercase tracking-wide transition-colors text-red-600 flex items-center gap-2 text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
