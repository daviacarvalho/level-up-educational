"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, MoreHorizontal, Mail } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockPrincipals = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@lincolnhigh.edu",
    phone: "(555) 123-4567",
    school: "Lincoln High School",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael.brown@washingtonelem.edu",
    phone: "(555) 234-5678",
    school: "Washington Elementary",
    status: "active",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@jeffersonms.edu",
    phone: "(555) 345-6789",
    school: "Jefferson Middle School",
    status: "active",
  },
  {
    id: "4",
    name: "Robert Wilson",
    email: "robert.wilson@rooseveltacademy.edu",
    phone: "(555) 456-7890",
    school: "Roosevelt Academy",
    status: "inactive",
  },
  {
    id: "5",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@kennedyhigh.edu",
    phone: "(555) 567-8901",
    school: "Kennedy High",
    status: "active",
  },
];

const mockSchools = [
  { id: "1", name: "Lincoln High School" },
  { id: "2", name: "Washington Elementary" },
  { id: "3", name: "Jefferson Middle School" },
  { id: "4", name: "Roosevelt Academy" },
  { id: "5", name: "Kennedy High" },
  { id: "6", name: "Adams Preparatory" },
  { id: "7", name: "Madison International School" },
];

export default function PrincipalsPage() {
  const [principals, setPrincipals] = useState(mockPrincipals);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPrincipal, setCurrentPrincipal] = useState(null);
  const [newPrincipal, setNewPrincipal] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
  });

  const handleCreatePrincipal = () => {
    const principalToAdd = {
      ...newPrincipal,
      id: (principals.length + 1).toString(),
      status: "active",
    };
    setPrincipals([...principals, principalToAdd]);
    setNewPrincipal({ name: "", email: "", phone: "", school: "" });
    setIsCreateDialogOpen(false);
  };

  const handleEditPrincipal = () => {
    setPrincipals(
      principals.map((principal) =>
        principal.id === currentPrincipal.id
          ? { ...currentPrincipal }
          : principal
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeletePrincipal = (id) => {
    setPrincipals(principals.filter((principal) => principal.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Principals</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Principal
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Principal Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {principals.map((principal) => (
                <TableRow key={principal.id}>
                  <TableCell className="font-medium">
                    {principal.name}
                  </TableCell>
                  <TableCell>{principal.email}</TableCell>
                  <TableCell>{principal.phone}</TableCell>
                  <TableCell>{principal.school}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        principal.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {principal.status}
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
                            setCurrentPrincipal(principal);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePrincipal(principal.id)}
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Principal</DialogTitle>
            <DialogDescription>
              Enter the details for the new principal below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newPrincipal.name}
                onChange={(e) =>
                  setNewPrincipal({ ...newPrincipal, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newPrincipal.email}
                onChange={(e) =>
                  setNewPrincipal({ ...newPrincipal, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newPrincipal.phone}
                onChange={(e) =>
                  setNewPrincipal({ ...newPrincipal, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="school" className="text-right">
                School
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewPrincipal({
                    ...newPrincipal,
                    school: mockSchools.find((s) => s.id === value)?.name || "",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  {mockSchools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePrincipal}>Create Principal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {currentPrincipal && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Principal</DialogTitle>
              <DialogDescription>
                Update the principal information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentPrincipal.name}
                  onChange={(e) =>
                    setCurrentPrincipal({
                      ...currentPrincipal,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentPrincipal.email}
                  onChange={(e) =>
                    setCurrentPrincipal({
                      ...currentPrincipal,
                      email: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={currentPrincipal.phone}
                  onChange={(e) =>
                    setCurrentPrincipal({
                      ...currentPrincipal,
                      phone: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-school" className="text-right">
                  School
                </Label>
                <Select
                  defaultValue={
                    mockSchools.find((s) => s.name === currentPrincipal.school)
                      ?.id
                  }
                  onValueChange={(value) =>
                    setCurrentPrincipal({
                      ...currentPrincipal,
                      school:
                        mockSchools.find((s) => s.id === value)?.name || "",
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a school" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSchools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditPrincipal}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
