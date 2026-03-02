import { redirect } from 'next/navigation'
import { ModuleCard } from '@/components/module-card'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">CalmOps Dashboard</h1>
          <p className="mt-2 text-slate-300">Signed in as {user.email}</p>
        </div>
        <form action="/auth/signout" method="post">
          <button className="rounded-lg border border-slate-600 px-3 py-2 text-sm">Sign out</button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <a href="/app/reset" className="block">
          <ModuleCard title="Incident Reset Protocol" desc="3–5 minute guided reset before/after high-pressure work." />
        </a>
        <ModuleCard title="Post-Incident Debrief" desc="Generate structured debrief notes and action items. (Coming soon)" />
        <ModuleCard title="Shift Handoff Builder" desc="Create concise handoff notes for async continuity. (Coming soon)" />
        <ModuleCard title="Burnout Risk Check-in" desc="Weekly signal check with practical recommendations. (Coming soon)" />
      </div>
    </main>
  )
}
