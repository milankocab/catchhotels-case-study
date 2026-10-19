/*
 * Texty klikacího prototypu na hlavní adrese /. Texty případové studie jsou v content.ts.
 *
 * Jak upravovat:
 * - Text měňte přímo v uvozovkách. Platí stejná pravidla stylu jako v content.ts.
 * - Text začínající „TODO-MILAN:“ se v prototypu zobrazí jako jantarový štítek.
 * - Všechna data v prototypu jsou fiktivní. Ceny jsou v korunách (viz analyza-webu.md, kapitola 8.7).
 */

export type SearchTab = 'stay' | 'car' | 'insurance'

/** Pruh s přepínačem nahoře na obou stránkách. Žádný další text. */
export const switcher = {
  label: 'Přepnout mezi prototypem a případovou studií',
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
  notesHint:
    'Čísla jdou po stránce shora dolů. V poznámce je, z kterého bodu analýzy změna vychází.',
  variant: 'Vyhledávání',
  variantHint: 'Varianty A/B testu vyhledávacího pole.',
  variants: [
    { id: 'A', label: 'A', description: 'Navržená úprava' },
    { id: 'B', label: 'B', description: 'Současné řešení v novém vzhledu' },
  ],
} as const

export type SearchVariant = (typeof controls.variants)[number]['id']

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
    lead: 'Přidejte je k pobytu po výběru ubytování, nebo je kupte zvlášť. Zaplatíte stejnými benefity.',
    items: [
      { tab: 'insurance', label: 'Cestovní pojištění', price: 'od 190 Kč', unit: 'za cestu' },
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
  destinationPlaceholder: 'Město, oblast nebo hotel',
  destinationError: 'Napište, kam chcete jet.',
  // Varianta B napodobuje dnešní pole pro místo i odkaz.
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
    hotel:
      'Ve skutečném webu se otevře detail hotelu z odkazu. Prototyp přeskočí rovnou na nabídku doplňků.',
    other: placeholder.category,
  },
  sticky: { label: 'Upravit hledání', empty: 'Kam pojedete?' },
}

export const czk = (value: number) =>
  `${new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(value)} Kč`

// Oblíbené destinace se štítkem doplňku (kapitola 8.4). Ceny jsou fiktivní.
export type AddonKind = 'car' | 'insurance'
export const destinations = {
  title: 'Oblíbené destinace',
  lead: 'U každého místa vám rovnou poradíme, jestli se hodí auto nebo pojištění.',
  priceFrom: 'od',
  perNight: 'za noc',
  items: [
    {
      id: 'krkonose',
      name: 'Krkonoše',
      country: 'Česko',
      price: 1890,
      addon: 'car',
      tag: 'Na hory se hodí auto',
    },
    {
      id: 'chorvatsko',
      name: 'Makarská riviéra',
      country: 'Chorvatsko',
      price: 2490,
      addon: 'insurance',
      tag: 'Do zahraničí s pojištěním',
    },
    { id: 'praha', name: 'Praha', country: 'Česko', price: 1590, addon: null, tag: null },
    {
      id: 'rakousko',
      name: 'Rakouské Alpy',
      country: 'Rakousko',
      price: 2790,
      addon: 'insurance',
      tag: 'Na lyže s pojištěním',
    },
  ] satisfies {
    id: string
    name: string
    country: string
    price: number
    addon: AddonKind | null
    tag: string | null
  }[],
}

