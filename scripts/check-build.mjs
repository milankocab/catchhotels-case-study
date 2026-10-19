// Kontrola buildu před nasazením. Hlídá dvě chyby, které vedou k bílé stránce na GitHub Pages.
// 1. dist/index.html odkazuje na zdrojový /src/main.tsx (nasazený zdroj místo buildu).
// 2. Skripty a styly se načítají z kořene domény místo z podsložky repozitáře.
import { existsSync, readFileSync } from 'node:fs'

const BASE = '/catchhotels-case-study/'
const file = new URL('../dist/index.html', import.meta.url)

if (!existsSync(file)) {
  console.error('check-build: chybí dist/index.html. Nejdřív spusť npm run build.')
  process.exit(1)
}

const html = readFileSync(file, 'utf8')
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1])
const errors = []

if (html.includes('/src/'))
  errors.push('index.html odkazuje na /src/. Nasadil by se zdroj místo buildu.')
if (!refs.some((ref) => ref.endsWith('.js'))) errors.push('index.html nenačítá žádný skript.')
for (const ref of refs) {
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith('data:')) continue
  if (!ref.startsWith(BASE)) errors.push(`Cesta ${ref} nezačíná ${BASE}.`)
  const local = new URL(`../dist/${ref.slice(BASE.length)}`, import.meta.url)
  if (ref.startsWith(BASE) && !existsSync(local)) errors.push(`Soubor ${ref} v dist chybí.`)
}

if (errors.length > 0) {
  console.error('check-build: build by na GitHub Pages nefungoval.')
  for (const error of errors) console.error(`  ${error}`)
  process.exit(1)
}
console.log(`check-build: OK, ${refs.length} cest začíná ${BASE} a soubory existují.`)
