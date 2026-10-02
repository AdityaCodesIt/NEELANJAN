"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthProvider, useAuth } from "./AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  CalendarCheck, 
  MessageSquareQuote, 
  Settings, 
  Menu,
  LogOut,
  X
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vichar", label: "Vichar", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <main className="min-h-screen bg-[#faf6ec] text-[#2b2118]">{children}</main>;
  }

  // If not authenticated and not on login, don't render layout yet (redirect handled by AuthContext)
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf6ec] text-[#2b2118]">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#e6dcc4] bg-[#faf6ec]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-[#c99a3d] flex items-center justify-center rounded-sm">
            <span className="text-[10px] text-[#c99a3d]">Y</span>
          </div>
          <span className="font-serif font-medium">Neelanjan</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 z-40 w-[220px] h-screen bg-[#faf6ec] border-r border-[#e6dcc4]
        flex flex-col transition-transform duration-300 md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 border border-[#c99a3d] flex items-center justify-center rounded-sm">
              <span className="text-[10px] text-[#c99a3d]">Y</span>
            </div>
            <span className="font-serif font-medium text-lg">Neelanjan</span>
          </div>
          <span className="text-xs text-[#6b5c47] uppercase tracking-wider">Admin</span>
        </div>

        <nav className="flex-1 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-6 py-3 text-sm transition-colors
                  ${isActive 
                    ? "border-l-2 border-[#c99a3d] text-[#2b2118] bg-[#faf6ec] font-medium" 
                    : "border-l-2 border-transparent text-[#6b5c47] hover:text-[#2b2118]"
                  }
                `}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#e6dcc4]">
          <button 
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
            }} 
            className="flex items-center gap-3 text-sm text-[#6b5c47] hover:text-[#2b2118] transition-colors"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
