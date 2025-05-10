"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

  const principalNavItems = [
    {
      title: "Dashboard",
      href: "/principal/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      href: "/principal/students",
      icon: User,
    },
    {
      title: "Teachers",
      href: "/principal/teachers",
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col h-full w-64 border-r bg-background shadow-sm">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Principal Portal
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-6 mb-4">
          <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
            Main Navigation
          </p>
        </div>
        <nav className="grid items-start px-3 gap-1">
          {principalNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "sidebar-item flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out",
                pathname === item.href
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "hover:bg-accent/10 hover:text-accent-foreground hover:border-l-2 hover:border-primary/50"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
              <span className={pathname === item.href ? "font-semibold" : ""}>
                {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4 bg-muted/30">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20">
              <span className="text-sm font-medium text-primary">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role || "Super Admin"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="transition-all duration-300 ease-in-out hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 w-full justify-start"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
