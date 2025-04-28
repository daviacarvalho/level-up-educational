import { LoginForm } from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-black text-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">EduXP</h1>
            <p className="mt-2 text-gray-400">
              Welcome back! Please sign in to your account.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-gray-900 to-black p-8 border-l border-gray-800">
        <div className="h-full flex items-center justify-center">
          <div className="text-white text-center max-w-md">
            <h2 className="text-4xl font-bold mb-6">
              Transform Learning into an Adventure
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              A gamified educational platform that makes learning interactive,
              motivating, and rewarding.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <h3 className="font-bold mb-2">For Students</h3>
                <p className="text-gray-400 text-sm">
                  Interactive quizzes, XP progression, and class rankings
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <h3 className="font-bold mb-2">For Teachers</h3>
                <p className="text-gray-400 text-sm">
                  Create challenges and track student performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
