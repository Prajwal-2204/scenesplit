import { IconSpark } from './Icons'
import { Tabs } from './Tabs'
import type { Mode } from '../lib/mockBreakdown'
import { Spinner } from './Spinner'

type Props = {
  mode: Mode
  onModeChange: (m: Mode) => void
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

const SCRIPT_PLACEHOLDER = `Example:
INT. ROOM – NIGHT
A man sits alone. Rain hits the window.
He checks his phone. No messages.
Lights flicker.`

export function InputPanel({
  mode,
  onModeChange,
  value,
  onChange,
  onSubmit,
  loading,
}: Props) {
  const heading = mode === 'script' ? 'Paste your script' : 'Your scene idea'
  const subheading =
    mode === 'script'
      ? 'Drop your screenplay, dialogue, or story. SceneSplit will break it into cinematic shots.'
      : 'Talk like a director. What do we see, feel, and hear?'

  return (
    <section className="ss-panel overflow-hidden">
      <div className="ss-panel-inner">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
              {heading}
            </h2>
            <p className="mt-1 text-xs text-zinc-300/70">{subheading}</p>
          </div>

          <button
            type="button"
            className="ss-btn-primary shrink-0"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <Spinner /> : <IconSpark className="h-4 w-4" />}
            {loading ? 'Analyzing…' : 'Break into Scenes'}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Tabs
            options={[
              { id: 'script', label: 'Script Mode' },
              { id: 'idea', label: 'Idea Mode' },
            ]}
            value={mode}
            onChange={(id) => onModeChange(id === 'idea' ? 'idea' : 'script')}
          />

          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-200/60">
            <span className="ss-kbd">Ctrl</span>
            <span className="text-zinc-200/50">+</span>
            <span className="ss-kbd">Enter</span>
          </div>
        </div>

        <div className="mt-4">
          <textarea
            className="min-h-[260px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-300/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/20 focus:shadow-glow"
            placeholder={mode === 'script' ? SCRIPT_PLACEHOLDER : 'Describe your scene or idea...'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                onSubmit()
              }
            }}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="ss-btn-ghost"
              onClick={() => onChange('')}
              disabled={loading || !value.trim()}
            >
              Clear
            </button>
            <button
              type="button"
              className="ss-btn-ghost"
              onClick={() => {
                if (mode === 'script') {
                  onChange(
                    `INT. ROOM – NIGHT
A man sits alone. Rain hits the window.
He checks his phone. No messages.
Lights flicker.

MAN
(to himself)
Come on…`,
                  )
                } else {
                  onChange(
                    'A young thief returns to the rooftop where they once promised to leave the city. A storm is rolling in. They meet the friend they betrayed — and neither says the thing that matters.',
                  )
                }
              }}
              disabled={loading}
            >
              Load sample
            </button>
          </div>

          <p className="text-xs text-zinc-200/50">
            {mode === 'script'
              ? 'Best results: paste one scene at a time.'
              : 'Keep it short—one clear moment.'}
          </p>
        </div>
      </div>
    </section>
  )
}

