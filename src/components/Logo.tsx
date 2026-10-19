// Logo konceptu Dovolená za benefity (vlastní koncept, ne značka CatchHotels).
// Zdroj je Claude Design, soubor „Logo Dovolena za benefity.dc.html“. Kopie je v ../brand/logo/.

const SUN = '#FFB33D'
const WAVE = '#62C9F0'

type Tone = 'light' | 'dark'

export function LogoSymbol({ tone = 'light', className }: { tone?: Tone; className?: string }) {
  const hills = tone === 'light' ? '#075B96' : '#FFF0D9'
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g stroke={SUN} strokeWidth="7" strokeLinecap="round">
        <line x1="60" y1="6" x2="60" y2="18" />
        <line x1="22" y1="22" x2="30" y2="30" />
        <line x1="98" y1="22" x2="90" y2="30" />
        <line x1="6" y1="56" x2="17" y2="56" />
        <line x1="114" y1="56" x2="103" y2="56" />
      </g>
      <circle cx="60" cy="60" r="30" fill={SUN} />
      <path
        d="M6 94 L40 58 Q44 54 48 58 L60 71 L76 54 Q80 50 84 54 L114 94 Z"
        fill={hills}
        stroke={hills}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M8 108 Q21 99 34 108 T60 108 T86 108 T112 108"
        fill="none"
        stroke={WAVE}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ compact = false, tone = 'light' }: { compact?: boolean; tone?: Tone }) {
  return (
    <span
      role="img"
      aria-label="Dovolená za benefity"
      className={`inline-flex items-center ${compact ? 'gap-2' : 'gap-2.5'}`}
    >
      <LogoSymbol tone={tone} className={compact ? 'size-8' : 'size-11'} />
      <span
        aria-hidden
        className={`flex flex-col font-logo leading-[0.92] tracking-[-0.02em] ${tone === 'light' ? 'text-cobalt' : 'text-cream'} ${compact ? 'text-[15px]' : 'text-xl'}`}
      >
        <span className="font-extrabold">Dovolená</span>
        <span className="font-medium">
          <span className="font-bold text-coral">za</span> benefity
        </span>
      </span>
    </span>
  )
}
