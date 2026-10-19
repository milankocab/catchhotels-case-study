# Screenshoty z auditu

Sem patří screenshoty z auditu nákupního procesu (sekce 2 case study). Stránka je načte sama podle názvu souboru. Dokud soubor chybí, ukáže se na jeho místě šedý rámeček s názvem, který sem patří.

## Co nafotit

| Soubor | Krok procesu | Co má být vidět |
| --- | --- | --- |
| `01-vyhledavani.png` | Vyhledávání | Úvodní stránka nebo formulář vyhledávání s vyplněnou destinací a termínem |
| `02-vysledky.png` | Výsledky vyhledávání | Seznam ubytování s cenami v bodech, filtry a řazení |
| `03-detail-ubytovani.png` | Detail ubytování | Detail hotelu s cenou, výběrem pokoje a tlačítkem pro rezervaci |
| `04-kosik.png` | Košík | Shrnutí rezervace s cenou před platbou |
| `05-platba-benefity.png` | Platba benefity | Krok s výběrem benefitního programu a rozdělením platby, bez dokončení |
| `06-dalsi-zjisteni.png` | Volitelné | Další zjištění, třeba zobrazení na mobilu nebo e-mail. Pokud ho nepotřebuji, smažu šesté zjištění v `src/content.ts` |

## Struktura složky

- Kořen složky: oříznuté desktopové screenshoty kroků `01` až `06`, které stránka zobrazuje. Navíc `03b-detail-hlavicka.jpg` (zatím nepoužitý).
- `desktop-cele-stranky/`: celé stránky z desktopu v plném rozlišení, jako podklad pro další ořezy.
- `mobil/`: stejné kroky nafocené na mobilu (šířka 390 px).
- Stránka načítá jen soubory přímo v kořeni, podsložky se do buildu nedostanou.

## Pravidla

- Formát PNG, JPG nebo WebP. Přípona může být jiná než `.png`, rozhoduje název před tečkou.
- Fotit na mobilu (šířka 375 až 430 px), nebo na desktopu oříznout jen na podstatnou část. Na stránce se screenshot zobrazí v poměru zhruba 4 : 3.
- Před nahráním zakrýt osobní údaje (jméno, e-mail, zůstatek bodů, číslo karty).
- Velikost souboru do 500 kB. Zmenšit jde třeba přes squoosh.app.
- Po přidání souboru spustit `npm run build`, nebo jen obnovit `npm run dev`.
- Popis zjištění (co jsem pozoroval, proč to vadí, návrh) se doplňuje v `src/content.ts` v části `audit.findings`.
