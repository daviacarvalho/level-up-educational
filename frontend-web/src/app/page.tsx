"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!token;

  useEffect(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.role === "superadmin") {
        router.push("/superadmin");
      } else if (user?.role === "principal") {
        router.push("/principal");
      } else if (user?.role === "teacher") {
        router.push("/teacher");
      }
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="ml-3">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="bg-black text-white p-4 shadow-md border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EduXP</h1>
          <div>
            <Link
              href="/auth/login"
              className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-black to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Learning into an Adventure
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
              A gamified educational platform that makes learning interactive,
              motivating, and rewarding for students, teachers, and school
              principals.
            </p>
            <Link
              href="/auth/login"
              className="bg-white text-black px-6 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors inline-block"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-black">
                  For Students
                </h3>
                <p className="text-gray-700">
                  Interactive quizzes, XP progression, class rankings, and
                  immediate feedback to make learning engaging and rewarding.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-black">
                  For Teachers
                </h3>
                <p className="text-gray-700">
                  Create and edit challenges, view class rankings, analyze
                  student performance, and track engagement metrics.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-black">
                  For Principals
                </h3>
                <p className="text-gray-700">
                  School registration, class creation, secure digital invites
                  for teachers and students, and global metrics dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How EduXP Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900">
                <div className="text-2xl font-bold mb-3 text-white">01</div>
                <h3 className="text-xl font-bold mb-3">Secure Onboarding</h3>
                <p className="text-gray-400">
                  Digital invites ensure secure registration for principals,
                  teachers, and students.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900">
                <div className="text-2xl font-bold mb-3 text-white">02</div>
                <h3 className="text-xl font-bold mb-3">
                  Interactive Challenges
                </h3>
                <p className="text-gray-400">
                  Teachers create quizzes that students complete to earn XP and
                  climb the rankings.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900">
                <div className="text-2xl font-bold mb-3 text-white">03</div>
                <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
                <p className="text-gray-400">
                  Students see their progress, teachers monitor class
                  engagement, and principals view school-wide metrics.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900">
                <div className="text-2xl font-bold mb-3 text-white">04</div>
                <h3 className="text-xl font-bold mb-3">
                  Rewards & Recognition
                </h3>
                <p className="text-gray-400">
                  XP accumulation leads to rankings and rewards, motivating
                  continued engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose EduXP?</h2>
            <div className="max-w-4xl mx-auto p-8 bg-black rounded-lg border border-gray-800">
              <p className="text-xl italic mb-6">
                "EduXP has completely transformed how our students engage with
                learning. The gamification elements have increased participation
                by 70%, and teachers report higher retention of material."
              </p>
              <p className="font-bold">- School Principal</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">EduXP</h2>
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
