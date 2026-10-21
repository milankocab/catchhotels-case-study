# Analýza webu Dovolená za benefity

Pracovní podklad pro případovou studii a klikací prototyp. Odpovídá na jednu otázku a drží se jen toho, co k ní patří.

> **Jak bych přistoupil ke zdvojnásobení produktu a přidání nových kategorií?**

**Zdroje.** Screenshoty v `assets/screenshots` (desktop i mobil), veřejné FAQ na dovolena-za-benefity.cz a veřejný inzerát CatchHotels. Žádná interní data. Co z těchto zdrojů nevychází, je označené jako hypotéza nebo předpoklad.

`TODO-MILAN: doplnit zařízení a prohlížeč auditu (datum 19. 10. 2026)`

**Stav**

| Část | Stav |
| --- | --- |
| Obrazovka 1, úvodní stránka | postavená |
| Obrazovka 2, nabídka doplňků | postavená, čeká na kontrolu |
| Obrazovka 3, košík a potvrzení | postavená, čeká na kontrolu |
| Případová studie | čeká na přepis podle tohoto dokumentu |

Původní, delší verze dokumentu je zálohovaná mimo projekt. Vypuštěné části jsou shrnuté v kapitole 7.

---

## 1. Odpověď ve zkratce

Tržba produktu je počet rezervací krát tržba na jednu rezervaci. Zdvojnásobit ji jde dvěma pákami a nové kategorie pomáhají hlavně té druhé. Pro představu, pokud by rezervací bylo o 40 % víc a tržba na rezervaci o 40 % vyšší, je výsledek 1,4 × 1,4, tedy zhruba dvojnásobek. Čísla jsou ilustrativní, ne odhad.

1. **Víc dokončených rezervací.** Zjednodušit vyhledávání, ukázat cenu včetně poplatku a usnadnit rozdělení platby. To jsou místa, kde dnes podle auditu lidé zbytečně váhají.
2. **Vyšší tržba na rezervaci.** Přidat cestovní pojištění a půjčení auta jako doplňky k pobytu. Navazují na stejný termín a místo a nepotřebují složitou logistiku jako letenky nebo zájezdy.
3. **Ubytování zůstává hlavním produktem.** Hledání nabízí jen ubytování a doplňky přicházejí až po výběru pobytu. Pojištění a auto mají vlastní stránky kategorií v menu pro ty, kdo je chtějí koupit zvlášť. Kdyby data ukázala zájem o samostatný nákup, kategorie by se mohly vrátit i do hledání.
4. **Žádná změna nesmí srazit konverzi ubytování.** Ubytování je dnes celý byznys. Každou změnu bych proto pustil jako A/B test s konverzí ubytování jako ochrannou metrikou (kapitola 6).

**Klíčová otevřená otázka.** Jde doplňky zaplatit benefity, nebo jen doplatkem kartou? Pokud ano, je to silný důvod je přidat, protože člověk utrácí peníze, které by jinak mohly propadnout. Pokud ne, jde o běžný prodej doplňků za vlastní peníze s mnohem nižším očekávaným zájmem. Prototyp počítá s první možností a říká to otevřeně.

---

## 2. Proč právě tyto tři obrazovky

Vybral jsem tři místa, kde se nové kategorie potkávají s penězi. Každé ovlivňuje jinou část rovnice z kapitoly 1.

| Obrazovka | Co se tu rozhoduje | Páka |
| --- | --- | --- |
| **1. Úvodní stránka s kategoriemi** | Jestli člověk začne hledat a jestli se dozví, že benefity zaplatí i auto a pojištění. | počet rezervací, povědomí o nových kategoriích |
| **2. Nabídka doplňků po výběru ubytování** | Jestli si k pobytu něco přidá. Je to nový krok a zároveň největší riziko pro konverzi ubytování. | tržba na rezervaci |
| **3. Košík s rozdělením platby** | Jestli člověk objednávku zaplatí. S doplňky roste částka a s ní i doplatek kartou, takže dnešní nejasnosti v platbě se tu ještě zvětší. | dokončené rezervace, skutečně zaplacené doplňky |

