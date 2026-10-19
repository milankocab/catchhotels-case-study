# Analýza webu Dovolená za benefity a návrhy úprav

Pracovní dokument. Shrnuje, na čem jsme se dohodli při procházení webu, a slouží jako podklad pro case study a klikací prototyp.

**Stav dokumentu**

| Část | Stav |
| --- | --- |
| Úvodní stránka | hotovo |
| Výsledky vyhledávání | zjištění zapsaná, čeká na probrání |
| Detail hotelu | zjištění zapsaná, čeká na probrání |
| Objednávkový formulář a platba | zjištění zapsaná, čeká na probrání |
| Nové kategorie (auto a pojištění) | první návrh, přidávají se do prototypu |

**Zdroje.** Screenshoty v `assets/screenshots` (desktop i mobil), veřejné FAQ na dovolena-za-benefity.cz a veřejný inzerát CatchHotels. Žádná interní data. Všechno, co nevychází z těchto zdrojů, je označené jako hypotéza.

`TODO-MILAN: doplnit datum auditu, zařízení a prohlížeč`

---

## 1. Hlavní myšlenky

Inzerát uvádí zhruba 30 tisíc rezervací ročně a cíl tento výsledek v roce 2027 zdvojnásobit. Na to navrhuji čtyři směry.

1. **Začít u lidí.** Než cokoli změním, mluvil bych se zaměstnanci, kteří benefity čerpají, a s lidmi z HR (kapitola 2).
2. **Nebojovat s Bookingem, ale přidat se k němu.** Web dnes sám radí vybírat na Booking.com a kopírovat odkaz. Rozšíření do prohlížeče z toho udělá jeden klik (kapitola 3).
3. **Dát benefity do středu webu.** Zákazníka zajímá hlavně to, jestli může zaplatit svými body a kolik mu jich zbude. Méně ho zajímá, že ubytování pochází z Bookingu (kapitola 4).
4. **Rozhodovat podle dat.** Sporné změny ověřit A/B testem, ne názorem (kapitola 5).

---

## 2. Výzkum s uživateli

> **Než bych cokoli změnil, zeptal bych se lidí, pro které produkt děláme.**

**S kým bych mluvil**
- 5 až 8 zaměstnanců ze spřátelených firem, s mixem benefitních programů, věku a zařízení. Mezi nimi lidé, kteří službu používají, i lidé, kteří ji ještě nezkusili.
- Lidé z HR ve stejných firmách.
- Za čas by dostali poděkování, třeba poukaz na ubytování.

**Co od toho chci získat**
- Jak lidé web dnes skutečně používají a kde se zasekávají.
- Co jim chybí a co by je přimělo rezervovat častěji.
- Od HR, proč firma benefit nabízí a jak o něm zaměstnancům říká.

Výstupem je seznam problémů seřazený podle četnosti a závažnosti a z něj hypotézy pro A/B testy. Rozhovory bych neudělal jednou a dost. Dva měsíčně bych vedl průběžně jako stálý zdroj zpětné vazby.

**Spolupráce s HR.** Pro HR bych připravoval hotové tematické balíčky, například „Jarní wellness do 10 000 Kč“ nebo „Hory s dětmi“. Byl by to krátký e-mail s odkazy na landing pages destinací (kapitola 4, bod 1.6), který HR jen přepošle zaměstnancům. Každá firma by měla vlastní označení odkazů, takže by bylo vidět, kde balíčky fungují. E-maily zaměstnanců bych od firem nechtěl. Bylo by to na hraně GDPR i důvěry.

---

## 3. Rozšíření do prohlížeče „Zaplatit benefity“

> **Kdo vybírá na Booking.com, zaplatí benefity jedním klikem, bez kopírování odkazů.**

**Proč.** Web dnes zákazníkovi radí najít hotel na Booking.com, zkopírovat adresu z prohlížeče a vložit ji do vyhledávání. Je to několik kroků, při kterých se dá snadno ztratit. Lidé na Bookingu vybírat budou dál, protože ho znají. Rozšíření je neodvádí jinam, ale přidá tlačítko přímo tam, kde se rozhodují.

**Co by rozšíření umělo**
1. **Tlačítko „Zaplatit benefity“ na stránce hotelu na Booking.com.** Otevře stejný hotel na Dovolené za benefity s předvyplněným termínem a počtem osob.
2. **Cenu po přepočtu.** U tlačítka by byla cena včetně poplatku. Pokud uživatel zadal svůj zůstatek (bod 1.8a), i informace „Vejde se do vašich benefitů“ nebo „Doplatíte 1 200 Kč“.
3. **Označení ve výsledcích Bookingu.** Hotely, které jde zaplatit předem online, a tedy i benefity, by měly štítek. Odpadla by situace, kdy člověk zjistí, že pokoj „není možné zaplatit online“, až na našem webu.
4. **Upozornění na propadající body.** Volitelná připomínka napojená na kampaň z kapitoly 6.

**Jak bych postupoval**
- MVP jen pro Chrome a jen s tlačítkem na stránce hotelu. Ostatní funkce až podle výsledků.
- Měřil bych počet instalací, podíl rezervací přes rozšíření a jejich konverzi proti ostatním.

**Rizika, která bych ověřil jako první**
- Jestli rozšíření nejde proti smluvním podmínkám s Booking.com. To je zásadní a bez toho bych nezačal.
- Údržba. Když Booking změní vzhled stránky, rozšíření se musí upravit.
- Na mobilu je podpora rozšíření omezená. Rozšíření tedy pomůže hlavně na desktopu.
- Oprávnění jen pro booking.com a jasně popsané soukromí, aby instalace nepůsobila podezřele.

**Kde bude rozšíření vidět na webu**
- Samostatná sekce na úvodní stránce „Vybíráte na Booking.com?“ (bod 1.1 D).
- Vlastní cesta v interaktivním průvodci (bod 1.5) s animací instalace a použití.
- Odkaz z FAQ a ze stránky Jak to funguje.

---

## 4. Úvodní stránka

### 1.1 Vyhledávání

**Současný stav.** Jedno pole slouží pro název místa i pro odkaz z Booking.com. Termín a počet osob se objeví, až když člověk začne psát místo. Rozložení se tak pod rukama mění a nadpis nad polem míchá dva různé způsoby hledání.

**Proč to vadí.** Nejasné pole zpomaluje první krok. Pole, která se objeví až během psaní, působí neklidně a člověk neví, kolik ho toho ještě čeká.

**Návrh**
- Termín a počet osob ukazovat hned, s placeholderem „Kdy pojedete?“.
- Výchozí je hledání místa. Chceme, aby lidé vybírali u nás, kde máme pod kontrolou nabídku, řazení i budoucí doplňky.
- Cesta s odkazem z Bookingu se nezhorší. Řeší ji tyto prvky.

| Prvek | Popis |
| --- | --- |
| **A** Hledání i podle názvu hotelu | Našeptávač nabízí místa i konkrétní hotely. Kdo má hotel vybraný, napíše jeho název a odkaz nepotřebuje. Ověřit, jestli to API partnera umí. |
| **B** Odkaz „Máte vybraný hotel na Booking.com?“ | Po kliknutí se obsah vyhledávacího panelu vymění za pole pro odkaz, krátký návod a odkaz „Zpět na hledání“. Bez dialogového okna, protože na mobilu se do něj hůř vkládá ze schránky. |
| **E** Rozpoznání vloženého odkazu | Když někdo vloží odkaz do pole pro místo, našeptávač nabídne jako první řádek „Otevřít hotel z odkazu Booking.com“. Dnešní pole odkazy zpracovat umí, mění se jen to, jak to vypadá. |
| **D** Sekce „Vybíráte na Booking.com?“ | Níž na stránce. Hlavní je rozšíření do prohlížeče (kapitola 3), druhá možnost je vložení odkazu s animovaným návodem. |
| **F** Rozšíření do prohlížeče | Viz kapitola 3. |

