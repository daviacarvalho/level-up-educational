"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, RotateCw, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Mock data for invites
const mockInvites = [
  {
    id: "1",
    email: "john.doe@example.com",
    role: "Principal",
    school: "Lincoln High School",
    status: "pending",
    sentAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    role: "Principal",
    school: "Washington Elementary",
    status: "accepted",
    sentAt: "2023-05-14T09:15:00Z",
    acceptedAt: "2023-05-14T11:20:00Z",
  },
  {
    id: "3",
    email: "robert.johnson@example.com",
    role: "Principal",
    school: "Jefferson Middle School",
    status: "expired",
    sentAt: "2023-05-10T14:45:00Z",
  },
  {
    id: "4",
    email: "susan.williams@example.com",
    role: "Principal",
    school: "Roosevelt Academy",
    status: "pending",
    sentAt: "2023-05-16T08:20:00Z",
  },
  {
    id: "5",
    email: "michael.brown@example.com",
    role: "Principal",
    school: "Kennedy High",
    status: "rejected",
    sentAt: "2023-05-12T16:10:00Z",
    rejectedAt: "2023-05-13T09:30:00Z",
  },
];

// Mock data for schools (for dropdown selection)
const mockSchools = [
  { id: "1", name: "Lincoln High School" },
  { id: "2", name: "Washington Elementary" },
  { id: "3", name: "Jefferson Middle School" },
  { id: "4", name: "Roosevelt Academy" },
  { id: "5", name: "Kennedy High" },
  { id: "6", name: "Adams Preparatory" },
  { id: "7", name: "Madison International School" },
];

export default function InvitesPage() {
  const [invites, setInvites] = useState(mockInvites);
  const [isCreateInviteDialogOpen, setIsCreateInviteDialogOpen] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: "",
    role: "Principal",
    school: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "expired":
        return <RotateCw className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  const handleCreateInvite = () => {
    const inviteToAdd = {
      ...newInvite,
      id: (invites.length + 1).toString(),
      status: "pending",
      sentAt: new Date().toISOString(),
    };
    setInvites([inviteToAdd, ...invites]);
    setNewInvite({ email: "", role: "Principal", school: "" });
    setIsCreateInviteDialogOpen(false);
  };

  const handleResendInvite = (id) => {
    setInvites(
      invites.map((invite) =>
        invite.id === id
          ? { ...invite, status: "pending", sentAt: new Date().toISOString() }
          : invite
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
        <Button onClick={() => setIsCreateInviteDialogOpen(true)}>
          <Mail className="mr-2 h-4 w-4" />
          Send New Invite
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invitation Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-medium">{invite.email}</TableCell>
                  <TableCell>{invite.role}</TableCell>
                  <TableCell>{invite.school}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invite.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          invite.status
                        )}`}
                      >
                        {invite.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(invite.sentAt)}</TableCell>
                  <TableCell>
                    {invite.status === "pending" || invite.status === "expired" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResendInvite(invite.id)}
                      >
                        <RotateCw className="mr-2 h-3 w-3" />
                        Resend
                      </Button>
                    ) : invite.status === "accepted" ? (
                      <span className="text-xs text-muted-foreground">
                        Accepted on {formatDate(invite.acceptedAt)}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Rejected on {formatDate(invite.rejectedAt)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Invite Dialog */}
      <Dialog
        open={isCreateInviteDialogOpen}
        onOpenChange={setIsCreateInviteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send New Invitation</DialogTitle>
            <DialogDescription>
              Invite a new user to join the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newInvite.email}
                onChange={(e) =>
                  setNewInvite({ ...newInvite, email: e.target.value })
                }
                className="col-span-3"
                placeholder="user@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={newInvite.role}
                onValueChange={(value) =>
                  setNewInvite({ ...newInvite, role: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Principal">Principal</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="school" className="text-right">
                School
              </Label>
              <Select
                value={newInvite.school}
                onValueChange={(value) =>
                  setNewInvite({ ...newInvite, school: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  {mockSchools.map((school) => (
                    <SelectItem key={school.id} value={school.name}>
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
              onClick={() => setIsCreateInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateInvite}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}