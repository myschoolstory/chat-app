import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export function generateChannelId(serverId: string, channelName: string): string {
  return `${serverId}-${channelName.toLowerCase().replace(/\s+/g, '-')}`;
}

export function generateUserId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getAvatarUrl(userId: string, avatar?: string): string {
  if (avatar) {
    return avatar;
  }
  // Generate a default avatar based on user ID
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const colorIndex = userId.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${userId}&background=${colors[colorIndex].replace('bg-', '').replace('-500', '')}&color=fff`;
}

