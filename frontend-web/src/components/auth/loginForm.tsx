"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import { fetchAdapter } from "@/lib/fetchAdapter";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", { email });

      const response = await fetchAdapter({
        method: "POST",
        path: "auth/login",
        body: { email, password },
      });

      console.log("Login response:", response);

      if (!response.data || !response.data.token) {
        throw new Error("Invalid response from server. Token not received.");
      }

      const { token, ...userData } = response.data;

      // Store auth data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(token);
      setUser(userData);

      return userData;
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 401) {
        setError("Email ou senha inválidos");
      } else if (error.message && typeof error.message === "string") {
        setError(error.message);
      } else {
        setError("Ocorreu um erro durante o login. Tente novamente.");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!email.trim() || !password.trim()) {
        toast.error("Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      await login(email, password);
      toast.success("Login successful!");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && !loading) {
      console.log("User authenticated, redirecting based on role:", user.role);

      try {
        switch (user.role) {
          case "superadmin":
            router.push("/superadmin");
            break;
          case "principal":
            router.push("/principal");
            break;
          case "teacher":
            router.push("/teacher");
            break;
          default:
            console.log("No specific role matched, redirecting to home");
            router.push("/");
        }
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback navigation if the router.push fails
        window.location.href = user.role ? `/${user.role}` : "/";
      }
    }
  }, [isAuthenticated, user, loading, router]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-gray-900 border-gray-800 text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isSubmitting}
              className="w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isSubmitting}
              className="w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800"
              />
              <Label htmlFor="remember" className="text-sm text-gray-300">
                Remember me
              </Label>
            </div>
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="bg-red-900 border-red-800 text-white"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
