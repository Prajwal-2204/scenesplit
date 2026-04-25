export type Shot = {
  id: string
  title: string
  action: string
  camera: string
  lens: string
  movement: string
  lighting: string
  sound: string
  duration: string
  aiVisualPrompt: string
}

export type SceneSplitVariation = {
  title: string
  cinematicRewrite: string
  directorNote: string
}

export type SceneSplitOutput = {
  sceneSummary: string
  cinematicRewrite: string
  shotBreakdown: Shot[]
  moodAndTone: string[]
  enhancements: string[]
  aiVisualPrompts: { label: string; prompt: string }[]
  variations: SceneSplitVariation[]
}

function snippet(input: string) {
  const s = input.trim().replace(/\s+/g, ' ')
  if (!s) return 'An untold scene, waiting for its first frame.'
  return s.length > 180 ? `${s.slice(0, 180)}…` : s
}

export function getMockSceneSplitOutput(input: string): SceneSplitOutput {
  const seed = snippet(input)

  return {
    sceneSummary:
      'A lone protagonist steps into a liminal space where a small, human choice tilts the emotional gravity of the moment. The scene escalates quietly—through looks, light, and withheld words—until the final beat lands like a cut to black.',
    cinematicRewrite: `INT. LIMINAL HALLWAY — NIGHT

The fluorescent buzz is almost musical. The corridor feels too long for a building this small.

Our PROTAGONIST hesitates at the threshold, fingers hovering over a door that looks ordinary—until you notice the scratch marks around the lock.

A breath. A decision.

They step in. The light behind them thins to a razor line, then disappears.

Silence takes the room. The kind that watches back.

(Source: ${seed})`,
    moodAndTone: [
      'Noir-adjacent minimalism',
      'Slow-burn tension',
      'Intimate, subjective perspective',
      'Neon/fluoro contrast with deep shadows',
    ],
    enhancements: [
      'Let silence “speak” between lines—avoid overexplaining.',
      'Use light as emotional punctuation (flicker → dread; warmth → fragile hope).',
      'Plant a visual motif early (scratch marks / repeating shapes) and pay it off in the last shot.',
      'Keep dialogue short; let subtext do the heavy lifting.',
    ],
    shotBreakdown: [
      {
        id: 's1',
        title: 'Establish the corridor',
        action:
          'A long hallway holds still. The protagonist enters frame like they’re being allowed in—reluctantly.',
        camera: 'Locked-off wide, slight low angle',
        lens: '24mm',
        movement: 'None (let the space dominate)',
        lighting: 'Cold overheads with intermittent flicker',
        sound: 'Fluorescent hum, distant elevator thunk',
        duration: '4–6s',
        aiVisualPrompt:
          'Cinematic still, long empty hallway at night, cold fluorescent lighting, subtle haze, high contrast shadows, 24mm wide angle, film grain, teal-violet accents',
      },
      {
        id: 's2',
        title: 'Decision in the hand',
        action:
          'Close on fingers hovering over the doorknob; micro-tremor betrays fear. A shallow breath.',
        camera: 'Close-up, eye-level',
        lens: '50mm',
        movement: 'Slow push-in (almost imperceptible)',
        lighting: 'Specular highlights on metal, face in shadow',
        sound: 'Breath, faint cloth rustle',
        duration: '3–4s',
        aiVisualPrompt:
          'Close-up hand hovering over a worn doorknob, shallow depth of field, 50mm lens look, dramatic specular highlights, moody shadows, cinematic film still, subtle grain',
      },
      {
        id: 's3',
        title: 'Threshold crossing',
        action:
          'The door opens to a thin wedge of darkness. The protagonist steps in; the outside light slices across their cheek—then dies.',
        camera: 'Medium, profile silhouette',
        lens: '35mm',
        movement: 'Handheld drift (controlled)',
        lighting: 'Backlight rim + doorway “blade” of light',
        sound: 'Door hinge, room tone drops to near-silence',
        duration: '5–7s',
        aiVisualPrompt:
          'Profile silhouette stepping through a doorway into darkness, thin blade of light, rim lighting, 35mm cinematic, handheld realism, deep blacks, violet highlights, film grain',
      },
      {
        id: 's4',
        title: 'Reveal the room’s presence',
        action:
          'Hold on the protagonist’s eyes adjusting. A subtle movement in the background suggests the space is not empty.',
        camera: 'Tight close-up to over-shoulder',
        lens: '85mm',
        movement: 'Rack focus: eyes → background hint',
        lighting: 'Soft key, negative fill, faint practical glow',
        sound: 'A single distant drip; then nothing',
        duration: '4–6s',
        aiVisualPrompt:
          'Tight cinematic close-up eyes in low light, 85mm, rack focus to shadowy background, negative fill, subtle practical glow, suspenseful atmosphere, film still, grain',
      },
    ],
    aiVisualPrompts: [
      {
        label: 'Overall look',
        prompt:
          'Cinematic neo-noir, teal-violet palette, high contrast lighting, subtle haze, 35mm film grain, shallow depth of field, restrained composition, premium film still',
      },
      {
        label: 'Prop motif',
        prompt:
          'Close-up of scratched door lock and chipped paint, tactile detail, macro realism, dramatic specular highlights, moody shadows, cinematic color grade',
      },
      {
        label: 'Final frame',
        prompt:
          'Cut-to-black feeling, protagonist swallowed by darkness, minimal light sliver, negative space composition, suspense, film grain, high dynamic range',
      },
    ],
    variations: [
      {
        title: 'Warmer, more human',
        cinematicRewrite:
          'The corridor isn’t hostile—just exhausted. Replace flicker with tired warm practicals, make the protagonist’s breath audible, and let the room feel like it remembers them.',
        directorNote:
          'Keep tension, but shift it to nostalgia: the fear is emotional, not physical.',
      },
      {
        title: 'Sharper, thriller-cut',
        cinematicRewrite:
          'Trim pauses, add a single sharp sound cue at the threshold, and introduce a fast rack-focus reveal—something moves, just once, then stillness returns.',
        directorNote:
          'The scare isn’t loud; it’s precise. One needle, not a hammer.',
      },
      {
        title: 'Dreamlike surreal',
        cinematicRewrite:
          'Let the hallway “breathe” with subtle lens distortion and drifting practicals. Dialogue becomes fragments. The door opens onto a space that shouldn’t fit inside the building.',
        directorNote:
          'Play logic like a suggestion. The audience should feel unsteady but curious.',
      },
    ],
  }
}