Podobu vyhledávání ověří A/B test 1 (kapitola 5). D a F budou v obou variantách.

**Měření.** Vlastní událost v GA4 (přes Google Tag Manager) `search_submitted` s parametrem `input_type` (místo, hotel, odkaz). Poměr přechodů úvodní stránka → výsledky a úvodní stránka → detail ukáže první odhad už bez úprav kódu. Proč se lidé zasekávají, ukážou nahrávky a heatmapy ve Smartlooku nebo v Microsoft Clarity.

### 1.2 Hlavní tlačítko

**Současný stav.** Tlačítko Vyhledat je světle modré na modrém pozadí a působí neaktivně. Hlavní tlačítka mají na webu nejméně čtyři různé podoby.

**Návrh.** Hlavní tlačítko je nejvýraznější prvek každé obrazovky a má jeden styl v celém procesu.

### 1.3 Sdělení „plaťte body“

**Současný stav.** Nadpis zdůrazňuje Booking. Podporované benefitní programy jsou vidět jen jako loga pod úvodní sekcí.

**Hypotéza.** Zákazníka víc zajímá, že může zaplatit svými benefity a jestli web podporuje právě jeho program, než odkud nabídka pochází.

**Návrh**
- Nadpis postavený na myšlence „neplaťte penězi, plaťte benefity“. Přesné znění vznikne testem.
- Pod vyhledáváním výrazně ukázat podporované programy. Podle log na webu jde o Edenred, Pluxee a Up. Kliknutí na program vysvětlí, jak se s ním platí.
- Ověřil bych to A/B testem nadpisu. Hlavní metrika je podíl návštěv, které začnou hledat, ochranná metrika konverze na objednávku.

### 1.4 Kalendář

**Současný stav.** Na mobilu ukazuje jeden měsíc s přepínáním. Počet nocí je šedý a nenápadný.

**Návrh.** Svislé posouvání přes několik měsíců a počet nocí přímo na tlačítku („Potvrdit · 2 noci“).

### 1.5 Interaktivní průvodce místo dlouhého návodu

**Současný stav.** Sekce Jak to funguje má šest kroků s dlouhými texty. Vysvětluje všechno do detailu, což je správně, protože odstraňuje obavy z neznámého. Čte se ale špatně a část textu (automatické dokončení rezervace na Bookingu) patří spíš do potvrzovacího e-mailu.

**Návrh**
- Sekce s ukázkou rozhraní nakreslenou v HTML a CSS. V ní se po krocích přehrávají animace, kurzor napíše místo, vybere termín, pokoj, program a rozdělí platbu.
- Uživatel si kroky spouští sám kliknutím (na mobilu swipem) a může kdykoli přestat. Nikam ho to neodvádí, zůstává v sekci.
- Zachovat všech šest kroků. Každý má jednu krátkou větu a rozbalovací „Více podrobností“ s celým vysvětlením.
- Druhá cesta průvodce ukáže rozšíření do prohlížeče.
- Text je normálně v HTML (čitelný pro vyhledávače) a pro lidi s vypnutými animacemi je k dispozici statická verze.
- Měření. Kolik lidí průvodce spustí, kolik dojde do konce a jakou mají konverzi.

Je to originálnější než video, které si podle mé hypotézy pustí málokdo.

### 1.6 Landing pages destinací a programů

**Návrh.** Stránky jako „Krkonoše za benefity“ nebo „Dovolená za body Pluxee“. Nejde o blog, ale o landing pages s aktuální nabídkou.

**Co na nich bude.** Krátké tipy, vybrané ubytování s cenou, vyhledávání s předvyplněným místem a odpovědi na otázky k danému programu (kde najdu zůstatek, jak se platí).

**Co tím získáme**
- Návštěvy z vyhledávání u dotazů, kde lidé spojují místo nebo program s benefity. Objem bych nejdřív ověřil v Google Search Console.
- Cíl pro HR balíčky, sezónní kampaně, e-maily i placenou reklamu.
- Cíl pro karty Oblíbené destinace na úvodní stránce.

Obsah píšeme pro lidi, ne jen pro vyhledávače. Každá stránka musí člověku pomoct vybrat.

### 1.7 FAQ na konci úvodní stránky

Kdo dojde až na konec stránky, ještě něco řeší. Pět až šest nejčastějších otázek jako rozbalovací seznam mu pomůže rozhodnout se.

### 1.8 Nové prvky na úvodní stránce

**a) „Kolik máte na benefitech?“**
- Ve výsledcích je nenápadný štítek „Kolik máte na benefitech? Zadat“. Otevře okno s jedním polem pro částku a návodem, kde zůstatek najít.
- Potom se u každého hotelu ukáže „Zaplatíte celé z benefitů“, nebo „Z benefitů 8 000 Kč a doplatíte 1 179 Kč“. Přibude i přepínač „Jen co se vejde do benefitů“.
- Stejný rozpis bude na detailu a částka se předvyplní do platby v objednávce.
- Do vyhledávání nepřibude žádné pole. Částka se ukládá jen v prohlížeči.
- Otevřená otázka. Platí u všech programů, že jeden bod je jedna koruna? Proto pole popisuji v korunách.

**b) Kampaň k propadajícím bodům.** Viz kapitola 6.

**c) Oblíbené destinace v první obrazovce**
- Na desktopu je úvodní sekce nižší, aby pod vyhledáváním byla vidět první řada karet.
- Na mobilu je to vodorovně posouvaný pás karet hned pod vyhledáváním.
- Karta má fotku, název a „od X Kč za noc“ a vede na landing page destinace (bod 1.6).

**e) Část pro HR.** Odkaz „Pro firmy“ v hlavičce a v patičce a samostatný blok dole na stránce. Oba vedou přímo na B2B web, ne na novou podstránku. HR hledá právě slovo „benefity“, takže na web může přijít i ono.

`TODO-MILAN: doplnit adresu B2B webu`

### 1.9 Vyhledávání vždy po ruce a úklid plovoucích prvků

- Když úvodní sekce odjede z obrazovky, nahoře se připne zkrácené vyhledávání. Na mobilu je to jeden řádek „Praha · 13. až 15. 11. · 2 dospělí“, stejně jako dnes na výsledcích.
- Tlačítko cookies vlevo dole odstraním a nastavení cookies bude jen odkazem v patičce.
- Pravý dolní roh zůstane chatu.

### 1.10 Chat s AI asistentem

- Vpravo dole bude chat, ideálně AI asistent, který odpovídá z FAQ a složitější dotazy předá člověku.
- Mimo provozní dobu jasně řekne, kdy přijde odpověď, třeba „Odpovíme e-mailem do 9:00 následujícího pracovního dne“. Chat, který nic neslíbí, frustruje víc, než kdyby nebyl.
- Dotazy bych třídil podle témat (platba, poplatek, storno) a jednou týdně je procházel. Je to přímý zdroj podnětů pro další úpravy produktu.

### 1.11 Nedávná hledání

