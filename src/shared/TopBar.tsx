import { switcher } from '../content-prototyp'

type Page = 'study' | 'prototype'

// Odkazy počítají s base z vite.config.ts, takže fungují lokálně i na GitHub Pages.
const HREF: Record<Page, string> = {
  prototype: import.meta.env.BASE_URL,
  study: `${import.meta.env.BASE_URL}pripadova-studie/`,
}

/** Tmavý pruh nahoře na obou stránkách. Nepatří k navrhovanému webu, obsahuje jen přepínač. */
export function TopBar({ current }: { current: Page }) {
  return (
    <nav aria-label={switcher.label} className="bg-cobalt-deep">
      <div className="mx-auto flex max-w-6xl justify-center px-4 py-1.5">
        <ul className="flex rounded-full bg-white/10 p-1">
          {(['prototype', 'study'] as const).map((page) => (
            <li key={page}>
              <a
                href={HREF[page]}
                aria-current={page === current ? 'page' : undefined}
                className={`flex min-h-9 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-white ${
                  page === current
                    ? 'bg-white text-cobalt-deep'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                {switcher[page]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
