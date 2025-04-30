"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, User, Mail, Activity } from "lucide-react";

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Schools",
      value: 24,
      icon: School,
      description: "Active educational institutions",
    },
    {
      title: "Principals",
      value: 18,
      icon: User,
      description: "Registered school administrators",
    },
    {
      title: "Pending Invites",
      value: 7,
      icon: Mail,
      description: "Awaiting response",
    },
    {
      title: "System Activity",
      value: "High",
      icon: Activity,
      description: "Current platform usage",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Super Admin Dashboard
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New school added",
                  time: "2 hours ago",
                  user: "Admin",
                },
                {
                  action: "Principal invitation sent",
                  time: "5 hours ago",
                  user: "System",
                },
                {
                  action: "School details updated",
                  time: "Yesterday",
                  user: "Admin",
                },
                {
                  action: "New admin registered",
                  time: "2 days ago",
                  user: "System",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time} by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "API Server", status: "Operational", uptime: "99.9%" },
                { name: "Database", status: "Operational", uptime: "99.7%" },
                { name: "Storage", status: "Operational", uptime: "100%" },
                {
                  name: "Authentication",
                  status: "Operational",
                  uptime: "99.8%",
                },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        service.status === "Operational"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-sm font-medium">{service.name}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs text-muted-foreground mr-2">
                      {service.status}
                    </p>
                    <p className="text-xs font-medium">{service.uptime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
