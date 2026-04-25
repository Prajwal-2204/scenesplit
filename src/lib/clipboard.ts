export async function copyToClipboard(text: string) {
  const safe = text ?? ''
  if (!safe) return

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(safe)
    return
  }

  const ta = document.createElement('textarea')
  ta.value = safe
  ta.setAttribute('readonly', 'true')
  ta.style.position = 'fixed'
  ta.style.top = '-9999px'
  ta.style.left = '-9999px'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
}

