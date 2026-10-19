/*
 * Texty klikacího prototypu na adrese /prototyp/. Texty případové studie jsou v content.ts.
 *
 * Jak upravovat:
 * - Text měňte přímo v uvozovkách. Platí stejná pravidla stylu jako v content.ts.
 * - Text začínající „TODO-MILAN:“ se v prototypu zobrazí jako jantarový štítek.
 * - Všechna data v prototypu jsou fiktivní. Ceny jsou v korunách (viz analyza-webu.md, kapitola 8.7).
 */

export type SearchTab = 'stay' | 'car' | 'insurance'

/** Pruh s přepínačem nahoře na obou stránkách. Žádný další text. */
export const switcher = {
  label: 'Přepnout mezi případovou studií a prototypem',
  study: 'Případová studie',
  prototype: 'Prototyp',
}

/** Text, který se ukáže u prvků, které v prototypu nevedou nikam. */
export const placeholder = {
  page: 'Tato stránka není součástí prototypu.',
  category: 'Ve skutečném webu vede na vlastní stránku kategorie.',
  b2b: 'Ve skutečném webu vede na samostatný web pro firmy a HR.',
  cookies: 'Tady by se otevřelo nastavení cookies.',
  close: 'Zavřít',
}

type NavItem =
  | { label: string; kind: 'tab'; tab: SearchTab; note?: string }
  | { label: string; kind: 'scroll'; target: string }
  | { label: string; kind: 'external'; note: string }

export const header = {
  homeLabel: 'Dovolená za benefity, úvodní stránka',
  menuOpen: 'Otevřít menu',
  menuClose: 'Zavřít menu',
  navLabel: 'Hlavní menu',
  nav: [
    { label: 'Ubytování', kind: 'tab', tab: 'stay' },
    { label: 'Půjčení auta', kind: 'tab', tab: 'car', note: placeholder.category },
    { label: 'Cestovní pojištění', kind: 'tab', tab: 'insurance', note: placeholder.category },
    { label: 'Inspirace', kind: 'scroll', target: 'inspirace' },
    { label: 'Jak to funguje', kind: 'scroll', target: 'jak-to-funguje' },
    { label: 'Pro firmy', kind: 'external', note: placeholder.b2b },
  ] satisfies NavItem[],
}

/** Panel vlevo dole. Ovládá prototyp, není součástí navrhovaného webu. */
export const controls = {
  open: 'Ovládání prototypu',
  title: 'Ovládání prototypu',
  close: 'Skrýt ovládání',
  notes: 'Poznámky „proč“',
  notesHint: 'Čísla u změn odkazují na zjištění z auditu.',
  variant: 'Vyhledávání',
  variantHint: 'Varianty A/B testu vyhledávacího pole.',
  variants: [
    { id: 'A', label: 'A', description: 'Současné řešení v novém vzhledu' },
    { id: 'B', label: 'B', description: 'Navržená úprava' },
  ],
} as const

export type SearchVariant = (typeof controls.variants)[number]['id']

// Dočasné bloky, než se postaví jednotlivé sekce úvodní stránky.
export const sections = [
  { id: 'inspirace', step: '2.3', title: 'Oblíbené destinace, kategorie a trip builder' },
  { id: 'jak-to-funguje', step: '2.4', title: 'Dobré vědět, průvodce, Booking, HR a FAQ' },
] as const

const plural = (n: number, one: string, few: string, many: string) =>
  `${n} ${n === 1 ? one : n >= 2 && n <= 4 ? few : many}`

