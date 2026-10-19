import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { meta, prototype } from './content'

describe('App', () => {
  it('ukazuje upozornění o nezávislosti hned nahoře', () => {
    render(<App />)
    expect(screen.getByRole('note')).toHaveTextContent(meta.disclaimer)
  })

  it('prototyp projde celým flow a v košíku rozdělí platbu', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: prototype.summary.cta }))
    fireEvent.click(screen.getByRole('radio', { name: /^Standard/ }))
    fireEvent.click(screen.getByRole('radio', { name: /Rodinné auto/ }))
    fireEvent.click(screen.getByRole('button', { name: prototype.addons.cta }))
    // 18 900 + 690 + 5 200 = 24 790. Body 22 000, kartou 2 790 Kč.
    expect(screen.getByText(/24\s790 bodů/)).toBeInTheDocument()
    expect(screen.getByText(/2\s790 Kč/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: prototype.cart.cta }))
    expect(screen.getByRole('heading', { name: prototype.done.title })).toBeInTheDocument()
  })
})
