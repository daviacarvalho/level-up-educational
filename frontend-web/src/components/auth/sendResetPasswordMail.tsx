"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { fetchAdapter } from "@/lib/fetchAdapter";

export const SendResetPasswordMail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "auth/forgot-password",
        body: {
          email: email,
        },
      });

      if (response.status == 201) {
        setIsSuccess(true);
      }
    } catch {
      setError("Failed to send recovery link. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

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
                  Check your email! 📧
                </h1>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Click the link in the email to reset your password.
                </p>

                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or
                  </p>

                  <Button
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail("");
                    }}
                    variant="outline"
                    className="w-full border-2 border-black rounded-xl font-semibold hover:bg-[oklch(0.9_0.15_120)] transition-all duration-300"
                  >
                    Try again
                  </Button>

                  <Link
                    href="/auth"
                    className="block text-[oklch(0.9_0.15_120)] hover:text-black transition-colors font-medium text-sm"
                  >
                    Back to login
                  </Link>
                </div>
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
                  Forgot your{" "}
                  <span className="text-[oklch(0.9_0.15_120)]">password</span>?
                  🔐
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 italic leading-relaxed">
                  No worries! We'll send you a reset link to get back to your
                  gamified classroom. ✨
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Check Your Email</h3>
                    <p className="text-gray-600 text-sm">
                      We'll send a secure reset link
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Secure Process</h3>
                    <p className="text-gray-600 text-sm">
                      Your account stays protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[oklch(0.9_0.15_120)]/20">
                  <div className="w-12 h-12 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Quick Recovery</h3>
                    <p className="text-gray-600 text-sm">
                      Back to teaching in minutes
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
                    Reset your password
                  </h2>
                  <p className="text-gray-600">
                    Enter your email to receive a reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.9_0.15_120)] focus:ring-[oklch(0.9_0.15_120)] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-xl text-lg font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Send reset link 🚀"}
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