**Co prototyp přeskakuje a proč.** Výsledky vyhledávání a detail hotelu jsou pro konverzi ubytování důležité, ale s novými kategoriemi se nemění. Jejich zjištění jsou v příloze A a byly by další v pořadí. Stránky kategorií, e-maily a stránka objednávky jsou dalšími místy nabídky (kapitola 7), ale prototyp by bez nich neztratil nic podstatného.

---

## 3. Obrazovka 1. Úvodní stránka s kategoriemi

> **Na první pohled je jasné, že dovolenou zaplatí benefity, ne vlastními penězi. Hned pod tím může začít hledat.**

### Úpravy dnešního stavu

**1.1 Vyhledávání.** Dnes jedno pole slouží pro místo i pro odkaz z Booking.com a termín s osobami se objeví až během psaní. Rozložení se pod rukama mění a nadpis míchá dva způsoby hledání.
- Termín a osoby jsou vidět hned.
- Pole našeptává místa i hotely podle názvu. Kdo má hotel vybraný, odkaz nepotřebuje. Ověřil bych, jestli to API partnera umí.
- Odkaz z Bookingu má vlastní cestu „Máte vybraný hotel na Booking.com?“, která panel přepne na pole pro odkaz. Když někdo odkaz vloží do pole pro místo, našeptávač nabídne jeho otevření.
- Chci, aby lidé vybírali u nás, kde máme pod kontrolou nabídku, řazení a doplňky. Cesta s odkazem se přitom nezhorší. Ověří to test 1.
- Hledání je jen pro ubytování.

**1.2 Hlavní tlačítko.** Vyhledat je světle modré na modrém pozadí a působí neaktivně. Hlavní tlačítka mají na webu nejméně čtyři podoby. Navrhuji jeden výrazný styl v celém procesu.

**1.3 Benefity jako hlavní sdělení.** Dnešní nadpis zdůrazňuje Booking, podporované programy jsou jen jako loga pod úvodní sekcí. Hlavní výhoda webu je, že člověk platí benefity, ne vlastními penězi. Předpokládám, že zákazníka zajímá hlavně to a jestli web umí jeho program. Nadpis proto zní „Dovolená za benefity, ne za vlastní peníze“ a hned pod ním jsou loga Edenred, Pluxee a Up s odkazem, jak se benefity platí. Pod tím je hledání. Logo Booking.com je u odkazu „Máte vybraný hotel na Booking.com?“ a v sekci 1.12. Přesné znění nadpisu bych ověřil A/B testem.

**1.4 Kalendář.** Na mobilu jeden měsíc s přepínáním a nenápadný počet nocí. Navrhuji měsíce pod sebou a počet nocí na tlačítku „Potvrdit · 2 noci“.

**1.5 Hledání vždy po ruce.** Když úvodní sekce odjede z obrazovky, připne se nahoru zkrácené vyhledávání. Poslední hledání se nabídne znovu, uložené jen v prohlížeči na sedm dní.

**1.6 Úvodní stránka podle sezóny.** Fotka a doporučení na úvodní stránce se mění podle toho, co lidé v daném období nejčastěji kupují. V zimě hory, v létě moře. O motivu bych rozhodoval podle rezervací z minulých let, ne podle kalendáře. Prototyp ukazuje letní variantu s ilustrací pobřeží.

### Nové kategorie

**1.7 Karta Doplňkové služby vedle hledání.** Pojištění a auto jsou doplňky k pobytu, proto nejsou jako volba ve vyhledávání. Před prvním krokem by přidávaly rozhodnutí, které většina lidí nepotřebuje. Vedle hledání jsou jen vidět s orientační cenou, aby člověk věděl, že benefity pokryjí celou cestu. Nabídnou se po výběru pobytu (obrazovka 2) a klik na kartu vede na stránku kategorie.

**1.8 Destinace s doporučeným doplňkem.** Karta destinace má štítek s doplňkem, který k místu sedí.

| Destinace | Štítek | Proč |
| --- | --- | --- |
| Krkonoše | Na hory se hodí auto | horské chaty bývají hůř dostupné vlakem |
| Chorvatsko | Do zahraničí s pojištěním | léčebné výlohy v zahraničí česká pojišťovna celé nehradí |
| Praha | bez štítku | ve městě člověk auto ani pojištění obvykle nepotřebuje |
| Rakouské Alpy | Na lyže s pojištěním | zahraničí a hory |

