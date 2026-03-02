import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ResetForm } from './reset-form'

export const dynamic = 'force-dynamic'

export default async function IncidentResetPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: rows } = await supabase
    .from('incident_resets')
    .select('id, trigger_type, stress_level_before, stress_level_after, notes, created_at')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Incident Reset Protocol</h1>
          <p className="mt-1 text-slate-300">Capture and regulate pressure moments in under 5 minutes.</p>
        </div>
        <Link href="/app" className="rounded-lg border border-slate-600 px-3 py-2 text-sm">Back</Link>
      </div>

      <ResetForm />

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Recent Resets</h2>
        <div className="space-y-3">
          {(rows ?? []).length === 0 ? (
            <p className="text-sm text-slate-400">No resets yet.</p>
          ) : (
            rows?.map((row) => (
              <article key={row.id} className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 text-sm">
                <p><span className="text-slate-400">Trigger:</span> {row.trigger_type}</p>
                <p><span className="text-slate-400">Before:</span> {row.stress_level_before} / 10</p>
                {row.stress_level_after ? <p><span className="text-slate-400">After:</span> {row.stress_level_after} / 10</p> : null}
                {row.notes ? <p className="mt-2 text-slate-300">{row.notes}</p> : null}
                <p className="mt-2 text-xs text-slate-500">{new Date(row.created_at).toLocaleString()}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
