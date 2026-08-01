export function RouteHydrationFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-5">
      <div role="status" aria-live="polite" className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-brand-700 font-display text-lg font-bold text-white shadow-sm">
          T
        </span>
        <p className="mt-4 font-display text-lg font-bold tracking-tight text-ink">Topscore Learning</p>
        <p className="mt-1 text-sm text-slate-600">Loading page…</p>
      </div>
    </div>
  )
}
