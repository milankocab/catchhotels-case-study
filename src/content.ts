/*
 * Všechny texty stránky na jednom místě. Komponenty jen čtou tento soubor.
 *
 * Jak upravovat:
 * - Text měňte přímo v uvozovkách. Odstavce jsou položky pole.
 * - Text začínající „TODO-MILAN:“ se na stránce zobrazí jako jantarový štítek.
 *   Po doplnění ho nahraďte běžným textem a štítek zmizí.
 * - Pravidla stylu. Česky, první osoba, žádné pomlčky ani dvojtečky uprostřed vět,
 *   hypotézy jako hypotézy („předpokládám“, „ověřil bych“).
 */

export const TODO_PREFIX = 'TODO-MILAN:'

export const meta = {
  author: 'Milan Kocáb',
  year: '2026',
  email: 'milan.kocab0@gmail.com',
  linkedin: 'linkedin.com/in/milan-kocab',
  disclaimer:
    'Nezávislá případová studie. Nevznikla ve spolupráci s CatchHotels a nepracuje s jejich interními daty.',
}

export const nav = [
  { id: 'kontext', title: 'Kontext a cíl' },
  { id: 'audit', title: 'Audit nákupního procesu' },
  { id: 'prilezitost', title: 'Příležitost' },
  { id: 'prototyp', title: 'Prototyp' },
  { id: 'kalkulacka', title: 'Kalkulačka dopadu' },
  { id: 'overeni', title: 'Jak bych to ověřil' },
  { id: 'otazky', title: 'Co bych potřeboval vědět' },
] as const

export type SectionId = (typeof nav)[number]['id']

// 0. Hlavička
export const hero = {
  eyebrow: 'Případová studie · produktový management',
  title: 'Doplňkové služby v rezervaci Dovolené za benefity',
  subtitle: 'Cestovní pojištění a půjčení auta jako první kategorie mimo ubytování',
  readingTime: 'Čtení na 6 minut',
  summaryTitle: 'Ve zkratce',
  summary: [
    {
      label: 'Co navrhuji',
      text: 'Přidat do rezervace ubytování nabídku cestovního pojištění a půjčení auta. Obě služby se týkají stejného termínu a místa jako ubytování.',
    },
    {
      label: 'Očekávaný přínos',
      text: 'Předpokládám, že doplňky zvýší výnos na jednu rezervaci a konverze ubytování přitom neklesne. Jde o hypotézu. Kalkulačka níže ukazuje, jak bych přínos odhadl.',
    },
    {
      label: 'Jak bych to ověřil',
      text: 'A/B testem na jednom trhu s jednou kategorií. Hlavní metrikou je výnos na rezervaci, ochrannou metrikou konverze ubytování.',
    },
  ],
}

// 1. Kontext a cíl
export const context = {
  intro: [
    'Podle veřejně dostupných informací zprostředkuje CatchHotels.com letos přes Dovolenou za benefity zhruba 30 tisíc rezervací. Produkt umožňuje platit ubytování z benefitních programů zaměstnavatelů a funguje v Česku, Polsku a na Slovensku.',
    'V roce 2027 chce firma výsledky zdvojnásobit a přidat kategorie mimo ubytování, konkrétně půjčení auta, letenky, zájezdy a cestovní pojištění.',
  ],
  facts: [
    { value: '≈ 30 000', label: 'rezervací letos' },
    { value: '2×', label: 'cíl pro rok 2027' },
    { value: '3', label: 'trhy, CZ, PL a SK' },
  ],
  source: 'Údaje o firmě pochází z veřejně dostupného zdroje. Jiné údaje o firmě nemám.',
  focusTitle: 'Na co se soustředím',
  focus: [
    'První dvě nové kategorie, tedy cestovní pojištění a půjčení auta.',
    'Kde je v nákupním procesu nabídnout, aby neutrpěla konverze ubytování.',
    'Jak odhadnout přínos a jak ho ověřit.',
  ],
  outOfScopeTitle: 'Co záměrně neřeším',
  outOfScope: [
    'Expanzi na nové trhy.',
    'Letenky a zájezdy. Mají jinou logistiku i jiné partnery a podle mě patří do další fáze.',
  ],
}