Předpokládám, že cílená nabídka bude mít vyšší podíl přidaných doplňků a nebude obtěžovat ty, kdo je nepotřebují. Na obrazovce 2 je doporučený doplněk zvýrazněný, ale nezaškrtnutý.

**1.9 Trip builder „Sestavte si cestu za benefity“.** Ukázkové cesty (hory, moře, město) jako tři karty Auto, Ubytování a Pojištění. Vedle je pole „Kolik máte na benefitech?“ a pruh, který ukazuje, jakou část cesty benefity pokryjí. Ukazuje vizi produktu na jednom místě a vede na obrazovku 2 s vybranými doplňky.

**1.10 Dobré vědět před cestou.** Tři krátké otázky k pojištění a tři k autu. Nejdůležitější je kauce u auta, kterou benefity nepokryjí. Obsah je ilustrativní, skutečné podmínky by vznikly s partnery.

`TODO-MILAN: zkontrolovat texty v sekci Dobré vědět před cestou`

### Další prvky v prototypu

Nejsou jádrem odpovědi, ale podporují počet rezervací. V prototypu jsou krátce a v analýze jen jednou větou.

- **1.11 Interaktivní průvodce** místo šesti dlouhých kroků Jak to funguje. Každý krok má jednu větu a podrobnosti pod odkazem.
- **1.12 Vybíráte na Booking.com?** Sekce s rozšířením do prohlížeče a vložením odkazu (kapitola 7).
- **1.13 Časté dotazy** na konci stránky, včetně auta a pojištění.
- **1.14 Blok pro HR** s odkazem na web pro firmy.
- **1.15 Chat s AI asistentem**, který odpovídá z FAQ a mimo provozní dobu řekne, kdy přijde odpověď.

`TODO-MILAN: rozhodnout, jestli body 1.11 až 1.15 v prototypu nechat, zkrátit, nebo vypustit`

---

## 4. Obrazovka 2. Nabídka doplňků po výběru ubytování

> **Člověk má vybraný pobyt. Jedním pohledem vidí, co se k cestě hodí a kolik to stojí z benefitů. A stejně snadno to může přeskočit.**

**2.1 Kde v procesu je.** Dnes jde po detailu hotelu rovnou formulář s údaji. Obrazovka 2 je nový krok mezi nimi. Je to nejvýraznější místo nabídky, ale taky nejrizikovější pro konverzi ubytování. Proto ji proti zkrácené nabídce v košíku ověří test 3.

**2.2 Shrnutí pobytu.** Ukazatel kroků (Ubytování, Doplňky, Košík a platba, Hotovo), fotka, termín, osoby, storno podmínky a cena včetně servisního poplatku (3.1, příloha A.1).

**2.3 Cestovní pojištění.**
- Oblast, termín a osoby jsou převzaté z pobytu.
- Tři varianty (Základ, Standard, Plus) a čtvrtá volba Bez pojištění. Nic není předem vybrané.
- Cena je za celou cestu pro všechny osoby, aby byl hned vidět dopad na benefity.
- V zahraničí je doporučená varianta Standard a jedna věta říká proč. V Česku doporučení není.
- U nevratné sazby věta, že varianta Plus kryje storno pobytu. Je to hypotéza na test (příloha A.5).

**2.4 Půjčení auta.**
- Dvě kategorie (Malé auto, Rodinné auto) a volba Bez auta, vyzvednutí a dny podle pobytu.
- Kauce řečená předem. Půjčovny ji obvykle blokují na kreditní kartě řidiče a benefity ji nepokryjí, protože nejde o platbu. Kdo to zjistí až u přepážky, odnese si horší zážitek, než kdyby auto nekoupil.
- Ve městě je nabídka sbalená do jednoho řádku.

**2.5 Souhrn a tlačítka.** Ubytování, doplňky, celkem, kolik zaplatí benefity a kolik doplatí kartou. Hlavní tlačítko „Pokračovat do košíku“ a vedle stejně velké „Pokračovat bez doplňků“, ne schovaný šedý odkaz.

**Zásady.** Nic není předem zaškrtnuté. Ceny jsou vždy za celou cestu. Štítek „Zaplatíte benefity“ má poznámku, že jde o předpoklad (kapitola 1, klíčová otázka). Partneři, krytí i ceny jsou fiktivní.

