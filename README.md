# Class 1C Quiz Gift Board

The board uses Supabase Realtime so viewers on different devices see gift-count changes without refreshing. Anonymous visitors can read the board; only signed-in teacher accounts can edit it.

## Configure Supabase

1. Create a Supabase project.
2. In **SQL Editor**, run [`supabase/setup.sql`](supabase/setup.sql).
3. In **Authentication settings**, disable public sign-ups, then create the teacher account from **Authentication → Users**. Use that email and password in the teacher login dialog.
4. In **Project Settings → API**, copy the Project URL and the anon/public key.
5. Add them to a local `.env.local` file using the names in [`.env.example`](.env.example).
6. Add the same variables in Vercel under **Project Settings → Environment Variables**, for Production and Preview, then redeploy.

Never put the Supabase `service_role` key in this frontend. The anon/public key is intended for client use; row-level security in `supabase/setup.sql` controls writes. Keep public sign-ups disabled so only the teacher account can change the board.

Without Supabase environment variables, the app uses local browser storage and displays **仅此设备** instead of claiming cross-device sync. After configuration, it displays **实时同步中** when connected.

The roster contains students' names. Anyone with the public board link can read it, so only share the link with its intended audience or remove identifying names before making the site public.