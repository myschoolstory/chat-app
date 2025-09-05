export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string;
  discriminator?: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  serverId: string;
  createdAt: Date;
}

export interface Server {
  id: string;
  name: string;
  imageUrl?: string;
  inviteCode: string;
  userId: string;
  channels: Channel[];
  members: Member[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  role: MemberRole;
  userId: string;
  user: User;
  serverId: string;
  server: Server;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  fileUrl?: string;
  memberId: string;
  member: Member;
  channelId: string;
  channel: Channel;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  memberOneId: string;
  memberOne: Member;
  memberTwoId: string;
  memberTwo: Member;
  directMessages: DirectMessage[];
}

export interface DirectMessage {
  id: string;
  content: string;
  fileUrl?: string;
  memberId: string;
  member: Member;
  conversationId: string;
  conversation: Conversation;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST"
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  channelId: string;
}

export interface OnlineUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

