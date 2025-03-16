# AI Hackathon Leaderboard

A real-time hackathon leaderboard application with team-based chat built with Nuxt.js and Supabase.

## Features

- **Team-Based Profiles**: Users can set their name and team color
- **Idea Submissions**: Teams can submit their hackathon ideas with title, description, and tech stack
- **Real-Time Chat**: Global chat for all participants powered by Supabase Broadcast
- **File Sharing**: Users can upload and share files in the chat
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
3. Create a storage bucket named 'chat-files' for file uploads
4. Set up storage policies for the bucket (or use the debug tools in the app)
5. Update your Supabase URL and anon key in `nuxt.config.ts`
6. For file uploads, add your service role key to the environment variables

### 4. Environment Variables

Create a `.env` file with the following variables:

```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Run the development server

```bash
npm run dev
```

### 6. Set up an admin user

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
- `messages`: Chat messages with optional file attachments
- `settings`: Application settings (like voting status)

## File Upload System

The application supports file uploads in the chat using three approaches:

1. **Server-Side API (Recommended)**: Files are uploaded through a server-side API endpoint that uses the Supabase service role key
2. **Direct Upload**: Files can be uploaded directly to Supabase Storage using the service role client
3. **Bucket Policies**: Files can be uploaded using properly configured bucket policies

Debug tools are available at `/debug` to test and troubleshoot file uploads.

## Usage Instructions

1. **User Setup**: First-time users need to set their name and team color
2. **Submissions**: Teams can submit their hackathon ideas anytime
3. **Chat**: The global chat is available for all participants
   - Users can send text messages
   - Users can upload and share files (images, PDFs, documents, etc.)
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
  - Storage for file uploads
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn Vue**: UI component library

## License

MIT