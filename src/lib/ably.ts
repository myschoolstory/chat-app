import Ably from "ably";

let ablyClient: Ably.Realtime | null = null;

export const getAblyClient = (authToken?: string): Ably.Realtime => {
  if (!ablyClient) {
    if (authToken) {
      ablyClient = new Ably.Realtime({
        authUrl: '/api/ably/auth',
        authMethod: 'POST',
      });
    } else {
      // For server-side usage
      ablyClient = new Ably.Realtime({
        key: process.env.ABLY_API_KEY,
      });
    }
  }
  return ablyClient;
};

export const createAblyChannel = (channelName: string) => {
  const client = getAblyClient();
  return client.channels.get(channelName);
};

export const subscribeToChannel = (
  channelName: string,
  callback: (message: Ably.Message) => void
) => {
  const channel = createAblyChannel(channelName);
  channel.subscribe(callback);
  return channel;
};

export const publishToChannel = (
  channelName: string,
  eventName: string,
  data: any
) => {
  const channel = createAblyChannel(channelName);
  return channel.publish(eventName, data);
};

export const enterChannelPresence = (
  channelName: string,
  userData: any
) => {
  const channel = createAblyChannel(channelName);
  return channel.presence.enter(userData);
};

export const leaveChannelPresence = (channelName: string) => {
  const channel = createAblyChannel(channelName);
  return channel.presence.leave();
};

export const subscribeToPresence = (
  channelName: string,
  callback: (presenceMessage: Ably.PresenceMessage) => void
) => {
  const channel = createAblyChannel(channelName);
  channel.presence.subscribe(callback);
  return channel;
};

export const getChannelHistory = async (
  channelName: string,
  limit: number = 50
) => {
  const channel = createAblyChannel(channelName);
  const history = await channel.history({ limit });
  return history.items;
};

// Utility function to format channel names
export const formatChannelName = (serverId: string, channelId: string): string => {
  return `server:${serverId}:channel:${channelId}`;
};

export const formatDirectMessageChannel = (userId1: string, userId2: string): string => {
  // Sort user IDs to ensure consistent channel naming
  const sortedIds = [userId1, userId2].sort();
  return `dm:${sortedIds[0]}:${sortedIds[1]}`;
};

export const formatPresenceChannel = (serverId: string): string => {
  return `presence:server:${serverId}`;
};

