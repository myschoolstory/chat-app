"use client";

import { OnlineUser } from "@/types";
import { Avatar } from "@/components/ui/Avatar";

interface UserListProps {
  users: OnlineUser[];
}

export function UserList({ users }: UserListProps) {
  const getStatusColor = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'busy':
        return 'Do Not Disturb';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const onlineUsers = users.filter(user => user.status === 'online');
  const awayUsers = users.filter(user => user.status === 'away');
  const busyUsers = users.filter(user => user.status === 'busy');
  const offlineUsers = users.filter(user => user.status === 'offline');

  const UserSection = ({ title, users, count }: { title: string; users: OnlineUser[]; count: number }) => {
    if (users.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#8e9297] uppercase tracking-wide mb-2 px-2">
          {title} — {count}
        </h3>
        <div className="space-y-1">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 px-2 py-1 rounded hover:bg-[#34373c] cursor-pointer group"
            >
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  fallback={user.name.charAt(0).toUpperCase()}
                  className="w-8 h-8"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2f3136] ${getStatusColor(user.status)}`}
                  title={getStatusText(user.status)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#dcddde] truncate">
                  {user.name}
                </div>
                <div className="text-xs text-[#72767d] truncate">
                  {getStatusText(user.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <UserSection title="Online" users={onlineUsers} count={onlineUsers.length} />
        <UserSection title="Away" users={awayUsers} count={awayUsers.length} />
        <UserSection title="Do Not Disturb" users={busyUsers} count={busyUsers.length} />
        <UserSection title="Offline" users={offlineUsers} count={offlineUsers.length} />
        
        {users.length === 0 && (
          <div className="text-center text-[#72767d] mt-8">
            <div className="text-2xl mb-2">👥</div>
            <p className="text-sm">No users online</p>
          </div>
        )}
      </div>
    </div>
  );
}

