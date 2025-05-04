"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, AlertCircle, RotateCcw } from "lucide-react";
import { fetchAdapter } from "@/lib/fetchAdapter";

interface DeleteSchoolProps {
  school: { id: string; name: string };
  variant?: "icon" | "menu-item";
}

export const DeleteSchool = ({
  school,
  variant = "icon",
}: DeleteSchoolProps) => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleDelete = async () => {
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      const response = await fetchAdapter({
        method: "DELETE",
        path: `school/${school.id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 204) {
        toast.success("School deleted successfully");
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting school:", error);
      toast.error("Failed to delete school");
    }
  };

  return (
    <>
      {variant === "icon" ? (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : (
        <div className="flex items-center w-full" onClick={() => setOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete School
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete this school? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm font-medium">
              School: <span className="font-bold">{school.name}</span>
            </p>
          </div>

          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              type="button"
              className="w-full sm:w-auto"
              onClick={handleDelete}
            >
              Delete School
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
