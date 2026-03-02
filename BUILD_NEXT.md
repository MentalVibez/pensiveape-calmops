# Next Build Step (Incident Reset)

## 1) Apply DB schema in Supabase

Open Supabase SQL Editor and run:

`supabase/schema.sql`

## 2) Redeploy

After pushing code, redeploy on Vercel.

## 3) Test

1. Login at `/login`
2. Open `/app`
3. Click **Incident Reset Protocol**
4. Submit a reset
5. Confirm it appears in **Recent Resets**
