"use client";

import type React from "react";
import { AdminSidebar } from "@/components/superadmin/sidebar";
import { ProtectedRoute } from "@/components/auth/protectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
