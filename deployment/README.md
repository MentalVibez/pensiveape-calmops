# Deployment Credentials Area (PensiveApe CalmOps)

Use this folder as your safe template area for credentials.

## Files
- `.env.local.template` -> copy to project root as `.env.local` for local dev
- `.env.vercel.template` -> reference list for Vercel environment variables

## Setup
1. From project root:
   ```bash
   cp deployment/.env.local.template .env.local
   ```
2. Edit `.env.local` and paste your real keys.
3. In Vercel dashboard, add the same vars from `.env.vercel.template`.

## Important
- Never commit `.env.local` or real keys.
- Rotate keys if they are ever exposed in chat or public logs.
