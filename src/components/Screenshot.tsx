import { ImageOff } from 'lucide-react'

// Screenshoty z auditu. Vite je při buildu zkopíruje do dist a doplní cestu s base.
// Chybějící soubor se na stránce ukáže jako rámeček s názvem, který tam patří.
const SCREENSHOTS = import.meta.glob<string>('../../assets/screenshots/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function findScreenshot(file: string): string | undefined {
  const stem = file.replace(/\.[a-z]+$/i, '')
  const match = Object.keys(SCREENSHOTS).find((path) => {
    const name = path.split('/').pop() ?? ''
    return name === file || name.replace(/\.[a-z]+$/i, '') === stem
  })
  return match ? SCREENSHOTS[match] : undefined
}

export function Screenshot({
  file,
  alt,
  missingLabel,
}: {
  file: string
  alt: string
  missingLabel: string
}) {
  const src = findScreenshot(file)
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-lg border border-line bg-white object-cover object-top"
      />
    )
  }
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface-warm p-4 text-center text-sm text-muted">
      <ImageOff aria-hidden size={24} />
      <span>{missingLabel}</span>
      <code className="rounded bg-white px-1.5 py-0.5 text-xs">assets/screenshots/{file}</code>
    </div>
  )
}
