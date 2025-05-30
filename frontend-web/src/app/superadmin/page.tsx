"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperAdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/superadmin/dashboard");
  }, [router]);

  return (
    <div>
      <p className="mt-4 text-lg font-medium">Redirecting to Dashboard...</p>
    </div>
  );
}