**Co bych měřil.** Podíl rezervací s doplňkem (zvlášť pojištění a auto), kolik lidí krok přeskočí a jako ochrannou metriku konverzi ubytování od detailu po zaplacení.

---

## 5. Obrazovka 3. Košík s rozdělením platby

> **Člověk vidí, co platí, kolik z benefitů a kolik kartou, a nemusí nic počítat ani hledat.**

### Co dnes brzdí platbu

Dnes je to stránka „Informace o vás“ s rekapitulací a pod ní „Způsob platby“. Doplňky přidají řádky, částku i údaje navíc, takže každé z těchto zjištění by s nimi bylo vidět víc.

**3.1 Servisní poplatek až v rekapitulaci.** Ve screenshotech je to 1 199 Kč k ubytování za 13 980 Kč, tedy 8,6 % z ceny ubytování a zároveň 7,9 % z celkové ceny (můj přepočet). Stránka partnera Edenred uvádí 7,9 %, FAQ říká, že se počítá z ceny ubytování. Popis a výpočet by měly být všude stejné. Kdy poplatek ukázat, ověří test 2.

**3.2 Rozdělení platby.** Zapíná se nenápadným odkazem „Přidat další platbu“. Částku z benefitů musí člověk napsat sám a znát k tomu svůj zůstatek. Druhá metoda je předvyplněná stejnou kartou jako první a předvybraný je Edenred.

**3.3 Na desktopu chybí tlačítko na konci formuláře.** „Rezervovat a zaplatit“ je jen v pravém panelu nahoře.

**3.4 Předem zaškrtnutý souhlas s marketingem.** Podle GDPR to není platný souhlas a těsně před platbou snižuje důvěru.

**3.5 Formulář chce víc, než je nutné.** Povinná celá adresa a telefon, velké pole pro poznámku uprostřed a slevový poukaz jako první věc v platbě.

**3.6 Věta „Cenu může ovlivnit způsob platby“.** Bez vysvětlení znejisťuje. FAQ uvádí, že poplatek se liší podle programu a převod je bez poplatku.

**3.7 Chybí jistota před zaplacením.** Není vidět krok ani co se stane po kliknutí. FAQ uvádí, že objednávku je potřeba zaplatit do 7 dnů, formulář to neříká.

### Návrh obrazovky

**Rekapitulace.** Pobyt a pod ním servisní poplatek jako samostatný řádek. Každý doplněk na vlastním řádku s odkazem Odebrat. Celkem, z toho z benefitů a doplatek kartou se stejným pruhem pokrytí jako na obrazovce 2. Na desktopu vpravo, na mobilu nahoře sbalená.

**Formulář shora dolů.**
1. Ukazatel kroků (3.7). Ve variantě B testu 3 jen tři kroky.
2. Kontaktní údaje. Adresa je sbalená pod „Potřebuji fakturu nebo adresu“, poznámka pro ubytování je odkaz (3.5).
3. Údaje pro doplňky, jen když jsou v košíku. U pojištění jména a data narození pojištěných, u auta jméno řidiče a potvrzení věku. Doplněk tu prodlužuje formulář, proto jen nutná pole a až tady, ne na obrazovce 2.
4. Ve variantě B testu 3 blok „Přidat k cestě“ s doporučeným pojištěním a autem, každé jedním tlačítkem.
5. Platba (3.2). Programy jako dlaždice, žádný předvybraný. Částka z benefitů předvyplněná zůstatkem, jde přepsat. Doplatek se dopočítá sám a druhá metoda je platební karta nebo převod. Když benefity pokryjí vše, doplatek se neukáže. „Mám dárkový poukaz“ je odkaz na konci.
6. Souhlasy (3.4). Jeden povinný s podmínkami, u doplňků odkaz na pojistné podmínky nebo podmínky půjčovny. Marketing nezaškrtnutý.
7. Co bude dál (3.7). Potvrzení e-mailem, pojistná smlouva od pojišťovny, voucher na auto a připomínka kauce.
8. Tlačítko s částkou na konci formuláře, třeba „Zaplatit 19 290 Kč“ (3.3).

**Potvrzení.** Stav po zaplacení, ne samostatná obrazovka. Jasná věta „Ukázka končí. Nic se neobjednalo ani nezaplatilo.“, kolik šlo z benefitů a kolik kartou a kolik zbývá. Nabídne doplněk, který člověk nevybral. Je to místo s nejmenším rizikem pro konverzi ubytování.