// Úvodní sekce s nadpisem (zjištění 1.3)
export const hero = {
  title: 'Celá dovolená za benefity',
  subtitle:
    'Ubytování, půjčení auta i cestovní pojištění zaplatíte z benefitů od zaměstnavatele. Vlastní peníze přidáte, jen když benefity nestačí.',
  programsLabel: 'Platíte benefity od',
  programs: ['Edenred', 'Pluxee', 'Up'],
  programsHow: 'Jak se platí benefity',
  // Doplňky hned v první obrazovce (kapitola 7). Ceny jsou fiktivní, odpovídají datům v src/content.ts.
  addons: {
    title: 'Doplňkové služby',
    lead: 'Přidejte k pobytu a zaplaťte stejnými benefity.',
    items: [
      { tab: 'insurance', label: 'Cestovní pojištění', price: 'od 390 Kč', unit: 'za cestu' },
      { tab: 'car', label: 'Půjčení auta', price: 'od 450 Kč', unit: 'za den' },
    ] satisfies { tab: SearchTab; label: string; price: string; unit: string }[],
    photoAlt: 'Malé oranžové auto zaparkované na slunné ulici',
  },
}

// Chat vpravo dole (zjištění 1.10). Jen ukázka, odpovědi jsou předpřipravené.
export const chat = {
  open: 'Zeptejte se',
  close: 'Zavřít chat',
  title: 'Asistent',
  status: 'Odpovídá hned, složitější dotazy předá kolegům',
  greeting: 'Dobrý den, s čím vám můžu pomoct? Vyberte častý dotaz, nebo napište vlastní.',
  suggestions: [
    {
      question: 'Jak zaplatím benefity?',
      answer:
        'V košíku vyberete svůj benefitní program a přihlásíte se do něj. Když benefity nestačí, zbytek doplatíte kartou.',
    },
    {
      question: 'Můžu přidat pojištění a auto?',
      answer:
        'Ano. Po výběru ubytování vám nabídneme cestovní pojištění a půjčení auta. Všechno zaplatíte v jednom košíku.',
    },
    {
      question: 'Jak zruším rezervaci?',
      answer: 'Podmínky storna uvidíte u každého ubytování ještě před platbou.',
    },
  ],
  offline: 'Mimo provozní dobu odpovíme e-mailem do 9:00 následujícího pracovního dne.',
  inputLabel: 'Váš dotaz',
  inputPlaceholder: 'Napište dotaz',
  send: 'Odeslat',
  sent: 'Ve skutečném webu by odpověděl AI asistent z častých dotazů.',
}

