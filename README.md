# Discord Clone

A modern, real-time chat application built with Next.js, TypeScript, Ably, and NextAuth. This project demonstrates best practices for building scalable, serverless applications with real-time messaging capabilities.

## Features

- 🔐 **Authentication**: Multiple auth providers (Discord, Google, Credentials) via NextAuth.js
- 💬 **Real-time Messaging**: Powered by Ably for instant message delivery
- 👥 **User Presence**: See who's online in real-time
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Discord-like UI**: Familiar interface with dark theme
- ⚡ **Serverless**: Optimized for Vercel deployment
- 🔒 **Type Safety**: Full TypeScript implementation
- 🚀 **Performance**: Optimized with Next.js 15 and Turbopack

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Real-time**: Ably
- **Deployment**: Vercel
- **Icons**: Lucide React

## Project Structure

```
discord-clone/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   └── SignInButton.tsx
│   │   ├── chat/
│   │   │   ├── ChannelHeader.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── UserList.tsx
│   │   ├── layout/
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── Avatar.tsx
│   │       └── Button.tsx
│   ├── hooks/
│   │   └── useAbly.ts
│   ├── lib/
│   │   ├── ably.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── pages/
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth].ts
│   │       ├── ably/
│   │       │   └── auth.ts
│   │       ├── channels/
│   │       │   ├── index.ts
│   │       │   └── [channelId]/
│   │       │       └── messages.ts
│   │       ├── servers/
│   │       │   └── index.ts
│   │       └── users/
│   │           └── me.ts
│   └── types/
│       └── index.ts
├── .env.local.example
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Ably account (free tier available)
- OAuth providers (Discord, Google) - optional

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discord-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   ABLY_API_KEY=your-ably-api-key
   
   # Optional OAuth providers
   DISCORD_CLIENT_ID=your-discord-client-id
   DISCORD_CLIENT_SECRET=your-discord-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Ably Setup

1. Create an account at [Ably.com](https://ably.com)
2. Create a new app
3. Copy your API key to `ABLY_API_KEY` in `.env.local`

### OAuth Providers (Optional)

#### Discord OAuth
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Add OAuth2 redirect URI: `http://localhost:3000/api/auth/callback/discord`
4. Copy Client ID and Secret to your `.env.local`

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to your `.env.local`

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Import your project on [Vercel](https://vercel.com)
   - Connect your Git repository

2. **Set environment variables**
   Add all environment variables from `.env.local` to your Vercel project settings

3. **Update OAuth redirect URIs**
   Update your OAuth provider settings with your production domain:
   - Discord: `https://your-domain.vercel.app/api/auth/callback/discord`
   - Google: `https://your-domain.vercel.app/api/auth/callback/google`

4. **Deploy**
   Vercel will automatically deploy your application

## API Routes

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### Ably
- `POST /api/ably/auth` - Generate Ably auth token

### Channels
- `GET /api/channels` - Get all channels
- `POST /api/channels` - Create new channel
- `GET /api/channels/[channelId]/messages` - Get channel messages
- `POST /api/channels/[channelId]/messages` - Send message
- `DELETE /api/channels/[channelId]/messages` - Delete message

### Servers
- `GET /api/servers` - Get user servers
- `POST /api/servers` - Create new server

### Users
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update user profile

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Ably](https://ably.com/) for real-time messaging infrastructure
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for beautiful icons
- [Discord](https://discord.com/) for UI/UX inspiration