- Pod vyhledáváním se ukáže „Stále máte zájem?“ s posledním hledáním (místo, termín, osoby) a případně s naposledy prohlíženým hotelem.
- Uloženo jen v prohlížeči. Smaže se po sedmi dnech nebo když termín pobytu uplyne.

---

## 4B. Další kroky procesu

Zjištění z mé první analýzy. Zatím jsme je spolu neprobrali, a proto jsou to pracovní návrhy.

### Výsledky vyhledávání

**2.1 Cena bez poplatku a s jinou jednotkou než filtr.** Karta ukazuje „od 12 582 Kč“ za celý pobyt. Je to cena nevratné varianty bez servisního poplatku. Filtr rozpočtu je naopak na noc. Návrh je ukazovat cenu včetně poplatku (souvisí s testem 2) a sjednotit jednotku filtru a karty.

**2.2 Výchozí řazení dává nahoru hotely s málo recenzemi.** Apartmán s hodnocením 10 z 5 recenzí je výš než hotel s 9,7 z 1 062 recenzí. Návrh je výchozí řazení „Doporučené“, které váží hodnocení i počet recenzí.

**2.3 Přeškrtnuté ceny bez vysvětlení.** Červeně přeškrtnutá cena nikde neříká, o jakou slevu jde. Návrh je krátký štítek se zdrojem slevy.

**2.4 Karta neříká to, podle čeho se lidé rozhodují.** Ukazuje Ručníky, Fén nebo Ledničku, ale ne zrušení zdarma, snídani nebo vzdálenost od centra. Návrh jsou dva až tři rozhodující štítky místo seznamu vybavení.

**2.5 Drobnosti.**
- Na mobilu karta nemá tlačítko.
- Chybí počet výsledků a mapa.
- Banner o Booking.com zabírá na mobilu skoro čtvrtinu první obrazovky.
- Názvy hotelů se na desktopu ořezávají.
- Nekonečné načítání skrývá patičku.

### Detail hotelu

**3.1 Výběr pokoje přes rozbalovací seznam s nulou.** Tlačítko Rezervovat je šedé, dokud člověk v seznamu nezmění 0 na 1. Návrh je dát každé variantě vlastní tlačítko „Vybrat“, které rovnou zvolí jeden pokoj.

**3.2 Varianty se stejnými parametry a jinou cenou.** Dvě varianty jsou obě „Bez stravy · Zrušení zdarma do 22. 10. 2026“, jedna stojí 13 980 Kč a druhá 15 378 Kč. Rozdíl není vysvětlený. Návrh je ukázat, v čem se varianty liší, nebo zobrazit jen tu levnější.

**3.3 Cena flexibility není vidět.** Rozdíl mezi nevratnou a vratnou sazbou (tady 1 398 Kč) si člověk musí spočítat sám. Návrh je popisek „+1 398 Kč za zrušení zdarma“. Stejný princip později poslouží pro nabídku pojištění.

**3.4 Na mobilu přetéká spodní lišta.** Cena ve spodní liště je useknutá a tlačítko „Pokračovat na údaje“ přesahuje pravý okraj. Useknutý je i název pokoje v rekapitulaci. Jde o poslední krok před formulářem.

`TODO-MILAN: ověřit, jestli jde o chybu webu, nebo o artefakt screenshotu`

**3.5 Chybí informace, kvůli kterým se lidé vracejí na Booking.** Chybí texty recenzí, čas příjezdu a odjezdu, pravidla ubytování a podrobné storno podmínky. Popis je automaticky generovaný.

**3.6 Detail neříká, jak se bude platit.** Nic o benefitech, poplatku ani platbě předem. Návrh je řádek u tlačítka s rozpisem ceny.

**3.7 Drobnosti.**
- Vyhledávání je na stránce dvakrát.
- Na mobilu jsou vidět jen dvě ze šesti variant.
- Pokoje, které nejde zaplatit online, se ukážou až na detailu. Lepší je vyřadit je už ve výsledcích.

### Objednávkový formulář a platba

**4.1 Servisní poplatek až v rekapitulaci.** Viz test 2 v kapitole 5. Stránka partnera Edenred uvádí poplatek 7,9 %, FAQ říká, že se počítá z ceny ubytování. Ze screenshotů vychází 8,6 % z ceny ubytování, což je přesně 7,9 % z celkové ceny (můj přepočet). Popis a výpočet by měly být všude stejné.

**4.2 Rozdělení platby.**
- Zapíná se nenápadným odkazem „Přidat další platbu“.
- Částku za benefity musí člověk napsat ručně a k tomu musí znát svůj zůstatek.
- Druhá platební metoda je předvyplněná stejnou kartou jako první.
- Metody jsou v rozbalovacím seznamu a předvybraný je Edenred.

Návrh.
- Metody jako dlaždice s logy.
- Předvyplněná částka za benefity (navazuje na „Kolik máte na benefitech?“) a automaticky dopočítaný doplatek.
- Druhá metoda předvybraná jako platební karta.

**4.3 Na desktopu chybí tlačítko na konci formuláře.** „Rezervovat a zaplatit“ je jen v pravém panelu nahoře. Pod souhlasy, kde člověk formulář dokončí, tlačítko není. Na mobilu je na konci správně.

**4.4 Souhlasy.** Souhlas s marketingem je předem zaškrtnutý, což podle GDPR není platný souhlas a těsně před platbou snižuje důvěru. Návrh je nechat ho nezaškrtnutý a dva povinné souhlasy spojit do jednoho, pokud to právně jde.

**4.5 Formulář chce víc, než je nutné.** Povinná celá adresa a telefon, velké pole pro poznámku uprostřed formuláře a odkaz na slevový poukaz na začátku platby. Návrh je ověřit, jestli je adresa potřeba (třeba kvůli partnerovi nebo faktuře), poznámku sbalit a poukaz přejmenovat na „Mám dárkový poukaz“.

**4.6 Věta „Cenu může ovlivnit způsob platby“.** Bez vysvětlení znejisťuje. FAQ uvádí, že poplatek se liší podle programu a převod je bez poplatku. Návrh je přepočítat cenu podle zvolené metody a ukázat rozdíl.

**4.7 Chybí jistota před zaplacením.**
- Není vidět, v jakém kroku člověk je ani co se stane po kliknutí.
- FAQ uvádí, že objednávku je potřeba zaplatit do 7 dnů, formulář to neříká.
- Podpora je dostupná ve všední dny od 9:00 do 16:00.

Návrh je ukazatel kroků a krátké „Co bude dál“ u tlačítka.

### Průřezová zjištění

- Hlavní tlačítka mají nejméně čtyři různé podoby (světle modrá, tmavě modrá, bílá na modrém panelu).
- Na mobilu se ořezává drobečková navigace a velké nadpisové pruhy zabírají první obrazovku každé stránky.
- Zjištění 3.3, 4.1 a 4.2 jsou základ pro doplňkové služby. Pokud lidé nerozumí poplatku za ubytování, nabídka pojištění nebo auta za doplatek je ještě víc znejistí.

---

## 5. Plán A/B testů

### Test 1. Vyhledávací pole (první v pořadí)

| | Varianta A (navržená) | Varianta B (kontrolní) |
| --- | --- | --- |
| Pole | pole jen pro místo s našeptávačem hotelů (A), odkaz „Máte vybraný hotel?“ (B) a rozpoznání odkazu (E) | jedno pole pro místo i odkaz jako dnes, jen v novém vzhledu |
| Termín a osoby | vidět hned | podle dnešního chování |
| Sekce D a rozšíření F | ano | ano |
| Rozložení na desktopu | jeden řádek | jeden řádek |