// Trip builder „Sestavte si cestu za benefity“ (kapitola 8.5). Všechno jsou fiktivní ukázky.
export type TripPart = 'car' | 'stay' | 'insurance'
export const tripBuilder = {
  title: 'Sestavte si cestu za benefity',
  lead: 'Vyberte ukázkovou cestu a přidejte, co k ní potřebujete. Hned uvidíte, kolik zaplatíte z benefitů.',
  presetsLabel: 'Ukázková cesta',
  partLabels: { car: 'Auto', stay: 'Ubytování', insurance: 'Pojištění' },
  add: (label: string, price: string) => `Přidat ${label.toLowerCase()} od ${price}`,
  remove: 'Odebrat',
  recommended: 'Doporučujeme',
  more: 'Více o kategorii',
  presets: [
    {
      id: 'hory',
      label: 'Víkend na horách',
      recommended: 'car',
      stay: {
        name: 'Horský hotel Pod Sněžkou',
        place: 'Pec pod Sněžkou, Krkonoše',
        dates: '13.–15. 11. 2026 · 2 noci · 2 dospělí',
        price: 6400,
      },
      car: { name: 'Malé auto', detail: '3 dny, vyzvednutí v Praze', price: 1900 },
      insurance: { name: 'Pojištění Česko', detail: '2 osoby na 3 dny', price: 190 },
    },
    {
      id: 'more',
      label: 'Týden u moře',
      recommended: 'insurance',
      stay: {
        name: 'Hotel Modrá zátoka',
        place: 'Makarská, Chorvatsko',
        dates: '4.–11. 7. 2026 · 7 nocí · 2 dospělí',
        price: 18900,
      },
      car: { name: 'Malé auto', detail: '8 dní, vyzvednutí na letišti Split', price: 3600 },
      insurance: { name: 'Pojištění Evropa', detail: '2 osoby na 8 dní', price: 390 },
    },
    {
      id: 'mesto',
      label: 'Prodloužený víkend ve městě',
      recommended: null,
      stay: {
        name: 'Apartmány Na Nábřeží',
        place: 'Praha',
        dates: '27.–30. 11. 2026 · 3 noci · 2 dospělí',
        price: 7200,
      },
      car: { name: 'Malé auto', detail: '4 dny, vyzvednutí v Brně', price: 2400 },
      insurance: { name: 'Pojištění Česko', detail: '2 osoby na 4 dny', price: 190 },
    },
  ] satisfies {
    id: string
    label: string
    recommended: AddonKind | null
    stay: { name: string; place: string; dates: string; price: number }
    car: { name: string; detail: string; price: number }
    insurance: { name: string; detail: string; price: number }
  }[],
  summaryTitle: 'Souhrn cesty',
  balanceLabel: 'Kolik máte na benefitech?',
  balanceHint: 'Částka v korunách. Zůstatek najdete v aplikaci svého programu.',
  defaultBalance: 22000,
  total: 'Celkem',
  fromBenefits: 'Z benefitů',
  covered: 'Zaplatíte celé z benefitů',
  topUp: (amount: string) => `Doplatíte ${amount}`,
  leftOver: (amount: string) => `Na benefitech vám zbude ${amount}`,
  cta: 'Naplánovat tuto cestu',
}

// Obrazovka 2, nabídka doplňků po výběru ubytování (analyza-webu.md, kapitola 8.8).
// Hotely, ceny, krytí i partneři jsou fiktivní. Ceny navazují na trip builder.
export type StayId = 'hory' | 'more' | 'mesto' | 'alpy'
export type InsuranceTier = 'basic' | 'standard' | 'plus'
export type CarClass = 'small' | 'family'

type Stay = {
  name: string
  place: string
  photo: 'krkonose' | 'chorvatsko' | 'praha' | 'rakousko'
  dates: string
  nights: number
  guests: number
  guestsLabel: string
  room: string
  refundable: boolean
  cancellation: string
  /** Cena pobytu včetně servisního poplatku. */
  price: number
  fee: number
  region: string
  abroad: boolean
  recommended: AddonKind | null
  insuranceDays: number
  insurance: Record<InsuranceTier, number>
  carDays: number
  carPickup: string
  car: Record<CarClass, number>
  /** Ve městě je nabídka auta sbalená do jednoho řádku. */
  carCollapsed: boolean
}

