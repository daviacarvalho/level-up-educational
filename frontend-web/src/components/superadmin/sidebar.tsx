"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, Mail, School, User } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const superAdminNavItems = [
    {
      title: "Dashboard",
      href: "/superadmin",
      icon: School,
    },
    {
      title: "Schools",
      href: "/superadmin/schools",
      icon: School,
    },
    {
      title: "Principals",
      href: "/superadmin/principals",
      icon: User,
    },
    {
      title: "Invites",
      href: "/superadmin/invites",
      icon: Mail,
    },
  ];

  return (
    <div className="flex flex-col h-full w-64 border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">
              XP
            </span>
          </div>
          <span className="font-bold text-lg">LUE</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {superAdminNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">{"A"}</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
