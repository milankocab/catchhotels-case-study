// Kontrola buildu před nasazením. Hlídá dvě chyby, které vedou k bílé stránce na GitHub Pages.
// 1. HTML odkazuje na zdrojový /src/*.tsx (nasazený zdroj místo buildu).
// 2. Skripty a styly se načítají z kořene domény místo z podsložky repozitáře.
// Kontroluje obě stránky, prototyp i případovou studii.
import { existsSync, readFileSync } from 'node:fs'

const BASE = '/catchhotels-case-study/'
const PAGES = ['index.html', 'pripadova-studie/index.html']
const errors = []
let checked = 0

for (const page of PAGES) {
  const file = new URL(`../dist/${page}`, import.meta.url)
  if (!existsSync(file)) {
    errors.push(`Chybí dist/${page}. Nejdřív spusť npm run build.`)
    continue
  }

  const html = readFileSync(file, 'utf8')
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1])

  if (html.includes('/src/'))
    errors.push(`${page} odkazuje na /src/. Nasadil by se zdroj místo buildu.`)
  if (!refs.some((ref) => ref.endsWith('.js'))) errors.push(`${page} nenačítá žádný skript.`)
  for (const ref of refs) {
    if (/^(https?:)?\/\//.test(ref) || ref.startsWith('data:')) continue
    if (!ref.startsWith(BASE)) errors.push(`${page}: cesta ${ref} nezačíná ${BASE}.`)
    const local = new URL(`../dist/${ref.slice(BASE.length)}`, import.meta.url)
    if (ref.startsWith(BASE) && !existsSync(local))
      errors.push(`${page}: soubor ${ref} v dist chybí.`)
  }
  checked += refs.length
}

if (errors.length > 0) {
  console.error('check-build: build by na GitHub Pages nefungoval.')
  for (const error of errors) console.error(`  ${error}`)
  process.exit(1)
}
console.log(
  `check-build: OK, ${PAGES.length} stránky, ${checked} cest začíná ${BASE} a soubory existují.`,
)
