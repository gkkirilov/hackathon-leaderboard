# AI Hackathon Leaderboard

A real-time hackathon leaderboard application with team-based chat built with Nuxt.js and Supabase.

## Features

- **Team-Based Profiles**: Users can set their name and team color
- **Idea Submissions**: Teams can submit their hackathon ideas with title, description, and tech stack
- **Real-Time Chat**: Global chat for all participants powered by Supabase Broadcast
- **Voting System**: Admin-controlled voting for submissions in three categories:
  - Best Design
  - Most Entertaining
  - Most Creative
- **Live Leaderboard**: Real-time leaderboard showing rankings by category
- **Admin Controls**: Toggle voting on/off

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd hackathon-leaderboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema in `server/sql/schema.sql` in the Supabase SQL Editor
3. Update your Supabase URL and anon key in `nuxt.config.ts`

### 4. Run the development server

```bash
npm run dev
```

### 5. Set up an admin user

After signing up, you need to manually set a user as admin in the Supabase database:

```sql
UPDATE profiles
SET is_admin = true
WHERE id = 'YOUR_USER_ID';
```

## Database Schema

The application uses the following tables:

- `profiles`: User profiles with name and team information
- `submissions`: Team submissions with title, description, and tech stack
- `votes`: User votes for submissions in specific categories
- `messages`: Chat messages
- `settings`: Application settings (like voting status)

## Usage Instructions

1. **User Setup**: First-time users need to set their name and team color
2. **Submissions**: Teams can submit their hackathon ideas anytime
3. **Chat**: The global chat is available for all participants
4. **Voting**: 
   - Admins must enable voting from the admin panel
   - Each user can vote once per category
   - Leaderboards update in real-time as votes come in

## Technologies Used

- **Nuxt.js 3**: Vue.js framework with auto-imports and file-based routing
- **Supabase**: 
  - Authentication
  - PostgreSQL database
  - Realtime updates with Broadcast
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn Vue**: UI component library

## License

MIT