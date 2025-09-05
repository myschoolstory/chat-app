"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { LogIn, LogOut } from "lucide-react";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button disabled className="w-full">
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        onClick={() => signOut()}
        variant="outline"
        className="w-full"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={() => signIn("discord")}
        className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign in with Discord
      </Button>
      <Button
        onClick={() => signIn("google")}
        variant="outline"
        className="w-full"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign in with Google
      </Button>
      <Button
        onClick={() => signIn("credentials")}
        variant="outline"
        className="w-full"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign in with Email
      </Button>
    </div>
  );
}