Varianta A je navržená úprava a v prototypu se ukazuje jako výchozí. Varianta B je dnešní řešení v novém vzhledu a slouží jako kontrolní. Ta respektuje důvody, proč je web dnes postavený tak, jak je. Ty neznám a nechci je předem zahodit.

- **Hlavní metrika.** Konverze od návštěvy úvodní stránky po zaplacenou objednávku.
- **Vedlejší metriky.** Podíl návštěv, které začnou hledat, a poměr hledání podle místa, hotelu a odkazu.
- **Ochranná metrika.** Konverze lidí, kteří přicházejí s odkazem z Bookingu. Tahle skupina nesmí ztratit.

### Test 2. Kdy ukázat servisní poplatek (až po skončení testu 1)

**Současný stav.** Poplatek se poprvé objeví v rekapitulaci objednávky. Ve screenshotech je to 1 199 Kč k ubytování za 13 980 Kč, tedy zhruba 8,6 % z ceny ubytování (můj přepočet).

**Dvě hypotézy.** Podle první se cenově citlivý zákazník rozhoduje ve výsledcích a poplatek u objednávky už neřeší, a pak je dnešní stav v pořádku. Podle druhé nečekané náklady na konci nákupu patří k nejčastějším důvodům, proč lidé nákup nedokončí. Tak to uvádějí obecné e-commerce výzkumy (Baymard), ne data CatchHotels. Zákazník tady ale platí benefity, ne vlastními penězi, a může reagovat jinak. Proto rozhodne test.

| | Varianta A | Varianta B |
| --- | --- | --- |
| Výsledky a detail | cena bez poplatku | cena včetně poplatku (od, protože poplatek se liší podle programu) |
| Objednávka | poplatek se objeví v rekapitulaci | rozpis stejný jako dřív, nic nového |

- **Hlavní metrika.** Konverze celé cesty od výsledků po zaplacenou objednávku. Měřit jen kliknutí ve výsledcích by bylo zavádějící, protože varianta B v nich nejspíš ztratí a získat může až v objednávce.
- **Vedlejší metriky.** Kolik lidí opustí objednávku a tržba na návštěvu.
- **Ochranné metriky.** Dotazy na podporu kvůli ceně a podíl stornovaných objednávek.
- **Právní otázka.** Pravidla EU pro uvádění celkové ceny včetně nevyhnutelných poplatků bych nechal posoudit právníkem.

### Test 3. Hledání v jednom řádku (návrh na později)

Většina konkurentů má na desktopu všechna pole vyhledávání v jednom řádku. Lidé ten vzor znají, a proto ho prototyp používá v obou variantách testu 1. Je to ale převzatý vzor, ne ověřená věc. Po testu 1 bych porovnal jeden řádek s poli pod sebou. Hlavní metrikou by byl podíl návštěv, které začnou hledat, a ochrannou metrikou konverze po zaplacenou objednávku. Test se týká jen desktopu, mobil má pole vždy pod sebou.

### Test 4. Kde nabídnout doplňky (až s doplňky v nabídce)

| | Varianta A (navržená) | Varianta B |
| --- | --- | --- |
| Kde | samostatný krok po výběru ubytování (obrazovka 2) | zkrácená nabídka v košíku, žádný krok navíc |
| Pojištění | tři varianty a Bez pojištění | doporučená varianta jedním klikem, ostatní po rozbalení |
| Auto | dvě kategorie a Bez auta | jedna kategorie jedním klikem, druhá po rozbalení |

Obě varianty mají po zaplacení stejnou nabídku doplňku, který člověk nevybral.

- **Hlavní metrika.** Výnos z doplňků na jednu návštěvu detailu hotelu.
- **Vedlejší metriky.** Podíl rezervací s doplňkem a podíl lidí, kteří krok přeskočí.
- **Ochranná metrika.** Konverze ubytování od detailu po zaplacení. Varianta, která prodá víc doplňků, ale ztratí ubytování, nevyhrává.

### Kolik dat testy potřebují

30 tisíc rezervací ročně je zhruba 2 500 měsíčně. Při rozdělení 50 na 50 dostane každá varianta za čtyři týdny přibližně 1 150 objednávek. Spolehlivě tak odhalíme jen změny zhruba od 10 až 12 % relativně. Je to orientační odhad, přesný bych spočítal kalkulačkou velikosti vzorku podle skutečné konverze. Menší rozdíly vyžadují delší test, a proto testy pouštím postupně, ne naráz.

---

## 6. Další nápady

### Kampaň „Propadají vám body?“

Firma nezná, kdy konkrétnímu člověku body propadají. Že je to skutečný problém, ale ukazuje i jejich web, který u dárkového poukazu píše „Bude vám končit platnost vašich benefitních bodů?“. U řady zaměstnavatelů body propadají na konci roku. Pravidla si ale nastavuje každý zaměstnavatel sám, takže je to hypotéza.

**Sezónní kampaň (říjen až prosinec)**
- Pruh na úvodní stránce a e-mail dřívějším zákazníkům.
- Dvě cesty, rezervovat pobyt teď, nebo koupit poukaz a čerpat příští rok.
- Možná společná komunikace s partnery v jejich kanálech, pokud to smlouvy dovolují.

**„Připomeňte mi to“**
- Člověk zadá e-mail a datum, kdy mu body propadají, a sám si nastaví, kdy chce připomínku dostat.
- Před tím datem mu přijde připomínka s tipy na pobyt.
- Samostatný souhlas umožní posílat i newsletter.
- Firma tak získá údaj, který dnes nemá, a kontakt na člověka, který ještě nic nekoupil.

**Ověření.** A/B test pruhu ve čtvrtém čtvrtletí. Metrika je počet rezervací a prodaných poukazů, ochranná metrika konverze běžného vyhledávání.

---

## 7. Nové kategorie mimo ubytování

Prvními kandidáty jsou cestovní pojištění a půjčení auta. Navazují na rezervaci ubytování a týkají se stejného termínu a místa. Nepřidával bych je jen jako zaškrtávací políčko do objednávky. Navrhuji je od začátku stavět jako samostatné produkty.

**Klíčová otevřená otázka.** Jde doplňkovou službu zaplatit benefity, nebo jen doplatkem kartou? Na tom stojí celá nabídka. Pokud ano, je to silný důvod přidat ji k pobytu. Pokud ne, jde o běžný prodej doplňků za vlastní peníze s mnohem nižším očekávaným zájmem.

**Kde by se nabídka objevila**
1. **Samostatné stránky kategorií.** „Cestovní pojištění za benefity“ a „Auto za benefity“ s vysvětlením, jak služba funguje, a vlastním FAQ. Šlo by je koupit i bez ubytování, třeba k dovolené rezervované jinde.
2. **Detail hotelu.** Informace, že k pobytu jde přidat pojištění nebo auto.
3. **Objednávka.** Nabídka jako volitelný doplněk. Riziko je pokles konverze ubytování, proto jen s ochrannou metrikou.
4. **Potvrzení rezervace a e-mail.** Nejmenší riziko pro konverzi ubytování.
5. **E-mail před odjezdem.** Například týden předem „Jedete za týden. Máte pojištění a auto?“.
6. **Stránka stavu objednávky.** Doplněk jde přidat i později.
7. **Landing pages destinací.** Balíček pobyt a auto u destinací, kde dává smysl, třeba hory.

