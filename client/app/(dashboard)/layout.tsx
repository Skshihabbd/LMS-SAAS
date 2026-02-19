"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, ClipboardCheck, Users,
  PenTool, BarChart3, MessageSquare, Settings,
  Bell, X, LogOut, Home, User, ChevronLeft,
  PanelLeftClose, PanelLeftOpen
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Role = "admin" | "teacher" | "student";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
  badge?: number;
}

// ─── Menu Configuration ──────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",   href: "/dashboard",             icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
  { label: "Courses",     href: "/dashboard/courses",     icon: BookOpen,        roles: ["admin", "teacher", "student"] },
  { label: "Quizzes",     href: "/quiz",                  icon: ClipboardCheck,  roles: ["admin", "teacher", "student"], badge: 3 },
  { label: "Students",    href: "/dashboard/students",    icon: Users,           roles: ["admin", "teacher"] },
  { label: "Assignments", href: "/dashboard/assignments", icon: PenTool,         roles: ["teacher", "student"] },
  { label: "Analytics",   href: "/dashboard/analytics",   icon: BarChart3,       roles: ["admin"] },
  { label: "Messages",    href: "/dashboard/messages",    icon: MessageSquare,   roles: ["admin", "teacher", "student"], badge: 5 },
  { label: "Settings",    href: "/dashboard/settings",    icon: Settings,        roles: ["admin", "teacher", "student"] },
];

const MAIN_NAV  = NAV_ITEMS.slice(0, 6);
const ACCT_NAV  = NAV_ITEMS.slice(6);

// ─── Sidebar Component ────────────────────────────────────────────────────────
function Sidebar({ collapsed, userRole, onClose, isMobile = false }: { 
  collapsed: boolean; userRole: Role; onClose?: () => void; isMobile?: boolean; 
}) {
  const pathname = usePathname();
  const filteredMain = MAIN_NAV.filter((i) => i.roles.includes(userRole));
  const filteredAcct = ACCT_NAV.filter((i) => i.roles.includes(userRole));
  const isWide = !collapsed || isMobile;

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        onClick={isMobile ? onClose : undefined}
        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group
          ${isActive 
            ? "bg-red-600 text-white shadow-md shadow-red-200" 
            : "text-zinc-600 hover:bg-red-50 hover:text-red-700"}
          ${!isWide ? "justify-center" : ""}`}
      >
        <Icon size={18} className="flex-shrink-0" />
        
        {/* Label and Badge Container - smooth fade */}
        <div className={`flex items-center flex-1 transition-all duration-300 overflow-hidden ${isWide ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
          <span className="flex-1 truncate ml-1">{item.label}</span>
          {item.badge && (
            <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none ml-2
              ${isActive ? "bg-white/30 text-white" : "bg-red-600 text-white"}`}>
              {item.badge}
            </span>
          )}
        </div>

        {/* Tooltip for Collapsed Mode */}
        {!isWide && (
          <span className="absolute left-full ml-4 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
            {item.label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="flex flex-col h-full bg-white border-r border-zinc-200 overflow-hidden w-full">
      {/* ── Logo ── */}
      <div className={`flex items-center h-16 border-b border-zinc-100 flex-shrink-0 px-4 transition-all duration-300
        ${isWide ? "gap-3 justify-between" : "justify-center"}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <BookOpen size={16} className="text-white" />
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${isWide ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
            <span className="text-zinc-900 font-extrabold text-base tracking-tight block whitespace-nowrap">EduSphere</span>
            <span className="text-zinc-400 text-[10px] leading-none block whitespace-nowrap">Learning Platform</span>
          </div>
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400"><X size={18} /></button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-0.5">
        <p className={`text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 mb-1.5 transition-opacity duration-300 ${isWide ? "opacity-100" : "opacity-0"}`}>
          Main
        </p>
        {filteredMain.map((item) => <NavLink key={item.href} item={item} />)}
        <div className="my-3 border-t border-zinc-100 mx-1" />
        {filteredAcct.map((item) => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* ── User Footer ── */}
      <div className="flex-shrink-0 border-t border-zinc-100 p-3">
        <div className={`flex items-center gap-3 rounded-xl p-2 hover:bg-zinc-50 cursor-pointer transition-all ${!isWide ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">JD</div>
          <div className={`transition-all duration-300 overflow-hidden ${isWide ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
            <p className="text-zinc-900 text-sm font-semibold truncate">John Doe</p>
            <p className="text-zinc-400 text-xs capitalize truncate">{userRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Topbar Component ─────────────────────────────────────────────────────────
function Topbar({ collapsed, onOpenMobile, onToggleDesktop, userRole }: { 
  collapsed: boolean; onOpenMobile: () => void; onToggleDesktop: () => void; userRole: Role;
}) {
  const pathname = usePathname();
  const pageTitle = NAV_ITEMS.find((n) => n.href === pathname)?.label ?? "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center px-4 gap-3 sticky top-0 z-20">
      <button onClick={onOpenMobile} className="lg:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100"><PanelLeftOpen size={20} /></button>
      
      <button onClick={onToggleDesktop} className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-500 hover:bg-red-600 hover:text-white transition-all duration-300">
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      <div className="flex items-center gap-2 text-sm ml-2">
        <span className="text-zinc-400 hidden sm:inline">EduSphere</span>
        <span className="text-zinc-300 hidden sm:inline">/</span>
        <span className="text-zinc-900 font-semibold">{pageTitle}</span>
      </div>

      <div className="flex-1" />

      <button className="relative p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-red-600 transition-colors">
        <Bell size={19} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
      </button>

      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">JD</div>
    </header>
  );
}

// ─── Main Dashboard Layout ────────────────────────────────────────────────────
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole] = useState<Role>("student");

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Desktop Sidebar with Tailwind Transition */}
      <div className={`hidden lg:block flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden
        ${collapsed ? "w-[72px]" : "w-[256px]"}`}>
        <Sidebar collapsed={collapsed} userRole={userRole} />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute left-0 top-0 bottom-0 w-[256px] bg-white transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar collapsed={false} userRole={userRole} onClose={() => setMobileOpen(false)} isMobile />
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar collapsed={collapsed} onOpenMobile={() => setMobileOpen(true)} onToggleDesktop={() => setCollapsed(!collapsed)} userRole={userRole} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}