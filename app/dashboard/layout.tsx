"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  FileCheck,
  Wallet,
  Users,
  UserPlus,
  Image,
  CalendarDays,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Store,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
  { name: "日報管理", href: "/dashboard/daily-reports", icon: FileText },
  { name: "月次報告書", href: "/dashboard/monthly-reports", icon: BarChart3 },
  { name: "稟議書", href: "/dashboard/approvals", icon: FileCheck },
  { name: "資金繰り", href: "/dashboard/cashflow", icon: Wallet },
  { name: "社員管理", href: "/dashboard/employees", icon: Users },
  { name: "採用管理", href: "/dashboard/recruitment", icon: UserPlus },
  { name: "プロモーション", href: "/dashboard/promotions", icon: Image },
  { name: "予約管理", href: "/dashboard/reservations", icon: CalendarDays },
  { name: "メッセージ", href: "/dashboard/messages", icon: MessageCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "shozui-auth=; path=/; max-age=0";
    document.cookie = "shozui-user=; path=/; max-age=0";
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-navy-950 text-white flex flex-col transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-navy-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Store className="w-5 h-5 text-gold-500" />
            <div>
              <span className="text-lg font-light tracking-[0.15em]">
                祥瑞
              </span>
              <span className="text-[10px] text-navy-400 ml-2 tracking-wider">
                OS
              </span>
            </div>
          </Link>
          <button
            className="lg:hidden ml-auto text-navy-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-navy-800 text-white"
                  : "text-navy-300 hover:bg-navy-900 hover:text-white"
              }`}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-sm font-medium text-navy-950">
              榎
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">榎本</p>
              <p className="text-xs text-navy-400">代表取締役</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-navy-400 hover:text-white hover:bg-navy-900 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            ログアウト
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">
              {new Date().toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
