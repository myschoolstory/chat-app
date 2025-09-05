import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Ably from "ably";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = new Ably.Rest({
      key: process.env.ABLY_API_KEY,
    });

    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: (session.user as any).id || session.user.email,
      capability: {
        '*': ['publish', 'subscribe', 'presence', 'history'],
      },
    });

    res.status(200).json(tokenRequestData);
  } catch (error) {
    console.error('Ably auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

