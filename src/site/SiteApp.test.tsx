import { fireEvent, render, screen, within } from '@testing-library/react'
import { SiteApp } from './SiteApp'
import { controls, footer, notes, placeholder, switcher } from '../content-prototyp'

describe('Prototyp úvodní stránky', () => {
  beforeEach(() => localStorage.clear())

  it('má přepínač se zvýrazněným prototypem a odkazem zpět na studii', () => {
    render(<SiteApp />)
    const bar = screen.getByRole('navigation', { name: switcher.label })
    expect(within(bar).getByRole('link', { name: switcher.prototype })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(bar).getByRole('link', { name: switcher.study })).toHaveAttribute(
      'href',
      '/pripadova-studie/',
    )
  })

  it('upozornění o nezávislosti je v patičce', () => {
    render(<SiteApp />)
    expect(screen.getByText(footer.disclaimer)).toBeInTheDocument()
  })

  it('odkaz mimo prototyp ukáže vysvětlení', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getAllByRole('button', { name: /Pro firmy/ })[0])
    expect(screen.getByText(placeholder.b2b)).toBeInTheDocument()
  })

  it('ovládání přepíná poznámky a variantu vyhledávání a pamatuje si je', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: controls.open }))
    const notes = screen.getByRole('switch', { name: controls.notes })
    expect(notes).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(notes)
    expect(notes).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(screen.getByRole('radio', { name: 'B' }))
    expect(JSON.parse(localStorage.getItem('prototyp-ovladani-v2') ?? '{}')).toEqual({
      notes: false,
      variant: 'B',
    })
  })

  it('čísluje poznámky po stránce a ukáže vždy jen jednu', async () => {
    render(<SiteApp />)
    const first = await screen.findByRole('button', { name: /^Poznámka 1, / })
    const second = screen.getByRole('button', { name: /^Poznámka 2, / })
    fireEvent.click(first)
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(screen.getByRole('dialog')).toHaveTextContent(notes.source)
    fireEvent.click(second)
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(first).toHaveAttribute('aria-expanded', 'false')
  })
})
