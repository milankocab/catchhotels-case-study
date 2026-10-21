import { useState } from 'react'
import { ExternalLink, Menu, X } from 'lucide-react'
import { header } from '../../content-prototyp'
import { Logo } from '../../components/Logo'
import { scrollToSection, usePrototype } from '../state'

type NavItem = (typeof header.nav)[number]

// Prototyp je v kořeni webu, logo vede na jeho začátek.
const HOME = import.meta.env.BASE_URL

/** Hlavička webu. V objednávce (minimal) jen logo, aby nic neodvádělo od dokončení. */
export function Header({ minimal = false }: { minimal?: boolean }) {
  const { notify } = usePrototype()
  const [open, setOpen] = useState(false)

  const activate = (item: NavItem) => {
    setOpen(false)
    if (item.kind === 'scroll') {
      scrollToSection(item.target)
    } else {
      notify(item.note)
    }
  }

  const links = (layout: 'row' | 'column') =>
    header.nav.map((item) => (
      <li key={item.label}>
        <button
          type="button"
          onClick={() => activate(item)}
          className={`flex min-h-11 items-center gap-1.5 text-[15px] font-medium transition-colors hover:text-coral-600 ${
            layout === 'column' ? 'w-full px-4' : 'px-1'
          } text-cobalt`}
        >
          {item.label}
          {item.kind === 'external' && <ExternalLink aria-hidden size={14} />}
        </button>
      </li>
    ))

  return (
    <header className="relative z-30 bg-white shadow-[0_1px_0_var(--color-line)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 lg:h-[72px]">
        <a href={HOME} aria-label={header.homeLabel}>
          <Logo compact />
        </a>

        {!minimal && (
          <>
            <nav aria-label={header.navLabel} className="hidden lg:block">
              <ul className="flex items-center gap-5">{links('row')}</ul>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobilni-menu"
              aria-label={open ? header.menuClose : header.menuOpen}
              className="flex size-11 items-center justify-center rounded-full text-cobalt hover:bg-azure-light lg:hidden"
            >
              {open ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
            </button>
          </>
        )}
      </div>

      {open && !minimal && (
        <nav
          id="mobilni-menu"
          aria-label={header.navLabel}
          className="absolute inset-x-0 top-full animate-rise border-t border-line bg-white pb-3 shadow-lift lg:hidden"
        >
          <ul className="divide-y divide-line">{links('column')}</ul>
        </nav>
      )}
    </header>
  )
}
