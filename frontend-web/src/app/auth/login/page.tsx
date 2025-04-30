import { LoginForm } from "@/components/auth/loginForm";
import Link from "next/link";
import {
  Award,
  BarChart3,
  Sparkles,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Level Up Educational
            </h1>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600">
              Sign in to your account to manage your school and classes
            </p>
          </div>

          <LoginForm />

          <div className="mt-8">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Forgot your password?{" "}
                <Link
                  href="/reset-password"
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  Reset password
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@levelup.edu"
                className="text-primary hover:text-primary/90 font-medium"
              >
                aieta.davi@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center mb-8 shadow-lg">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Transform Learning into an Adventure
          </h2>

          <p className="text-xl text-gray-700 max-w-lg text-center mb-12">
            Create interactive quizzes, track student progress, and make
            education engaging through gamification
          </p>

          <div className="grid grid-cols-3 gap-8 w-full max-w-lg">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow-md">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-medium text-gray-800 text-center">
                XP
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow-md">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-medium text-gray-800 text-center">
                Rankings
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow-md">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-medium text-gray-800 text-center">
                Rewards
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
