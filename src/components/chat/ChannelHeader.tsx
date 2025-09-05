"use client";

import { Hash, Volume2, Users, Search, Inbox, Pin, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChannelHeaderProps {
  channelName: string;
  channelType: "text" | "voice";
  onlineCount: number;
  onToggleUserList: () => void;
}

export function ChannelHeader({ 
  channelName, 
  channelType, 
  onlineCount, 
  onToggleUserList 
}: ChannelHeaderProps) {
  const ChannelIcon = channelType === "text" ? Hash : Volume2;

  return (
    <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center justify-between px-4">
      {/* Left side - Channel info */}
      <div className="flex items-center space-x-3">
        <ChannelIcon className="w-5 h-5 text-[#8e9297]" />
        <h2 className="font-semibold text-white">{channelName}</h2>
        <div className="w-px h-6 bg-[#4f545c]" />
        <p className="text-sm text-[#72767d]">
          {channelType === "text" 
            ? "This is the beginning of the channel" 
            : `${onlineCount} connected`
          }
        </p>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
        >
          <Hash className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
        >
          <Pin className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
        >
          <Users className="w-5 h-5" />
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
        >
          <Inbox className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
        >
          <CircleHelp className="w-5 h-5" />
        </Button>

        <Button
          onClick={onToggleUserList}
          variant="ghost"
          size="icon"
          className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
        >
          <Users className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

