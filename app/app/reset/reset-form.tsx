'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { saveIncidentReset } from './actions'

const initialState: { ok: boolean; error?: string } = { ok: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-indigo-500 px-4 py-2 font-medium disabled:opacity-60"
    >
      {pending ? 'Saving…' : 'Save Reset'}
    </button>
  )
}

export function ResetForm() {
  const [state, formAction] = useFormState(saveIncidentReset, initialState)

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-slate-700 bg-slate-900/40 p-5">
      <div>
        <label className="mb-1 block text-sm">What triggered this pressure moment?</label>
        <input
          name="triggerType"
          required
          placeholder="Example: Pager alert, production latency spike"
          className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Stress level before (1-10)</label>
          <input name="stressBefore" type="number" min={1} max={10} required className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Stress level after (1-10, optional)</label>
          <input name="stressAfter" type="number" min={1} max={10} className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm">Notes (optional)</label>
        <textarea
          name="notes"
          rows={4}
          placeholder="What helped? What should be done differently next time?"
          className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2"
        />
      </div>

      <SubmitButton />

      {state?.ok ? <p className="text-sm text-emerald-300">Saved successfully.</p> : null}
      {state?.error ? <p className="text-sm text-amber-300">{state.error}</p> : null}
    </form>
  )
}
