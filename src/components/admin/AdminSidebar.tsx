"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CupSoda, Image, MessageSquare, BarChart3, LogOut, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu-items", label: "Menu Items", icon: CupSoda },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-espresso text-cream p-6 flex flex-col">
      <Link href="/admin/dashboard" className="flex items-center gap-2 mb-10">
        <Coffee className="w-7 h-7 text-caramel" />
        <span className="font-bold text-lg">Mighty Admin</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-caramel/20 text-caramel"
                : "text-cream/70 hover:text-cream hover:bg-cream/5"
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors mt-auto"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </aside>
  );
}
