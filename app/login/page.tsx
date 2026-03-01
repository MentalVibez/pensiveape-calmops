'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) return setMessage(error.message)

    router.push('/app')
    router.refresh()
  }

  async function signUp() {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) return setMessage(error.message)

    setMessage('Account created. Check your email to confirm, then sign in.')
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">Login to CalmOps</h1>
      <p className="mt-2 text-sm text-slate-300">Use your email and password.</p>

      <form onSubmit={signIn} className="mt-6 space-y-4 rounded-xl border border-slate-700 bg-slate-900/40 p-5">
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <button disabled={loading} type="submit" className="rounded-lg bg-indigo-500 px-4 py-2 font-medium disabled:opacity-60">
            {loading ? 'Working…' : 'Sign in'}
          </button>
          <button disabled={loading} type="button" onClick={signUp} className="rounded-lg border border-slate-600 px-4 py-2 disabled:opacity-60">
            Create account
          </button>
        </div>

        {message ? <p className="text-sm text-amber-300">{message}</p> : null}
      </form>
    </main>
  )
}