// 2. Audit současného nákupního procesu
export const audit = {
  intro: [
    'Nákupní proces jsem prošel 19. 10. 2026 jako zákazník od vyhledání ubytování až po platební krok. Rezervaci jsem nedokončil.',
  ],
  introTodo: 'TODO-MILAN: doplnit zařízení, na kterém jsem audit dělal (například iPhone, Safari).',
  labels: {
    step: 'Krok procesu',
    observed: 'Co jsem pozoroval',
    why: 'Proč to může ovlivnit konverzi',
    proposal: 'Návrh',
  },
  // Screenshot se načte z assets/screenshots/<soubor>. Dokud soubor chybí, ukáže se rámeček.
  findings: [
    {
      step: 'Vyhledávání',
      screenshot: '01-vyhledavani.png',
      observed: 'TODO-MILAN: co jsem pozoroval ve vyhledávání.',
      why: 'TODO-MILAN: proč to může ovlivnit konverzi.',
      proposal: 'TODO-MILAN: můj návrh.',
    },
    {
      step: 'Výsledky vyhledávání',
      screenshot: '02-vysledky.png',
      observed: 'TODO-MILAN: co jsem pozoroval ve výsledcích.',
      why: 'TODO-MILAN: proč to může ovlivnit konverzi.',
      proposal: 'TODO-MILAN: můj návrh.',
    },
    {
      step: 'Detail ubytování',
      screenshot: '03-detail-ubytovani.png',
      observed: 'TODO-MILAN: co jsem pozoroval na detailu ubytování.',
      why: 'TODO-MILAN: proč to může ovlivnit konverzi.',
      proposal: 'TODO-MILAN: můj návrh.',
    },
    {
      step: 'Košík',
      screenshot: '04-kosik.png',
      observed: 'TODO-MILAN: co jsem pozoroval v košíku.',
      why: 'TODO-MILAN: proč to může ovlivnit konverzi.',
      proposal: 'TODO-MILAN: můj návrh.',
    },
    {
      step: 'Platba benefity',
      screenshot: '05-platba-benefity.png',
      observed: 'TODO-MILAN: co jsem pozoroval při platbě benefity.',
      why: 'TODO-MILAN: proč to může ovlivnit konverzi.',
      proposal: 'TODO-MILAN: můj návrh.',
    },
    {
      step: 'TODO-MILAN: další krok, nebo zjištění smazat',
      screenshot: '06-dalsi-zjisteni.png',
      observed: 'TODO-MILAN: co jsem pozoroval.',
      why: 'TODO-MILAN: proč to může ovlivnit konverzi.',
      proposal: 'TODO-MILAN: můj návrh.',
    },
  ],
  missingScreenshot: 'Screenshot zatím chybí',
}

