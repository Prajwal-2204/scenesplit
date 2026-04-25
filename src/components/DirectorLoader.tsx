import { IconSpark } from './Icons'

type Props = {
  steps: string[]
  activeStep: number
}

export function DirectorLoader({ steps, activeStep }: Props) {
  return (
    <div className="ss-panel overflow-hidden">
      <div className="ss-panel-inner">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              Directing the scene
            </p>
            <p className="mt-1 text-xs text-zinc-300/70">
              Let the moment breathe. We’ll shape it shot by shot.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-200/70">
            <IconSpark className="h-4 w-4 text-fuchsia-200/80" />
            Live pass
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <div className="relative h-1.5">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400/30 via-violet-400/30 to-cyan-400/30" />
            <div className="absolute inset-0 opacity-50 blur-[10px] bg-gradient-to-r from-fuchsia-400/30 via-violet-400/30 to-cyan-400/30" />
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {steps.map((s, idx) => {
            const active = idx === activeStep
            const done = idx < activeStep
            return (
              <div
                key={s}
                className={[
                  'flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition',
                  active
                    ? 'border-fuchsia-200/30 bg-white/[0.06] text-white shadow-glow'
                    : done
                      ? 'border-white/10 bg-white/[0.02] text-zinc-100/80'
                      : 'border-white/10 bg-transparent text-zinc-200/50',
                ].join(' ')}
              >
                <span>{s}</span>
                <span className="font-mono tabular-nums text-zinc-200/60">
                  {done ? 'done' : active ? '…' : ''}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

