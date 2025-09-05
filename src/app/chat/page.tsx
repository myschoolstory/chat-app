"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Channel } from "@/types";

// Mock data for demonstration
const mockChannels: Channel[] = [
  {
    id: "general",
    name: "general",
    type: "text",
    serverId: "main-server",
    createdAt: new Date(),
  },
  {
    id: "random",
    name: "random",
    type: "text",
    serverId: "main-server",
    createdAt: new Date(),
  },
  {
    id: "announcements",
    name: "announcements",
    type: "text",
    serverId: "main-server",
    createdAt: new Date(),
  },
  {
    id: "general-voice",
    name: "General",
    type: "voice",
    serverId: "main-server",
    createdAt: new Date(),
  },
  {
    id: "music-voice",
    name: "Music",
    type: "voice",
    serverId: "main-server",
    createdAt: new Date(),
  },
];

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentChannelId, setCurrentChannelId] = useState("general");

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#36393f] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const currentChannel = mockChannels.find(channel => channel.id === currentChannelId);

  if (!currentChannel) {
    return (
      <div className="min-h-screen bg-[#36393f] flex items-center justify-center">
        <div className="text-white text-lg">Channel not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#36393f]">
      <Sidebar
        channels={mockChannels}
        currentChannelId={currentChannelId}
        onChannelSelect={setCurrentChannelId}
      />
      <ChatWindow
        channelId={currentChannel.id}
        channelName={currentChannel.name}
        channelType={currentChannel.type}
      />
    </div>
  );
}

