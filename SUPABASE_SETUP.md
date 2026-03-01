# Supabase Setup (CalmOps)

## 1) In Supabase Auth settings

- Enable **Email** provider
- Keep confirmation email on (recommended)
- Add redirect URL(s):
  - `http://localhost:3000/auth/callback`
  - `https://app.pensiveape.com/auth/callback` (after deploy)

## 2) Required env vars

Already used in this app:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3) Local test

1. `npm run dev`
2. Open `http://localhost:3000/login`
3. Create account
4. Confirm email
5. Sign in and verify `/app` opens

## 4) Vercel

Add the same env vars to your Vercel project for Preview + Production.