**Co bych měřil.** Konverze od otevření košíku po zaplacení s doplňky a bez nich, podíl rozdělených plateb, kolik lidí přepíše předvyplněnou částku a podíl doplňků přidaných až na potvrzení.

**Předpoklady v prototypu.** Doplňky jdou zaplatit benefity, servisní poplatek se počítá jen z ubytování a jeden bod je jedna koruna.

`TODO-MILAN: ověřit, jestli se servisní poplatek má počítat i z doplňků`

---

## 6. Jak bych to ověřil

Konverze ubytování je ochranná metrika všech testů. Varianta, která prodá víc doplňků, ale ztratí ubytování, nevyhrává.

**Test 1. Vyhledávací pole (první v pořadí).** Navržené pole jen pro místo s odkazem zvlášť (A) proti dnešnímu jednomu poli v novém vzhledu (B). Hlavní metrika je konverze od úvodní stránky po zaplacenou objednávku. Ochranná metrika je konverze lidí s odkazem z Bookingu, tahle skupina nesmí ztratit.

**Test 2. Kdy ukázat servisní poplatek.** Cena bez poplatku ve výsledcích (A) proti ceně včetně poplatku (B). Obecné e-commerce výzkumy (Baymard) řadí nečekané náklady na konci mezi nejčastější důvody nedokončení nákupu. Zákazník tu ale platí benefity a může reagovat jinak, proto rozhodne test. Měřit se musí celá cesta po zaplacení, protože B nejspíš ztratí ve výsledcích a získat může až v objednávce. Pravidla EU pro uvádění celkové ceny bych nechal posoudit právníkem.

**Test 3. Kde nabídnout doplňky.** Samostatný krok po výběru ubytování (A, obrazovka 2) proti zkrácené nabídce v košíku bez kroku navíc (B). Obě varianty mají na potvrzení stejnou nabídku. Hlavní metrika je výnos z doplňků na návštěvu detailu, ochranná konverze ubytování od detailu po zaplacení. V prototypu jde varianty přepínat.

**Kolik dat testy potřebují.** 30 tisíc rezervací ročně je zhruba 2 500 měsíčně. Při rozdělení 50 na 50 dostane každá varianta za čtyři týdny přibližně 1 150 objednávek. Spolehlivě tak odhalíme jen rozdíly zhruba od 10 až 12 % relativně. Přesně bych to spočítal podle skutečné konverze. Proto testy pouštím postupně, ne naráz.

**Postupné spuštění.** Nejdřív jedna kategorie na jednom trhu, pak rozšíření. Pojištění bych zkusil dřív než auto, protože se týká skoro každé cesty a nemá kauci ani převzetí na místě. Je to moje úvaha, ne ověřený fakt.

`TODO-MILAN: první trh a kategorie pro spuštění a zdůvodnění`

Na desktopu bych později ověřil i hledání v jednom řádku proti polím pod sebou. Prototyp ho používá, protože ho lidé znají od konkurence, ale je to převzatý vzor.

---

## 7. Mimo prototyp

Další páky růstu, které k otázce patří, ale do tří obrazovek se nevejdou. V případové studii by stačila jedna věta ke každé.

- **Výzkum s uživateli.** Než cokoli změním, mluvil bych s 5 až 8 zaměstnanci, kteří benefity čerpají nebo ještě ne, a s lidmi z HR. Pak dva rozhovory měsíčně jako stálý zdroj zpětné vazby.
- **Rozšíření do prohlížeče „Zaplatit benefity“.** Web dnes sám radí vybírat na Booking.com a kopírovat odkaz. Tlačítko přímo na Bookingu z toho udělá jeden klik. Bez ověření smluvních podmínek s Booking.com bych nezačal.
- **Landing pages destinací a programů a balíčky pro HR.** Stránky typu „Krkonoše za benefity“ jako cíl pro vyhledávače, kampaně a e-maily, které HR přepošle zaměstnancům.
- **Kampaň „Propadají vám body?“.** U řady zaměstnavatelů body propadají na konci roku, což ukazuje i dnešní web u dárkového poukazu. Pravidla si ale nastavuje každý zaměstnavatel, takže jde o hypotézu.
- **Další místa nabídky doplňků.** Stránky kategorií s nákupem bez ubytování, e-mail před odjezdem („Jedete za týden. Máte pojištění a auto?“) a stránka stavu objednávky.

