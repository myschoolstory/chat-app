"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useChannel } from "@/hooks/useAbly";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { UserList } from "./UserList";
import { ChannelHeader } from "./ChannelHeader";
import { Hash, Volume2, Settings, Users } from "lucide-react";

interface ChatWindowProps {
  channelId: string;
  channelName: string;
  channelType: "text" | "voice";
}

export function ChatWindow({ channelId, channelName, channelType }: ChatWindowProps) {
  const { data: session } = useSession();
  const [showUserList, setShowUserList] = useState(true);
  const { messages, onlineUsers, sendMessage, enterPresence, leavePresence } = useChannel(channelId);

  useEffect(() => {
    if (session?.user) {
      const userData = {
        id: (session.user as any).id || session.user.email!,
        name: session.user.name || session.user.email!.split('@')[0],
        avatar: session.user.image,
        status: 'online' as const,
      };

      enterPresence(userData);

      return () => {
        leavePresence();
      };
    }
  }, [session, enterPresence, leavePresence]);

  const handleSendMessage = (content: string) => {
    if (content.trim()) {
      sendMessage(content);
    }
  };

  return (
    <div className="flex flex-1 bg-[#36393f]">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Channel Header */}
        <ChannelHeader
          channelName={channelName}
          channelType={channelType}
          onlineCount={onlineUsers.length}
          onToggleUserList={() => setShowUserList(!showUserList)}
        />

        {/* Messages Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <MessageList messages={messages} />
          {channelType === "text" && (
            <MessageInput
              onSendMessage={handleSendMessage}
              placeholder={`Message #${channelName}`}
            />
          )}
        </div>
      </div>

      {/* User List Sidebar */}
      {showUserList && (
        <div className="w-60 bg-[#2f3136] border-l border-[#202225]">
          <UserList users={onlineUsers} />
        </div>
      )}
    </div>
  );
}