// 3. Příležitost
export const opportunity = {
  whyTitle: 'Proč začít pojištěním a autem',
  whyIntro: 'Jako první kategorie mimo ubytování bych zvolil tyto dvě. Mám pro to tři důvody.',
  why: [
    'Navazují přímo na rezervaci ubytování. Zákazník v ní už zvolil termín, místo i počet osob.',
    'Týkají se stejného termínu a místa. Nabídku jde předvyplnit a zákazník nemusí nic zadávat znovu.',
    'Nevyžadují složitou logistiku jako letenky nebo zájezdy. Předpokládám, že na trhu existují partneři, které jde napojit bez vlastního provozu.',
  ],
  variantsTitle: 'Kde nabídku ukázat',
  variantsIntro:
    'Zvažuji tři místa v procesu. U každého sleduji hlavně jedno riziko, pokles konverze samotného ubytování.',
  variants: [
    {
      key: 'A',
      title: 'Po výběru ubytování, před košíkem',
      pros: [
        'Zákazník řeší cestu jako celek a nabídka přichází v kontextu.',
        'Doplněk je v košíku od začátku a platí se jednou platbou.',
      ],
      risks: [
        'Přidává krok mezi výběrem a košíkem. Předpokládám, že nese nejvyšší riziko poklesu konverze ubytování.',
      ],
    },
    {
      key: 'B',
      title: 'V košíku jako doplněk',
      pros: [
        'Zákazník už má rozhodnuto o ubytování. Doplněk přidá jedním klikem.',
        'Nevzniká nový krok v procesu.',
      ],
      risks: [
        'Vyšší celková cena těsně před platbou může zákazníka zdržet.',
        'Košík se může stát nepřehledným, hlavně na mobilu.',
      ],
    },
    {
      key: 'C',
      title: 'Po dokončení rezervace',
      pros: [
        'Konverzi ubytování neohrozí, protože rezervace už je hotová.',
        'Nabídku jde zopakovat v e-mailu před odjezdem.',
      ],
      risks: [
        'Zákazník musí projít další platbou.',
        'Předpokládám nižší podíl rezervací s doplňkem, protože pozornost po rezervaci klesá.',
      ],
    },
  ],
  prosLabel: 'Výhody',
  risksLabel: 'Rizika',
  recommendationTitle: 'Moje doporučení',
  recommendation: ['TODO-MILAN: vybrat variantu a zdůvodnit.'],
  questionTitle: 'Klíčová otevřená otázka',
  question: 'Lze doplňkovou službu zaplatit benefitními body, nebo jen doplatkem kartou?',
  questionBody: [
    'Odpověď nevím a na ní stojí celý návrh.',
    'Pokud jde doplněk zaplatit body, zákazník ho platí z rozpočtu, který mu dal zaměstnavatel. Předpokládám, že ho pak koupí výrazně větší podíl zákazníků, zvlášť když se body blíží konec platnosti.',
    'Pokud jde jen o doplatek kartou, je doplněk skutečný výdaj z vlastní kapsy. Konkuruje pak pojištění k platební kartě a půjčovnám, které zákazník zná. Očekávaný podíl rezervací s doplňkem by byl nižší a nabídka by musela víc vysvětlovat, proč se vyplatí.',
    'Odpověď ovlivní výběr partnerů, cenu, místo nabídky v procesu i výchozí hodnoty v kalkulačce. Proto bych ji zjišťoval jako první.',
  ],
  questionNote:
    'Prototyp počítá s tím, že doplňky jde zaplatit body, protože na tom produkt stojí. Jde o předpoklad.',
}

// 4. Prototyp
export const prototype = {
  intro: [
    'Klikací prototyp ukazuje, jak by mohla vypadat nabídka doplňků v rezervaci. Hotel, termín, ceny i zůstatek bodů jsou fiktivní.',
  ],
  frameLabel: 'Prototyp · fiktivní data',
  restart: 'Začít znovu',
  steps: ['Ubytování', 'Doplňky', 'Košík', 'Hotovo'],
  stepOf: 'Krok',
  back: 'Zpět',
  // Fiktivní data. 1 bod = 1 Kč je předpoklad pro ukázku.
  data: {
    hotel: 'Hotel Modrá zátoka',
    place: 'Makarská riviéra, Chorvatsko',
    dates: '12. 7. – 19. 7. 2027',
    nights: '7 nocí',
    guests: '2 dospělí',
    room: 'Dvoulůžkový pokoj s výhledem na moře, snídaně',
    price: 18900,
    pointsBalance: 22000,
    pointValueNote: 'Předpoklad pro ukázku je 1 bod = 1 Kč.',
    insurance: [
      {
        id: 'basic',
        name: 'Základ',
        price: 390,
        perks: ['Léčebné výlohy', 'Úraz'],
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 690,
        perks: ['Léčebné výlohy', 'Úraz', 'Zavazadla', 'Odpovědnost'],
      },
      {
        id: 'plus',
        name: 'Plus',
        price: 1090,
        perks: ['Vše ze Standardu', 'Storno ubytování', 'Zpoždění letu'],
      },
    ],
    cars: [
      { id: 'small', name: 'Malé auto', example: '4 místa, manuální převodovka', price: 3600 },
      {
        id: 'family',
        name: 'Rodinné auto',
        example: '5 míst, velký kufr, automat',
        price: 5200,
      },
    ],
  },
  summary: {
    title: 'Vaše ubytování',
    cta: 'Pokračovat',
    priceLabel: 'Cena',
    balanceLabel: 'Zůstatek bodů',
  },
  addons: {
    title: 'Chcete k pobytu něco přidat?',
    lead: 'Termín a počet osob jsme převzali z rezervace. Doplňky jsou nepovinné.',
    insuranceTitle: 'Cestovní pojištění',
    insuranceLead: 'Pro 2 osoby na 8 dní, Chorvatsko',
    carTitle: 'Půjčení auta',
    carLead: 'Na 7 dní, převzetí a vrácení u hotelu',
    none: 'Bez pojištění',
    noCar: 'Bez auta',
    cta: 'Pokračovat do košíku',
    skip: 'Pokračovat bez doplňků',
  },
  cart: {
    title: 'Košík',
    accommodation: 'Ubytování',
    insurance: 'Cestovní pojištění',
    car: 'Půjčení auta',
    total: 'Celkem',
    payTitle: 'Jak zaplatíte',
    points: 'Benefitní body',
    card: 'Doplatek kartou',
    noCard: 'Doplatek kartou není potřeba.',
    cta: 'Zaplatit (simulace)',
    remove: 'Odebrat',
  },
  done: {
    title: 'Rezervace je hotová',
    lead: 'Ukázka končí. Nic se neobjednalo ani nezaplatilo.',
    booking: 'Číslo rezervace',
    bookingValue: 'DZB-000000 (fiktivní)',
    next: 'Co bude dál',
    nextItems: [
      'Potvrzení ubytování přijde e-mailem.',
      'Pojistnou smlouvu pošle pojišťovna zvlášť.',
      'Voucher na auto najdete v detailu rezervace.',
    ],
  },
  rationaleTitle: 'Proč jsem zvolil tuto podobu',
  rationaleTodo: 'TODO-MILAN: upravit finální znění. Níže je návrh.',
  rationale: [
    'Nabídku jsem dal do samostatného kroku hned po výběru ubytování, tedy variantu A. Doplňky jsou předvyplněné termínem a počtem osob, zákazník nic nezadává znovu. Žádný doplněk není předvybraný a celý krok jde přeskočit jedním tlačítkem. Košík ukazuje, kolik zákazník zaplatí body a kolik kartou, protože předpokládám, že právě to rozhoduje o nákupu.',
  ],
}

