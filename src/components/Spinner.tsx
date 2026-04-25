import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLSpanElement>

export function Spinner({ className, ...props }: Props) {
  return (
    <span
      {...props}
      className={[
        'inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/70',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    />
  )
}

