import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock data - in a real app, this would come from a database
const mockChannels = [
  {
    id: "general",
    name: "general",
    type: "text",
    serverId: "main-server",
    createdAt: new Date().toISOString(),
  },
  {
    id: "random",
    name: "random",
    type: "text",
    serverId: "main-server",
    createdAt: new Date().toISOString(),
  },
  {
    id: "announcements",
    name: "announcements",
    type: "text",
    serverId: "main-server",
    createdAt: new Date().toISOString(),
  },
  {
    id: "general-voice",
    name: "General",
    type: "voice",
    serverId: "main-server",
    createdAt: new Date().toISOString(),
  },
  {
    id: "music-voice",
    name: "Music",
    type: "voice",
    serverId: "main-server",
    createdAt: new Date().toISOString(),
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  switch (req.method) {
    case "GET":
      return res.status(200).json({ channels: mockChannels });

    case "POST":
      const { name, type, serverId } = req.body;

      if (!name || !type || !serverId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newChannel = {
        id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        name,
        type,
        serverId,
        createdAt: new Date().toISOString(),
      };

      // In a real app, save to database
      mockChannels.push(newChannel);

      return res.status(201).json({ channel: newChannel });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: "Method not allowed" });
  }
}

