import { useEffect, useRef, useState } from 'react'

// Animuji jen v prohlížeči, který umí zjistit nastavení pohybu, a jen když ho uživatel neomezil.
// V testech (jsdom) matchMedia chybí, takže se tam nic neanimuje a hodnoty jsou hned konečné.
export const canAnimate = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  typeof window.requestAnimationFrame === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Prvky s data-reveal se při scrollování plynule objeví. Bez JavaScriptu, v testech
 * a při omezení pohybu v systému jsou vidět rovnou, CSS je skrývá jen s třídou motion-ready.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (!canAnimate() || typeof IntersectionObserver === 'undefined') return
    root.dataset.motion = 'ready'
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    const watch = () =>
      document
        .querySelectorAll('[data-reveal]:not(.is-revealed)')
        .forEach((element) => observer.observe(element))
    watch()
    // Obsah se mění (přepnutí kategorie, předvolby), nové prvky se musí taky objevit.
    const mutations = new MutationObserver(watch)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
      delete root.dataset.motion
    }
  }, [])
}

/** Číslo, které se k nové hodnotě dopočítá místo skoku. Hodí se pro ceny v souhrnu. */
export function useCountUp(value: number, duration = 450) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  const animate = canAnimate()
  useEffect(() => {
    if (!animate) return
    const start = performance.now()
    const begin = from.current
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(begin + (value - begin) * eased)
      from.current = current
      setShown(current)
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [value, duration, animate])
  return animate ? shown : value
}

/**
 * Plynulé rozbalení a sbalení details. Obsah musí být v obalu bez paddingu (contentRef),
 * aby šel stáhnout až na nulu. Bez animací se details chová jako obvykle.
 */
export function useDetailsMotion() {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const onSummaryClick = (event: { preventDefault: () => void }) => {
    const details = detailsRef.current
    const content = contentRef.current
    if (!details || !content || !canAnimate() || typeof content.animate !== 'function') return
    event.preventDefault()
    const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'
    content.getAnimations().forEach((animation) => animation.cancel())
    if (details.open) {
      const animation = content.animate(
        [
          { height: `${content.offsetHeight}px`, opacity: 1 },
          { height: '0px', opacity: 0 },
        ],
        { duration: 240, easing },
      )
      animation.onfinish = () => {
        details.open = false
      }
    } else {
      details.open = true
      content.animate(
        [
          { height: '0px', opacity: 0 },
          { height: `${content.offsetHeight}px`, opacity: 1 },
        ],
        { duration: 340, easing },
      )
    }
  }
  return { detailsRef, contentRef, onSummaryClick }
}