// Vyhledávání (zjištění 1.1, 1.2, 1.4, 1.9 a 1.11). Místa a hotely jsou fiktivní.
export const search = {
  tabsLabel: 'Co hledáte',
  tabs: [
    { id: 'stay', label: 'Ubytování', short: 'Ubytování' },
    { id: 'car', label: 'Půjčení auta', short: 'Auto' },
    { id: 'insurance', label: 'Cestovní pojištění', short: 'Pojištění' },
  ] satisfies { id: SearchTab; label: string; short: string }[],

  destinationLabel: 'Kam pojedete?',
  destinationPlaceholder: 'Město, oblast nebo název hotelu',
  destinationError: 'Napište, kam chcete jet.',
  // Varianta A napodobuje dnešní pole pro místo i odkaz.
  combinedLabel: 'Zadejte destinaci nebo vložte odkaz na hotel z Booking.com',
  combinedPlaceholder: 'Destinace nebo odkaz z Booking.com',

  suggestionsLabel: 'Návrhy',
  placesTitle: 'Oblíbená místa',
  hotelsTitle: 'Hotely',
  fromLink: 'Otevřít hotel z odkazu Booking.com',
  fromLinkDetail: 'Rozpoznali jsme odkaz z Booking.com',
  noMatch: 'Nic jsme nenašli. Zkuste jiný název.',
  places: [
    { name: 'Praha', detail: 'Česko' },
    { name: 'Krkonoše', detail: 'Česko' },
    { name: 'Makarská riviéra', detail: 'Chorvatsko' },
    { name: 'Rakouské Alpy', detail: 'Rakousko' },
    { name: 'Šumava', detail: 'Česko' },
    { name: 'Jižní Morava', detail: 'Česko' },
  ],
  hotels: [
    { name: 'Horský hotel Pod Sněžkou', detail: 'Pec pod Sněžkou, Krkonoše' },
    { name: 'Hotel Modrá zátoka', detail: 'Makarská, Chorvatsko' },
    { name: 'Penzion U Lípy', detail: 'Železná Ruda, Šumava' },
    { name: 'Apartmány Na Nábřeží', detail: 'Praha' },
  ],

  linkQuestion: 'Máte vybraný hotel na Booking.com?',
  linkAction: 'Vložte odkaz',
  link: {
    label: 'Odkaz na hotel z Booking.com',
    placeholder: 'https://www.booking.com/hotel/…',
    steps: [
      'Otevřete hotel na Booking.com a vyberte termín.',
      'Zkopírujte adresu stránky z prohlížeče a vložte ji sem.',
    ],
    submit: 'Otevřít hotel',
    back: 'Zpět na hledání',
    error: 'Tohle nevypadá jako odkaz na hotel z Booking.com.',
  },

  dates: {
    label: 'Termín',
    placeholder: 'Termín',
    pickStart: 'Vyberte den příjezdu',
    pickEnd: 'Vyberte den odjezdu',
    confirm: 'Potvrdit',
    clear: 'Vymazat',
    close: 'Zavřít kalendář',
    weekdays: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
    nights: (n: number) => plural(n, 'noc', 'noci', 'nocí'),
  },
  guests: {
    label: 'Osoby',
    adults: 'Dospělí',
    children: 'Děti',
    childrenHint: '0 až 17 let',
    done: 'Hotovo',
    less: 'Ubrat',
    more: 'Přidat',
    summary: (adults: number, children: number) =>
      [
        plural(adults, 'dospělý', 'dospělí', 'dospělých'),
        children > 0 ? plural(children, 'dítě', 'děti', 'dětí') : '',
      ]
        .filter(Boolean)
        .join(', '),
  },
  car: {
    placeLabel: 'Kde auto vyzvednete?',
    placePlaceholder: 'Město nebo letiště',
    placeError: 'Napište, kde chcete auto vyzvednout.',
    datesLabel: 'Vyzvednutí a vrácení',
    datesPlaceholder: 'Kdy auto potřebujete?',
  },
  insurance: {
    areaLabel: 'Kam jedete?',
    areas: ['Česko', 'Evropa', 'Celý svět'],
    datesLabel: 'Termín cesty',
    datesPlaceholder: 'Kdy cestujete?',
  },
  submit: 'Hledat',
  recentTitle: 'Stále máte zájem?',
  // Co se stane po odeslání. Další obrazovky prototypu přibudou později.
  next: {
    stay: 'Další obrazovka prototypu, nabídka doplňků, se připravuje.',
    hotel:
      'Ve skutečném webu se otevře detail hotelu z odkazu. Další obrazovka prototypu se připravuje.',
    other: placeholder.category,
  },
  sticky: { label: 'Upravit hledání', empty: 'Kam pojedete?' },
}