export const offer = {
  steps: ['Ubytování', 'Doplňky', 'Košík a platba', 'Hotovo'],
  stepsLabel: 'Postup objednávky',
  stepOf: (current: number, total: number) => `Krok ${current} z ${total}`,
  title: 'Chcete k cestě něco přidat?',
  lead: 'Termín a osoby už známe. Doplňky jsou nepovinné a zaplatíte je stejnými benefity jako pobyt.',
  payable: 'Zaplatíte benefity',
  recommended: 'Doporučujeme',
  change: 'Změnit',
  edit: 'Upravit',
  editNote: 'V prototypu jsou údaje převzaté z pobytu a nejdou měnit.',
  stay: {
    label: 'Vaše ubytování',
    meta: (dates: string, nights: number, guests: string) =>
      `${dates} · ${nights} ${nights === 1 ? 'noc' : nights < 5 ? 'noci' : 'nocí'} · ${guests}`,
    fee: (amount: string) => `včetně servisního poplatku ${amount}`,
  },
  insurance: {
    title: 'Cestovní pojištění',
    meta: (region: string, persons: number, days: number) =>
      `${region} · ${persons} ${persons === 1 ? 'osoba' : persons < 5 ? 'osoby' : 'osob'} · ${days} dní`,
    whyAbroad:
      'Léčebné výlohy v zahraničí nehradí česká zdravotní pojišťovna celé. Varianta Standard kryje i zavazadla a sporty.',
    whyHome:
      'V Česku léčebné výlohy hradí zdravotní pojišťovna. Pojištění se hodí hlavně kvůli úrazu, odpovědnosti nebo stornu.',
    nonRefundable:
      'Pobyt máte nevratný. Varianta Plus kryje i storno pobytu, když ze závažných důvodů nemůžete odjet.',
    perTrip: 'za celou cestu',
    details: 'Co přesně pokrývá',
    none: 'Bez pojištění',
    noneHint: 'Pojištění můžete přidat i později v detailu objednávky.',
    disclaimer: 'Ukázkové krytí. Přesné podmínky a limity určí pojišťovna.',
    tiers: [
      {
        id: 'basic',
        name: 'Základ',
        perks: ['Léčebné výlohy', 'Úraz', 'Asistence nonstop'],
        details: [
          'Ošetření, hospitalizace a léky během cesty.',
          'Odškodnění při trvalých následcích úrazu.',
          'Telefonická pomoc v češtině kdykoliv během cesty.',
        ],
      },
      {
        id: 'standard',
        name: 'Standard',
        perks: ['Vše ze Základu', 'Zavazadla', 'Odpovědnost a sporty'],
        details: [
          'Všechno z varianty Základ.',
          'Krádež nebo poškození zavazadel.',
          'Škoda, kterou nechtěně způsobíte někomu jinému.',
          'Sporty včetně lyžování.',
        ],
      },
      {
        id: 'plus',
        name: 'Plus',
        perks: ['Vše ze Standardu', 'Storno pobytu', 'Zpoždění letu'],
        details: [
          'Všechno z varianty Standard.',
          'Vrácení peněz za pobyt, když ze závažných důvodů nemůžete odjet.',
          'Náhrada nutných výdajů při zpoždění letu.',
        ],
      },
    ] satisfies { id: InsuranceTier; name: string; perks: string[]; details: string[] }[],
  },
  car: {
    title: 'Půjčení auta',
    meta: (pickup: string, days: number) => `${pickup} · ${days} dní`,
    perTrip: (days: number) => `za ${days} dní`,
    none: 'Bez auta',
    noneHint: 'Auto jde přidat i později v detailu objednávky.',
    deposit:
      'Při převzetí půjčovna zablokuje kauci na kreditní kartě řidiče. Po vrácení auta ji uvolní. Kauci benefity nepokryjí.',
    collapsed: 'Potřebujete auto? Ve městě se většinou obejdete bez něj.',
    expand: 'Ukázat auta',
    classes: [
      { id: 'small', name: 'Malé auto', example: '4 místa, manuální převodovka' },
      { id: 'family', name: 'Rodinné auto', example: '5 míst, velký kufr, automat' },
    ] satisfies { id: CarClass; name: string; example: string }[],
  },
  summary: {
    title: 'Souhrn cesty',
    stay: 'Ubytování',
    insurance: (tier: string) => `Pojištění ${tier}`,
    car: (name: string) => name,
    total: 'Celkem',
    fromBenefits: 'Z benefitů',
    covered: 'Zaplatíte celé z benefitů',
    topUp: (amount: string) => `Doplatíte kartou ${amount}`,
    leftOver: (amount: string) => `Na benefitech vám zbude ${amount}`,
    balanceLabel: 'Kolik máte na benefitech?',
    cta: 'Pokračovat do košíku',
    skip: 'Pokračovat bez doplňků',
    breakdown: 'Rozpis',
    next: 'Košík s rozdělením platby je další obrazovka prototypu. Právě ji připravuji.',
  },
  stays: {
    hory: {
      name: 'Horský hotel Pod Sněžkou',
      place: 'Pec pod Sněžkou, Krkonoše',
      photo: 'krkonose',
      dates: '13.–15. 11. 2026',
      nights: 2,
      guests: 2,
      guestsLabel: '2 dospělí',
      room: 'Dvoulůžkový pokoj se snídaní',
      refundable: true,
      cancellation: 'Zrušení zdarma do 6. 11. 2026',
      price: 6400,
      fee: 506,
      region: 'Česko',
      abroad: false,
      recommended: 'car',
      insuranceDays: 3,
      insurance: { basic: 190, standard: 290, plus: 450 },
      carDays: 3,
      carPickup: 'Vyzvednutí v Praze',
      car: { small: 1900, family: 2700 },
      carCollapsed: false,
    },
    more: {
      name: 'Hotel Modrá zátoka',
      place: 'Makarská, Chorvatsko',
      photo: 'chorvatsko',
      dates: '4.–11. 7. 2026',
      nights: 7,
      guests: 2,
      guestsLabel: '2 dospělí',
      room: 'Dvoulůžkový pokoj s výhledem na moře, snídaně',
      refundable: false,
      cancellation: 'Nevratná rezervace',
      price: 18900,
      fee: 1493,
      region: 'Evropa',
      abroad: true,
      recommended: 'insurance',
      insuranceDays: 8,
      insurance: { basic: 390, standard: 690, plus: 1090 },
      carDays: 8,
      carPickup: 'Letiště Split',
      car: { small: 3600, family: 5200 },
      carCollapsed: false,
    },
    mesto: {
      name: 'Apartmány Na Nábřeží',
      place: 'Praha',
      photo: 'praha',
      dates: '27.–30. 11. 2026',
      nights: 3,
      guests: 2,
      guestsLabel: '2 dospělí',
      room: 'Apartmán s kuchyňkou',
      refundable: true,
      cancellation: 'Zrušení zdarma do 20. 11. 2026',
      price: 7200,
      fee: 569,
      region: 'Česko',
      abroad: false,
      recommended: null,
      insuranceDays: 4,
      insurance: { basic: 190, standard: 310, plus: 490 },
      carDays: 4,
      carPickup: 'Vyzvednutí v Brně',
      car: { small: 2400, family: 3400 },
      carCollapsed: true,
    },
    alpy: {
      name: 'Alpenhof Schladming',
      place: 'Schladming, Rakouské Alpy',
      photo: 'rakousko',
      dates: '1.–5. 2. 2027',
      nights: 4,
      guests: 2,
      guestsLabel: '2 dospělí',
      room: 'Dvoulůžkový pokoj s polopenzí',
      refundable: true,
      cancellation: 'Zrušení zdarma do 18. 1. 2027',
      price: 12400,
      fee: 980,
      region: 'Evropa',
      abroad: true,
      recommended: 'insurance',
      insuranceDays: 5,
      insurance: { basic: 320, standard: 560, plus: 890 },
      carDays: 5,
      carPickup: 'Letiště Salcburk',
      car: { small: 2900, family: 4200 },
      carCollapsed: false,
    },
  } satisfies Record<StayId, Stay>,
}

