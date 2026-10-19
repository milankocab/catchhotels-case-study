import { footer } from '../../content-prototyp'
import { Logo } from '../../components/Logo'
import { usePrototype } from '../state'

export function Footer() {
  const { notify } = usePrototype()
  return (
    <footer className="bg-cobalt-deep text-white">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:pb-24">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
          <Logo tone="dark" />
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-heading text-base font-semibold text-white">{column.title}</h2>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => notify(link.note)}
                      className="flex min-h-11 items-center text-left text-sm text-azure-light underline-offset-4 hover:text-white hover:underline"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-white/20 pt-6 text-sm text-azure-light">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  )
}
