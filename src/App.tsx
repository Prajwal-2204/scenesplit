/**
 * SceneSplit
 * Copyright (c) 2026 Roanak Singh & Prajwal Dudhal
 * Licensed under the MIT License. See LICENSE file in the project root.
 */
import { useEffect, useRef, useState } from 'react'
import { IconSpark } from './components/Icons'
import { InputPanel } from './components/InputPanel'
import { OutputPanel } from './components/OutputPanel'
import type { BreakdownOutput, Mode } from './lib/mockBreakdown'

const DIRECTOR_STEPS = [
  'Analyzing…',
  'Framing shots…',
  'Setting mood…',
  'Blocking movement…',
  'Finding subtext…',
  'Lighting the frame…',
  'Final cut…',
]

type Status = 'idle' | 'loading' | 'ready'

function normalizeOutput(data: unknown): BreakdownOutput {
  if (!data || typeof data !== 'object') {
    throw new Error('AI returned empty response')
  }

  const obj = data as Record<string, unknown>
  const rawSceneBreakdown = obj.sceneBreakdown ?? obj.scene_breakdown
  let sceneBreakdown = ''
  if (typeof rawSceneBreakdown === 'string') {
    sceneBreakdown = rawSceneBreakdown
  } else if (rawSceneBreakdown && typeof rawSceneBreakdown === 'object') {
    const b = rawSceneBreakdown as Record<string, unknown>
    const beat = typeof b.beat === 'string' ? b.beat : ''
    const emotionalIntention =
      typeof b.emotionalIntention === 'string'
        ? b.emotionalIntention
        : typeof b.emotional_intention === 'string'
          ? b.emotional_intention
          : ''
    const coverageApproach =
      typeof b.coverageApproach === 'string'
        ? b.coverageApproach
        : typeof b.coverage_approach === 'string'
          ? b.coverage_approach
          : ''
    sceneBreakdown = [
      beat ? `Beat: ${beat}` : '',
      emotionalIntention ? `Emotional intention: ${emotionalIntention}` : '',
      coverageApproach ? `Coverage approach: ${coverageApproach}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')
  }

  const rawShotList = Array.isArray(obj.shotList)
    ? obj.shotList
    : Array.isArray(obj.shot_list)
      ? obj.shot_list
      : []

  const shotList = rawShotList
    .filter((shot) => shot && typeof shot === 'object')
    .map((shot, i) => {
      const s = shot as Record<string, unknown>
      return {
        id: String(s.id ?? `shot-${i + 1}`),
        title: String(s.title ?? `Shot ${i + 1}`),
        action: String(s.action ?? ''),
        camera: String(s.camera ?? ''),
        lens: String(s.lens ?? ''),
        movement: String(s.movement ?? ''),
        lighting: String(s.lighting ?? ''),
        sound: String(s.sound ?? ''),
        duration: String(s.duration ?? ''),
        aiVisualPrompt: String(s.aiVisualPrompt ?? s.ai_visual_prompt ?? ''),
      }
    })

  const rawMood = Array.isArray(obj.moodAndStyle)
    ? obj.moodAndStyle
    : Array.isArray(obj.mood_and_style)
      ? obj.mood_and_style
      : []
  const moodAndStyle = rawMood.map((m) => String(m))

  if (!sceneBreakdown && shotList.length === 0 && moodAndStyle.length === 0) {
    throw new Error('AI response format was unexpected')
  }

  return {
    sceneBreakdown: sceneBreakdown || 'No scene breakdown was returned.',
    shotList,
    moodAndStyle,
  }
}

function App() {
  const [mode, setMode] = useState<Mode>('script')
  const [text, setText] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState<BreakdownOutput | null>(null)

  const timers = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
    }
  }, [])

  const onGenerate = async () => {
    if (!text.trim()) {
      return
    }

    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []

    setStatus('loading')
    setStep(0)
    setOutput(null)

    DIRECTOR_STEPS.forEach((_, idx) => {
      timers.current.push(
        window.setTimeout(() => setStep(idx), idx * 650),
      )
    })

    try {
      const response = await fetch('/api/breakdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: text, mode }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'AI request failed')
      }

      const data = await response.json()
      setOutput(normalizeOutput(data))
    } catch (error) {
      setOutput({
        sceneBreakdown: `Error generating AI output: ${String(error)}`,
        shotList: [],
        moodAndStyle: [],
      })
    } finally {
      setStatus('ready')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-violet-500/15 to-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_-100px,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <header className="relative">
        <div className="ss-container pt-10 pb-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-glow">
                  <IconSpark className="h-4 w-4 text-fuchsia-200/90" />
                </span>
                <h1 className="ss-title">SceneSplit</h1>
              </div>
              <p className="mt-2 ss-subtitle">
                Turn pages into pictures — break scripts into cinematic coverage.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-200/60">
              <span className="ss-kbd">Ctrl</span>
              <span className="text-zinc-200/50">+</span>
              <span className="ss-kbd">Enter</span>
              <span className="ml-2">to Break</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative ss-container pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <InputPanel
            mode={mode}
            onModeChange={(m) => {
              setMode(m)
              setStatus('idle')
              setOutput(null)
            }}
            value={text}
            onChange={setText}
            onSubmit={onGenerate}
            loading={status === 'loading'}
          />

          <section className="space-y-4">
            <OutputPanel
              status={status}
              step={step}
              directorSteps={DIRECTOR_STEPS}
              output={output}
            />
          </section>
        </div>
      </main>

      <div className="pointer-events-none fixed bottom-3 right-4 z-20 text-[11px] text-zinc-400/70">
        Copyright (c) 2026 Roanak Singh & Prajwal Dudhal
      </div>
    </div>
  )
}

export default App