// Dobré vědět před cestou (kapitola 8.6). Obsah je ilustrativní, podmínky by vznikly s partnery.
export const goodToKnow = {
  title: 'Dobré vědět před cestou',
  lead: 'Krátké odpovědi k pojištění a autu, ať víte, co přidat a na co se připravit.',
  disclaimer: 'Ukázkový obsah. Přesné podmínky by vznikly s partnery.',
  more: 'Více o kategorii',
  columns: [
    {
      id: 'insurance',
      title: 'Cestovní pojištění',
      items: [
        {
          question: 'Potřebuju pojištění i v Česku?',
          answer:
            'Léčebné výlohy v Česku hradí zdravotní pojišťovna. Doma má smysl hlavně storno pojištění, úraz a odpovědnost. V zahraničí jsou nejdůležitější léčebné výlohy.',
        },
        {
          question: 'Co když onemocním před odjezdem?',
          answer:
            'Na to je storno pojištění. Když kvůli nemoci nemůžete odjet, vrátí vám podle podmínek část zaplacené ceny. Sjednat ho je potřeba ještě předtím, než se něco stane.',
        },
        {
          question: 'Zaplatím pojištění benefity?',
          answer:
            'V tomto prototypu ano, stejně jako ubytování. Jestli to půjde u všech programů, je zatím otevřená otázka.',
        },
      ],
    },
    {
      id: 'car',
      title: 'Půjčení auta',
      items: [
        {
          question: 'Jak je to s kaucí?',
          answer:
            'Půjčovny kauci obvykle blokují na kreditní kartě, takže ji benefity nepokryjí. Počítejte s tím, že při vyzvednutí auta budete kartu potřebovat.',
        },
        {
          question: 'Co je v ceně?',
          answer:
            'U každého auta uvidíte, jestli cena zahrnuje pojištění auta, neomezené kilometry a jaké jsou podmínky pro palivo. Vše ještě před platbou.',
        },
        {
          question: 'Kdy se auto vyplatí?',
          answer:
            'Hlavně na horách, v místech bez dobrého spojení vlakem a na cestách s dětmi, kdy vezete víc věcí.',
        },
      ],
    },
  ],
}

