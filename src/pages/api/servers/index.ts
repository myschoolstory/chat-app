import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock server data
const mockServers = [
  {
    id: "main-server",
    name: "Discord Clone Server",
    imageUrl: null,
    inviteCode: "discord-clone",
    userId: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
      // In a real app, filter servers by user membership
      return res.status(200).json({ servers: mockServers });

    case "POST":
      const { name, imageUrl } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Server name is required" });
      }

      const newServer = {
        id: `server-${Date.now()}`,
        name,
        imageUrl: imageUrl || null,
        inviteCode: Math.random().toString(36).substring(2, 8),
        userId: (session.user as any).id || session.user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockServers.push(newServer);

      return res.status(201).json({ server: newServer });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: "Method not allowed" });
  }
}