**Co to znamená pro web.** Navigace a vyhledávání se postupně změní z jednoho produktu na kategorie (Ubytování, Pojištění, Auta, později Letenky a Zájezdy). Název Dovolená za benefity pro to sedí lépe než dnešní nadpis o Bookingu.

**Měření.** Podíl rezervací s doplňkem, tržba na rezervaci a jako ochranná metrika konverze samotného ubytování.

`TODO-MILAN: rozhodnout, kterým místem začít, a doplnit zdůvodnění`

---

## 8. Prototyp

**Účel.** Ukázat, jak bych přistoupil ke zdvojnásobení produktu, a že umím s kódem. Případová studie zůstane jedna přehledová stránka a prototyp bude dostupný z horního menu jako hlavní tlačítko.

**Pravidla.** Vlastní neutrální design, žádné logo, barvy ani fonty Dovolené za benefity. Na každé stránce bude upozornění o nezávislosti a všechna data jsou fiktivní.

### 8.1 Tři obrazovky, které na sebe navazují

1. **Úvodní stránka s kategoriemi.** Ubytování, půjčení auta a cestovní pojištění spolu s úpravami z kapitoly 4. Každá změna má malou očíslovanou poznámku, proč vznikla, a v ní odkaz na konkrétní zjištění. Poznámky jde vypnout přepínačem, aby se stránka dala projít i jako běžný web.
2. **Nabídka doplňků po výběru ubytování.** Shrnutí vybraného fiktivního ubytování, cestovní pojištění ve třech variantách a půjčení auta. Tady se rozhoduje o tržbě na rezervaci. Odpovídá umístění nabídky po výběru ubytování a před košíkem.
3. **Košík s rozdělením platby.** Platba benefity s předvyplněnou částkou a automaticky dopočítaným doplatkem kartou. Metody jsou dlaždice s logy (zjištění 4.2), souhlas s marketingem není předem zaškrtnutý (4.4) a tlačítko je na konci formuláře (4.3). Pokud benefity pokryjí celou částku, doplatek se neukáže.
4. **Potvrzení.** Není to samostatná obrazovka, ale stav košíku po kliknutí na tlačítko Zaplatit. Shrne objednávku a nabídne doplněk, který člověk nevybral. To je nejméně rizikové místo nabídky z kapitoly 7.

**Přechody mezi obrazovkami.** Vyhledání, karta destinace i trip builder vedou rovnou na obrazovku 2 s předem vybraným fiktivním ubytováním. Výsledky a detail prototyp přeskakuje a krátká poznámka odkazuje na jejich zjištění v kapitole 4B.

**Přepínače variant.** Na úvodní stránce jde přepínat mezi variantami A a B testu 1. Test 2 je jen popsaný v kapitole 5.

**Mimo prototyp.** Výsledky vyhledávání, detail hotelu, landing pages, stránky kategorií, články, kampaň k propadajícím bodům a samotné rozšíření do prohlížeče. Rozšíření je na úvodní stránce jen jako sekce s ukázkou.

### 8.2 Přepínání mezi případovou studií a prototypem

Úplně nahoře je úzký tmavý pruh, který nepatří k navrhovanému webu. Obsahuje jen přepínač **Prototyp | Případová studie**, žádný další text. Je vidět na každé obrazovce, takže je vždycky jasné, kde člověk je a jak se vrátí.

Upozornění o nezávislosti a o fiktivních datech bude v prototypu jen jako krátký řádek v patičce.

Pod ním začíná samotný prototyp se svým menu, ve kterém prototyp není.

| Položka menu webu | Co udělá v prototypu |
| --- | --- |
| Ubytování | vyhledávání se přepne na záložku Ubytování |
| Půjčení auta | vyhledávání se přepne na záložku Auto, s poznámkou, že v reálném webu vede na stránku kategorie |
| Cestovní pojištění | totéž pro záložku Pojištění |
| Inspirace | posune stránku na oblíbené destinace |
| Jak to funguje | posune stránku na interaktivního průvodce |
| Pro firmy | externí odkaz, v prototypu jen s poznámkou |

### 8.3 Prvky úvodní stránky

Pořadí shora dolů.

1. **Vyhledávání se záložkami kategorií.** Ubytování, Půjčení auta, Cestovní pojištění. Výchozí je Ubytování. Každá záložka má vlastní pole.
   - Ubytování má místo nebo hotel, termín a osoby.
   - Auto má místo vyzvednutí, datum a čas vyzvednutí a vrácení.
   - Pojištění má oblast (Česko, Evropa, svět), termín a počet osob.

   Záložky jsou stejné v obou variantách testu 1, aby test nezkreslily.

   Na desktopu jsou všechna pole v jednom řádku (viz test 3). Když panel odjede z obrazovky, připne se nahoru. Na desktopu jako celé hledání v jednom řádku, takže jde hledat kdykoliv bez posouvání. Na mobilu jako zkrácený řádek, který vrátí k panelu.
2. **Nadpis o celé cestě.** Ve smyslu „Celá dovolená za benefity. Ubytování, auto i pojištění.“ Pod ním podporované benefitní programy.

   Rozložení vychází z mého prvního vizuálu (`vizual-first-version.png`). Na desktopu je nahoře vlevo nadpis, pod ním karta hledání se záložkami jako segmenty uvnitř karty. Vpravo vedle obou stojí vysoká karta **Doplňkové služby** s cestovním pojištěním, půjčením auta, orientační cenou a fotkou, zarovnaná ke kartě hledání. Hledání a doplňky tak člověk vidí vedle sebe jako jednu cestu, ještě než začne hledat. Klik na doplněk přepne vyhledávání na jeho záložku. Karta říká, že doplněk jde přidat k pobytu po výběru ubytování, nebo koupit zvlášť. Na mobilu jde pod sebou nadpis, hledání a doplňky jako dvě dlaždice. Ceny v prototypu jsou fiktivní.
3. **Oblíbené destinace s doporučeným doplňkem.** Viz 8.4.
4. ~~**Jedny benefity na celou cestu.**~~ Samostatné karty kategorií jsem při stavbě vypustil. Kategorie už ukazují záložky vyhledávání a karta Doplňkové služby v úvodu, třetí opakování by stránku jen prodloužilo. Odkaz na stránku kategorie má každá karta v trip builderu („Více o kategorii“).
5. **Trip builder.** Viz 8.5.
6. **Dobré vědět před cestou.** Viz 8.6.
7. **Interaktivní průvodce.** Tři cesty, rezervace na webu, rozšíření do prohlížeče a přidání auta a pojištění. Druhé dvě jsou označené jako návrh. Šest kroků rezervace vychází z dnešní stránky Jak to funguje, každý má jednu větu a „Více podrobností“. Vedle je ukázka rozhraní nakreslená v HTML a CSS s místem, kam by člověk klikl. Na mobilu je ukázka nahoře a pod ní jen aktuální krok, ostatní kroky zůstávají v HTML pro čtečky a vyhledávače. Kroky se přepínají tlačítky nebo swipem.
8. **Vybíráte na Booking.com?** Hlavní je karta rozšíření s ukázkou tlačítka na stránce hotelu a odkazem „Ukázat v průvodci“, který otevře cestu s rozšířením. Vedle je menší karta s vložením odkazu. Její tlačítko vrátí stránku k hledání a rovnou otevře pole pro odkaz.
9. **Blok pro HR** s odkazem na B2B web.
10. **FAQ** s kategoriemi Obecné, Platba, Auto a Pojištění. Odpovědi v kategoriích Obecné a Platba vycházejí jen z toho, co dnes říká stránka Jak to funguje. Odpovědi k autu a pojištění jsou ukázkové a takto označené. Otázky, na které odpověď neznám (slevy Genius, limit 25 000 Kč, výše servisního poplatku), jsem do prototypu nedal.
11. **Patička** s nastavením cookies.
12. **Chat** jako plovoucí tlačítko vpravo dole, po otevření ukázka konverzace s AI asistentem. Nabízí tři časté dotazy s předpřipravenou odpovědí a říká, kdy přijde odpověď mimo provozní dobu.

