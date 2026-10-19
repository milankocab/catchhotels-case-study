# Doplňkové služby v rezervaci Dovolené za benefity

Nezávislá případová studie Milana Kocába k produktu Dovolená za benefity (CatchHotels.com). Ukazuje, jak bych do rezervace ubytování přidal cestovní pojištění a půjčení auta, jak bych odhadl přínos a jak bych ověřil, že neutrpí konverze ubytování.

Nezávislá případová studie. Nevznikla ve spolupráci s CatchHotels a nepracuje s jejich interními daty.

Adresa po nasazení: https://milankocab.github.io/catchhotels-case-study/

## Spuštění lokálně

Potřeba je Node.js 24 nebo novější.

```bash
npm install
npm run dev        # http://localhost:5173/catchhotels-case-study/
npm run test       # unit testy (kalkulačka, rozdělení platby, průchod prototypem)
npm run lint       # ESLint
npm run build      # produkční build do dist/ a kontrola cest
npm run preview    # build na http://localhost:4173/catchhotels-case-study/
```

Lokální adresa má stejnou podsložku jako GitHub Pages, takže co funguje lokálně, funguje i po nasazení.

## Struktura

| Cesta | Obsah |
| --- | --- |
| `src/content.ts` | **Všechny texty stránky**, fiktivní data prototypu a výchozí hodnoty kalkulačky |
| `src/sections/` | Sekce stránky, jen skládají texty z `content.ts` |
| `src/prototype/` | Klikací prototyp a výpočet rozdělení platby (`cart.ts`) |
| `src/calculator/` | Kalkulačka dopadu, výpočet je v `impact.ts` s testem |
| `src/components/` | Sdílené prvky (sekce, boxy, štítek TODO, screenshot, logo) |
| `public/` | Favicony. Zdroj loga a faviconů je v `../brand/logo/` a `../brand/favicon/` |
| `src/index.css` | Barvy, fonty a stíny podle `../brand/design-manual.md` |
| `assets/screenshots/` | Screenshoty z auditu, návod je v `assets/screenshots/README.md` |
| `scripts/check-build.mjs` | Kontrola buildu před nasazením |
| `.github/workflows/deploy.yml` | Nasazení na GitHub Pages |

## Úprava textů

Všechno je v `src/content.ts`. Texty jsou v uvozovkách, odstavce jsou položky pole. Text začínající `TODO-MILAN:` se na stránce zobrazí jako jantarový štítek. Po doplnění ho nahraďte běžným textem a štítek zmizí.

## Seznam TODO-MILAN

Aktuální seznam vypíše `grep -n "TODO-MILAN" src/content.ts`.

| Kde v `content.ts` | Co doplnit |
| --- | --- |
| `audit.introTodo` | Zařízení, na kterém jsem audit dělal (datum 19. 10. 2026 je doplněné) |
| `audit.findings` (6 zjištění) | U každého co jsem pozoroval, proč to může ovlivnit konverzi a návrh. U šestého i název kroku, nebo ho smazat. Screenshoty do `assets/screenshots/` |
| `opportunity.recommendation` | Doporučená varianta A, B nebo C a zdůvodnění |
| `prototype.rationaleTodo` a `prototype.rationale` | Finální znění textu pod prototypem. Návrh je připravený, po úpravě smazat `rationaleTodo` |
| `calculator.warningTodo` a `calculator.defaults` | Zkontrolovat výchozí předpoklady kalkulačky. Při změně upravit i ruční příklad v `src/calculator/impact.test.ts` |
| `validation.rolloutTodo` | První trh pro spuštění a zdůvodnění |
| `validation.previousTodo` | Ověřit URL PVZP case study (`validation.previousUrl`) |

Pomocný text (`rationaleTodo`, `introTodo` a podobné) jde po doplnění nahradit prázdným řetězcem, nebo položku smazat i s místem, kde se používá v `src/sections/`.

## Nasazení na GitHub Pages

Git, commity a nasazení dělám sám. Workflow `.github/workflows/deploy.yml` po pushi do `main` spustí `npm ci`, lint, testy a build a nasadí složku `dist`.

### Kontrolní seznam před prvním nasazením

1. Repozitář se jmenuje přesně `catchhotels-case-study`. Jiný název vyžaduje změnu `BASE` ve `vite.config.ts` a v `scripts/check-build.mjs`.
2. V Settings, Pages je **Source nastavený na GitHub Actions**, ne na branch. Při nastavení na branch GitHub servíruje zdrojový `index.html` místo buildu a stránka je bílá.
3. `package-lock.json` je commitnutý a odpovídá `package.json`. Jinak spadne `npm ci`. Ověřím lokálně příkazem `npm ci && npm run build`.
4. Lokálně projde `npm run build` a `npm run preview` ukáže stránku na `http://localhost:4173/catchhotels-case-study/`.

### Proč by stránka mohla být bílá a jak tomu brání build

`npm run build` na konci spustí `scripts/check-build.mjs`. Ten selže, pokud `dist/index.html` odkazuje na `/src/`, nenačítá žádný skript, nebo když některá cesta nezačíná `/catchhotels-case-study/` či soubor v `dist` chybí. Workflow pak nasazení přeskočí a rozbitá verze se na web nedostane.

## Vizuál

Barvy, fonty (Poppins, Inter a Outfit pro logo) a komponenty vychází z mého konceptu v `../brand/design-manual.md`. Odchylky kvůli kontrastu WCAG AA jsou popsané v `src/index.css`. Korálová na tlačítkách je tmavší (`#C94434`) a sekundární text tmavší (`#55697F`).
