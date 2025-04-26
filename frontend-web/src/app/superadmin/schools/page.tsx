"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for schools
const mockSchools = [
  {
    id: "1",
    name: "Lincoln High School",
    address: "123 Education St, New York, NY",
    principalName: "Sarah Johnson",
    studentsCount: 850,
    status: "active",
  },
  {
    id: "2",
    name: "Washington Elementary",
    address: "456 Learning Ave, Boston, MA",
    principalName: "Michael Brown",
    studentsCount: 420,
    status: "active",
  },
  {
    id: "3",
    name: "Jefferson Middle School",
    address: "789 Knowledge Blvd, Chicago, IL",
    principalName: "Emily Davis",
    studentsCount: 635,
    status: "active",
  },
  {
    id: "4",
    name: "Roosevelt Academy",
    address: "101 Wisdom Lane, Los Angeles, CA",
    principalName: "Robert Wilson",
    studentsCount: 720,
    status: "inactive",
  },
  {
    id: "5",
    name: "Kennedy High",
    address: "202 Scholar Road, Miami, FL",
    principalName: "Jennifer Martinez",
    studentsCount: 910,
    status: "active",
  },
];

export default function SchoolsPage() {
  const [schools, setSchools] = useState(mockSchools);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    principalName: "",
  });

  const handleCreateSchool = () => {
    const schoolToAdd = {
      ...newSchool,
      id: (schools.length + 1).toString(),
      studentsCount: 0,
      status: "active",
    };
    setSchools([...schools, schoolToAdd]);
    setNewSchool({ name: "", address: "", principalName: "" });
    setIsCreateDialogOpen(false);
  };

  const handleEditSchool = () => {
    setSchools(
      schools.map((school) =>
        school.id === currentSchool.id ? { ...currentSchool } : school
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteSchool = (id) => {
    setSchools(schools.filter((school) => school.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>{school.address}</TableCell>
                  <TableCell>{school.principalName}</TableCell>
                  <TableCell>{school.studentsCount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        school.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {school.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentSchool(school);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteSchool(school.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create School Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New School</DialogTitle>
            <DialogDescription>
              Enter the details for the new school below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newSchool.name}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={newSchool.address}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, address: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="principal" className="text-right">
                Principal
              </Label>
              <Input
                id="principal"
                value={newSchool.principalName}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, principalName: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSchool}>Create School</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit School Dialog */}
      {currentSchool && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit School</DialogTitle>
              <DialogDescription>
                Update the school information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentSchool.name}
                  onChange={(e) =>
                    setCurrentSchool({
                      ...currentSchool,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  value={currentSchool.address}
                  onChange={(e) =>
                    setCurrentSchool({
                      ...currentSchool,
                      address: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-principal" className="text-right">
                  Principal
                </Label>
                <Input
                  id="edit-principal"
                  value={currentSchool.principalName}
                  onChange={(e) =>
                    setCurrentSchool({
                      ...currentSchool,
                      principalName: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditSchool}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}