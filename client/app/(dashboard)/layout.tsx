"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, BookOpen, ClipboardCheck, Users, 
  PenTool, BarChart3, MessageSquare, Settings, 
  Menu, Search, Bell, X, LogOut, Home, User
} from "lucide-react";

// ─── Types ───
type Role = "admin" | "teacher" | "student";
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
}

// ─── Menu Configuration ───
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen, roles: ["admin", "teacher", "student"] },
  { label: "Quizzes", href: "/quiz", icon: ClipboardCheck, roles: ["admin", "teacher", "student"] },
  { label: "Students", href: "/dashboard/students", icon: Users, roles: ["admin", "teacher"] },
  { label: "Assignments", href: "/dashboard/assignments", icon: PenTool, roles: ["teacher", "student"] },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["admin"] },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, roles: ["admin", "teacher", "student"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin", "teacher", "student"] },
];

// ─── Sidebar Component ───
function Sidebar({ collapsed, userRole, onClose, isMobile = false }: { collapsed: boolean, userRole: Role, onClose?: () => void, isMobile?: boolean }) {
  const pathname = usePathname();
  const filteredMenu = NAV_ITEMS.filter((item) => item.roles.includes(userRole));

  return (
    <aside className={`flex flex-col h-full bg-slate-900 text-slate-300 ${collapsed && !isMobile ? "w-[72px]" : "w-64"}`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white">
            <BookOpen size={18} />
          </div>
          {(!collapsed || isMobile) && <span className="text-white font-bold text-lg">EduSphere</span>}
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-md">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? onClose : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
                ${isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-800 hover:text-white"}
                ${collapsed && !isMobile ? "justify-center" : ""}
              `}
            >
              <Icon size={20} />
              {(!collapsed || isMobile) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// ─── Topbar Component ───
function Topbar({ onOpenMobile, onToggleDesktop, userRole }: { onOpenMobile: () => void, onToggleDesktop: () => void, userRole: Role }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1">
        <button onClick={onOpenMobile} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <Menu size={20} />
        </button>
        <button onClick={onToggleDesktop} className="hidden lg:block p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <Menu size={20} />
        </button>
        
        {/* Search Bar */}
        <div className="max-w-md w-full ml-2 hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search anything..." className="bg-transparent text-sm w-full outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-full transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden z-50"
              >
                <div className="px-3 py-3 border-b border-slate-50">
                  <p className="text-sm font-bold text-slate-800">John Doe</p>
                  <p className="text-xs text-slate-500 capitalize">{userRole} Account</p>
                </div>
                <div className="py-2">
                  <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Home size={16} /> Home Page
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <User size={16} /> My Profile
                  </Link>
                </div>
                <div className="pt-2 border-t border-slate-50">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// ─── Main Dashboard Layout ───
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole] = useState<Role>("student"); // Contoh role backend

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex flex-shrink-0 border-r border-slate-800 bg-slate-900">
        <Sidebar collapsed={collapsed} userRole={userRole} />
      </div>

      {/* Sidebar Mobile with Framer Motion Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
            />
            {/* Sidebar Content */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 shadow-2xl"
            >
              <Sidebar collapsed={false} userRole={userRole} onClose={() => setMobileOpen(false)} isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar 
          onOpenMobile={() => setMobileOpen(true)} 
          onToggleDesktop={() => setCollapsed(!collapsed)}
          userRole={userRole}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}