### 8.4 Oblíbené destinace s doporučeným doplňkem

Karty destinací (fotka, název, cena od) dostanou malý štítek s doplňkem, který k danému místu dává smysl.

| Destinace | Štítek | Proč |
| --- | --- | --- |
| Krkonoše | Na hory se hodí auto | horské chaty bývají hůř dostupné vlakem |
| Chorvatsko | Do zahraničí s pojištěním | léčebné výlohy v zahraničí nehradí česká pojišťovna celé |
| Praha | bez štítku | ve městě auto ani pojištění člověk obvykle nepotřebuje |
| Rakouské Alpy | Na lyže s pojištěním | zahraničí a hory, kde se při lyžování snadno stane úraz |

Po kliknutí na kartu se otevře obrazovka 2 s ubytováním v dané destinaci a doporučený doplněk je **zvýrazněný, ale nezaškrtnutý**. Předem zaškrtnutý doplněk by byl manipulativní a stejný problém, jaký vytýkám u souhlasu s marketingem.

Nabídka je tak cílená podle místa, ne obecná. Hypotéza je, že cílená nabídka bude mít vyšší podíl přidaných doplňků a nebude obtěžovat ty, kdo je nepotřebují.

### 8.5 Trip builder „Sestavte si cestu za benefity“

**Účel.** Na jednom místě ukázat vizi produktu. Celá cesta, jedna platba benefity, vyšší tržba na zákazníka. Zároveň člověka naučí, že benefity pokryjí i auto a pojištění.

**Jak vypadá na desktopu**
- Nahoře jsou výběrové štítky s ukázkovými cestami **Víkend na horách**, **Týden u moře** a **Prodloužený víkend ve městě**.
- Pod nimi jsou vedle sebe tři karty v pořadí cesty, Auto, Ubytování a Pojištění. Spojovací čáru jsem po kontrole vypustil, karty jsou čitelné i bez ní.
- Ubytování je vyplněné ukázkovým pobytem s fiktivním názvem, místem, termínem a cenou.
- Auto a pojištění jsou na začátku prázdné karty s přerušovaným okrajem a tlačítkem „Přidat auto od 1 900 Kč“.
- Vpravo je souhrn s polem **„Kolik máte na benefitech?“**, celkovou cenou a pruhem, který ukazuje, jakou část cesty benefity pokryjí. Pokud pokryjí všechno, pruh je celý zelený s textem „Zaplatíte celé z benefitů“. Jinak ukáže „Doplatíte 1 200 Kč“.
- Dole je tlačítko **„Naplánovat tuto cestu“**, které vede na obrazovku 2 s předvyplněnými položkami.

**Interakce**
- Po kliknutí na „Přidat“ se karta vyplní krátkou animací, cena v souhrnu se plynule přepočítá a pruh se posune.
- Přidanou položku jde zase odebrat.
- U cesty k moři je karta pojištění označená jako doporučená, protože jde o zahraničí.
- Každá karta má odkaz „Více o kategorii“ s poznámkou, že v reálném webu vede na stránku kategorie.

**Jak vypadá na mobilu**
- Karty jsou pod sebou.
- Souhrn s pruhem je hned pod časovou osou. Připnutý na spodní okraj by se na mobilu tloukl s tlačítky chatu a ovládání prototypu, a karty jsou krátké, takže souhrn je stejně blízko.
- Na desktopu je souhrn vodorovný pruh pod časovou osou, aby měly tři karty dost místa.

**Přístupnost.** Všechny prvky jsou tlačítka ovladatelná klávesnicí. Změna součtu se ohlásí čtečce obrazovky a pro lidi s vypnutými animacemi se karty vyplní bez animace.

**Měření v reálném provozu.** Kolik lidí přidá aspoň jednu položku, kolik jich klikne na „Naplánovat tuto cestu“ a jaký podíl doplňků mají v objednávce proti ostatním.

### 8.6 Dobré vědět před cestou

Krátké praktické informace k novým kategoriím přímo na úvodní stránce, místo samostatných článků.

**Jak to vypadá.** Dva sloupce (na mobilu pod sebou), jeden pro pojištění a jeden pro auto. Každý má ikonu a tři rozbalovací karty s otázkou. Odpověď má dvě až tři věty a odkaz na kategorii.

**Cestovní pojištění**
- Potřebuju pojištění i v Česku? V Česku hradí léčebné výlohy zdravotní pojišťovna, smysl má hlavně storno pojištění, úraz a odpovědnost. V zahraničí jsou hlavní léčebné výlohy.
- Co když onemocním před odjezdem? Vysvětlení storno pojištění.
- Zaplatím pojištění benefity? V prototypu ano, v dokumentu to zůstává hlavní otevřená otázka.

**Půjčení auta**
- Kauce a platební karta. Půjčovny kauci obvykle blokují na kreditní kartě, takže ji benefity nepokryjí. Musí to být řečeno předem.
- Co je v ceně? Pojištění auta, kilometry, palivo.
- Kdy se auto vyplatí? Hory, místa bez vlaku, cesta s dětmi.

Konkrétní podmínky pojištění a půjčení bych formuloval s partnery. V prototypu je obsah ilustrativní a takto označený.

`TODO-MILAN: zkontrolovat texty v sekci Dobré vědět před cestou`

### 8.7 Technická rozhodnutí

- **Samostatná adresa.** Prototyp je hlavní stránka projektu na adrese `/catchhotels-case-study/`, případová studie je na `/catchhotels-case-study/pripadova-studie/`. Kotvy v případové studii se tak nepletou s prototypem a na obě stránky jde poslat přímý odkaz.
- **Ovládání prototypu.** Vlevo dole je malý panel s přepínači Poznámky a Vyhledávání A nebo B. Výchozí je varianta A, tedy navržená úprava. Vpravo dole je chat.
- **Poznámky „proč“.** Otevřená je vždy jen jedna a leží nad vším ostatním. Standardně se ukáže pod číslem. Když se tam nevejde, ukáže se tam, kde je místo, a nikdy neuteče mimo obrazovku. Čísla jdou po stránce shora dolů a zleva doprava a počítají jen to, co je opravdu vidět, takže v řadě nejsou mezery na mobilu ani ve variantě B. Z kterého bodu analýzy změna vychází, je napsané až v otevřené poznámce, třeba „Úvodní stránka, bod 1.1“.
- **Pohyb.** Sekce a karty se při scrollování plynule objeví, hero naskočí po načtení. Odpovědi v FAQ a v Dobré vědět se plynule rozbalí. Při přepnutí Ubytování, Auta a Pojištění se zvýraznění posune a pole přijedou ze strany, kam se přepíná. Stejný přepínač je i v připnuté liště, na mobilu jako tři ikony. Částky v trip builderu se dopočítají místo skoku. Kdo má v systému omezený pohyb, uvidí vše bez animací.
- **Fotky.** Fotky destinací z Unsplash s volnou licencí. Jsou to fotky míst, ne skutečných hotelů, a jsou zmenšené pro rychlé načtení.
- **Ceny v korunách.** Benefitní karty (Edenred, Pluxee, Up) mají zůstatek v korunách. Kafeterie pracují s body a v Česku u nich obvykle platí, že jeden bod je jedna koruna. To je ale moje obecná znalost, nemám ji ověřenou u všech programů a každý zaměstnavatel si může nastavit vlastní pravidla. Navíc služba podle inzerátu funguje i na Slovensku a v Polsku, kde se platí v eurech a zlotých. Koruny proto sedí na všechny skupiny a odpovídají současnému webu. Formulace „Kolik máte na benefitech?“ a „Zaplaceno z benefitů“ fungují pro kartu i kafeterii.

