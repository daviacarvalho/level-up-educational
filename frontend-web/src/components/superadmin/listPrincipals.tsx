"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { fetchAdapter } from "@/lib/fetchAdapter";
import React, { useEffect, useState } from "react";

type Principal = {
  id: number;
  name: string;
  email: string;
  role: "principal";
  school?: {
    id: string;
    name: string;
  };
};

export const ListPrincipals = () => {
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getPrincipals = async () => {
    setLoading(true);
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "users/principal",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setPrincipals(response.data);
      }
    } catch (error) {
      console.log(error);
      setPrincipals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getPrincipals();
    }
  }, [token]);

  const filteredPrincipals = principals
    .filter((principal) =>
      principal.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search principals by name..."
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary loading-spinner"></div>
          <p className="ml-3 text-muted-foreground">Loading principals...</p>
        </div>
      ) : filteredPrincipals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed border-muted p-8 empty-state-pulse">
          <p className="text-lg font-medium mb-2">No principals found</p>
          <p className="text-sm text-muted-foreground text-center">
            Add a new principal to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">School</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrincipals.map((principal, index) => (
                <TableRow
                  key={principal.id}
                  className={`transition-colors hover:bg-muted/30 table-row-hover table-row-fade-in ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {principal.name.charAt(0)}
                      </div>
                      <span>{principal.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {principal.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {principal.school?.name ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        {principal.school.name}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                        Not assigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-100 dark:focus:bg-red-900/50">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
