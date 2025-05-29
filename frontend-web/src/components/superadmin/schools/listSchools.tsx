"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, GraduationCap, Plus, MapPin } from "lucide-react";
import { CreateSchool } from "./createSchool";

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
  teachers: 245;
  students: 18;
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
    <div className="min-h-screen bg-gradient-to-br from-white via-[oklch(0.98_0.02_120)] to-[oklch(0.95_0.08_120)]/20">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Schools</h1>
              <p className="text-gray-600 italic">
                Manage all partner schools 🏫
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search schools..."
                  className="pl-10 w-64 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)]"
                />
              </div>
              <CreateSchool />
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Schools
              </CardTitle>
              <Building2 className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">
                {schools.length}
              </div>
              <p className="text-xs text-gray-500">4 active, 1 pending</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Students
              </CardTitle>
              <GraduationCap className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">
                {schools
                  .reduce((sum, school) => sum + school.students, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Across all schools</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Principals
              </CardTitle>
              <Users className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">
                {schools
                  .reduce((sum, school) => sum + school.students, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Across all schools</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[oklch(0.9_0.15_120)]" />
              All Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-black">
                    School Name
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Principal
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Students
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Teachers
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow
                    key={school.id}
                    className="border-gray-100 hover:bg-[oklch(0.98_0.02_120)]"
                  >
                    <TableCell>
                      <div>
                        <div className="font-semibold text-black">
                          {school.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {school.principalName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin className="w-3 h-3" />
                        {school.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4 text-[oklch(0.9_0.15_120)]" />
                        <span className="font-medium text-black">
                          {school.students}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[oklch(0.9_0.15_120)]" />
                        <span className="font-medium text-black">
                          {school.teachers}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-[oklch(0.95_0.08_120)]"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-2 border-black rounded-xl"
                        >
                          <DropdownMenuItem className="hover:bg-[oklch(0.95_0.08_120)]">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[oklch(0.95_0.08_120)]">
                            Edit School
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                            Delete School
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
      </main>
    </div>
  );
};
