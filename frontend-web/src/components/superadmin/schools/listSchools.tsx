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
import { useEffect, useState } from "react";
import { fetchAdapter } from "@/lib/fetchAdapter";
import { DeleteSchool } from "./deleteSchool";
type Principal = {
  id: number;
  name: string;
  email: string;
  role: "principal";
};
type School = {
  id: string;
  name: string;
  city: string;
  principalName: string;
  principal?: Principal;
};

export const ListSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
      if (response.status == 200) {
        const schoolsData = response.data;
        setSchools(schoolsData);
      }
    } catch (error) {
      console.log(error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getSchools();
    }
  }, [token]);

  const filteredSchools = schools
    .filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schools by name..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="ml-3 text-muted-foreground">Loading schools...</p>
        </div>
      ) : filteredSchools.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed border-muted p-8">
          <p className="text-lg font-medium mb-2">No schools found</p>
          <p className="text-sm text-muted-foreground text-center">
            Add a new school to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">City</TableHead>
                <TableHead className="font-semibold">Principal</TableHead>
                <TableHead className="font-semibold">Principal Email</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.map((school, index) => (
                <TableRow
                  key={school.id}
                  className={`transition-colors hover:bg-muted/30 table-row-hover table-row-fade-in ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center font-semibold">
                        {school.name.charAt(0)}
                      </div>
                      <span className="font-medium">{school.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {school.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    {school.principalName ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center text-xs font-semibold">
                          {school.principalName.charAt(0)}
                        </div>
                        <span>{school.principalName}</span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                        Not assigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {school.principal?.email ? (
                      <span className="text-muted-foreground text-sm">
                        {school.principal.email}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-100 dark:focus:bg-red-900/50"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <DeleteSchool
                              school={{ id: school.id, name: school.name }}
                              variant="menu-item"
                            />
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
