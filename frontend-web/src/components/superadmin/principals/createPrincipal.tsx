"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { fetchAdapter } from "@/lib/fetchAdapter";
import { toast } from "sonner";
import { RotateCcw, UserPlus, Mail, User, Building2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type School = {
  id: string;
  name: string;
  city: string;
};

export const CreatePrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("none");
  const [schools, setSchools] = useState<School[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getSchools = async () => {
    setLoading(true);
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "school",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSchools(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch schools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && isOpen) {
      getSchools();
    }
  }, [token, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "users/create",
        body: {
          name,
          email,
          schoolId: Number(schoolId),
          role: "principal",
          password: "temporary_password",
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        toast.success("Principal created successfully");
        setName("");
        setEmail("");
        setIsOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`Error: ${response.status}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create principal");
    } finally {
      setSubmitting(false);
    }
  };

  console.log(schoolId);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary/90 transition-colors"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Add Principal
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Add New Principal
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter the details for the new principal below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter principal's full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="school" className="text-sm font-medium">
                  Assign to School (Optional)
                </Label>
                <div className="relative">
                  <Select value={schoolId} onValueChange={setSchoolId}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select a school (optional)" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {/* Opção para não selecionar nenhuma escola */}
                      <SelectItem value="none">No school assigned</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name} ({school.city})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                type="button"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-colors"
              >
                {submitting ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Principal"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
