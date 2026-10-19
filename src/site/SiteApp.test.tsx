import { fireEvent, render, screen, within } from '@testing-library/react'
import { SiteApp } from './SiteApp'
import { controls, footer, placeholder, switcher } from '../content-prototyp'

describe('Prototyp úvodní stránky', () => {
  beforeEach(() => localStorage.clear())

  it('má přepínač se zvýrazněným prototypem a odkazem zpět na studii', () => {
    render(<SiteApp />)
    const bar = screen.getByRole('navigation', { name: switcher.label })
    expect(within(bar).getByRole('link', { name: switcher.prototype })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(bar).getByRole('link', { name: switcher.study })).toHaveAttribute('href', '/')
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
    fireEvent.click(screen.getByRole('radio', { name: 'A' }))
    expect(JSON.parse(localStorage.getItem('prototyp-ovladani') ?? '{}')).toEqual({
      notes: false,
      variant: 'A',
    })
  })
})
