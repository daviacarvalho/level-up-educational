"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { fetchAdapter } from "@/lib/fetchAdapter";
import { toast } from "sonner";
import { Building2 } from "lucide-react";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const CreateSchool = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "school",
        body: {
          name: name,
          city: location,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setTimeout(() => {
            setIsSuccess(false);
          }, 300);
        }, 2000);
      } else {
        toast.error(`Error: ${response.status}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create school");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add School
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-2 border-black rounded-3xl p-0 shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                <Building2 className="w-5 h-5 text-black" />
              </div>
              <DialogTitle className="text-2xl font-bold text-black">
                Add New School
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Fill in the details below to add a new school to the Studify
              platform.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                School Added Successfully!
              </h3>
              <p className="text-gray-600">
                {name} has been added to your schools list.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black font-medium">
                    School Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter school name"
                    className="h-10 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-black font-medium">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                    className="h-10 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-black font-medium">
                    School Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={type}
                    onValueChange={(value) => setType(value)}
                    required
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors">
                      <SelectValue placeholder="Select school type" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black rounded-xl">
                      <SelectItem value="elementary">
                        Elementary School
                      </SelectItem>
                      <SelectItem value="middle">Middle School</SelectItem>
                      <SelectItem value="high">High School</SelectItem>
                      <SelectItem value="k12">K-12</SelectItem>
                      <SelectItem value="college">
                        College/University
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-2 border-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create School 🚀"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
