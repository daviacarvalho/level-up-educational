"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { ListSchools } from "@/components/superadmin/listSchools";
import { CreateSchool } from "@/components/superadmin/createSchool";
import { EditSchool } from "@/components/superadmin/editSchool";

export default function SchoolsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);

  const handleDeleteSchool = (id) => {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
        <CreateSchool />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>School Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ListSchools
            onEdit={(school) => {
              setCurrentSchool(school);
              setIsEditDialogOpen(true);
            }}
            onDelete={handleDeleteSchool}
          />
        </CardContent>
      </Card>
      <EditSchool
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        school={currentSchool}
      />
    </div>
  );
}