`TODO-MILAN: ověřit u partnerů, jestli platí jeden bod jedna koruna`

---

### 8.8 Obrazovka 2. Nabídka doplňků po výběru ubytování

> **Člověk má vybraný pobyt. Jedním pohledem vidí, co se k cestě hodí, kolik to stojí z benefitů, a může to stejně snadno přeskočit.**

**Kde v procesu je.** Dnes jde po detailu hotelu rovnou formulář „Informace o vás“ s rekapitulací. Obrazovka 2 je nový krok mezi nimi. Odpovídá variantě A z případové studie (po výběru ubytování, před košíkem). Je to nejvýraznější místo nabídky, ale taky nejrizikovější pro konverzi ubytování, proto je celý návrh postavený tak, aby krok šel přeskočit a nic nezdržoval.

**Odkud se na ni přijde v prototypu**

| Odkud | Co je předvyplněné |
| --- | --- |
| Hledání ubytování | fiktivní hotel podle zadaného místa, termín a osoby z hledání |
| Karta destinace | hotel v destinaci, doporučený doplněk zvýrazněný, ale nezaškrtnutý (8.4) |
| Trip builder „Naplánovat tuto cestu“ | doplňky, které člověk v trip builderu přidal, a zůstatek benefitů |
| Hledání auta nebo pojištění bez ubytování | mimo prototyp, jen poznámka, že v reálném webu vede na stránku kategorie |

Výsledky vyhledávání a detail hotelu prototyp přeskakuje. Poznámka u shrnutí pobytu odkazuje na jejich zjištění (2.1 až 3.7).

**Co na obrazovce je, shora dolů**

1. **Ukazatel kroků.** Ubytování, Doplňky, Košík a platba, Hotovo. Dnes člověk neví, kde v procesu je (4.7).
2. **Shrnutí pobytu.** Fotka, název, místo, termín, osoby, pokoj, storno podmínky a cena včetně servisního poplatku (2.1, 4.1). Odkaz „Změnit“ vrátí na úvodní stránku.
3. **Nadpis a jedna věta.** „Chcete k cestě něco přidat? Termín a osoby už známe. Doplňky jsou nepovinné.“
4. **Cestovní pojištění.**
   - Oblast, termín a počet osob jsou převzaté z pobytu a vidět jako jeden řádek, jde je upravit.
   - Tři varianty jako karty (Základ, Standard, Plus) a čtvrtá volba **Bez pojištění**. Výchozí není vybrané nic.
   - Každá karta má cenu za celou cestu pro všechny osoby, tři hlavní krytí a „Co přesně pokrývá“ jako rozbalovací část.
   - U zahraničí má štítek **Doporučujeme** varianta Standard, u Česka žádná. Doporučení vysvětlí jedna věta, třeba „Léčebné výlohy v zahraničí nehradí česká pojišťovna celé“.
   - U nevratné sazby ubytování bych ukázal větu, že storno pojištění ve variantě Plus kryje zrušení pobytu. Navazuje na 3.3, cena flexibility je pak vidět na jednom místě. Je to hypotéza a hodí se na test.
5. **Půjčení auta.**
   - Převzetí a vrácení u hotelu nebo na letišti, dny podle termínu pobytu.
   - Dvě kategorie (Malé auto, Rodinné auto) a volba **Bez auta**.
   - Jasně napsaná kauce. Při půjčení auta je běžné, že půjčovna při převzetí zablokuje na kreditní kartě řidiče částku pro případ škody nebo chybějícího paliva a po vrácení ji uvolní. Debetní karty často nebere a výši určuje sama. Benefity kauci nepokryjí, protože nejde o platbu, ale o blokaci. Na obrazovce bude jedna věta bez konkrétní částky: „Při převzetí půjčovna zablokuje kauci na kreditní kartě řidiče. Po vrácení auta ji uvolní.“ Bez toho by člověk zjistil až na místě, že kartu potřebuje, a to je horší než doplněk nekoupit.
   - U Prahy je sekce auta sbalená do jednoho řádku „Potřebujete auto? Přidat“. Ve městě ho většina lidí nepotřebuje (8.4).
6. **Souhrn platby.** Ubytování, vybrané doplňky, celkem, kolik zaplatíte z benefitů a kolik doplatíte kartou. Pruh pokrytí stejný jako v trip builderu, zůstatek jde upravit. Na desktopu je souhrn vpravo a jede s obrazovkou. Na mobilu je dole připnutá lišta s celkovou cenou, doplatkem a tlačítkem a po klepnutí se rozbalí rozpis.
7. **Tlačítka.** Hlavní „Pokračovat do košíku“. Vedle stejně velké sekundární „Pokračovat bez doplňků“, ne schovaný šedý odkaz. Když člověk nic nevybral, hlavní tlačítko se jmenuje „Pokračovat bez doplňků“ a druhé zmizí.

**Zásady**
- Nic není předem zaškrtnuté. Stejný důvod jako u souhlasu s marketingem (4.4).
- Ceny jsou vždy za celou cestu a z nich hned vidět dopad na benefity. Jednotka „za den“ jen jako pomocný údaj.
- Všechny volby jsou skupiny přepínačů ovladatelné klávesnicí, změna souhrnu se ohlásí čtečce.
- Obrazovka používá stejné komponenty jako úvodní stránka (karty, rozbalovací části, poznámky „proč“, plynulé přepočítání částek).
- Partneři, pojistné podmínky i ceny jsou fiktivní. Odkaz na podmínky je jen poznámka.

**Předpoklad, na kterém obrazovka stojí.** Doplňky jde zaplatit benefity (kapitola 7, klíčová otázka). Obrazovka to říká štítkem „Zaplatíte benefity“ a poznámka u něj přizná, že jde o předpoklad.

**Co bych měřil**
- Podíl rezervací s aspoň jedním doplňkem, zvlášť pojištění a auto.
- Kolik lidí krok přeskočí a jak dlouho na něm jsou.
- Ochranná metrika je konverze ubytování od detailu po zaplacení proti dnešnímu procesu bez kroku.

**Test 4. Kde nabídnout doplňky.** Popsaný v kapitole 5. V prototypu jde varianty přepínat v ovládání prototypu, stejně jako u vyhledávání. Ve variantě B se obrazovka 2 přeskočí a zkrácená nabídka je v košíku (8.9).

**Rozhodnuto.** Pojištění má tři varianty. Test 4 jde v prototypu přepínat.

