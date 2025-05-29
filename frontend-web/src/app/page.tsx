import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy,
  BarChart3,
  Target,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">studify</span>
            <span className="text-2xl">🎓</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Button
              asChild
              className="bg-white text-black border-2 border-black rounded-full px-6 hover:bg-[oklch(0.9_0.15_120)] hover:border-[oklch(0.9_0.15_120)] transition-all duration-300"
            >
              <Link href="auth/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.92_0.12_120)] via-[oklch(0.95_0.08_120)] to-[oklch(0.92_0.12_120)] opacity-20 blur-3xl rounded-full"></div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                Learning at school has never been this{" "}
                <span className="text-[oklch(0.9_0.15_120)]">fun</span>.
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light italic max-w-2xl mx-auto">
                Transform classes with XP, interactive quizzes and gamified
                rankings. ✨
              </p>

              <Button
                asChild
                size="lg"
                className="bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-full px-8 py-4 text-lg font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300"
              >
                <Link href="https://wa.me/5511999999999?text=Hello! I would like to request access to Studify for my school.">
                  Request invite access 🚀
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-studify-lighter/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 italic">
            Simple, intuitive and effective for the entire school community
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-black rounded-3xl p-8 hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/20 transition-all duration-300 bg-white">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <Trophy className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Students earn XP
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every activity, quiz and participation generates experience
                  points. They climb the ranking and unlock achievements! 🏆
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black rounded-3xl p-8 hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/20 transition-all duration-300 bg-white">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Teachers create challenges
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Intuitive tools to create quizzes, missions and track
                  individual progress of each student. 📚
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black rounded-3xl p-8 hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/20 transition-all duration-300 bg-white">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-[oklch(0.9_0.15_120)] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <BarChart3 className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Principals visualize
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete dashboard with engagement metrics, performance and
                  evolution of the entire school. 📊
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px4 bg-gradient-to-t from-[oklch(0.95_0.08_120)]/20 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[oklch(0.9_0.15_120)]/20 blur-3xl rounded-full"></div>

            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[oklch(0.9_0.15_120)] text-black border-2 border-black rounded-full px-8 py-4 text-lg font-semibold hover:bg-white hover:shadow-lg hover:shadow-[oklch(0.9_0.15_120)]/25 transition-all duration-300"
                >
                  <Link href="https://wa.me/5511999999999?text=Hello! I would like to learn about Studify and request access for my school.">
                    <Mail className="w-5 h-5 mr-2" />
                    Talk to our team
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold">Studify</span>
                <span className="text-2xl">🎓</span>
              </div>
              <p className="text-gray-400">
                Transforming education through gamification.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <div className="space-y-2">
                <Link
                  href="/termos"
                  className="block text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  Terms of use
                </Link>
                <Link
                  href="/privacidade"
                  className="block text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  Privacy policy
                </Link>
                <Link
                  href="/contato"
                  className="block text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Social media</h4>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[oklch(0.9_0.15_120)] transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Studify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
