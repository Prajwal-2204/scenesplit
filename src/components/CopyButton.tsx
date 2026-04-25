import { useMemo, useState } from 'react'
import { copyToClipboard } from '../lib/clipboard'
import { IconCheck, IconCopy } from './Icons'

type Props = {
  getText: () => string
  label?: string
  className?: string
}

export function CopyButton({ getText, label = 'Copy', className }: Props) {
  const [copied, setCopied] = useState(false)

  const ui = useMemo(() => {
    if (copied) return { text: 'Copied', Icon: IconCheck }
    return { text: label, Icon: IconCopy }
  }, [copied, label])

  return (
    <button
      type="button"
      className={[
        'ss-btn-ghost px-3 py-1.5 text-xs text-zinc-200/90 hover:text-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={async () => {
        await copyToClipboard(getText())
        setCopied(true)
        window.setTimeout(() => setCopied(false), 900)
      }}
    >
      <ui.Icon className="h-4 w-4" />
      {ui.text}
    </button>
  )
}

