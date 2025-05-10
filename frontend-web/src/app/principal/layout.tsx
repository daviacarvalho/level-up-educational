"use client";

import type React from "react";
import { ProtectedRoute } from "@/components/auth/protectedRoute";
import { Sidebar } from "@/components/principal/sidebar";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 border-b flex items-center px-6 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <h1 className="text-xl font-semibold">Principal Portal</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
