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
import { RotateCcw, PlusCircle, Building2 } from "lucide-react";

export const CreateSchool = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !city) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "school",
        body: {
          name: name,
          city: city,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("School created successfully");
        setName("");
        setCity("");
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`Error: ${response.status}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create school");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add School
        </Button>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Add New School
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter the details for the new school below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  School Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter school name"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full"
                />
              </div>
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
                  "Create School"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
