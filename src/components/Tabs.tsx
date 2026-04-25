import { useMemo } from 'react'

export type TabOption = { id: string; label: string }

type Props = {
  options: TabOption[]
  value: string
  onChange: (id: string) => void
}

export function Tabs({ options, value, onChange }: Props) {
  const activeIdx = useMemo(() => {
    return Math.max(
      0,
      options.findIndex((o) => o.id === value),
    )
  }, [options, value])

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
      {options.map((o, idx) => {
        const active = idx === activeIdx
        return (
          <button
            key={o.id}
            type="button"
            className={[
              'rounded-lg px-3 py-1.5 text-xs font-medium transition',
              active
                ? 'bg-white/10 text-white'
                : 'text-zinc-200/70 hover:text-white',
            ].join(' ')}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

