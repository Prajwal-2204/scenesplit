import type { Shot } from '../lib/mockScene'
import { CopyButton } from './CopyButton'

type Props = {
  index: number
  shot: Shot
}

export function ShotCard({ index, shot }: Props) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-200/70">
            Shot {index + 1}
          </p>
          <h3 className="mt-1 truncate text-sm font-semibold text-zinc-100">
            {shot.title}
          </h3>
        </div>
        <CopyButton
          className="shrink-0"
          label="Copy shot"
          getText={() =>
            [
              `Shot ${index + 1}: ${shot.title}`,
              '',
              `Action: ${shot.action}`,
              `Camera: ${shot.camera}`,
              `Lens: ${shot.lens}`,
              `Movement: ${shot.movement}`,
              `Lighting: ${shot.lighting}`,
              `Sound: ${shot.sound}`,
              `Duration: ${shot.duration}`,
              '',
              `AI Visual Prompt:\n${shot.aiVisualPrompt}`,
            ].join('\n')
          }
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-200/80">
        {shot.action}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <dt className="text-zinc-200/60">Camera</dt>
          <dd className="mt-1 text-zinc-100/90">{shot.camera}</dd>
        </div>
        <div>
          <dt className="text-zinc-200/60">Lens</dt>
          <dd className="mt-1 text-zinc-100/90">{shot.lens}</dd>
        </div>
        <div>
          <dt className="text-zinc-200/60">Movement</dt>
          <dd className="mt-1 text-zinc-100/90">{shot.movement}</dd>
        </div>
        <div>
          <dt className="text-zinc-200/60">Lighting</dt>
          <dd className="mt-1 text-zinc-100/90">{shot.lighting}</dd>
        </div>
        <div>
          <dt className="text-zinc-200/60">Sound</dt>
          <dd className="mt-1 text-zinc-100/90">{shot.sound}</dd>
        </div>
        <div>
          <dt className="text-zinc-200/60">Duration</dt>
          <dd className="mt-1 text-zinc-100/90">{shot.duration}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[11px] font-medium tracking-wide text-zinc-200/60">
          AI Visual Prompt
        </p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-100/90">
          {shot.aiVisualPrompt}
        </p>
      </div>
    </article>
  )
}

