import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

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
      const user = {
        id: (session.user as any).id || session.user.email,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        username: (session.user as any).username || session.user.name,
        discriminator: (session.user as any).discriminator || "0001",
        createdAt: new Date().toISOString(),
      };

      return res.status(200).json({ user });

    case "PATCH":
      const { name, username } = req.body;

      // In a real app, update user in database
      const updatedUser = {
        id: (session.user as any).id || session.user.email,
        name: name || session.user.name,
        email: session.user.email,
        image: session.user.image,
        username: username || (session.user as any).username || session.user.name,
        discriminator: (session.user as any).discriminator || "0001",
        updatedAt: new Date().toISOString(),
      };

      return res.status(200).json({ user: updatedUser });

    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      return res.status(405).json({ error: "Method not allowed" });
  }
}

