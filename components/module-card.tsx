export function ModuleCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </div>
  )
}
