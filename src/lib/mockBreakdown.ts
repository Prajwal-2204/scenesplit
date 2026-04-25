import type { Shot } from './mockScene'
import { getMockSceneSplitOutput } from './mockScene'

export type Mode = 'script' | 'idea'

export type BreakdownOutput = {
  sceneBreakdown: string
  shotList: Shot[]
  moodAndStyle: string[]
}

function excerpt(input: string) {
  const s = input.trim().replace(/\s+/g, ' ')
  if (!s) return ''
  return s.length > 140 ? `${s.slice(0, 140)}…` : s
}

export function getMockBreakdownOutput(
  input: string,
  mode: Mode,
): BreakdownOutput {
  const base = getMockSceneSplitOutput(input)
  const seed = excerpt(input)

  if (mode === 'idea') {
    return {
      sceneBreakdown: base.sceneSummary,
      shotList: base.shotBreakdown,
      moodAndStyle: base.moodAndTone,
    }
  }

  const hook = seed
    ? `Script excerpt: ${seed}`
    : 'Script excerpt: (paste a scene to get a tailored breakdown)'

  return {
    sceneBreakdown: `We treat the text like coverage: identify the emotional beat, then block the action into camera-readable moments.

- **Objective beat**: a small choice under pressure (silence does the work).
- **Playable actions**: enter / hesitate / conceal / reveal.
- **Visual motif**: repeating marks, reflections, or a “blade” of light that returns in the final shot.
- **Cut points**: end each shot on a decision, not a sentence.

${hook}`,
    shotList: base.shotBreakdown,
    moodAndStyle: [
      ...base.moodAndTone,
      'Coverage-first blocking (editor-friendly)',
      'Dialogue served by reactions, not lines',
    ],
  }
}

