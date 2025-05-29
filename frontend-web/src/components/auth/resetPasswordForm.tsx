"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Lock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { fetchAdapter } from "@/lib/fetchAdapter";

export const ResetPasswordForm = (token: any) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "auth/reset-password",
        body: {
          token: String(token.token),
          newPassword: String(password),
        },
      });
      if (response.status == 201) {
        setIsSuccess(true);
      }
    } catch {
      setError("Failed to reset password. The link may be expired or invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6)
      return { strength: 1, text: "Weak", color: "text-red-500" };
    if (password.length < 10)
      return { strength: 2, text: "Medium", color: "text-yellow-500" };
    return { strength: 3, text: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-gray-100 relative z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/auth"
              className="flex items-center gap-2 text-black hover:text-[oklch(0.9_0.15_120)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to login</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">Studify</span>
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <main className="flex-1 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[oklch(0.92_0.12_120)] to-[oklch(0.95_0.08_120)] opacity-20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-[oklch(0.9_0.15_120)] to-[oklch(0.92_0.12_120)] opacity-15 blur-3xl rounded-full"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-full px-4 py-12">
            <div className="w-full max-w-md text-center">
              <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
                <div className="w-16 h-16 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>

                <h1 className="text-3xl font-bold text-black mb-4">
                  Password reset successful! 🎉
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Your password has been successfully updated. You can now sign
                  in with your new password and get back to making learning fun!
                </p>

                <Button
                  asChild
                  className="w-full h-12 bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl text-lg font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300"
                >
                  <Link href="/auth">Sign in now 🚀</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 relative z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/auth"
            className="flex items-center gap-2 text-black hover:text-[oklch(0.9_0.15_120)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to login</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">Studify</span>
            <span className="text-2xl">🎓</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[oklch(0.92_0.12_120)] to-[oklch(0.95_0.08_120)] opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-[oklch(0.9_0.15_120)] to-[oklch(0.92_0.12_120)] opacity-15 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[oklch(0.95_0.08_120)] via-transparent to-[oklch(0.92_0.12_120)] opacity-10 blur-3xl rounded-full"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-full px-4 py-12">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Information */}
            <div className="text-center lg:text-left space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                  Create your new{" "}
                  <span className="text-[oklch(0.9_0.15_120)]">password</span>{" "}
                  🔑
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 italic leading-relaxed">
                  Choose a strong password to keep your gamified classroom
                  secure and accessible. ✨
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Secure & Strong</h3>
                    <p className="text-gray-600 text-sm">
                      At least 8 characters with variety
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Protected Account</h3>
                    <p className="text-gray-600 text-sm">
                      Your data stays safe and private
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Quick Access</h3>
                    <p className="text-gray-600 text-sm">
                      Easy login to your dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reset Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-lg shadow-[oklch(0.9_0.15_120)]/10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-2">
                    Set new password
                  </h2>
                  <p className="text-gray-600">
                    Create a strong password for your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-black font-medium"
                    >
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="pl-10 pr-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {password && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.strength === 1
                                ? "w-1/3 bg-red-500"
                                : passwordStrength.strength === 2
                                ? "w-2/3 bg-yellow-500"
                                : passwordStrength.strength === 3
                                ? "w-full bg-green-500"
                                : "w-0"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${passwordStrength.color}`}
                        >
                          {passwordStrength.text}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-black font-medium"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="pl-10 pr-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500">
                        Passwords don't match
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      password !== confirmPassword ||
                      password.length < 8
                    }
                    className="w-full h-12 bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl text-lg font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? "Updating..." : "Update password 🚀"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-500 text-sm">
                    Remember your password?{" "}
                    <Link
                      href="/auth"
                      className="text-[oklch(0.9_0.15_120)] hover:text-black transition-colors font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