---

## 8. Otázky na první týden

1. Jde doplňky zaplatit benefity a počítá se z nich servisní poplatek?
2. Jak se dělí hledání podle místa a podle odkazu z Bookingu a jakou konverzi má každá cesta?
3. Kde dnes lidé z procesu nejčastěji odcházejí?
4. Jaké jsou provizní podmínky partnerů pro pojištění a půjčení auta?
5. Kdy v roce lidem nejčastěji propadají body a jak se podle toho mění počet rezervací?

Ověřil bych i to, jestli u všech programů platí jeden bod jedna koruna, jestli API partnera umí hledat podle názvu hotelu a jestli podmínky Booking.com dovolují rozšíření do prohlížeče.

---

## Příloha A. Výsledky vyhledávání a detail hotelu

Prototyp tyto kroky přeskakuje. Zjištění jsou z mé první analýzy a spolu jsme je neprobírali.

- **A.1 Cena bez poplatku a s jinou jednotkou než filtr.** Karta ukazuje cenu nevratné varianty za celý pobyt bez poplatku, filtr rozpočtu je na noc.
- **A.2 Řazení dává nahoru hotely s málo recenzemi.** Apartmán s 10 z 5 recenzí je výš než hotel s 9,7 z 1 062 recenzí.
- **A.3 Karta neříká, podle čeho se lidé rozhodují.** Ukazuje Ručníky nebo Fén, ale ne zrušení zdarma, snídani nebo vzdálenost. Přeškrtnuté ceny nevysvětlují slevu.
- **A.4 Výběr pokoje přes seznam s nulou.** Rezervovat je šedé, dokud člověk nezmění 0 na 1. Dvě varianty se stejnými parametry mají jinou cenu bez vysvětlení.
- **A.5 Cena flexibility není vidět.** Rozdíl mezi nevratnou a vratnou sazbou si člověk musí spočítat sám. Na obrazovce 2 na to navazuje storno pojištění.
- **A.6 Detail neříká, jak se bude platit.** Nic o benefitech, poplatku ani platbě předem.
- **A.7 Chybí informace, kvůli kterým se lidé vracejí na Booking.** Texty recenzí, čas příjezdu, pravidla a podrobné storno podmínky.
- **A.8 Mobil.** Spodní lišta na detailu přetéká. Banner o Bookingu ve výsledcích zabírá skoro čtvrtinu obrazovky.

`TODO-MILAN: ověřit, jestli je přetékající lišta chyba webu, nebo artefakt screenshotu`

---

## Příloha B. Prototyp technicky

- **Adresy.** Prototyp je na `/catchhotels-case-study/`, případová studie na `/catchhotels-case-study/pripadova-studie/`. Obrazovky 2 a 3 mají adresu `#doplnky` a `#kosik`, takže funguje tlačítko zpět a odkaz jde poslat.
- **Přepínání.** Úzký tmavý pruh nahoře s přepínačem Prototyp a Případová studie. Upozornění o nezávislosti a fiktivních datech je v patičce.
- **Ovládání prototypu.** Vlevo dole přepínače Poznámky, Vyhledávání A nebo B (test 1) a Doplňky A nebo B (test 3). Výchozí jsou navržené varianty A.
- **Poznámky „proč“.** Očíslované shora dolů podle toho, co je vidět. Otevřená je vždy jen jedna a uvádí bod této analýzy.
- **Výběr.** Pobyt, doplňky a zůstatek se drží v prohlížeči jen po dobu návštěvy.
- **Fotky.** Destinace z Unsplash s volnou licencí. Fotky míst, ne skutečných hotelů.
- **Koruny.** Benefitní karty mají zůstatek v korunách a u kafeterií v Česku obvykle platí jeden bod jedna koruna. Ověřené to u všech programů nemám. Formulace „Kolik máte na benefitech?“ funguje pro kartu i kafeterii.
- **Design.** Vlastní neutrální vzhled podle `../brand/design-manual.md`, žádné logo, barvy ani fonty Dovolené za benefity. Všechna data jsou fiktivní.

`TODO-MILAN: ověřit u partnerů, jestli platí jeden bod jedna koruna`
