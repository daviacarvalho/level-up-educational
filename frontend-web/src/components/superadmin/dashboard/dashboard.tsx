import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[oklch(0.98_0.02_120)] to-[oklch(0.95_0.08_120)]/20">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Dashboard</h1>
              <p className="text-gray-600 italic">
                Welcome back, Super Admin! 👋
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10 hover:shadow-[oklch(0.9_0.15_120)]/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Schools
              </CardTitle>
              <Building2 className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">127</div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10 hover:shadow-[oklch(0.9_0.15_120)]/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Principals
              </CardTitle>
              <Users className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">89</div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10 hover:shadow-[oklch(0.9_0.15_120)]/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Students
              </CardTitle>
              <GraduationCap className="h-5 w-5 text-[oklch(0.9_0.15_120)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">15,847</div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +23% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Schools */}
          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[oklch(0.9_0.15_120)]" />
                Recent Schools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Lincoln Elementary",
                  principal: "Sarah Johnson",
                  status: "Active",
                  students: 245,
                },
                {
                  name: "Roosevelt High School",
                  principal: "Michael Chen",
                  status: "Active",
                  students: 892,
                },
                {
                  name: "Washington Middle",
                  principal: "Emily Davis",
                  status: "Pending",
                  students: 456,
                },
                {
                  name: "Jefferson Academy",
                  principal: "David Wilson",
                  status: "Active",
                  students: 334,
                },
              ].map((school, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div>
                    <h4 className="font-semibold text-black">{school.name}</h4>
                    <p className="text-sm text-gray-600">
                      {school.principal} • {school.students} students
                    </p>
                  </div>
                  <Badge
                    variant={
                      school.status === "Active" ? "default" : "secondary"
                    }
                    className={
                      school.status === "Active"
                        ? "bg-[oklch(0.9_0.15_120)] text-black border border-black"
                        : "bg-gray-200 text-gray-700"
                    }
                  >
                    {school.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 border-black rounded-2xl bg-white shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full h-12 bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300">
                <Building2 className="w-5 h-5 mr-2" />
                Add New School
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 border-2 border-black rounded-xl font-semibold hover:bg-[oklch(0.9_0.15_120)] transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Invite Principal
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 border-2 border-black rounded-xl font-semibold hover:bg-[oklch(0.9_0.15_120)] transition-all duration-300"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Analytics
              </Button>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-black mb-3">
                  Platform Health
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <Badge className="bg-green-100 text-green-700 border border-green-300">
                      Online
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Database</span>
                    <Badge className="bg-green-100 text-green-700 border border-green-300">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">API Response</span>
                    <Badge className="bg-[oklch(0.9_0.15_120)] text-black border border-black">
                      Fast
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
