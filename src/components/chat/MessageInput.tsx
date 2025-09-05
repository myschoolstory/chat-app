"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Plus, Gift, Smile } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
}

export function MessageInput({ onSendMessage, placeholder = "Type a message..." }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="px-4 pb-6">
      <div className="bg-[#40444b] rounded-lg border border-[#4f545c] focus-within:border-[#5865f2] transition-colors">
        <div className="flex items-end p-3">
          {/* Add attachment button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c] mr-2 mb-1"
          >
            <Plus className="w-5 h-5" />
          </Button>

          {/* Message input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full bg-transparent text-white placeholder-[#72767d] resize-none outline-none min-h-[24px] max-h-[200px] leading-6"
              rows={1}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 ml-2 mb-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
            >
              <Gift className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-[#b9bbbe] hover:text-white hover:bg-[#4f545c]"
            >
              <Smile className="w-5 h-5" />
            </Button>

            {message.trim() && (
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

