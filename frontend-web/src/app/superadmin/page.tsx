"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperAdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/superadmin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-lg font-medium">Redirecting to Dashboard...</p>
      <p className="text-sm text-muted-foreground mt-2">
        Please wait while we prepare your admin portal
      </p>
    </div>
  );
}
