import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock message storage - in a real app, this would be a database
const mockMessages: { [channelId: string]: any[] } = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { channelId } = req.query;

  if (!channelId || typeof channelId !== "string") {
    return res.status(400).json({ error: "Invalid channel ID" });
  }

  switch (req.method) {
    case "GET":
      const { limit = "50", before } = req.query;
      const messages = mockMessages[channelId] || [];
      
      let filteredMessages = messages;
      
      if (before) {
        const beforeTimestamp = parseInt(before as string);
        filteredMessages = messages.filter(msg => msg.timestamp < beforeTimestamp);
      }
      
      const limitedMessages = filteredMessages
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, parseInt(limit as string))
        .reverse();

      return res.status(200).json({ messages: limitedMessages });

    case "POST":
      const { content, fileUrl } = req.body;

      if (!content && !fileUrl) {
        return res.status(400).json({ error: "Message content or file required" });
      }

      const newMessage = {
        id: Math.random().toString(36).substring(2),
        content: content || "",
        fileUrl: fileUrl || null,
        timestamp: Date.now(),
        user: {
          id: (session.user as any).id || session.user.email,
          name: session.user.name || session.user.email?.split('@')[0],
          avatar: session.user.image,
        },
        channelId,
        deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!mockMessages[channelId]) {
        mockMessages[channelId] = [];
      }

      mockMessages[channelId].push(newMessage);

      return res.status(201).json({ message: newMessage });

    case "DELETE":
      const { messageId } = req.body;

      if (!messageId) {
        return res.status(400).json({ error: "Message ID required" });
      }

      const channelMessages = mockMessages[channelId] || [];
      const messageIndex = channelMessages.findIndex(msg => msg.id === messageId);

      if (messageIndex === -1) {
        return res.status(404).json({ error: "Message not found" });
      }

      const message = channelMessages[messageIndex];

      // Check if user owns the message
      if (message.user.id !== ((session.user as any).id || session.user.email)) {
        return res.status(403).json({ error: "Unauthorized to delete this message" });
      }

      // Mark as deleted instead of removing
      channelMessages[messageIndex].deleted = true;
      channelMessages[messageIndex].content = "This message was deleted.";
      channelMessages[messageIndex].updatedAt = new Date().toISOString();

      return res.status(200).json({ message: channelMessages[messageIndex] });

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).json({ error: "Method not allowed" });
  }
}

