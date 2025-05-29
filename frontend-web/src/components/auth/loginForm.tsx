"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { fetchAdapter } from "@/lib/fetchAdapter";
import {
  ArrowLeft,
  Mail,
  Lock,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const LoginForm = () => {
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
      const response = await fetchAdapter({
        method: "POST",
        path: "auth/login",
        body: { email, password },
      });

      if (!response.data || !response.data.token) {
        throw new Error("Invalid response from server. Token not received.");
      }

      const { token, ...userData } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(token);
      setUser(userData);

      return userData;
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else if (error.message && typeof error.message === "string") {
        setError(error.message);
      } else {
        setError("An error occurred during login. Please try again.");
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
        window.location.href = user.role ? `/${user.role}` : "/";
      }
    }
  }, [isAuthenticated, user, loading, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 relative z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-black hover:text-[oklch(0.9_0.15_120)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">Studify</span>
            <span className="text-2xl">🎓</span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[oklch(0.92_0.12_120)] to-[oklch(0.95_0.08_120)] opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-[oklch(0.9_0.15_120)] to-[oklch(0.92_0.12_120)] opacity-15 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[oklch(0.95_0.08_120)] via-transparent to-[oklch(0.92_0.12_120)] opacity-10 blur-3xl rounded-full"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-full px-4 py-12">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                  Welcome back to{" "}
                  <span className="text-[oklch(0.9_0.15_120)]">Studify</span>!
                  🎓
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 italic leading-relaxed">
                  Ready to make learning fun again?
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">
                      Track Student Progress
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Monitor XP, achievements and engagement
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">
                      Create Fun Challenges
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Design quizzes and interactive activities
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">
                      Real-time Analytics
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get insights on classroom performance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-2">
                    Sign in to your account
                  </h2>
                  <p className="text-gray-600">
                    Access your gamified learning platform
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="text"
                        placeholder="your@email.com"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-black font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-sm">
                    <Link
                      href="forgot-password"
                      className="text-[oklch(0.9_0.15_120)] hover:text-black transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl text-lg font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300"
                  >
                    Sign in 🚀
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">or</span>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-[oklch(0.95_0.08_120)]/30 to-[oklch(0.92_0.12_120)]/30 rounded-xl border border-[oklch(0.9_0.15_120)]/20">
                  <p className="text-gray-700 mb-2 font-medium">
                    Don't have an account?
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Studify is invite-only. Contact us to get access! 🎓
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white text-black border-2 border-black rounded-full px-4 hover:bg-[oklch(0.9_0.15_120)] transition-all duration-300"
                  >
                    <Link href="">Talk to us!</Link>
                  </Button>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm">
                  Having trouble?{" "}
                  <Link
                    href="/contact"
                    className="text-[oklch(0.9_0.15_120)] hover:text-black transition-colors font-medium"
                  >
                    Contact our support team
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold">Studify</span>
                <span className="text-xl">🎓</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming education through gamification.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
              <div className="space-y-1">
                <Link
                  href="/terms"
                  className="block text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors text-sm"
                >
                  Terms of use
                </Link>
                <Link
                  href="/privacy"
                  className="block text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors text-sm"
                >
                  Privacy policy
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors text-sm"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Follow us</h4>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Studify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
