import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-4xl font-bold">PensiveApe CalmOps</h1>
      <p className="mt-3 text-slate-300">Stay reliable under pressure without burning out.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/login" className="rounded-lg bg-indigo-500 px-4 py-2 font-medium">Get Started</Link>
        <Link href="/app" className="rounded-lg border border-slate-600 px-4 py-2">Open App</Link>
      </div>
    </main>
  )
}
