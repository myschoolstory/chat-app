"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Ably from "ably";
import { ChatMessage, OnlineUser } from "@/types";

export const useAbly = () => {
  const { data: session } = useSession();
  const [client, setClient] = useState<Ably.Realtime | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const ablyClient = new Ably.Realtime({
        authUrl: '/api/ably/auth',
        authMethod: 'POST',
        authHeaders: {
          'Content-Type': 'application/json',
        },
      });

      ablyClient.connection.on('connected', () => {
        setIsConnected(true);
      });

      ablyClient.connection.on('disconnected', () => {
        setIsConnected(false);
      });

      setClient(ablyClient);

      return () => {
        ablyClient.close();
      };
    }
  }, [session]);

  return { client, isConnected };
};

export const useChannel = (channelName: string) => {
  const { client } = useAbly();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!client) return;

      const channel = client.channels.get(channelName);
      const message: ChatMessage = {
        id: Math.random().toString(36).substring(2),
        content,
        timestamp: Date.now(),
        user: {
          id: "current-user", // This would come from session
          name: "Current User",
        },
        channelId: channelName,
      };

      channel.publish('message', message);
    },
    [client, channelName]
  );

  const enterPresence = useCallback(
    (userData: OnlineUser) => {
      if (!client) return;

      const channel = client.channels.get(channelName);
      channel.presence.enter(userData);
    },
    [client, channelName]
  );

  const leavePresence = useCallback(() => {
    if (!client) return;

    const channel = client.channels.get(channelName);
    channel.presence.leave();
  }, [client, channelName]);

  useEffect(() => {
    if (!client) return;

    const channel = client.channels.get(channelName);

    // Subscribe to messages
    const messageHandler = (message: Ably.Message) => {
      if (message.name === 'message') {
        setMessages((prev) => [...prev, message.data as ChatMessage]);
      }
    };

    // Subscribe to presence events
    const presenceHandler = (presenceMessage: Ably.PresenceMessage) => {
      setOnlineUsers((prev) => {
        const filtered = prev.filter(user => user.id !== presenceMessage.clientId);
        
        if (presenceMessage.action === 'enter' || presenceMessage.action === 'update') {
          return [...filtered, presenceMessage.data as OnlineUser];
        }
        
        return filtered;
      });
    };

    channel.subscribe(messageHandler);
    channel.presence.subscribe(presenceHandler);

    // Get current presence members
    channel.presence.get((err, members) => {
      if (!err && members) {
        setOnlineUsers(members.map(member => member.data as OnlineUser));
      }
    });

    // Load message history
    channel.history({ limit: 50 }, (err, resultPage) => {
      if (!err && resultPage) {
        const historicalMessages = resultPage.items
          .reverse()
          .map(message => message.data as ChatMessage);
        setMessages(historicalMessages);
      }
    });

    return () => {
      channel.unsubscribe(messageHandler);
      channel.presence.unsubscribe(presenceHandler);
    };
  }, [client, channelName]);

  return {
    messages,
    onlineUsers,
    sendMessage,
    enterPresence,
    leavePresence,
  };
};

