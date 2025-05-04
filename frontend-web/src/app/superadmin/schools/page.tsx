"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ListSchools } from "@/components/superadmin/schools/listSchools";
import { CreateSchool } from "@/components/superadmin/schools/createSchool";
import { Building2 } from "lucide-react";

export default function SchoolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
        <p className="text-muted-foreground">
          Manage educational institutions and their details.
        </p>
      </div>

      <div className="flex justify-end">
        <CreateSchool />
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">School Management</CardTitle>
              <CardDescription className="mt-1.5">
                View and manage all schools in the system.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">
                Total Schools: <span className="text-foreground">24</span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ListSchools />
        </CardContent>
      </Card>
    </div>
  );
}
