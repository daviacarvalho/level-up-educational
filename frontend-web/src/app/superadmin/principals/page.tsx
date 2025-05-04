"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CreatePrincipal } from "@/components/superadmin/principals/createPrincipal";
import { ListPrincipals } from "@/components/superadmin/principals/listPrincipals";
import { UserCheck } from "lucide-react";

export default function PrincipalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Principals</h1>
        <p className="text-muted-foreground">
          Manage school principals and their accounts.
        </p>
      </div>

      <div className="flex justify-end">
        <CreatePrincipal />
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Principal Management</CardTitle>
              <CardDescription className="mt-1.5">
                View and manage all principals in the system.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserCheck className="h-5 w-5" />
              <span className="text-sm font-medium">
                Total Principals: <span className="text-foreground">18</span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ListPrincipals />
        </CardContent>
      </Card>
    </div>
  );
}