// Poznámky „proč“. Čísla odkazují na zjištění v analyza-webu.md.
export const notes = {
  open: 'Proč je to takhle',
  close: 'Zavřít poznámku',
  finding: 'Zjištění',
  items: {
    headline: {
      finding: '1.3',
      title: 'Benefity na prvním místě',
      text: 'Nadpis mluví o tom, co člověk získá, a hned ukazuje podporované programy. Dnešní nadpis zdůrazňuje Booking. Přesné znění bych ověřil A/B testem.',
    },
    tabs: {
      finding: '7',
      title: 'Nové kategorie',
      text: 'Záložky ukazují, že web nabízí celou cestu. Ve variantách A i B jsou stejné, aby nezkreslily test vyhledávání.',
    },
    searchB: {
      finding: '1.1',
      title: 'Pole jen pro hledání',
      text: 'Dnes jedno pole slouží pro místo i pro odkaz z Booking.com. Tady pole našeptává místa i hotely podle názvu, takže odkaz většina lidí nepotřebuje. Když někdo odkaz přesto vloží, pole ho rozpozná a nabídne otevřít hotel.',
    },
    searchA: {
      finding: '1.1',
      title: 'Varianta A, kontrolní',
      text: 'Současné řešení v novém vzhledu. Jedno pole pro místo i odkaz, termín a osoby se ukážou až po zadání místa. Proti ní se v A/B testu měří varianta B.',
    },
    fields: {
      finding: '1.1',
      title: 'Všechna pole hned',
      text: 'Termín a počet osob jsou vidět od začátku. Rozložení se během vyplňování nemění a je jasné, co všechno je potřeba vyplnit.',
    },
    link: {
      finding: '1.1',
      title: 'Odkaz z Booking.com zvlášť',
      text: 'Kdo má hotel vybraný, vloží odkaz do samostatného pole s krátkým návodem. Hledání zůstává čisté a tahle cesta se nezhorší.',
    },
    button: {
      finding: '1.2',
      title: 'Výrazné hlavní tlačítko',
      text: 'Hledat je nejkontrastnější prvek stránky. Dnes je světle modré na modrém pozadí a působí neaktivně.',
    },
    calendar: {
      finding: '1.4',
      title: 'Kalendář přes více měsíců',
      text: 'Měsíce jdou pod sebou a počet nocí je přímo na tlačítku Potvrdit.',
    },
    recent: {
      finding: '1.11',
      title: 'Nedávné hledání',
      text: 'Poslední hledání se nabídne znovu. Ukládá se jen v prohlížeči a po sedmi dnech zmizí.',
    },
    sticky: {
      finding: '1.9',
      title: 'Hledání vždy po ruce',
      text: 'Když vyhledávání odjede z obrazovky, připne se nahoru. Na desktopu jde o celé hledání v jednom řádku, takže se dá hledat kdykoliv bez posouvání. Na mobilu je to zkrácený řádek, který vrátí k hledání.',
    },
    row: {
      finding: '1.1',
      title: 'Hledání v jednom řádku',
      text: 'Na desktopu jsou všechna pole v jednom řádku, stejně jako u většiny konkurentů. Lidé ten vzor znají. Je to ale hypotéza, kterou bych ověřil dalším testem.',
    },
    addons: {
      finding: '7',
      title: 'Doplňky hned na začátku',
      text: 'Pojištění a auto jsou vidět už v první obrazovce i s orientační cenou. Člověk ví, že benefity zaplatí celou cestu, ještě než začne hledat. Klik přepne vyhledávání na danou kategorii.',
    },
    chat: {
      finding: '1.10',
      title: 'Chat s asistentem',
      text: 'AI asistent odpovídá z častých dotazů a složitější věci předá člověku. Mimo provozní dobu řekne, kdy přijde odpověď. Dotazy jsou zároveň zdroj podnětů pro další úpravy.',
    },
  },
}

export type NoteId = keyof typeof notes.items

export const footer = {
  columns: [
    {
      title: 'Služby',
      links: [
        { label: 'Ubytování', note: placeholder.page },
        { label: 'Půjčení auta', note: placeholder.category },
        { label: 'Cestovní pojištění', note: placeholder.category },
      ],
    },
    {
      title: 'Pomoc',
      links: [
        { label: 'Jak to funguje', note: placeholder.page },
        { label: 'Časté dotazy', note: placeholder.page },
        { label: 'Kontakt', note: placeholder.page },
        { label: 'Pro firmy', note: placeholder.b2b },
      ],
    },
    {
      title: 'Ostatní',
      links: [
        { label: 'Obchodní podmínky', note: placeholder.page },
        { label: 'Ochrana osobních údajů', note: placeholder.page },
        { label: 'Nastavení cookies', note: placeholder.cookies },
      ],
    },
  ],
  disclaimer:
    'Prototyp k nezávislé případové studii. Nevznikl ve spolupráci s CatchHotels a všechna data v něm jsou fiktivní.',
}