// 5. Kalkulačka dopadu
export const calculator = {
  warningTitle: 'Nejde o data firmy',
  warning:
    'Kromě veřejně dostupného počtu rezervací jsou všechny výchozí hodnoty moje ilustrativní předpoklady. Kalkulačka ukazuje, jak bych o přínosu přemýšlel, ne kolik firma vydělá.',
  warningTodo: 'TODO-MILAN: zkontrolovat výchozí předpoklady.',
  bookingsLabel: 'Roční počet rezervací',
  bookingsOptions: [
    { value: 30000, label: '30 000', hint: 'letos, veřejný údaj' },
    { value: 60000, label: '60 000', hint: 'cíl pro rok 2027' },
  ],
  insuranceTitle: 'Cestovní pojištění',
  carTitle: 'Půjčení auta',
  fields: {
    attach: 'Podíl rezervací s doplňkem',
    price: 'Průměrná cena',
    commission: 'Provize',
  },
  // Konzervativní ilustrativní předpoklady. Nejsou to data CatchHotels.
  defaults: {
    insuranceAttach: 5,
    insurancePrice: 600,
    insuranceCommission: 20,
    carAttach: 2,
    carPrice: 4500,
    carCommission: 8,
  },
  resultsTitle: 'Výsledek za rok',
  results: {
    units: 'Prodané doplňky',
    turnover: 'Obrat doplňků',
    revenue: 'Výnos z provizí',
    perBooking: 'Výnos na jednu rezervaci',
  },
  unitsBreakdown: (insurance: string, car: string) => `${insurance} pojištění, ${car} aut`,
  sensitivityTitle: 'Co má na výsledek největší vliv',
  sensitivity: [
    'Nejvíc výsledek mění podíl rezervací s doplňkem a provize. Cenu doplňku zjistím od partnera předem. Podíl zákazníků, kteří doplněk koupí, ukáže až test.',
    'U auta je průměrná cena vysoká, takže i malý podíl rezervací dělá velký obrat. Výnos ale závisí na provizi, kterou půjčovny nabízejí. Proto bych jako první ověřil provizní podmínky partnerů a v testu podíl rezervací s doplňkem.',
  ],
}

