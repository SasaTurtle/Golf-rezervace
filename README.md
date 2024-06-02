<h1>Golfový Rezervační systém</h1>
<h2>Frontend</h2>
<h3>Funkce</h3>
<p>Kdyz uzivatel navstivi stranku tak bez registrace muze v kalendari videt rezervace, ale nemuze je nijak upravovat nebo mazat. Kdyz se uzivatel zaregistruje tak se udaje o uzivateli zapisou do databaze. Potom se muze prihlasit do sveho uctu a zacit vytvaret a upravovat svoje rezervace Uzivatel muze upravovat rezervace vytvorene jenom jim a nemuze upravovat rezervace ostatnim. Uzivatel se muze odhlasit ze ssveho uctu a prihlasit se na jiny ucet.</p>
<h4>Create</h4>
<p>Rezervace se vytvari tak ze uzivatel klikne na volne policko v kalendari, ktere neni v minulosti a je volne. </p>
<img width="959" alt="image" src="https://github.com/SasaTurtle/Golf-rezervace/assets/56025180/8cfa7f09-dceb-4c3f-916b-350f974868a1">
<p>Potom si muze vybrat nazev rezervace a ulozit ji. Rezervace se potom zapise do databaze.</p>
<h4>Update</h4>
Kdyz uzivatel klikne na svoji rezervaci tak ji muze updatnout. Zmeny se updatnou i v databazi.

<h4>Delete</h4>
<p>Pokud si to uzivatel rozmysli, tak rezervaci muze smazat. Staci na ni kliknout a vybrat "Odstranit Rezervaci". Rezervace se nasledne smaze z kalendare a z databaze.</p>
<img width="341" alt="image" src="https://github.com/SasaTurtle/Golf-rezervace/assets/56025180/a69f15d8-aa50-4375-893b-80a3e2de81eb">
<img width="353" alt="image" src="https://github.com/SasaTurtle/Golf-rezervace/assets/56025180/edc5d046-e188-4966-abdc-e3afda0b2647">

<h3>Kód</h3>
<p>Prezencni vrstva je napsana v Reactu verze 18.3.1. Cely projekt je rozdelen do komponent 'app.js' routuje jednotlive stranky a prideluje jim patricne komponenty. Pri loginu se vola na pozadi javascriptu login API, ktere vytvari JWT token. Tento token je posleze ulozen v 'localStorage' a je vyuzit pro identifikaci uzivatele v komunikaci se serverem.
Na uvodni strance je kalendar, ktery zobrazuje rezervace samotneho uzivatele a ostanich uzivatelu. Rezervaci nelze vytvorit v minulosti. Na strance "Moje Rezervace" muze uzivatel videt seznam svych rezervaci, ktere probihaji a kterou uz probehly.
Do projektu jsou doinstalovan bootstrap, ktery usnadnuje tvorbu komponent. Komponenty stranky jsou: Home, Login, Registrace a Moje rezervace. Routing k temto strankam zabezpecuje 'app.js'.

Pro komponentu kalendar jsem pouzil komponentu 3. strany "Full calendar" 
https://fullcalendar.io/</p>

<h4>Struktura Reaktove komponenty</h4>
<p>Reaktova komponenta obsahuje return ve ktere je HTML kod. Dale pouzivam reaktove hooky 'useState' a 'useEffect'. Pro komunikaci se serverem pouzivam js funkce fetch nebo axios komponenty. Kazde zabezpecene volani funkce ma ve sve hlavicce (head) zakompomponovany bearer token.
Dale jsou kvuli CORS dalsi atributy nastavene v headeru.</p>

<p>Kod je podle standardu microsoftu a reaktu</p>

<h2>Backend</h2>
<p>Projekt bezi na mssql serveru a logika je vytvorena v .NET core projektu za pomoci Entity Frameworku (EF).
Nektere API jsou ochranene JWT tokenem.
Konfigurace je ulozena v appsetings.json souboru.</p>

<p>Zakladem projektu je rezervace, ktera je pres rezervacni API (viz. Swagger: 'https://localhost:44304/swagger/index.html') pomoci EF napojena do tabulky rezevace.
Tabulka Rezervace je vazebni tabulka Mezi Uzivatelem a Mistem. K Uzivateli jsou jeste napojeny tabuky Platebni historie a Role(admin nebo user).
Cely projekt je nadesignovan podle navrhoveho vzoru MVC - model, viewer(momentalne swagger) a controller. Coz znamena, ze kazda tabulka ma svuj model a crud controller.</p>

<p>Cotroller tridy krome crud metod maji metodu pro vlozeni vice zaznamu najednou.
Abych vyhovel zadani tak UserController ma metodu 'PostUserReservation' navic pro import vice tabulek najednou.</p>

<p>LoginCrontroller se po zadani emailu nebo jmena a hesla podiva do databaze a pokud najde schodu s existujicim uzivatelem tak vrati vygenerovany bearer token. Ten se pak pro autorizaci vklada do ostatnich API.</p>

<h3>Swagger</h3>
<p>V mem pripade je toto moje uzivatelske rozhrani ve kterem uzivatel muze: vypsat vsechny zaznamy nebo vypsat 1 zaznam podle id, vytvorit 1 zaznam, updatnout zaznam, vymazat zaznam a vytvorit vice zaznamu. Uzivatel navic muze pridat zaznam uzivatele s rezervacni tabulkou.
Tady jsou videt vsechny moje API:</p>
<img width="564" alt="image" src="https://github.com/SasaTurtle/Databazovy-projekt/assets/56025180/71d61962-d95c-4a94-94c9-7c29f10561b1">

<p>Tady je screenshot jak se vklada zaznam pro uzivatele. Staci kliknout na API -> pak dat "Try it out" -> pak vlozite data do **Jsonu** v policku "Request body" -> a pak kliknete Execute, pokud vsecno probehne v poradku tak se uzivatel ulkozi do databaze.</p>
<img width="765" alt="Untitled" src="https://github.com/SasaTurtle/Databazovy-projekt/assets/56025180/3c8b5451-1071-4d88-8b19-529070e0f049">
<h2>Diagram databaze</h2>
<img width="550" alt="image" src="https://github.com/SasaTurtle/Databazovy-projekt/assets/56025180/f8841d98-18cb-4ca4-832d-eae155b95758">
