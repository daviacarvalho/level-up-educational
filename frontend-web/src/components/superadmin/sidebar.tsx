"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, School, UserIcon, LayoutDashboard } from "lucide-react";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const superAdminNavItems = [
    {
      title: "Dashboard",
      href: "/superadmin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Schools",
      href: "/superadmin/schools",
      icon: School,
    },
    {
      title: "Principals",
      href: "/superadmin/principals",
      icon: UserIcon,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r-2 border-black shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
      <div className="flex h-20 items-center border-b-2 border-black px-6 bg-gradient-to-r from-[oklch(0.95_0.08_120)]/20 to-[oklch(0.92_0.12_120)]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
            <span className="text-xl font-bold text-black">S</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Studify</h2>
            <p className="text-xs text-gray-600 font-medium">Super Admin</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-6">
        <div className="px-6 mb-4">
          <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
            Main Navigation
          </p>
        </div>

        <nav className="px-4 space-y-2">
          {superAdminNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out border-2",
                pathname === item.href
                  ? "bg-[oklch(0.9_0.15_120)] text-black border-black font-semibold shadow-md"
                  : "bg-white text-gray-700 border-transparent hover:bg-[oklch(0.95_0.08_120)] hover:border-[oklch(0.9_0.15_120)]/30 hover:text-black"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  pathname === item.href ? "text-black" : "text-gray-500"
                )}
              />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t-2 border-black p-4 bg-gradient-to-r from-[oklch(0.95_0.08_120)]/10 to-[oklch(0.92_0.12_120)]/10">
        <div className="flex flex-col gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-200">
            <div className="w-10 h-10 rounded-full bg-[oklch(0.9_0.15_120)] flex items-center justify-center border-2 border-black">
              <span className="text-sm font-bold text-black">
                {user?.name?.charAt(0) || "SA"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black truncate">
                {user?.name || "Super Admin"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "admin@studify.com"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="w-full bg-white text-black border-2 border-black rounded-xl font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300 justify-start"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
