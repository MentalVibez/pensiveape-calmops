'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createActionClient } from '@/lib/supabase/server-action'

const schema = z.object({
  triggerType: z.string().min(2).max(120),
  stressBefore: z.coerce.number().min(1).max(10),
  stressAfter: z.coerce.number().min(1).max(10).optional(),
  notes: z.string().max(2000).optional(),
})

export async function saveIncidentReset(
  _prevState: { ok: boolean; error?: string },
  formData: FormData
) {
  const supabase = createActionClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const parsed = schema.safeParse({
    triggerType: formData.get('triggerType'),
    stressBefore: formData.get('stressBefore'),
    stressAfter: formData.get('stressAfter') || undefined,
    notes: formData.get('notes') || undefined,
  })

  if (!parsed.success) {
    return { ok: false, error: 'Please check your inputs.' }
  }

  const { triggerType, stressBefore, stressAfter, notes } = parsed.data

  const { error } = await supabase.from('incident_resets').insert({
    user_id: user.id,
    trigger_type: triggerType,
    stress_level_before: stressBefore,
    stress_level_after: stressAfter ?? null,
    notes: notes ?? null,
  })

  if (error) {
    return { ok: false, error: error.message }
  }

  revalidatePath('/app/reset')
  return { ok: true }
}
