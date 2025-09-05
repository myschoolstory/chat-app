"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Hash, Volume2, Plus, Settings, Mic, Headphones, Cog } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Channel } from "@/types";

interface SidebarProps {
  channels: Channel[];
  currentChannelId: string;
  onChannelSelect: (channelId: string) => void;
}

export function Sidebar({ channels, currentChannelId, onChannelSelect }: SidebarProps) {
  const { data: session } = useSession();
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const textChannels = channels.filter(channel => channel.type === "text");
  const voiceChannels = channels.filter(channel => channel.type === "voice");

  const ChannelItem = ({ channel }: { channel: Channel }) => {
    const Icon = channel.type === "text" ? Hash : Volume2;
    const isActive = channel.id === currentChannelId;

    return (
      <button
        onClick={() => onChannelSelect(channel.id)}
        className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-left hover:bg-[#34373c] group ${
          isActive ? "bg-[#404249] text-white" : "text-[#8e9297]"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium truncate">{channel.name}</span>
      </button>
    );
  };

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col h-full">
      {/* Server Header */}
      <div className="h-12 border-b border-[#202225] flex items-center justify-between px-4">
        <h1 className="font-semibold text-white">Discord Clone</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#34373c]"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Text Channels */}
        {textChannels.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-xs font-semibold text-[#8e9297] uppercase tracking-wide">
                Text Channels
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="w-4 h-4 text-[#8e9297] hover:text-white"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {textChannels.map((channel) => (
                <ChannelItem key={channel.id} channel={channel} />
              ))}
            </div>
          </div>
        )}

        {/* Voice Channels */}
        {voiceChannels.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-xs font-semibold text-[#8e9297] uppercase tracking-wide">
                Voice Channels
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="w-4 h-4 text-[#8e9297] hover:text-white"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {voiceChannels.map((channel) => (
                <ChannelItem key={channel.id} channel={channel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Panel */}
      <div className="h-14 bg-[#292b2f] flex items-center justify-between px-2">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <Avatar
            src={session?.user?.image}
            alt={session?.user?.name || "User"}
            fallback={session?.user?.name?.charAt(0) || "U"}
            className="w-8 h-8"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {session?.user?.name || "User"}
            </div>
            <div className="text-xs text-[#b9bbbe] truncate">
              #{(session?.user as any)?.discriminator || "0001"}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-8 h-8 ${
              isMuted 
                ? "text-red-400 hover:text-red-300" 
                : "text-[#b9bbbe] hover:text-white"
            }`}
          >
            <Mic className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDeafened(!isDeafened)}
            className={`w-8 h-8 ${
              isDeafened 
                ? "text-red-400 hover:text-red-300" 
                : "text-[#b9bbbe] hover:text-white"
            }`}
          >
            <Headphones className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b9bbbe] hover:text-white"
          >
            <Cog className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