// Interaktivní průvodce (zjištění 1.5). Kroky rezervace vycházejí z dnešní stránky Jak to funguje.
export type GuidePath = 'web' | 'extension' | 'addons'
export const guide = {
  title: 'Jak to funguje',
  lead: 'Projděte si to krok za krokem. Klikněte na Další, nebo na mobilu přejeďte prstem.',
  pathsLabel: 'Vyberte cestu',
  prev: 'Předchozí',
  next: 'Další',
  restart: 'Znovu od začátku',
  details: 'Více podrobností',
  stepOf: (step: number, total: number) => `Krok ${step} z ${total}`,
  proposal: 'Návrh',
  // Texty v ukázkách rozhraní. Hotely a jména jsou fiktivní.
  mock: {
    siteLabel: 'Dovolená za benefity',
    bookingLabel: 'booking.com',
    place: 'Makarská riviéra',
    dates: '4.–11. 7.',
    datesLong: '4.–11. 7. 2026 · 2 dospělí',
    guests: '2 dospělí',
    search: 'Hledat',
    results: [
      { name: 'Penzion Borovice', price: 15200 },
      { name: 'Apartmány Marina', price: 21400 },
    ],
    options: 'Dostupné možnosti',
    rooms: ['Dvoulůžkový pokoj', 'Pokoj s výhledem na moře'],
    seaViewPrice: 22300,
    perStay: 'za pobyt',
    formLabels: ['Jméno a příjmení', 'E-mail', 'Telefon'],
    typedName: 'Jana Nováková',
    programs: ['Edenred', 'Pluxee', 'Up'],
    fromBenefits: 'Z benefitů',
    benefitsPaid: 18000,
    topUp: 'Doplatek kartou',
    topUpPaid: 900,
    paid: 'Pobyt je zaplacený',
    docs: ['Potvrzení rezervace', 'Doklad o zaplacení'],
    bookingHotels: ['Hotel u moře', 'Vila s bazénem', 'Penzion v přístavu'],
    payable: 'Zaplatíte benefity',
    prefilled: 'Termín a osoby převzaté z Booking.com',
    chooseRoom: 'Vybrat pokoj',
    add: 'Přidat',
    stay: 'Ubytování',
    insurance: 'Pojištění',
    totalFromBenefits: 'Celkem z benefitů',
  },
  paths: [
    {
      id: 'web',
      label: 'Rezervace na webu',
      steps: [
        {
          title: 'Vyhledejte ubytování',
          short: 'Zadejte místo, termín a počet osob.',
          details:
            'Zobrazíme aktuální nabídku ubytování podle vašeho zadání. Rezervovat jde jen ubytování, které nevyžaduje platbu na místě.',
        },
        {
          title: 'Vyberte si ubytování',
          short: 'Ve výsledcích klikněte na Dostupné možnosti.',
          details:
            'Máte hotel vybraný na Booking.com? Vložte odkaz na jeho stránku. Termín i počet osob převezmeme a otevřeme ten samý hotel s aktuální nabídkou.',
        },
        {
          title: 'Vyberte pokoje',
          short: 'Zvolte typ a počet pokojů.',
          details: 'U každého pokoje uvidíte cenu za celý pobyt a podmínky storna.',
        },
        {
          title: 'Vyplňte údaje',
          short: 'Stačí údaje potřebné k rezervaci.',
          details: 'Na další stránce vyplníte údaje, které hotel potřebuje k dokončení rezervace.',
        },
        {
          title: 'Zaplaťte benefity',
          short: 'Vyberte svou benefitní kartu nebo kafeterii.',
          details:
            'Platbu si můžete rozdělit. Část zaplatíte benefity, zbytek kartou nebo převodem. Po zaplacení rezervaci dokončíme za vás a zaplatíme ji naší kartou. Když vám z Booking.com přijde e-mail o platbě kartou, nemusíte nic měnit.',
        },
        {
          title: 'Hotovo, balíte kufry',
          short: 'Pobyt je zaplacený.',
          details:
            'Stav objednávky, doklad o zaplacení a dokumenty najdete kdykoli na stránce, jejíž odkaz vám pošleme e-mailem.',
        },
      ],
    },
    {
      id: 'extension',
      label: 'Rozšíření do prohlížeče',
      proposal: true,
      steps: [
        {
          title: 'Přidejte rozšíření',
          short: 'Jedním klikem do prohlížeče Chrome.',
          details:
            'Rozšíření má oprávnění jen pro booking.com. Nic dalšího v prohlížeči nevidí ani nečte.',
        },
        {
          title: 'Vybírejte na Booking.com',
          short: 'Jako vždycky, nic se nemění.',
          details:
            'U hotelů, které jde zaplatit předem online, uvidíte štítek. Nestane se, že na hotel narazíte, a pak ho nejde zaplatit.',
        },
        {
          title: 'Klikněte na Zaplatit benefity',
          short: 'Tlačítko je přímo na stránce hotelu.',
          details:
            'U tlačítka je cena včetně poplatku. Když zadáte zůstatek, hned uvidíte, jestli se pobyt vejde do benefitů.',
        },
        {
          title: 'Dokončete objednávku',
          short: 'Otevře se stejný hotel s vyplněným termínem.',
          details: 'Nic nekopírujete. Pokračujete rovnou výběrem pokoje a platbou benefity.',
        },
      ],
    },
    {
      id: 'addons',
      label: 'Auto a pojištění',
      proposal: true,
      steps: [
        {
          title: 'Vyberte ubytování',
          short: 'Začnete jako obvykle.',
          details:
            'Auto i pojištění se vážou na termín a místo pobytu, takže je nemusíte zadávat znovu.',
        },
        {
          title: 'Přidejte, co se hodí',
          short: 'Nabídneme auto a pojištění pro váš termín.',
          details:
            'Doporučený doplněk je zvýrazněný, ale nic není zaškrtnuté předem. Rozhodujete vy.',
        },
        {
          title: 'Zaplaťte všechno najednou',
          short: 'Jeden košík, jedna platba benefity.',
          details:
            'V košíku uvidíte, kolik pokryjí benefity a kolik případně doplatíte. Platbu jde rozdělit stejně jako u ubytování.',
        },
        {
          title: 'Doklady na jednom místě',
          short: 'Rezervace, pojistka i auto pohromadě.',
          details:
            'Všechno najdete na stránce stavu objednávky. Doplněk jde přidat i později, když si to rozmyslíte.',
        },
      ],
    },
  ] satisfies {
    id: GuidePath
    label: string
    proposal?: boolean
    steps: { title: string; short: string; details: string }[]
  }[],
}

