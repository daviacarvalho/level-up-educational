"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, Mail, Plus } from "lucide-react";
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
import { DeletePrincipal } from "./deletePrincipal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Building2, Phone } from "lucide-react";

type Principal = {
  id: number;
  name: string;
  email: string;
  role: "principal";
  school?: {
    id: string;
    name: string;
  };
  students: number;
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
    <div className="min-h-screen bg-gradient-to-br from-white via-[oklch(0.98_0.02_120)] to-[oklch(0.95_0.08_120)]/20">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Principals</h1>
              <p className="text-gray-600 italic">
                Manage school principals and administrators 👨‍🎓
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search principals..."
                  className="pl-10 w-64 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)]"
                />
              </div>
              <Button className="bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Invite Principal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Principals
              </CardTitle>
              <Users className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">
                {principals.length}
              </div>
              <p className="text-xs text-gray-500">4 active, 1 pending</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active This Week
              </CardTitle>
              <Building2 className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">4</div>
              <p className="text-xs text-gray-500">80% engagement rate</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Response Time
              </CardTitle>
              <Mail className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">2.4h</div>
              <p className="text-xs text-gray-500">Excellent support! 📞</p>
            </CardContent>
          </Card>
        </div>

        {/* Principals Table */}
        <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
              <Users className="w-5 h-5 text-[oklch(0.9_0.15_120)]" />
              All Principals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-black">
                    Principal
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    School
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Contact
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {principals.map((principal) => (
                  <TableRow
                    key={principal.id}
                    className="border-gray-100 hover:bg-[oklch(0.98_0.02_120)]"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-black">
                          <AvatarImage src={"/placeholder.svg"} />
                          <AvatarFallback className="bg-[oklch(0.9_0.15_120)] text-black font-semibold">
                            {principal.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-black">
                            {principal.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-black">
                        {principal.school?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Mail className="w-3 h-3" />
                          {principal.email}
                        </div>
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[oklch(0.95_0.08_120)]">
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[oklch(0.95_0.08_120)]">
                            View School
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                            Delete Account
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