**Technicky.** Obrazovka bude součástí stejné stránky prototypu s adresou `#doplnky`, aby fungovalo tlačítko zpět v prohlížeči a odkaz šel poslat. Výběr se drží ve stavu prototypu a přenese se do košíku.

### 8.9 Obrazovka 3. Košík s rozdělením platby a potvrzení

> **Člověk vidí, co platí, kolik z benefitů a kolik kartou, a nemusí nic počítat ani hledat.**

Dnes je to stránka „Informace o vás“ s rekapitulací a pod ní „Způsob platby“. Obrazovka 3 je její přepracovaná verze. Řeší zjištění 4.1 až 4.7 a přidává to, co doplňky do objednávky přinášejí.

**Rozložení.** Na desktopu vlevo formulář, vpravo rekapitulace, která jede se stránkou. Na mobilu je nahoře sbalená rekapitulace „Celkem 19 290 Kč · Zobrazit rozpis“, pod ní formulář a tlačítko na konci.

**Rekapitulace**
- Pobyt s termínem a osobami, pod ním servisní poplatek jako samostatný řádek (4.1).
- Každý doplněk na vlastním řádku s odkazem „Odebrat“. Odebrání se dá vrátit z krátké zprávy.
- Celkem, z toho z benefitů a doplatek kartou. Stejný pruh pokrytí jako v trip builderu a na obrazovce 2.
- Žádná věta „Cenu může ovlivnit způsob platby“ bez vysvětlení (4.6). Poplatek se v prototypu nemění, poznámka u něj říká, že se v reálném webu liší podle programu a převod je bez poplatku (FAQ).

**Formulář, shora dolů**
1. **Ukazatel kroků.** Ve variantě A testu 4 má čtyři kroky, ve variantě B tři, protože krok Doplňky chybí.
2. **Kontaktní údaje.** Jméno, příjmení, e-mail a telefon. Adresa je sbalená pod „Potřebuji fakturu na firmu nebo adresu“ (4.5). Poznámka pro ubytování je sbalený odkaz.
3. **Údaje, které chtějí doplňky.** Objeví se jen tehdy, když je doplněk v košíku.
   - Pojištění: jména a data narození všech pojištěných osob. Pojišťovna je potřebuje k uzavření smlouvy. První osoba se předvyplní z kontaktních údajů.
   - Auto: jméno řidiče a potvrzení věku, protože půjčovny mají minimální věk řidiče. Výši určí partner, v prototypu je fiktivní.
   - Tady je to místo, kde doplněk prodlužuje formulář. Proto jsou pole až v košíku, ne na obrazovce 2, a jen ta nutná.
4. **Ve variantě B testu 4 zkrácená nabídka doplňků.** Blok „Přidat k cestě“ s doporučeným pojištěním a autem, každé jedním tlačítkem. Ostatní varianty po rozbalení.
5. **Platba.**
   - Programy jako dlaždice (Edenred, Pluxee, Up) místo rozbalovacího seznamu. Žádný není předvybraný, pokud ho člověk nezvolil dřív (4.2).
   - Částka z benefitů je předvyplněná zůstatkem z trip builderu nebo obrazovky 2, maximálně do celkové ceny. Jde přepsat.
   - Doplatek se dopočítá sám a druhá metoda je předvybraná jako platební karta, ne stejná benefitní karta (4.2). Na výběr je i bankovní převod.
   - Když benefity pokryjí vše, doplatek se vůbec neukáže a místo něj je zelené „Zaplatíte celé z benefitů“.
   - „Mám dárkový poukaz“ je sbalený odkaz na konci platby, ne první věc v sekci (4.5).
6. **Souhlasy.** Jeden povinný souhlas s obchodními a storno podmínkami. Když jsou v košíku doplňky, k tomu odkaz na pojistné podmínky a informační dokument pojištění, případně podmínky půjčovny. Souhlas s marketingem není zaškrtnutý (4.4).
7. **Co bude dál.** Tři krátké body u tlačítka. Potvrzení přijde e-mailem, pojistnou smlouvu pošle pojišťovna, voucher na auto bude v detailu rezervace. U auta i připomínka kauce.
8. **Tlačítko na konci formuláře** s částkou, třeba „Zaplatit 19 290 Kč“ (4.3). Na desktopu je stejné tlačítko i v rekapitulaci.

**Chyby.** Kontrola až po opuštění pole nebo po kliknutí na Zaplatit. Chyba je u pole a fokus skočí na první chybné pole.

**Potvrzení (stav Hotovo)**
- Fiktivní číslo objednávky a jasná věta „Ukázka končí. Nic se neobjednalo ani nezaplatilo.“
- Přehled dokladů, které přijdou: potvrzení pobytu, pojistná smlouva, voucher na auto.
- Kolik bylo zaplaceno z benefitů, kolik kartou a kolik na benefitech zbývá.
- **Nabídka doplňku, který člověk nevybral.** Třeba „Ještě nemáte pojištění na cestu do Chorvatska. Přidat za 690 Kč z benefitů.“ Je to místo s nejmenším rizikem pro konverzi ubytování (kapitola 7, bod 4). V prototypu ho jde přidat, potvrzení se aktualizuje a zpráva řekne, že v reálném webu jde o samostatnou platbu.
- Tlačítka „Projít prototyp znovu“ a „Zpět na případovou studii“.

**Co bych měřil**
- Konverze od otevření košíku po zaplacení, celkem a zvlášť s doplňky a bez nich.
- Na kterém poli lidé nejčastěji odcházejí nebo dělají chybu.
- Podíl rozdělených plateb a kolik lidí přepíše předvyplněnou částku z benefitů.
- Podíl doplňků přidaných až na potvrzení.

**Předpoklady v prototypu**
- Doplňky jde zaplatit benefity a servisní poplatek se počítá jen z ubytování. Druhé vychází z FAQ, které o doplňcích nic neříká.
- Jeden bod je jedna koruna.

`TODO-MILAN: ověřit, jestli se servisní poplatek má počítat i z doplňků`

## 9. Otázky na první týden

- Jak se dnes dělí hledání podle místa a podle odkazu z Bookingu a jakou konverzi má každá cesta?
- Proč je vyhledávání postavené jako jedno pole a proč se termín zobrazí až po zadání místa?
- Platí se servisní poplatek z benefitů, nebo penězi? Liší se podle programu a jak přesně se počítá?
- Dovolují podmínky s Booking.com rozšíření do prohlížeče?
- Umí API partnera hledat podle názvu hotelu?
- Platí u všech programů, že jeden bod je jedna koruna?
- Jde doplňkové služby zaplatit benefity a počítá se z nich servisní poplatek?
- Nabízejí partnerské půjčovny pojištění bez spoluúčasti, se kterým je kauce nižší nebo žádná?
- Kdy v roce lidem nejčastěji propadají body a jak se podle toho mění počet rezervací?

---

## 10. Další kroky

1. Technický plán prototypu (stávající kód, design manuál, přepínání mezi studií a prototypem).
2. Postavit a dokončit úvodní stránku prototypu.
3. Analýza obrazovky 2, nabídka doplňků (8.8).
4. Analýza obrazovky 3, košík a platba, včetně potvrzení (8.9).
5. Rozhodnout, co se stane s prototypem, který je dnes přímo ve stránce případové studie.
6. Postavit obrazovky 2 a 3 a napojit celý průchod.
7. Revize stránky Případová studie, sekci po sekci.
8. Kontrola kvality (mobil, desktop, build, testy, pravidla 3 až 5).
9. Aktualizace README a seznamu TODO-MILAN.