// Sekce Vybíráte na Booking.com? (zjištění 1.1 D a kapitola 3).
export const bookingSection = {
  title: 'Vybíráte na Booking.com?',
  lead: 'Klidně vybírejte tam, kde jste zvyklí. Zaplatit můžete u nás benefity.',
  extension: {
    badge: 'Novinka',
    title: 'Rozšíření Zaplatit benefity',
    text: 'Na stránce hotelu na Booking.com přibude tlačítko. Jedním klikem otevře stejný hotel u nás, s termínem i počtem osob.',
    points: [
      'Bez kopírování odkazů',
      'Hned uvidíte cenu za benefity',
      'Jen pro Chrome na počítači',
    ],
    cta: 'Přidat do Chrome',
    ctaNote: 'Rozšíření je zatím návrh. Popisuji ho v kapitole 3 případové studie.',
    demo: 'Ukázat v průvodci',
    hotel: 'Hotel u moře',
    hotelMeta: '7 nocí · 2 dospělí',
    pay: 'Zaplatit benefity',
    fits: 'Vejde se do vašich benefitů',
  },
  link: {
    title: 'Nebo vložte odkaz',
    steps: [
      'Otevřete hotel na Booking.com a vyberte termín.',
      'Zkopírujte adresu stránky a vložte ji do hledání.',
    ],
    cta: 'Vložit odkaz',
  },
}

// Blok pro HR (zjištění 1.8 e). Vede na samostatný web pro firmy.
export const hrBlock = {
  eyebrow: 'Pro firmy a HR',
  title: 'Nabídněte zaměstnancům celou dovolenou za benefity',
  text: 'Ubytování, auto i pojištění z jednoho místa. Na webu pro firmy najdete, jak službu zaměstnancům představit.',
  cta: 'Web pro firmy',
}

// FAQ (zjištění 1.7). Obecné a Platba vycházejí z dnešní stránky Jak to funguje,
// Auto a Pojištění jsou ukázkové odpovědi k návrhu nových kategorií.
export const faq = {
  title: 'Časté dotazy',
  categoriesLabel: 'Kategorie dotazů',
  sample: 'Ukázkové odpovědi k novým kategoriím.',
  more: 'Další dotazy',
  categories: [
    {
      id: 'general',
      label: 'Obecné',
      items: [
        {
          question: 'Jak si u vás vyberu ubytování?',
          answer:
            'Na úvodní stránce zadejte místo, termín a počet osob a ve výsledcích vyberte ubytování. Rezervovat jde ubytování, které nevyžaduje platbu na místě.',
        },
        {
          question: 'Mám hotel vybraný na Booking.com. Co s ním?',
          answer:
            'Zkopírujte adresu jeho stránky a vložte ji do hledání. Termín i počet osob převezmeme a otevřeme stejný hotel s aktuální nabídkou.',
        },
        {
          question: 'Co se stane po odeslání objednávky?',
          answer:
            'Po zaplacení rezervaci dokončíme na Booking.com a zaplatíme ji naší kartou. Odkaz na stránku se stavem objednávky a dokumenty vám pošleme e-mailem.',
        },
      ],
    },
    {
      id: 'payment',
      label: 'Platba',
      items: [
        {
          question: 'Čím můžu zaplatit?',
          answer: 'Benefitní kartou nebo kafeterií. Zbytek jde doplatit kartou nebo převodem.',
        },
        {
          question: 'Musím doplácet vlastními penězi?',
          answer: 'Ne. Vlastní peníze přidáte, jen když benefity na celou cestu nestačí.',
        },
        {
          question: 'Přišel mi z Booking.com e-mail o platbě kartou. Mám něco dělat?',
          answer: 'Ne. Rezervaci za vás platíme naší kartou, nic nemusíte doplňovat ani měnit.',
        },
      ],
    },
    {
      id: 'car',
      label: 'Auto',
      sample: true,
      items: [
        {
          question: 'Můžu si půjčit auto i bez ubytování?',
          answer: 'Ano. Auto jde koupit i samostatně, třeba k dovolené rezervované jinde.',
        },
        {
          question: 'Můžu auto přidat k už zaplacenému pobytu?',
          answer: 'Ano, na stránce stavu objednávky. Termín a místo se převezmou z rezervace.',
        },
      ],
    },
    {
      id: 'insurance',
      label: 'Pojištění',
      sample: true,
      items: [
        {
          question: 'Můžu pojištění koupit k dovolené rezervované jinde?',
          answer: 'Ano. Pojištění jde koupit i samostatně, stačí zadat oblast, termín a osoby.',
        },
        {
          question: 'Kdy je nejlepší pojištění sjednat?',
          answer:
            'Hned s rezervací. Storno pojištění kryje jen to, co se stane až po jeho sjednání.',
        },
      ],
    },
  ] satisfies {
    id: string
    label: string
    sample?: boolean
    items: { question: string; answer: string }[]
  }[],
}

