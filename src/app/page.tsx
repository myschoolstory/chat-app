"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInButton } from "@/components/auth/SignInButton";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/chat");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#36393f] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#36393f] flex items-center justify-center p-4">
      <div className="bg-[#2f3136] rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Discord Clone</h1>
          <p className="text-[#b9bbbe] mb-6">
            A real-time chat application built with Next.js, TypeScript, Ably, and NextAuth.
          </p>
        </div>

        <SignInButton />

        <div className="mt-6 text-center">
          <p className="text-xs text-[#72767d]">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
