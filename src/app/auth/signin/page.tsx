"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LogIn } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/chat");
      } else {
        console.error("Sign in failed");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#36393f] flex items-center justify-center p-4">
      <div className="bg-[#2f3136] rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-[#b9bbbe]">We&apos;re so excited to see you again!</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => signIn("discord", { callbackUrl: "/chat" })}
            className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
            disabled={isLoading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Continue with Discord
          </Button>

          <Button
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
            variant="outline"
            className="w-full border-[#4f545c] text-white hover:bg-[#4f545c]"
            disabled={isLoading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#4f545c]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#2f3136] px-2 text-[#b9bbbe]">Or</span>
            </div>
          </div>

          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#b9bbbe] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#40444b] border border-[#4f545c] rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#b9bbbe] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#40444b] border border-[#4f545c] rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

