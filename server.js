/**
 * SceneSplit
 * Copyright (c) 2026 Roanak Singh & Prajwal Dudhal
 * Licensed under the MIT License. See LICENSE file in the project root.
 */
import { createServer } from 'http'
import { URL } from 'url'
import 'dotenv/config'

const PORT = Number(process.env.PORT || 4174)
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b'

function jsonResponse(res, status, payload) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
  res.writeHead(status, headers)
  if (status === 204) {
    res.end()
  } else {
    res.end(JSON.stringify(payload))
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString()))
    req.on('error', reject)
  })
}

function safeParseJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try {
      return JSON.parse(match[0])
    } catch {
      return null
    }
  }
}

function buildPrompt(input, mode) {
  const subject = mode === 'idea' ? 'a scene idea' : 'a script excerpt'
  return `You are a creative film director assistant. Convert ${subject} into a cinematic coverage plan for a short scene.

Return only valid JSON with these top-level keys:
- sceneBreakdown: a concise analysis of the beat, emotional intention, and coverage approach.
- shotList: an array of shot objects.
- moodAndStyle: an array of short mood/style notes.

Each shot object must include these fields:
- id
- title
- action
- camera
- lens
- movement
- lighting
- sound
- duration
- aiVisualPrompt

Do not wrap the JSON in markdown code fences. Do not include any extra text outside the JSON object.

Input:
${input.trim()}
`}

function buildOllamaPayload(prompt, model) {
  return {
    model,
    prompt,
    stream: false,
    options: {
      temperature: 0.8,
      num_predict: 1200,
    },
  }
}

async function callOllama(prompt) {
  try {
    const ollamaRes = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildOllamaPayload(prompt, OLLAMA_MODEL)),
    })

    if (!ollamaRes.ok) {
      const errorText = await ollamaRes.text()
      return { ok: false, status: ollamaRes.status, errorText }
    }

    const aiData = await ollamaRes.json()
    return { ok: true, aiData }
  } catch (error) {
    return {
      ok: false,
      status: 502,
      errorText: `Could not reach Ollama at ${OLLAMA_BASE_URL}. Make sure Ollama is running and model "${OLLAMA_MODEL}" is pulled.`,
      details: String(error),
    }
  }
}

async function handleBreakdown(req, res) {
  const bodyText = await readBody(req)
  let body
  try {
    body = JSON.parse(bodyText)
  } catch {
    return jsonResponse(res, 400, { error: 'Invalid JSON body' })
  }

  const { input, mode } = body
  if (typeof input !== 'string' || !input.trim()) {
    return jsonResponse(res, 400, { error: 'Request body must include non-empty input' })
  }
  if (mode !== 'script' && mode !== 'idea') {
    return jsonResponse(res, 400, { error: 'Invalid mode; expected script or idea' })
  }

  const prompt = buildPrompt(input, mode)

  try {
    const ollamaResult = await callOllama(prompt)
    if (!ollamaResult.ok) {
      return jsonResponse(res, ollamaResult.status || 500, {
        error: ollamaResult.errorText || 'Ollama request failed',
        details: ollamaResult.details,
      })
    }

    const aiData = ollamaResult.aiData
    const message = aiData?.response ?? ''
    const parsed = safeParseJson(message)

    if (!parsed || typeof parsed !== 'object') {
      return jsonResponse(res, 500, {
        error: 'Ollama returned an unexpected response format',
        model: OLLAMA_MODEL,
        raw: message,
      })
    }

    return jsonResponse(res, 200, parsed)
  } catch (error) {
    return jsonResponse(res, 500, { error: String(error) })
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`)

  if (req.method === 'OPTIONS') {
    return jsonResponse(res, 204, {})
  }

  if (req.method === 'POST' && url.pathname === '/api/breakdown') {
    return handleBreakdown(req, res)
  }

  res.writeHead(404, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`AI backend listening on http://127.0.0.1:${PORT}`)
})
