"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/types";
import { formatTimestamp } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#72767d]">
        <div className="text-center">
          <div className="text-4xl mb-4">👋</div>
          <h3 className="text-lg font-semibold text-[#b9bbbe] mb-2">
            No messages yet
          </h3>
          <p className="text-sm">
            Be the first to send a message in this channel!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map((message, index) => {
        const showAvatar = index === 0 || messages[index - 1].user.id !== message.user.id;
        const isConsecutive = index > 0 && messages[index - 1].user.id === message.user.id;

        return (
          <div
            key={message.id}
            className={`flex items-start space-x-3 hover:bg-[#32353b] px-3 py-1 rounded group ${
              isConsecutive ? "mt-1" : "mt-4"
            }`}
          >
            {showAvatar ? (
              <Avatar
                src={message.user.avatar}
                alt={message.user.name}
                fallback={message.user.name.charAt(0).toUpperCase()}
                className="w-10 h-10 mt-1"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-[#72767d]">
                  {formatTimestamp(message.timestamp).split(' ')[0]}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              {showAvatar && (
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="font-medium text-white">
                    {message.user.name}
                  </span>
                  <span className="text-xs text-[#72767d]">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              )}
              <div className="text-[#dcddde] break-words">
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

