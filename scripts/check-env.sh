#!/usr/bin/env bash
set -euo pipefail

required=(
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  STRIPE_SECRET_KEY
  STRIPE_WEBHOOK_SECRET
)

missing=0
for key in "${required[@]}"; do
  if [[ -z "${!key:-}" ]]; then
    echo "Missing: $key"
    missing=1
  fi
done

if [[ $missing -eq 1 ]]; then
  echo "\n❌ Missing required env vars. Fill .env.local first."
  exit 1
fi

echo "✅ All required env vars are present."