// Poznámky „proč“. Zdroj odkazuje na bod v analyza-webu.md.
export const notes = {
  open: 'Proč je to takhle',
  close: 'Zavřít poznámku',
  // Čísla jdou po stránce shora dolů. Bod analýzy je uvedený až v otevřené poznámce.
  number: (n: number) => `Poznámka ${n}`,
  source: 'Vychází z analýzy',
  items: {
    stepper: {
      source: 'Objednávka, bod 4.7',
      title: 'Ukazatel kroků',
      text: 'Dnes člověk při objednávce neví, v jakém kroku je ani kolik jich zbývá. Čtyři kroky ukazují, že doplňky jsou jen krátká zastávka před košíkem.',
    },
    addonsStep: {
      source: 'Prototyp, kapitola 8.8 a test 4',
      title: 'Doplňky jako samostatný krok',
      text: 'Nabídka přichází hned po výběru ubytování, kdy člověk řeší cestu jako celek. Je to varianta A testu 4. Proti ní se měří zkrácená nabídka v košíku.',
    },
    staySummary: {
      source: 'Výsledky a objednávka, body 2.1 a 4.1',
      title: 'Cena včetně poplatku',
      text: 'Prototyp přeskakuje výsledky a detail hotelu, jejich zjištění jsou v kapitole 4B. Cena pobytu je včetně servisního poplatku, aby se na konci nic nepřičítalo.',
    },
    payable: {
      source: 'Nové kategorie, kapitola 7',
      title: 'Předpoklad, že doplňky jdou platit benefity',
      text: 'Jestli jde doplňky zaplatit benefity, je klíčová otevřená otázka. Prototyp s tím počítá, protože na tom celá nabídka stojí. Ověřil bych to jako první.',
    },
    insuranceTiers: {
      source: 'Prototyp, kapitola 8.8',
      title: 'Nic není předem vybrané',
      text: 'Tři varianty a vedle nich Bez pojištění. Ceny jsou za celou cestu pro všechny osoby, aby byl hned vidět dopad na benefity. Předem zaškrtnutý doplněk by byl manipulativní.',
    },
    recommendation: {
      source: 'Prototyp, kapitola 8.4',
      title: 'Doporučení podle místa',
      text: 'Doporučení se řídí destinací a jedna věta říká proč. U zahraničí je to Standard, u Česka pojištění nedoporučuji, ve městě je auto sbalené.',
    },
    stornoHint: {
      source: 'Detail hotelu, bod 3.3',
      title: 'Storno u nevratného pobytu',
      text: 'Hypotéza na test. U nevratné sazby připomenu, že varianta Plus kryje storno pobytu. Cena flexibility je pak vidět na jednom místě.',
    },
    deposit: {
      source: 'Prototyp, kapitola 8.8',
      title: 'Kauce u auta',
      text: 'Půjčovny obvykle blokují kauci na kreditní kartě řidiče. Benefity ji nepokryjí, protože nejde o platbu. Říkám to dřív, než to člověk zjistí na místě.',
    },
    offerSummary: {
      source: 'Prototyp, kapitola 8.8',
      title: 'Souhrn s benefity',
      text: 'Stejný pruh pokrytí jako v trip builderu. Po každé volbě je hned vidět, jestli se cesta vejde do benefitů a kolik případně doplatíte.',
    },
    skip: {
      source: 'Plán A/B testů, test 4',
      title: 'Přeskočit jde stejně snadno',
      text: 'Pokračovat bez doplňků je stejně velké tlačítko, ne schovaný šedý odkaz. Ochranná metrika testu 4 je konverze samotného ubytování.',
    },
    headline: {
      source: 'Úvodní stránka, bod 1.3',
      title: 'Benefity na prvním místě',
      text: 'Nadpis mluví o tom, co člověk získá, a hned ukazuje podporované programy. Dnešní nadpis zdůrazňuje Booking. Přesné znění bych ověřil A/B testem.',
    },
    tabs: {
      source: 'Nové kategorie, kapitola 7',
      title: 'Nové kategorie',
      text: 'Záložky ukazují, že web nabízí celou cestu. Ve variantách A i B jsou stejné, aby nezkreslily test vyhledávání.',
    },
    searchNew: {
      source: 'Úvodní stránka, bod 1.1',
      title: 'Pole jen pro hledání',
      text: 'Dnes jedno pole slouží pro místo i pro odkaz z Booking.com. Tady pole našeptává místa i hotely podle názvu, takže odkaz většina lidí nepotřebuje. Když někdo odkaz přesto vloží, pole ho rozpozná a nabídne otevřít hotel.',
    },
    searchCurrent: {
      source: 'Úvodní stránka, bod 1.1',
      title: 'Varianta B, dnešní řešení',
      text: 'Současné řešení v novém vzhledu. Jedno pole pro místo i odkaz, termín a osoby se ukážou až po zadání místa. Proti ní se v A/B testu měří navržená varianta A.',
    },
    fields: {
      source: 'Úvodní stránka, bod 1.1',
      title: 'Všechna pole hned',
      text: 'Termín a počet osob jsou vidět od začátku. Rozložení se během vyplňování nemění a je jasné, co všechno je potřeba vyplnit.',
    },
    link: {
      source: 'Úvodní stránka, bod 1.1',
      title: 'Odkaz z Booking.com zvlášť',
      text: 'Kdo má hotel vybraný, vloží odkaz do samostatného pole s krátkým návodem. Hledání zůstává čisté a tahle cesta se nezhorší.',
    },
    button: {
      source: 'Úvodní stránka, bod 1.2',
      title: 'Výrazné hlavní tlačítko',
      text: 'Hledat je nejkontrastnější prvek stránky. Dnes je světle modré na modrém pozadí a působí neaktivně.',
    },
    calendar: {
      source: 'Úvodní stránka, bod 1.4',
      title: 'Kalendář přes více měsíců',
      text: 'Měsíce jdou pod sebou a počet nocí je přímo na tlačítku Potvrdit.',
    },
    recent: {
      source: 'Úvodní stránka, bod 1.11',
      title: 'Nedávné hledání',
      text: 'Poslední hledání se nabídne znovu. Ukládá se jen v prohlížeči a po sedmi dnech zmizí.',
    },
    sticky: {
      source: 'Úvodní stránka, bod 1.9',
      title: 'Hledání vždy po ruce',
      text: 'Když vyhledávání odjede z obrazovky, připne se nahoru. Na desktopu jde o celé hledání v jednom řádku, takže se dá hledat kdykoliv bez posouvání. Na mobilu je to zkrácený řádek, který vrátí k hledání.',
    },
    row: {
      source: 'Úvodní stránka, bod 1.1',
      title: 'Hledání v jednom řádku',
      text: 'Na desktopu jsou všechna pole v jednom řádku, stejně jako u většiny konkurentů. Lidé ten vzor znají. Je to ale hypotéza, kterou bych ověřil dalším testem.',
    },
    addons: {
      source: 'Nové kategorie, kapitola 7',
      title: 'Doplňky hned na začátku',
      text: 'Pojištění a auto jsou vidět už v první obrazovce i s orientační cenou. Člověk ví, že benefity zaplatí celou cestu, ještě než začne hledat. Klik přepne vyhledávání na danou kategorii.',
    },
    destinations: {
      source: 'Nové kategorie, kapitola 7',
      title: 'Doplněk podle místa',
      text: 'Štítek doporučí doplněk, který k místu dává smysl. Na horách auto, v zahraničí pojištění, ve městě nic. Na další obrazovce bude doplněk zvýrazněný, ale nezaškrtnutý, protože předem zaškrtnutá volba by byla manipulativní.',
    },
    tripBuilder: {
      source: 'Nové kategorie, kapitola 7',
      title: 'Celá cesta na jednom místě',
      text: 'Ukazuje vizi produktu. Celá cesta, jedna platba benefity, vyšší tržba na zákazníka. Zároveň člověka naučí, že benefity pokryjí i auto a pojištění.',
    },
    coverage: {
      source: 'Úvodní stránka, bod 1.3',
      title: 'Kolik pokryjí benefity',
      text: 'Lidé přemýšlejí v tom, kolik mají na benefitech. Pruh hned ukáže, jestli zaplatí všechno z benefitů, nebo kolik doplatí.',
    },
    goodToKnow: {
      source: 'Nové kategorie, kapitola 7',
      title: 'Praktické info místo článků',
      text: 'Krátké odpovědi na otázky, které lidi u auta a pojištění zastaví. Hlavně kauce na kreditní kartě, kterou benefity nepokryjí. Musí být řečená předem, ne až u přepážky.',
    },
    guide: {
      source: 'Úvodní stránka, bod 1.5',
      title: 'Průvodce místo dlouhého návodu',
      text: 'Dnešní návod má šest kroků s dlouhými texty. Tady má každý krok jednu větu a ukázku, podrobnosti jsou schované pod odkazem. Kroky si člověk spouští sám a zůstává na stránce. Text je normálně v HTML, takže ho přečtou i vyhledávače.',
    },
    booking: {
      source: 'Úvodní stránka, bod 1.1',
      title: 'Booking.com bez kopírování',
      text: 'Hlavní cestou je rozšíření do prohlížeče s tlačítkem přímo na Booking.com. Vložení odkazu zůstává jako druhá možnost. Rozšíření je návrh, nejdřív bych ověřil smluvní podmínky s Booking.com.',
    },
    hr: {
      source: 'Úvodní stránka, bod 1.8',
      title: 'Blok pro HR',
      text: 'HR hledá slovo benefity, takže na web může přijít i ono. Blok i odkaz Pro firmy vedou na samostatný web pro firmy, ne na novou podstránku.',
    },
    faq: {
      source: 'Úvodní stránka, bod 1.7',
      title: 'Časté dotazy na konci',
      text: 'Kdo dojde až na konec stránky, ještě něco řeší. Pár nejčastějších otázek s kategoriemi mu pomůže rozhodnout se. Odpovědi umí použít i chat.',
    },
    chat: {
      source: 'Úvodní stránka, bod 1.10',
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
        { label: 'Jak to funguje', note: placeholder.page, target: 'jak-to-funguje' },
        { label: 'Časté dotazy', note: placeholder.page, target: 'caste-dotazy' },
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