// 6. Jak bych to ověřil
export const validation = {
  experimentTitle: 'Návrh experimentu',
  metrics: [
    {
      label: 'Hlavní metriky',
      text: 'Podíl rezervací s doplňkem a výnos z provizí na jednu rezervaci.',
    },
    {
      label: 'Ochranná metrika',
      text: 'Konverze z detailu ubytování na dokončenou rezervaci. Nesmí klesnout víc, než je předem stanovená hranice.',
    },
    {
      label: 'Doplňkové metriky',
      text: 'Storna doplňků, dotazy na zákaznickou podporu a podíl plateb s doplatkem kartou.',
    },
  ],
  durationTitle: 'Délka testu a vzorek',
  duration: [
    'Test by běžel aspoň dva celé týdny, aby pokryl všední dny i víkendy. Skončil by až po dosažení vzorku, který určím předem.',
    'Vzorek spočítám z dnešní konverze ubytování a z nejmenšího poklesu, který chci odhalit. Ochranná konverze potřebuje víc dat než podíl doplňků, takže délku testu určí ona. Pokud by na jednom trhu trval test příliš dlouho, zvážil bych širší hranici nebo dva trhy najednou.',
    'Předpokládám, že rezervace kolísají podle sezóny a podle toho, kdy zákazníkům propadají body. Termín testu bych proto zvolil podle dat z minulých let.',
  ],
  decisionTitle: 'Rozhodovací pravidlo',
  decision: [
    {
      label: 'Rozšířím',
      text: 'když výnos na rezervaci vzroste statisticky významně a konverze ubytování drží nad hranicí.',
    },
    {
      label: 'Upravím a otestuji znovu',
      text: 'když konverze drží, ale doplňky si kupuje příliš málo lidí. Změním místo nabídky nebo cenu.',
    },
    {
      label: 'Zastavím',
      text: 'když konverze ubytování klesne pod hranici. Test v tu chvíli ukončím i před dosažením vzorku.',
    },
  ],
  rolloutTitle: 'Postupné spuštění',
  rollout: [
    'Jeden trh a cestovní pojištění. Předpokládám, že je jednodušší na nabídku i na napojení partnera.',
    'Na stejném trhu půjčení auta, pokud pojištění projde rozhodovacím pravidlem.',
    'Rozšíření na další trhy. Podmínky partnerů a chování zákazníků se mohou mezi trhy lišit, proto bych výsledky z prvního trhu nepřebíral bez ověření.',
  ],
  rolloutTodo: 'TODO-MILAN: vybrat první trh a zdůvodnit.',
  previousTitle: 'Co už jsem si vyzkoušel',
  previous:
    'Podobný experiment jsem si prakticky vyzkoušel v case study online sjednání cestovního pojištění. Navrhl jsem v ní A/B test s ochrannou metrikou konverze a kalkulačku velikosti vzorku.',
  previousLinkLabel: 'Case study cestovního pojištění',
  previousUrl: 'https://milankocab.github.io/PVZP/',
  previousTodo: 'TODO-MILAN: ověřit URL PVZP case study.',
}

// 7. Co bych potřeboval vědět jako první
export const questions = {
  intro:
    'Tyto otázky bych firmě položil v prvním týdnu. Odpovědi změní priority i výchozí čísla v kalkulačce.',
  items: [
    'Jak dlouho trvá cesta od prvního vyhledání k dokončené rezervaci a kolikrát se zákazník mezi tím vrací?',
    'Kolik zákazníků doplácí část ceny kartou a jak vysoký je průměrný doplatek?',
    'Jaké provizní podmínky nabízejí partneři pro pojištění a půjčení auta a jde jejich služby platit benefitními body?',
    'Jak se chování zákazníků liší mezi Českem, Polskem a Slovenskem?',
    'Kdy v roce zákazníkům propadají benefitní body a jak se to projevuje v počtu rezervací?',
  ],
}

// 8. Patička
export const footer = {
  contactTitle: 'Kontakt',
  disclaimerShort:
    'Nezávislá případová studie. Nevznikla ve spolupráci s CatchHotels a nepracuje s jejich interními daty. Data v prototypu a kalkulačce jsou fiktivní nebo ilustrativní.',
}
