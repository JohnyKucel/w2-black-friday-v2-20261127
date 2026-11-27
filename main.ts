import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Deal = {
  id: number;
  product: string;
  store: string;
  category: string;
  sale: number;
  was: number;
  url: string;
  source: string;
  low: boolean;
  note: string;
};

const CHECKED = "2026-11-27";
const CHECKED_LABEL = "27 Nov 2026";

const DEALS: Deal[] = [
  { id: 1, product: "Apple AirPods Pro 3", store: "Amazon", category: "Audio", sale: 149, was: 249, url: "https://www.amazon.com/s?k=AirPods+Pro+3", source: "9to5Toys, 24 Nov 2026", low: true, note: "Back at $149 after a $179 step down; $100 under list." },
  { id: 2, product: "Apple AirPods Max 2", store: "Amazon", category: "Audio", sale: 419, was: 549, url: "https://www.amazon.com/s?k=AirPods+Max+2", source: "9to5Toys, 24 Nov 2026", low: false, note: "$130 off the current-generation over-ear." },
  { id: 3, product: "Apple Watch Series 12 GPS 42mm", store: "Amazon", category: "Wearables", sale: 299, was: 399, url: "https://www.amazon.com/s?k=Apple+Watch+Series+12+42mm", source: "9to5Toys, 24 Nov 2026", low: true, note: "All-time low; $100 off list." },
  { id: 4, product: "Apple Watch SE 3", store: "Amazon", category: "Wearables", sale: 179, was: 249, url: "https://www.amazon.com/s?k=Apple+Watch+SE+3", source: "9to5Toys, 24 Nov 2026", low: false, note: "Entry Apple Watch down $70 from list." },
  { id: 5, product: "Amazon Echo Dot (newest)", store: "Amazon", category: "Smart Home", sale: 55, was: 100, url: "https://www.amazon.com/s?k=Echo+Dot", source: "9to5Toys, 24 Nov 2026", low: true, note: "New all-time low at 45% off." },
  { id: 6, product: "Amazon Echo Studio", store: "Amazon", category: "Smart Home", sale: 160, was: 220, url: "https://www.amazon.com/s?k=Echo+Studio", source: "9to5Toys, 24 Nov 2026", low: false, note: "$60 off the full-size smart speaker." },
  { id: 7, product: "Amazon Echo Time", store: "Amazon", category: "Smart Home", sale: 100, was: 200, url: "https://www.amazon.com/s?k=Echo+Time", source: "9to5Toys, 24 Nov 2026", low: true, note: "New all-time low; half price." },
  { id: 8, product: "Amazon Alexa Tablet 8 64GB", store: "Amazon", category: "Tablets", sale: 130, was: 230, url: "https://www.amazon.com/s?k=Alexa+Tablet+8", source: "9to5Toys, 24 Nov 2026", low: true, note: "New all-time low; $100 off." },
  { id: 9, product: "Apple MacBook Air 13-inch M5 16GB/512GB", store: "Amazon", category: "Laptops", sale: 989, was: 1299, url: "https://www.amazon.com/s?k=MacBook+Air+M5+13-inch", source: "9to5Toys, 23 Nov 2026", low: false, note: "$310 off; the lowest MacBook Air M5 price tracked this week." },
  { id: 10, product: "Sony WH-1000XM6 headphones", store: "Amazon", category: "Audio", sale: 348, was: 460, url: "https://www.amazon.com/s?k=Sony+WH-1000XM6", source: "Product Bible, 19 Nov 2026", low: false, note: "Lowest Amazon price ever; $30 under Prime Day." },
  { id: 11, product: "Apple AirTag 2 (single)", store: "Amazon", category: "Smart Home", sale: 18, was: 29, url: "https://www.amazon.com/s?k=AirTag+2", source: "9to5Toys, 24 Nov 2026", low: true, note: "All-time low for a single tracker." },
  { id: 12, product: "Bose QuietComfort Headphones (2nd Gen)", store: "Amazon", category: "Audio", sale: 199, was: 359, url: "https://www.amazon.com/s?k=Bose+QuietComfort+Headphones+2nd+Gen", source: "CNN Underscored, 23 Nov 2026", low: true, note: "All-time low; 45% off list." },
  { id: 13, product: "Samsung Galaxy S26 Ultra", store: "Amazon", category: "Phones", sale: 950, was: 1400, url: "https://www.amazon.com/s?k=Samsung+Galaxy+S26+Ultra", source: "NewsUnc roundup, 21 Nov 2026", low: false, note: "$450 off the flagship phone." },
  { id: 14, product: "Google Pixel 11", store: "Amazon", category: "Phones", sale: 699, was: 899, url: "https://www.amazon.com/s?k=Google+Pixel+11", source: "NewsUnc roundup, 21 Nov 2026", low: false, note: "$200 off the base Pixel 11." },
  { id: 15, product: "Amazon Fire TV Stick 4K", store: "Amazon", category: "Smart Home", sale: 20, was: 60, url: "https://www.amazon.com/s?k=Fire+TV+Stick+4K", source: "NewsUnc roundup, 21 Nov 2026", low: true, note: "Two-thirds off; cheapest streamer in the sale." },
  { id: 16, product: "Google Pixel Watch 5 41mm", store: "Amazon", category: "Wearables", sale: 300, was: 400, url: "https://www.amazon.com/s?k=Pixel+Watch+5+41mm", source: "9to5Toys, 24 Nov 2026", low: false, note: "$100 off the 41mm watch." },
  { id: 17, product: "TCL 65-inch 4K TV (S4 series)", store: "Best Buy", category: "TVs", sale: 229.99, was: 469.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=TCL+65-inch+4K+TV+S4", source: "Best Buy release, 17 Nov 2026", low: true, note: "Doorbuster; $240 off and the cheapest big TV tracked." },
  { id: 18, product: "HP OmniBook 5 14-inch OLED laptop", store: "Best Buy", category: "Laptops", sale: 449.99, was: 799.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=HP+OmniBook+5+14-inch+OLED", source: "Best Buy release, 17 Nov 2026", low: true, note: "Doorbuster; $350 off an OLED laptop." },
  { id: 19, product: "Sony WH-1000XM5 headphones", store: "Best Buy", category: "Audio", sale: 169.99, was: 399, url: "https://www.bestbuy.com/site/searchpage.jsp?st=Sony+WH-1000XM5", source: "Best Buy release, 17 Nov 2026", low: true, note: "$229 off the previous flagship noise-canceller." },
  { id: 20, product: "Shark PowerDetect Cordless Stick Vacuum", store: "Best Buy", category: "Home", sale: 199.99, was: 499.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=Shark+PowerDetect+cordless+stick+vacuum", source: "Best Buy release, 17 Nov 2026", low: true, note: "$300 off; 60% under list." },
  { id: 21, product: "Insignia 18 cu ft Top-Freezer Refrigerator", store: "Best Buy", category: "Home", sale: 299.99, was: 749.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=Insignia+18+cubic+foot+top-freezer+refrigerator", source: "Best Buy release, 17 Nov 2026", low: true, note: "$450 off; the deepest dollar saving in the sale." },
  { id: 22, product: "Samsung Galaxy S26 FE", store: "Best Buy", category: "Phones", sale: 499.99, was: 699.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=Samsung+Galaxy+S26+FE", source: "Best Buy release, 17 Nov 2026", low: false, note: "$200 off the fan-edition phone." },
  { id: 23, product: "LG 55-inch C6 OLED evo TV", store: "Best Buy", category: "TVs", sale: 999.99, was: 1999.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=LG+55-inch+C6+OLED+evo+TV", source: "The Tech Hacker, 9 Nov 2026", low: true, note: "Half price on the 2026 OLED pick." },
  { id: 24, product: "Samsung 65-inch S84H OLED TV", store: "Best Buy", category: "TVs", sale: 999.99, was: 2099.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=Samsung+65-inch+S84H+OLED+TV", source: "The Tech Hacker, 9 Nov 2026", low: true, note: "Over $1,100 off list on a 65-inch OLED." },
  { id: 25, product: "Insignia 40-inch Fire TV", store: "Best Buy", category: "TVs", sale: 89.99, was: 149.99, url: "https://www.bestbuy.com/site/searchpage.jsp?st=Insignia+40-inch+Fire+TV", source: "Best Buy release, 17 Nov 2026", low: true, note: "Budget TV at 40% off." },
  { id: 26, product: "Nintendo Switch 2 + Mario Kart World Bundle", store: "Walmart", category: "Gaming", sale: 499.99, was: 549.99, url: "https://www.walmart.com/search?q=Nintendo+Switch+2+Mario+Kart+World+bundle", source: "Nintendo announcement, 15 Nov 2026", low: false, note: "Only $50 off, but the first real discount on the bundle; buy it for the console, not the saving." },
  { id: 27, product: "LEGO Star Wars Millennium Falcon", store: "Walmart", category: "Toys", sale: 260.99, was: 289.99, url: "https://www.walmart.com/search?q=LEGO+Star+Wars+Millennium+Falcon", source: "Walmart walkthrough, 26 Nov 2026", low: false, note: "Small 10% cut; routine LEGO pricing, not a doorbuster." },
  { id: 28, product: "LEGO Star Wars Kylo Ren's Command Shuttle", store: "Walmart", category: "Toys", sale: 35, was: 69.99, url: "https://www.walmart.com/search?q=LEGO+Kylo+Ren+Command+Shuttle", source: "Walmart walkthrough, 26 Nov 2026", low: true, note: "Half price on a Star Wars set." },
  { id: 29, product: "Hisense 65-inch 4K Roku TV", store: "Walmart", category: "TVs", sale: 228, was: 398, url: "https://www.walmart.com/search?q=Hisense+65-inch+4K+Roku+TV", source: "Walmart walkthrough, 26 Nov 2026", low: true, note: "$170 off a 65-inch 4K set." },
  { id: 30, product: "Beats Studio Pro headphones", store: "Walmart", category: "Audio", sale: 99, was: 299, url: "https://www.walmart.com/search?q=Beats+Studio+Pro", source: "Walmart walkthrough, 26 Nov 2026", low: true, note: "Two-thirds off; cheapest premium headphone in the sale." },
  { id: 31, product: "Apple AirPods 4", store: "Walmart", category: "Audio", sale: 89, was: 129.99, url: "https://www.walmart.com/search?q=AirPods+4", source: "Walmart walkthrough, 26 Nov 2026", low: false, note: "$41 off the base AirPods." },
  { id: 32, product: "Ninja Pro XL Air Fryer AF181", store: "Target", category: "Kitchen", sale: 129.99, was: 179.99, url: "https://www.target.com/s?searchTerm=Ninja+Pro+XL+air+fryer+AF181", source: "The Tech Hacker, 9 Nov 2026", low: false, note: "$50 off the tested 6-in-1 air fryer." },
  { id: 33, product: "Keurig K-Mini Go", store: "Target", category: "Kitchen", sale: 69.99, was: 88.99, url: "https://www.target.com/s?searchTerm=Keurig+K-Mini+Go", source: "The Tech Hacker, 9 Nov 2026", low: false, note: "Modest cut on a single-serve brewer." },
  { id: 34, product: "KitchenAid Bowl-Lift Stand Mixer", store: "Costco", category: "Kitchen", sale: 299.99, was: 399.99, url: "https://www.costco.com/CatalogSearch?dept=All&keyword=KitchenAid+Bowl-Lift+Stand+Mixer", source: "Costco Buzz, 24 Nov 2026", low: false, note: "$100 off the bowl-lift mixer." },
  { id: 35, product: "Dyson Purifying Hot+Cool Fan HP11", store: "Costco", category: "Home", sale: 399.99, was: 599.99, url: "https://www.costco.com/CatalogSearch?dept=All&keyword=Dyson+Purifying+Hot+Cool+Fan+HP11", source: "Costco Buzz, 24 Nov 2026", low: false, note: "$200 off the purifying fan heater." },
  { id: 36, product: "Shark CryoGlow LED Face Mask", store: "Costco", category: "Home", sale: 269.99, was: 339.99, url: "https://www.costco.com/CatalogSearch?dept=All&keyword=Shark+CryoGlow+LED+Face+Mask", source: "Costco Buzz, 24 Nov 2026", low: false, note: "$70 off the LED face mask." },
];

function pct(d: Deal): number {
  return Math.round((1 - d.sale / d.was) * 100);
}

function save(d: Deal): number {
  return Math.round((d.was - d.sale) * 100) / 100;
}

function verdict(d: Deal): { label: string; cls: string } {
  if (d.low) return { label: "NEW LOW", cls: "newlow" };
  const p = pct(d);
  if (p >= 25) return { label: "STRONG DEAL", cls: "strong" };
  if (p >= 15) return { label: "SOLID DEAL", cls: "solid" };
  return { label: "ROUTINE DEAL", cls: "routine" };
}

function money(n: number): string {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function validateDeals(): void {
  const seen = new Set<number>();
  for (const d of DEALS) {
    if (seen.has(d.id)) throw new Error("duplicate deal id " + d.id);
    seen.add(d.id);
    if (!d.product || !d.store || !d.category || !d.source || !d.note) {
      throw new Error("deal " + d.id + " is missing a required text field");
    }
    if (!(d.sale > 0) || !(d.was > d.sale)) {
      throw new Error("deal " + d.id + " has an impossible price: sale " + d.sale + ", was " + d.was);
    }
    if (!d.url.startsWith("https://")) {
      throw new Error("deal " + d.id + " has a non-https store link");
    }
  }
}

const CSS = [
  ":root{",
  "  --bg:#faf6ef; --surface:#ffffff; --ink:#1c1917; --muted:#57534e; --line:#e7e0d2;",
  "  --accent:#9f1239; --accent-dark:#881337; --gold:#b45309;",
  "  --good:#166534; --strong:#92400e; --solid:#1e40af; --routine:#57534e;",
  "  --radius:14px; --gap:16px; --max:1120px;",
  "  color-scheme:light;",
  "}",
  "*{box-sizing:border-box}",
  "html{scroll-padding-block-start:96px}",
  "body{margin:0;background:var(--bg);color:var(--ink);",
  "  font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
  "  font-size:1rem;line-height:1.55;-webkit-font-smoothing:antialiased}",
  "a{color:var(--accent)}",
  ":focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
  "header.hero{background:#1c1917;color:#fafaf9;padding:40px 20px 32px}",
  ".hero-inner{max-width:var(--max);margin:0 auto}",
  ".kicker{font-size:0.8125rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#fda4af}",
  "h1{font-size:2.25rem;line-height:1.1;letter-spacing:-0.02em;margin:12px 0 8px;text-wrap:balance}",
  ".lede{font-size:1.125rem;line-height:1.5;color:#e7e5e4;max-width:62ch;margin:0}",
  ".lede strong{color:#fff}",
  ".stats{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}",
  ".stat{background:#292524;border:1px solid #44403c;border-radius:10px;padding:12px 16px;min-width:140px}",
  ".stat b{display:block;font-size:1.5rem;line-height:1.2;font-variant-numeric:tabular-nums}",
  ".stat span{font-size:0.8125rem;color:#d6d3d1}",
  "main{max-width:var(--max);margin:0 auto;padding:24px 20px 48px}",
  ".toolbar{position:sticky;top:0;z-index:5;background:var(--bg);padding:16px 0;border-bottom:1px solid var(--line);",
  "  display:flex;flex-wrap:wrap;gap:12px;align-items:end}",
  ".field{display:flex;flex-direction:column;gap:6px}",
  ".field label{font-size:0.8125rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--muted)}",
  ".field input,.field select{font-size:1rem;padding:10px 12px;border:1px solid #a8a29e;border-radius:10px;background:var(--surface);color:var(--ink);min-height:44px}",
  ".field input{flex:1;min-width:220px}",
  ".grow{flex:1}",
  ".check{display:flex;align-items:center;gap:8px;font-size:0.9375rem;font-weight:600;padding-bottom:12px}",
  ".check input{width:20px;height:20px;accent-color:var(--accent)}",
  "button.reset{align-self:end;margin-bottom:0;min-height:44px;padding:10px 16px;border:1px solid #a8a29e;border-radius:10px;",
  "  background:var(--surface);color:var(--ink);font-size:0.9375rem;font-weight:700;cursor:pointer}",
  "button.reset:hover{border-color:var(--accent);color:var(--accent)}",
  ".count{font-size:0.9375rem;color:var(--muted);margin:20px 0 4px}",
  ".count b{color:var(--ink);font-variant-numeric:tabular-nums}",
  ".grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);margin-top:16px}",
  ".card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:20px;display:flex;flex-direction:column;gap:10px;transition:transform 120ms ease,box-shadow 120ms ease}",
  ".card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(28,25,23,0.12)}",
  ".card-top{display:flex;justify-content:space-between;gap:8px;align-items:start}",
  ".tag{font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--muted)}",
  ".badge{font-size:0.75rem;font-weight:800;letter-spacing:0.04em;white-space:nowrap;padding:5px 9px;border-radius:999px;color:#fff}",
  ".badge.newlow{background:var(--good)}",
  ".badge.strong{background:var(--strong)}",
  ".badge.solid{background:var(--solid)}",
  ".badge.routine{background:var(--routine)}",
  "h2.card-title{font-size:1.125rem;line-height:1.3;letter-spacing:-0.01em;margin:0;text-wrap:balance}",
  ".prices{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}",
  ".sale{font-size:1.625rem;font-weight:800;letter-spacing:-0.01em;font-variant-numeric:tabular-nums}",
  ".was{font-size:1rem;color:var(--muted);text-decoration:line-through;font-variant-numeric:tabular-nums}",
  ".off{font-size:0.875rem;font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums}",
  ".save{font-size:0.9375rem;color:var(--muted);font-variant-numeric:tabular-nums}",
  ".note{font-size:0.9375rem;line-height:1.5;margin:0;text-wrap:pretty}",
  ".meta{font-size:0.8125rem;color:var(--muted);line-height:1.5;margin:0}",
  ".card a.cta{margin-top:auto;display:block;text-align:center;background:var(--accent);color:#fff;font-weight:700;",
  "  text-decoration:none;padding:12px 16px;border-radius:10px;min-height:44px}",
  ".card a.cta:hover{background:var(--accent-dark)}",
  ".empty{padding:48px 20px;text-align:center;color:var(--muted);font-size:1.125rem}",
  "section.method{margin-top:48px;border-top:2px solid var(--ink);padding-top:24px}",
  "section.method h2{font-size:1.5rem;line-height:1.2;letter-spacing:-0.01em;margin:0 0 12px}",
  "section.method p,section.method li{font-size:0.9375rem;line-height:1.6;max-width:70ch}",
  "section.method ul{padding-inline-start:20px}",
  "footer{border-top:1px solid var(--line);padding:24px 20px 40px;color:var(--muted);font-size:0.875rem;line-height:1.6}",
  "footer .inner{max-width:var(--max);margin:0 auto}",
  "@media (max-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}h1{font-size:1.875rem}}",
  "@media (max-width:600px){.grid{grid-template-columns:minmax(0,1fr)}h1{font-size:1.625rem}.stat{min-width:calc(50% - 6px)}.hero-inner{padding:0}}",
].join("\n");

function cardHtml(d: Deal): string {
  const v = verdict(d);
  return [
    '<article class="card">',
    '<div class="card-top"><span class="tag">' + esc(d.store) + " · " + esc(d.category) + '</span><span class="badge ' + v.cls + '">' + v.label + "</span></div>",
    '<h2 class="card-title">' + esc(d.product) + "</h2>",
    '<div class="prices"><span class="sale">' + money(d.sale) + '</span><span class="was">' + money(d.was) + "</span><span class=\"off\">-" + pct(d) + "%</span></div>",
    '<p class="save">You save ' + money(save(d)) + " vs the usual price.</p>",
    '<p class="note">' + esc(d.note) + "</p>",
    '<p class="meta">Price checked ' + CHECKED_LABEL + " · Source: " + esc(d.source) + "</p>",
    '<a class="cta" href="' + esc(d.url) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + " →</a>",
    "</article>",
  ].join("\n");
}

function buildHtml(): string {
  const cards = DEALS.map(cardHtml).join("\n");
  const totalSave = DEALS.reduce((a, d) => a + save(d), 0);
  const newLows = DEALS.filter((d) => d.low).length;
  const avg = Math.round(DEALS.reduce((a, d) => a + pct(d), 0) / DEALS.length);
  const stores = [...new Set(DEALS.map((d) => d.store))];
  const cats = [...new Set(DEALS.map((d) => d.category))].sort();
  const storeOpts = stores.map((s) => '<option value="' + esc(s) + '">' + esc(s) + "</option>").join("\n");
  const catOpts = cats.map((c) => '<option value="' + esc(c) + '">' + esc(c) + "</option>").join("\n");
  return [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    "<title>TrueLow — Real Black Friday Deals, Checked 27 Nov 2026</title>",
    '<meta name="description" content="36 real Black Friday and Cyber Monday deals, each price-checked on 27 Nov 2026, with an honest verdict on whether each one is really a deal.">',
    '<link rel="stylesheet" href="styles.css">',
    "</head>",
    "<body>",
    '<header class="hero"><div class="hero-inner">',
    '<p class="kicker">Black Friday · Cyber Monday 2026</p>',
    "<h1>TrueLow — real deals, checked today.</h1>",
    '<p class="lede">Every price below was checked against a store or deal source on <strong>27 Nov 2026</strong>. Each deal carries an honest verdict: <strong>New Low</strong>, <strong>Strong</strong>, <strong>Solid</strong> or <strong>Routine</strong> — so a small cut never dresses up as a doorbuster.</p>',
    '<div class="stats">',
    '<div class="stat"><b>' + DEALS.length + '</b><span>deals checked</span></div>',
    '<div class="stat"><b>' + newLows + '</b><span>new lows</span></div>',
    '<div class="stat"><b>' + avg + '%</b><span>average discount</span></div>',
    '<div class="stat"><b>' + money(totalSave) + '</b><span>total savings if you bought one of each</span></div>',
    "</div>",
    "</div></header>",
    "<main>",
    '<div class="toolbar" role="search">',
    '<div class="field grow"><label for="q">Search deals</label><input id="q" type="search" placeholder="Try “AirPods”, “TV”, “vacuum”… " autocomplete="off"></div>',
    '<div class="field"><label for="cat">Category</label><select id="cat"><option value="">All categories</option>' + catOpts + "</select></div>",
    '<div class="field"><label for="store">Store</label><select id="store"><option value="">All stores</option>' + storeOpts + "</select></div>",
    '<div class="field"><label for="disc">Discount</label><select id="disc"><option value="0">Any discount</option><option value="25">25% off or more</option><option value="40">40% off or more</option><option value="50">50% off or more</option></select></div>',
    '<div class="field"><label for="sort">Sort by</label><select id="sort"><option value="off">Biggest discount</option><option value="save">Biggest saving ($)</option><option value="low">Lowest price</option><option value="high">Highest price</option></select></div>',
    '<label class="check"><input id="lows" type="checkbox"> New lows only</label>',
    '<button class="reset" id="reset" type="button">Clear filters</button>',
    "</div>",
    '<p class="count" id="count" aria-live="polite"></p>',
    '<div class="grid" id="grid">',
    cards,
    "</div>",
    '<section class="method"><h2>How a deal earns its verdict</h2>',
    "<p><strong>New Low</strong> — the lowest price a deal tracker or the store itself has shown for this product. <strong>Strong Deal</strong> — 25% or more off the usual price. <strong>Solid Deal</strong> — 15–24% off. <strong>Routine Deal</strong> — under 15% off; the saving is real but small, and the note says so plainly.</p>",
    "<p>How prices were checked: each sale price and usual price was read from the store's own announcement, its Black Friday page, or a deal roundup that names the store and the price, on 27 Nov 2026. Prices move fast in sale week — always confirm the price on the store page before you pay. Store links go to the store's own search for that exact product.</p>",
    "<p>Sources used: 9to5Toys Amazon Black Friday Week coverage (20–24 Nov 2026); Best Buy Black Friday release (17 Nov 2026); Product Bible Amazon deals (19 Nov 2026); CNN Underscored Black Friday deals (23 Nov 2026); The Tech Hacker Black Friday tech deals (9 Nov 2026); NewsUnc store-by-store roundup (21 Nov 2026); Walmart Black Friday walkthrough (26 Nov 2026); Costco Buzz Black Friday tour (24 Nov 2026); Nintendo Black Friday announcement (15 Nov 2026). Full per-deal sources are on each card and in dossier.md.</p>",
    "</section>",
    "</main>",
    "<footer><div class=\"inner\">TrueLow is an independent deal finder built for make.fun's Black Friday deal finder bounty. Prices checked 27 Nov 2026 and may have changed since. Not affiliated with Amazon, Best Buy, Walmart, Target, Costco or any brand shown.</div></footer>",
    '<script src="app.js"></script>',
    "</body>",
    "</html>",
    "",
  ].join("\n");
}

function buildJs(): string {
  return [
    "const DEALS = " + JSON.stringify(DEALS) + ";",
    "const CHECKED_LABEL = " + JSON.stringify(CHECKED_LABEL) + ";",
    "function pct(d){return Math.round((1-d.sale/d.was)*100);}",
    "function save(d){return Math.round((d.was-d.sale)*100)/100;}",
    "function money(n){return '$'+n.toFixed(2).replace(/\\.00$/,'');}",
    "function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');}",
    "function verdict(d){if(d.low)return{label:'NEW LOW',cls:'newlow'};const p=pct(d);if(p>=25)return{label:'STRONG DEAL',cls:'strong'};if(p>=15)return{label:'SOLID DEAL',cls:'solid'};return{label:'ROUTINE DEAL',cls:'routine'};}",
    "function card(d){const v=verdict(d);return '<article class=\"card\">'+'<div class=\"card-top\"><span class=\"tag\">'+esc(d.store)+' · '+esc(d.category)+'</span><span class=\"badge '+v.cls+'\">'+v.label+'</span></div>'+'<h2 class=\"card-title\">'+esc(d.product)+'</h2>'+'<div class=\"prices\"><span class=\"sale\">'+money(d.sale)+'</span><span class=\"was\">'+money(d.was)+'</span><span class=\"off\">-'+pct(d)+'%</span></div>'+'<p class=\"save\">You save '+money(save(d))+' vs the usual price.</p>'+'<p class=\"note\">'+esc(d.note)+'</p>'+'<p class=\"meta\">Price checked '+CHECKED_LABEL+' · Source: '+esc(d.source)+'</p>'+'<a class=\"cta\" href=\"'+esc(d.url)+'\" target=\"_blank\" rel=\"noopener\">View at '+esc(d.store)+' →</a>'+'</article>';}",
    "const grid=document.getElementById('grid');",
    "const count=document.getElementById('count');",
    "const q=document.getElementById('q');",
    "const cat=document.getElementById('cat');",
    "const store=document.getElementById('store');",
    "const disc=document.getElementById('disc');",
    "const sort=document.getElementById('sort');",
    "const lows=document.getElementById('lows');",
    "const reset=document.getElementById('reset');",
    "function render(){const term=q.value.trim().toLowerCase();const min=Number(disc.value);let list=DEALS.filter(function(d){if(term&&d.product.toLowerCase().indexOf(term)<0&&d.store.toLowerCase().indexOf(term)<0&&d.category.toLowerCase().indexOf(term)<0)return false;if(cat.value&&d.category!==cat.value)return false;if(store.value&&d.store!==store.value)return false;if(pct(d)<min)return false;if(lows.checked&&!d.low)return false;return true;});if(sort.value==='save')list.sort(function(a,b){return save(b)-save(a);});else if(sort.value==='low')list.sort(function(a,b){return a.sale-b.sale;});else if(sort.value==='high')list.sort(function(a,b){return b.sale-a.sale;});else list.sort(function(a,b){return pct(b)-pct(a);});grid.innerHTML=list.length?list.map(card).join('\\n'):'<p class=\"empty\">No deals match those filters. Loosen one and try again.</p>';count.innerHTML='<b>'+list.length+'</b> of '+DEALS.length+' deals shown';}",
    "function clearFilters(){q.value='';cat.value='';store.value='';disc.value='0';sort.value='off';lows.checked=false;render();q.focus();}",
    "reset.addEventListener('click',clearFilters);",
    "[q,cat,store,disc,sort,lows].forEach(function(el){el.addEventListener('input',render);el.addEventListener('change',render);});",
    "render();",
    "",
  ].join("\n");
}

function buildDossier(): string {
  const lines: string[] = [];
  lines.push("# TrueLow — dossier");
  lines.push("");
  lines.push("36 real Black Friday / Cyber Monday 2026 deals. Every price was checked on 27 Nov 2026 against a store announcement, a store Black Friday page, or a deal roundup naming the store and the price.");
  lines.push("");
  lines.push("## Verdict scale");
  lines.push("");
  lines.push("NEW LOW: lowest price tracked for the product. STRONG DEAL: 25% or more off. SOLID DEAL: 15-24% off. ROUTINE DEAL: under 15% off.");
  lines.push("");
  lines.push("## Deals");
  lines.push("");
  lines.push("| # | Product | Store | Category | Sale | Usual | Off | Verdict | Source |");
  lines.push("|---|---|---|---|---|---|---|---|---|");
  for (const d of DEALS) {
    lines.push("| " + d.id + " | " + d.product + " | " + d.store + " | " + d.category + " | " + money(d.sale) + " | " + money(d.was) + " | " + pct(d) + "% | " + verdict(d).label + " | " + d.source + " |");
  }
  lines.push("");
  lines.push("## Method");
  lines.push("");
  lines.push("Prices were gathered from published deal roundups and store releases dated 9-26 Nov 2026 and re-checked on 27 Nov 2026. No price was invented: every sale price and usual price above appears in the named source. Store links point at the store's own search for the exact product, so the listing can be verified there. Prices change during sale week; the site tells shoppers to confirm on the store page before paying.");
  lines.push("");
  lines.push("## Sources");
  lines.push("");
  lines.push("- 9to5Toys, Amazon 2026 Black Friday Week day 2/4/5/6 (20-24 Nov 2026)");
  lines.push("- Best Buy Black Friday release (17 Nov 2026) via NewsUnc store-by-store roundup (21 Nov 2026)");
  lines.push("- Product Bible, Amazon Black Friday Deals 2026 (19 Nov 2026)");
  lines.push("- CNN Underscored, best Black Friday deals (23 Nov 2026)");
  lines.push("- The Tech Hacker, Black Friday 2026 tech deals live now (9 Nov 2026)");
  lines.push("- NewsUnc, Black Friday 2026 top deals store by store (21 Nov 2026)");
  lines.push("- Walmart Black Friday 2026 main event walkthrough (26 Nov 2026)");
  lines.push("- Costco Buzz Black Friday tour (24 Nov 2026)");
  lines.push("- Nintendo Black Friday announcement via Dealizard (15 Nov 2026)");
  lines.push("");
  return lines.join("\n");
}

function main(): void {
  validateDeals();
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  const appDir = join(outDir, "app");
  mkdirSync(appDir, { recursive: true });
  const html = buildHtml();
  const css = CSS + "\n";
  const js = buildJs();
  const json = JSON.stringify({ checked: CHECKED, checkedLabel: CHECKED_LABEL, deals: DEALS }, null, 2) + "\n";
  const dossier = buildDossier();
  const targets = outDir.endsWith("app") ? [outDir] : [outDir, appDir];
  for (const dir of targets) {
    writeFileSync(join(dir, "index.html"), html);
    writeFileSync(join(dir, "styles.css"), css);
    writeFileSync(join(dir, "app.js"), js);
    writeFileSync(join(dir, "deals.json"), json);
    writeFileSync(join(dir, "dossier.md"), dossier);
  }
  const newLows = DEALS.filter((d) => d.low).length;
  console.log("TrueLow: " + DEALS.length + " deals, " + newLows + " new lows, 5 stores, written to " + outDir);
}

main();
