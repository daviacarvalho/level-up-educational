"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  School,
  User,
  Mail,
  Activity,
  TrendingUp,
  Clock,
  Bell,
} from "lucide-react";

export const SuperAdminDashboard = () => {
  const stats = [
    {
      title: "Total Schools",
      value: 24,
      icon: School,
      description: "Active educational institutions",
      trend: "+3 this month",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Principals",
      value: 18,
      icon: User,
      description: "Registered school administrators",
      trend: "+2 this month",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Pending Invites",
      value: 7,
      icon: Mail,
      description: "Awaiting response",
      trend: "-1 this week",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "System Activity",
      value: "High",
      icon: Activity,
      description: "Current platform usage",
      trend: "+12% from last week",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your super admin dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="dashboard-item card-hover-effect overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="flex items-center text-xs font-medium text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 transition-all duration-300 hover:shadow-md card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Recent Activities
            </CardTitle>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  action: "New school added",
                  time: "2 hours ago",
                  user: "Admin",
                  icon: School,
                  color: "bg-blue-500/10 text-blue-500",
                },
                {
                  action: "Principal invitation sent",
                  time: "5 hours ago",
                  user: "System",
                  icon: Mail,
                  color: "bg-amber-500/10 text-amber-500",
                },
                {
                  action: "School details updated",
                  time: "Yesterday",
                  user: "Admin",
                  icon: School,
                  color: "bg-green-500/10 text-green-500",
                },
                {
                  action: "New admin registered",
                  time: "2 days ago",
                  user: "System",
                  icon: User,
                  color: "bg-purple-500/10 text-purple-500",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 dashboard-item"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className={`p-2 rounded-full ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Performed by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md card-hover-effect">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                {
                  name: "API Server",
                  status: "Operational",
                  uptime: "99.9%",
                  color: "bg-green-500",
                },
                {
                  name: "Database",
                  status: "Operational",
                  uptime: "99.7%",
                  color: "bg-green-500",
                },
                {
                  name: "Storage",
                  status: "Operational",
                  uptime: "100%",
                  color: "bg-green-500",
                },
                {
                  name: "Authentication",
                  status: "Operational",
                  uptime: "99.8%",
                  color: "bg-green-500",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="space-y-2 dashboard-item"
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full status-indicator ${service.color}`}
                      ></div>
                      <p className="text-sm font-medium">{service.name}</p>
                    </div>
                    <div className="text-xs font-medium text-green-500">
                      {service.uptime}
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${service.color} transition-all duration-1000 ease-in-out`}
                      style={{ width: service.uptime }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
