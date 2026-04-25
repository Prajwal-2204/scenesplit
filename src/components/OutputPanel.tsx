import { CopyButton } from './CopyButton'
import { DirectorLoader } from './DirectorLoader'
import { SectionCard } from './SectionCard'
import { ShotCard } from './ShotCard'
import type { BreakdownOutput } from '../lib/mockBreakdown'

type Status = 'idle' | 'loading' | 'ready'

type Props = {
  status: Status
  step: number
  directorSteps: string[]
  output: BreakdownOutput | null
}

export function OutputPanel({ status, step, directorSteps, output }: Props) {
  if (status === 'idle') {
    return (
      <div className="ss-panel">
        <div className="ss-panel-inner">
          <p className="text-sm font-semibold text-zinc-100">
            Script → shots, not just text.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-200/70">
            Paste a scene, then hit <span className="ss-kbd">Break into Scenes</span>.
            You’ll get a clean breakdown you can hand to a director, DP, or editor.
          </p>
        </div>
      </div>
    )
  }

  if (status === 'loading') {
    return <DirectorLoader steps={directorSteps} activeStep={step} />
  }

  if (!output) return null

  return (
    <div className="space-y-4">
      <SectionCard
        title="🎬 Scene Breakdown"
        subtitle="Beat, intent, and coverage notes."
        right={<CopyButton getText={() => output.sceneBreakdown} />}
      >
        <pre className="ss-codeblock">{output.sceneBreakdown}</pre>
      </SectionCard>

      <SectionCard
        title="🎥 Shot List"
        subtitle="Cards you can hand to a DP."
        right={
          <CopyButton
            label="Copy all"
            getText={() =>
              output.shotList
                .map((s, i) => {
                  return [
                    `Shot ${i + 1}: ${s.title}`,
                    `Action: ${s.action}`,
                    `Camera: ${s.camera}`,
                    `Lens: ${s.lens}`,
                    `Movement: ${s.movement}`,
                    `Lighting: ${s.lighting}`,
                    `Sound: ${s.sound}`,
                    `Duration: ${s.duration}`,
                    `AI Visual Prompt: ${s.aiVisualPrompt}`,
                  ].join('\n')
                })
                .join('\n\n---\n\n')
            }
          />
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {output.shotList.map((s, i) => (
            <ShotCard key={s.id} shot={s} index={i} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="🎨 Mood & Style"
        subtitle="Palette, pace, and emotional temperature."
        right={
          <CopyButton
            getText={() => output.moodAndStyle.map((m) => `- ${m}`).join('\n')}
          />
        }
        defaultCollapsed={false}
      >
        <div className="flex flex-wrap gap-2">
          {output.moodAndStyle.map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-200/80"
            >
              {m}
            </span>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

