import { type ReactNode, useId, useMemo, useState } from 'react'
import { IconChevronDown } from './Icons'

type Props = {
  title: string
  subtitle?: string
  right?: ReactNode
  defaultCollapsed?: boolean
  children: ReactNode
}

export function SectionCard({
  title,
  subtitle,
  right,
  defaultCollapsed = false,
  children,
}: Props) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const regionId = useId()

  const ariaLabel = useMemo(() => {
    return collapsed ? `Expand ${title}` : `Collapse ${title}`
  }, [collapsed, title])

  return (
    <section className="ss-panel overflow-hidden animate-fade-up">
      <div className="ss-panel-inner border-b border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-xs text-zinc-300/70">{subtitle}</p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {right}
            <button
              type="button"
              className="ss-btn-ghost px-2.5 py-1.5 text-xs text-zinc-200/90 hover:text-white"
              aria-controls={regionId}
              aria-expanded={!collapsed}
              aria-label={ariaLabel}
              onClick={() => setCollapsed((v) => !v)}
            >
              <IconChevronDown
                className={[
                  'h-4 w-4 transition-transform',
                  collapsed ? '-rotate-90' : 'rotate-0',
                ].join(' ')}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id={regionId}
        className={[
          'ss-panel-inner',
          collapsed ? 'hidden' : 'block',
        ].join(' ')}
      >
        {children}
      </div>
    </section>
  )
}

