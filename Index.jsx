<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Zlomková zoo – Zvídavě.cz</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Baloo 2',sans-serif;background:#F0FDF8;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px 16px}
button{font-family:inherit;cursor:pointer;transition:transform .1s}
button:active:not(:disabled){transform:scale(.96)}
button:disabled{cursor:not-allowed;opacity:.6}
#app{width:100%;max-width:500px;display:flex;flex-direction:column;align-items:center;gap:14px}
.header{text-align:center;margin-bottom:8px}
.header h1{font-size:28px;font-weight:800;color:#0E1F2B}
.header p{color:#6B7280;font-size:13px;margin-top:3px}
/* Menu grid */
.env-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}
.env-btn{background:#fff;border-radius:14px;padding:13px 11px;border:2px solid #E2EBF0;text-align:left;display:flex;flex-direction:column;gap:3px;transition:transform .15s,box-shadow .15s;min-height:44px}
.env-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.08)}
.env-btn .icon{font-size:24px}
.env-btn .name{font-size:13px;font-weight:700;color:#0E1F2B}
.env-btn .desc{font-size:11px;color:#9CA3AF;font-weight:400}
/* Stats bar */
.stats-bar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-radius:14px;border:1.5px solid #E2EBF0;background:#F9FAFB;width:100%;font-size:13px;color:#6B7280}
.stats-name{font-weight:800;font-size:14px}
/* Progress dots */
.dots{display:flex;gap:4px;justify-content:center;flex-wrap:wrap}
.dot{width:22px;height:22px;border-radius:50%;border:2px solid #E2EBF0;background:#E2EBF0;display:flex;align-items:center;justify-content:center;font-size:10px;transition:background .3s}
.dot.done{background:#22C55E;border-color:#22C55E;color:#fff}
/* Progress bar */
.progress-track{width:100%;height:6px;background:#E2EBF0;border-radius:4px;overflow:hidden}
.progress-fill{height:100%;border-radius:4px;transition:width .4s;background:#22C55E}
/* Question card */
.q-card{background:#fff;border-radius:18px;padding:22px 18px;border:1.5px solid #E2EBF0;box-shadow:0 4px 20px rgba(0,0,0,.06);width:100%;display:flex;flex-direction:column;align-items:center;gap:16px}
/* Feedback bubble */
.bubble-wrap{display:flex;align-items:flex-end;gap:10px;width:100%;animation:fadeIn .25s ease}
.bubble-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:2px solid #E2EBF0;background:#F9FAFB}
.bubble-msg{flex:1;border-radius:18px 18px 18px 4px;padding:11px 15px;font-size:14px;line-height:1.55;border:1.5px solid #E2EBF0;background:#fff;min-height:52px;color:#6B7280}
.bubble-msg.active{background:#fff;border-color:inherit}
.bubble-label{font-style:italic;font-size:12px;color:#9CA3AF;margin-bottom:3px}
/* Buttons */
.btn-primary{border:none;border-radius:28px;padding:11px 30px;font-size:15px;font-weight:700;min-height:44px;color:#fff}
.btn-outline{border-radius:28px;padding:10px 28px;font-size:15px;font-weight:700;min-height:44px;background:#fff}
.btn-ghost{background:transparent;border:1.5px solid #E2EBF0;border-radius:20px;color:#9CA3AF;font-size:13px;min-height:44px;padding:0 16px;display:block;width:100%;max-width:180px;margin:0 auto}
.btn-retry{border-radius:28px;padding:9px 22px;font-size:14px;font-weight:700;min-height:44px;background:#fff;margin-top:10px}
/* SVG clickable */
svg path,svg rect,svg g{cursor:pointer}
/* Result */
.result-card{text-align:center;width:100%;display:flex;flex-direction:column;align-items:center;gap:16px}
.result-guide-bubble{display:flex;align-items:flex-end;gap:10px;width:100%;max-width:380px;text-align:left}
/* Fraction display */
.frac{display:inline-flex;flex-direction:column;align-items:center;font-weight:800;line-height:1.1;vertical-align:middle;margin:0 3px}
.frac-bar{width:100%;height:2px;border-radius:1px;margin:1px 0}
/* Instruction */
.instr{font-size:18px;color:#555;text-align:center;font-weight:600}
.instr strong{font-weight:800}
/* Selected count */
.sel-count{font-size:13px;color:#9CA3AF}
/* Stepper (zoo2 style) */
.stepper{display:inline-flex;flex-direction:column;align-items:center;gap:4px}
.stepper-row{display:flex;align-items:center;gap:8px}
.stepper-num{font-size:32px;font-weight:800;min-width:44px;text-align:center;color:#0E1F2B}
.stepper-btn{width:44px;height:44px;border-radius:50%;font-size:20px;font-weight:700;background:#fff}
.stepper-bar{width:110px;height:3px;background:#0E1F2B;border-radius:2px}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
</style>
</head>
<body>
<div id="app"></div>
<script>
// ─── Palety ───────────────────────────────────────────────────────────────────
const PAL=[
  {p:"#FF5733",s:"#FF8C66",soft:"#FFD6CB",bg:"#FFF4F1",m:"#CC3A1A"},
  {p:"#0094C6",s:"#00C9F0",soft:"#B3EEF9",bg:"#EDFBFF",m:"#006F94"},
  {p:"#8B00CC",s:"#CC66FF",soft:"#ECC6FF",bg:"#F9EEFF",m:"#6600AA"},
  {p:"#00A86B",s:"#2DDD99",soft:"#A3F5D8",bg:"#EDFFF7",m:"#007A4D"},
  {p:"#FF9900",s:"#FFCC00",soft:"#FFF0A3",bg:"#FFFCE8",m:"#CC7700"},
  {p:"#00B4A0",s:"#00E5CC",soft:"#A3F5EE",bg:"#EDFFFE",m:"#007A6E"},
  {p:"#FF2D8A",s:"#FF70B8",soft:"#FFB8DE",bg:"#FFF0F7",m:"#CC1A6A"},
  {p:"#6200EE",s:"#9C55FF",soft:"#DDB8FF",bg:"#F4EEFF",m:"#4A00BB"},
  {p:"#0055FF",s:"#3390FF",soft:"#AACCFF",bg:"#EEF4FF",m:"#003DBB"},
  {p:"#FF3333",s:"#FF7777",soft:"#FFB8B8",bg:"#FFF0F0",m:"#CC1111"},
  {p:"#CC6600",s:"#FF9933",soft:"#FFD9A3",bg:"#FFF5E8",m:"#994D00"},
  {p:"#1A7A4A",s:"#2ECC71",soft:"#A9F5C8",bg:"#EDFFF5",m:"#145C37"},
];

// ─── Průvodci ─────────────────────────────────────────────────────────────────
const GUIDES=[
  {e:"🦊",n:"Liška",
   c:["Čitatel říká kolik, jmenovatel kolik celkem – sedělo to. Všimla ses toho hned?","Výseče jsou stejně velké. Spočítal/a jsi nejdřív všechny, nebo rovnou správné?","Koláč rozdělený na {d} dílů – vybral/a jsi přesně {n}. Jak sis to rozdělil/a?"],
   r:["Co tě k té volbě vedlo?","Jak jsi přemýšlel/a o jmenovateli?","Kde jsi si nebyl/a jistý/á?"]},
  {e:"🐣",n:"Kuřátko",
   c:["Na ose od 0 do 1 jsi to umístil/a přesně. Jak sis to rozdělil/a v hlavě?","Jmenovatel {d} říká, na kolik dílů osu rozdělit. Viděl/a jsi to?","Trefil/a jsi to. Počítal/a jsi od nuly, nebo odhadoval/a?"],
   r:["Kde jsi čekal/a, že to číslo bude?","Co bylo těžké na odhadu polohy?","Jak sis představoval/a vzdálenost od nuly?"]},
  {e:"🐸",n:"Žabák",
   c:["Ty dva zlomky mají různé jmenovatele. Jak jsi je porovnal/a?","Vizualizace pomáhá – kelímky to ukázaly. Viděl/a jsi výšku hladiny?","Porovnání zlomků s různými jmenovateli – jak jsi postupoval/a?"],
   r:["Jak jsi se rozhodoval/a mezi těmi dvěma zlomky?","Co tě zmátlo?","Kdy ti přijde porovnávání těžké?"]},
  {e:"🐼",n:"Panda",
   c:["Políček je celkem {total} a ty jsi vybral/a přesně {n}. Jak jsi počítal/a?","Jmenovatel = celkový počet políček, čitatel = kolik vybarvit. Sedělo to.","Šel/šla jsi po řádcích?"],
   r:["Jak jsi počítal/a políčka?","Co bylo matoucí?","Jak jsi věděl/a, kdy přestat vybarvovat?"]},
  {e:"🦄",n:"Jednorožec",
   c:["Pásek rozdělený na {d} dílů, vybráno {n} – postup byl vidět.","Zlomek říká, jakou část pásku vyplnit. Pomohla ti čísla na dílcích?","Čitatel {n} a jmenovatel {d} – přeložil/a jsi to na konkrétní díly."],
   r:["Jak jsi přemýšlel/a o délce vybarveného úseku?","Co tě zastavilo?","Kde jsi si nebyl/a jistý/á?"]},
  {e:"🦁",n:"Lev",
   c:["V domě je {total} bytů a ty jsi vybral/a přesně {n}. Jak jsi to spočítal/a?","Nejdřív celkový počet bytů, pak správný díl. Šlo to vidět na mřížce.","Byty v domě jako diskrétní model – tady to fungovalo."],
   r:["Jak jsi přemýšlel/a o počtu bytů?","Co bylo matoucí?","Spočítal/a jsi nejdřív všechny?"]},
  {e:"🦊",n:"Liška",
   c:["Ciferník má {d} výsečí a ty jsi vybral/a {n}. Pomohly ti hodinové značky?","Kruhový model funguje stejně jako koláč. Viděl/a jsi tu podobnost?","Hodiny rozdělené na {d} dílů – jak jsi to vizualizoval/a?"],
   r:["Jak jsi viděl/a výseče na ciferníku?","Co bylo jinak než u koláče?","Kde jsi se ztratil/a?"]},
  {e:"🐣",n:"Kuřátko",
   c:["Ze skupiny {d} předmětů jsi vybral/a přesně {n}. Počítal/a jsi popořadě?","Každý předmět je jedna jednotka – tady to fungovalo.","Zlomek {n}/{d} ze skupiny předmětů – jak jsi postupoval/a?"],
   r:["Jak jsi vybíral/a – po jednom?","Co tě vedlo k tomuhle počtu?","Kde ti to nedávalo smysl?"]},
  {e:"🐸",n:"Žabák",
   c:["Sklenice má {d} stejné díly a ty jsi trefil/a {n}. Jak jsi odhadoval/a výšku?","Kontinuální model – odhad podílu výšky. Fungoval.","Hladina na {n}/{d} sklenice – trefil/a jsi to."],
   r:["Jak jsi odhadoval/a výšku hladiny?","Co bylo těžké?","Proč jsi zastavil/a tam kde jsi?"]},
  {e:"🦁",n:"Lev",
   c:["Rtuť sahá přesně na {n}/{d}. Jak jsi věděl/a, kde je ta hranice?","Stupnice od 0 do 1 – jmenovatel říká na kolik dílů. Viděl/a jsi to?","Teploměr jako lineární model zlomku – trefil/a jsi {n}/{d}."],
   r:["Jak jsi hledal/a správnou polohu?","Co tě zmátlo na stupnici?","Kde jsi si nebyl/a jistý/á?"]},
  {e:"🐼",n:"Panda",
   c:["Odměřil/a jsi {n} ze {d} {u}. Pomohl ti vizuální počet v misce?","Recept říká zlomek – přeložil/a jsi ho na konkrétní množství.","Zlomek {n}/{d} přeložený na {u} – funguje."],
   r:["Jak jsi přeložil/a zlomek na počet?","Co bylo nejasné?","Jak přemýšlíš o zlomku jako množství?"]},
  {e:"🦄",n:"Jednorožec",
   c:["Schodiště má {d} schodů a ty jsi označil/a {n}. Jak jsi to poznal/a?","Šel/šla jsi schodiště odspodu nebo jinak? Postup byl jasný.","Zlomek {n}/{d} na schodišti – správně."],
   r:["Jak jsi počítal/a schody?","Kde jsi se zastavil/a a proč?","Co bylo jinak než čekáš?"]},
];

function fmtGuide(msg,q){
  return msg
    .replace(/\{n\}/g,q.numerator??'')
    .replace(/\{d\}/g,q.denominator??'')
    .replace(/\{total\}/g,q.rows&&q.cols?q.rows*q.cols:q.floors&&q.flatsPerFloor?q.floors*q.flatsPerFloor:q.denominator??'')
    .replace(/\{u\}/g,q.ingredient?.unitGen??'');
}
function randMsg(arr,q){return fmtGuide(arr[Math.floor(Math.random()*arr.length)],q);}
function readTime(msg){return Math.min(6000,Math.max(2200,(msg||'').split(/\s+/).length*260));}

// ─── Utility ──────────────────────────────────────────────────────────────────
const DENOMS=[2,3,4,5,6,8,10];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function gcd(a,b){return b===0?a:gcd(b,a%b);}
function simplify(n,d){const g=gcd(Math.abs(n),d);return{n:n/g,d:d/g};}

// ─── Pool generátory ──────────────────────────────────────────────────────────
function poolSimple(){const p=[];for(const d of DENOMS)for(let n=1;n<d;n++)p.push({numerator:n,denominator:d});while(p.length<60)p.push({...p[Math.floor(Math.random()*p.length)]});return shuffle(p);}
function poolCompare(){const p=[];for(const d1 of DENOMS)for(let n1=1;n1<d1;n1++)for(const d2 of DENOMS)for(let n2=1;n2<d2;n2++)if(!(n1===n2&&d1===d2))p.push({fractionA:[n1,d1],fractionB:[n2,d2]});return shuffle(p).slice(0,80);}
function poolGrid(){const c=[[2,2],[2,3],[2,4],[3,3],[2,5],[3,4],[4,4]],p=[];for(const[rows,cols]of c){const t=rows*cols;for(let n=1;n<t;n++)p.push({rows,cols,numerator:n,denominator:t});}while(p.length<60)p.push({...p[Math.floor(Math.random()*p.length)]});return shuffle(p);}
function poolApartmany(){const c=[[2,2],[2,3],[3,2],[2,4],[4,2],[3,3]],p=[];for(const[f,fp]of c){const t=f*fp;for(let n=1;n<t;n++)p.push({floors:f,flatsPerFloor:fp,numerator:n,denominator:t});}while(p.length<60)p.push({...p[Math.floor(Math.random()*p.length)]});return shuffle(p);}
function poolHodiny(){const p=[];for(const d of[2,3,4,6,12])for(let n=1;n<d;n++)p.push({numerator:n,denominator:d});while(p.length<60)p.push({...p[Math.floor(Math.random()*p.length)]});return shuffle(p);}
const ICONS=["🍎","🍋","🐟","⭐","🌸","🎈","🦋","🍄","🐠","🌻"];
function poolSkupinka(){const p=[];for(const d of[3,4,5,6,8,10])for(let n=1;n<d;n++)for(const icon of ICONS)p.push({numerator:n,denominator:d,icon});return shuffle(p).slice(0,100);}
function poolSchodiste(){const p=[];for(const d of[4,5,6,7,8,10])for(let n=1;n<d;n++)p.push({numerator:n,denominator:d});while(p.length<60)p.push({...p[Math.floor(Math.random()*p.length)]});return shuffle(p);}
const RECIPE_ITEMS=[{label:"mouky",emoji:"🌾",unitGen:"hrnků"},{label:"cukru",emoji:"🍬",unitGen:"lžic"},{label:"másla",emoji:"🧈",unitGen:"kostek"},{label:"vajec",emoji:"🥚",unitGen:"kusů"},{label:"mléka",emoji:"🥛",unitGen:"dcl"},{label:"kakaa",emoji:"🍫",unitGen:"lžiček"}];
function poolRecept(){const p=[];for(const d of[2,3,4,5,6])for(let n=1;n<d;n++)for(const ing of RECIPE_ITEMS)p.push({numerator:n,denominator:d,ingredient:ing});while(p.length<60)p.push({...p[Math.floor(Math.random()*p.length)]});return shuffle(p);}

// ─── Prostředí ────────────────────────────────────────────────────────────────
const ENVS=[
  {name:"🍕 Koláč",     desc:"Rozkrájej koláč a sněz správný kousek!",   pool:poolSimple,    type:"pizza"},
  {name:"📏 Číselná osa",desc:"Přesuň kolečko na správné místo na ose.",  pool:poolSimple,    type:"line"},
  {name:"⚖️ Porovnávání",desc:"Který kelímek je plnější? Dej znaménko!",  pool:poolCompare,   type:"compare"},
  {name:"🟧 Čtvercová síť",desc:"Vybarvi správný počet políček.",          pool:poolGrid,      type:"grid"},
  {name:"📐 Pásek",      desc:"Vybarvi správnou část barevného pásku.",    pool:poolSimple,    type:"strip"},
  {name:"🏠 Apartmány",  desc:"Rozsviť světla ve správném počtu bytů!",   pool:poolApartmany, type:"apart"},
  {name:"🕐 Hodiny",     desc:"Vybarvi správnou výseč ciferníku hodin.",   pool:poolHodiny,    type:"clock"},
  {name:"🐠 Skupinka",   desc:"Vyber správný počet předmětů ze skupiny.",  pool:poolSkupinka,  type:"group"},
  {name:"🫙 Sklenice",   desc:"Nalij do sklenice přesně tolik, kolik má!", pool:poolSimple,    type:"jar"},
  {name:"🌡️ Teploměr",  desc:"Nastav rtuť na správnou teplotu na škále.", pool:poolSimple,    type:"thermo"},
  {name:"🍳 Recept",     desc:"Odměř správné množství přísad do mísy.",    pool:poolRecept,    type:"recipe"},
  {name:"🪜 Schodiště",  desc:"Vylez po schodech přesně tak vysoko!",      pool:poolSchodiste, type:"stairs"},
];

// ─── SVG helpers ──────────────────────────────────────────────────────────────
function sectorPath(i,d,cx,cy,r){
  const sa=360/d,s=(i*sa-90)*Math.PI/180,e=((i+1)*sa-90)*Math.PI/180;
  const x1=cx+r*Math.cos(s),y1=cy+r*Math.sin(s),x2=cx+r*Math.cos(e),y2=cy+r*Math.sin(e);
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${sa>180?1:0} 1 ${x2},${y2} Z`;
}

// ─── Game state ───────────────────────────────────────────────────────────────
const S={
  phase:'menu',   // menu | playing | result
  envIdx:0,
  q:null,         // current question
  pool:[],        // remaining questions
  total:0,        // answered
  score:0,        // correct
  feedback:null,  // {msg, guide, retry}
  retryKey:0,
  // env-specific state (reset on new question)
  sel:null,       // Set or array or scalar
  placed:false,
  dragVal:0.5,
  done:false,
};

let _autoTimer=null;

function setState(patch){Object.assign(S,patch);render();}

function startGame(idx){
  clearTimeout(_autoTimer);
  const fullPool=ENVS[idx].pool();
  shuffle(fullPool);
  const offset=Math.floor(Math.random()*Math.max(1,fullPool.length-10));
  const q=fullPool.slice(offset,offset+10);
  Object.assign(S,{
    phase:'playing',envIdx:idx,
    q:q[0],pool:q.slice(1),
    total:0,score:0,feedback:null,retryKey:0,
    sel:null,placed:false,dragVal:0.5,done:false
  });
  render();
}

function nextQ(pool){
  if(!pool.length)return;
  Object.assign(S,{q:pool[0],pool:pool.slice(1),feedback:null,sel:null,placed:false,dragVal:0.5,done:false,retryKey:S.retryKey+1});
  render();
}

function handleAnswer(correct){
  S.total++;
  const g=GUIDES[S.envIdx];
  if(correct){
    S.score++;
    const msg=randMsg(g.c,S.q);
    S.feedback={msg,guide:g,retry:false};
    S.done=true;
    const delay=readTime(msg);
    if(S.total>=10){_autoTimer=setTimeout(()=>{S.phase='result';render();},delay);}
    else{const pool=S.pool;_autoTimer=setTimeout(()=>nextQ(pool),delay);}
  } else {
    const msg=randMsg(g.r,S.q);
    S.feedback={msg,guide:g,retry:true};
    S.done=true;
  }
  render();
  // scroll to bubble
  const b=document.getElementById('bubble');
  if(b)b.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function retry(){
  S.total--;
  S.feedback=null;
  S.done=false;
  S.sel=null;
  S.placed=false;
  S.dragVal=0.5;
  S.retryKey++;
  render();
}

// ─── Env renderers ────────────────────────────────────────────────────────────
function renderEnv(){
  const t=ENVS[S.envIdx].type;
  const q=S.q;
  const c=PAL[S.envIdx];
  if(!q)return'';
  const {numerator:n,denominator:d}=q;

  if(t==='pizza')   return renderPizza(q,c);
  if(t==='line')    return renderLine(q,c);
  if(t==='compare') return renderCompare(q,c);
  if(t==='grid')    return renderGrid(q,c);
  if(t==='strip')   return renderStrip(q,c);
  if(t==='apart')   return renderApart(q,c);
  if(t==='clock')   return renderClock(q,c);
  if(t==='group')   return renderGroup(q,c);
  if(t==='jar')     return renderJar(q,c);
  if(t==='thermo')  return renderThermo(q,c);
  if(t==='recipe')  return renderRecipe(q,c);
  if(t==='stairs')  return renderStairs(q,c);
  return '';
}

// ── PIZZA ──
function renderPizza(q,c){
  const{numerator:n,denominator:d}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel;
  const paths=Array.from({length:d}).map((_,i)=>{
    const fill=sel.has(i)?c.s:c.soft;
    return `<path data-idx="${i}" d="${sectorPath(i,d,120,120,100)}" fill="${fill}" stroke="${c.p}" stroke-width="2" class="${S.done?'':'clickable'}"/>`;
  }).join('');
  return `
    <p class="instr">Vybarvi <strong style="color:${c.p}">${n}/${d}</strong> dílu koláče.</p>
    <svg width="240" height="240" viewBox="0 0 240 240" id="pizza-svg">
      ${paths}
      <circle cx="120" cy="120" r="100" fill="none" stroke="${c.p}" stroke-width="3"/>
    </svg>
    <p class="sel-count">Vybráno: <strong>${sel.size}</strong> z ${d}</p>
    ${btnCheck(c,S.done||sel.size===0,'pizza-check')}`;
}

// ── LINE ──
function renderLine(q,c){
  const{numerator:n,denominator:d}=q;
  const pos=S.dragVal;
  const PAD=40,W=320,H=130,LY=68,TL=W-PAD*2;
  const toX=p=>PAD+p*TL;
  const hx=toX(pos),cx2=toX(n/d);
  const ok=Math.abs(pos-n/d)<=0.5/d;
  const trackFill=S.done?(ok?'#22C55E':'#EF4444'):c.s;
  const hintLines=S.lineHint?Array.from({length:d-1}).map((_,i)=>
    `<line x1="${toX((i+1)/d)}" y1="${LY-7}" x2="${toX((i+1)/d)}" y2="${LY+7}" stroke="${c.p}" stroke-width="1.5" stroke-dasharray="3,2"/>`
  ).join(''):'';
  return `
    <p class="instr">Umísti <strong style="color:${c.p};font-size:22px">${n}/${d}</strong> na číselnou osu.</p>
    <div style="font-size:12px;color:${c.m};background:${c.soft};border-radius:8px;padding:4px 12px;border:1px solid ${c.s}">💭 Žádné pomůcky – jen tvoje hlava a osa od 0 do 1</div>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" id="line-svg" style="width:100%;max-width:${W}px;overflow:visible;touch-action:none;cursor:${S.done?'default':'pointer'}">
      <rect x="${PAD}" y="${LY-4}" width="${TL}" height="8" rx="4" fill="${c.soft}"/>
      <rect x="${PAD}" y="${LY-4}" width="${Math.max(0,hx-PAD)}" height="8" rx="4" fill="${trackFill}"/>
      <polygon points="${PAD-4},${LY} ${PAD-14},${LY-6} ${PAD-14},${LY+6}" fill="#0E1F2B"/>
      <polygon points="${PAD+TL+4},${LY} ${PAD+TL+14},${LY-6} ${PAD+TL+14},${LY+6}" fill="#0E1F2B"/>
      ${[0,1].map(v=>`<line x1="${toX(v)}" y1="${LY-12}" x2="${toX(v)}" y2="${LY+12}" stroke="#0E1F2B" stroke-width="2.5"/>
        <text x="${toX(v)}" y="${LY+28}" text-anchor="middle" font-size="14" font-weight="bold" fill="#0E1F2B" font-family="inherit">${v}</text>`).join('')}
      ${hintLines}
      ${S.done?`<line x1="${cx2}" y1="${LY-24}" x2="${cx2}" y2="${LY+24}" stroke="#22C55E" stroke-width="2.5" stroke-dasharray="4,3"/>
        <circle cx="${cx2}" cy="${LY-28}" r="14" fill="#22C55E"/>
        <text x="${cx2}" y="${LY-23}" text-anchor="middle" font-size="11" fill="white" font-family="inherit" font-weight="bold">${n}/${d}</text>`:''}
      ${!S.done?`<circle id="line-handle" cx="${hx}" cy="${LY}" r="18" fill="${S.placed?c.s:'#DDD'}" stroke="${S.placed?c.p:'#AAA'}" stroke-width="3" style="cursor:grab;filter:drop-shadow(0 2px 6px rgba(0,0,0,.2))"/>
        <text x="${hx}" y="${LY+6}" text-anchor="middle" font-size="18" fill="${S.placed?'#0E1F2B':'#AAA'}" font-family="inherit" font-weight="bold" style="pointer-events:none">${S.placed?'•':'?'}</text>`:''}
    </svg>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
      ${!S.done?`<button class="btn-outline" id="line-hint" style="border-color:${c.p};color:${c.p};border-radius:20px;padding:8px 16px;font-size:13px;min-height:44px">${S.lineHint?'🔍 Skrýt':'💡 Nápověda'}</button>`:''}
      ${btnCheck(c,S.done||!S.placed,'line-check')}
    </div>`;
}

// ── COMPARE ──
function renderCompare(q,c){
  const{fractionA:fa,fractionB:fb}=q;
  const vA=fa[0]/fa[1],vB=fb[0]/fb[1];
  const correct=vA>vB?'>':vA<vB?'<':'=';
  const sel=S.sel;
  const cup=(frac,label)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">
    <div style="font-size:22px;font-weight:800;color:#0E1F2B">${frac[0]}/${frac[1]}</div>
    <div style="width:56px;height:130px;background:${c.soft};border-radius:8px;border:2px solid ${c.s};position:relative;overflow:hidden">
      <div style="position:absolute;bottom:0;width:100%;height:${frac[0]/frac[1]*100}%;background:${c.p}"></div>
    </div>
  </div>`;
  return `
    <p class="instr">Doplň správné znaménko mezi zlomky.</p>
    <div style="display:flex;gap:18px;align-items:center">
      ${cup(fa)} 
      <div style="display:flex;flex-direction:column;gap:8px">
        ${['>','=','<'].map(sym=>`<button class="sym-btn" data-sym="${sym}" style="width:48px;height:48px;border-radius:50%;border:2.5px solid ${sel===sym?c.p:c.soft};background:${sel===sym?c.s:'#fff'};font-size:22px;font-weight:bold;color:#0E1F2B;min-height:44px">${sym}</button>`).join('')}
      </div>
      ${cup(fb)}
    </div>
    ${btnCheck(c,S.done||!sel,'compare-check')}`;
}

// ── GRID ──
function renderGrid(q,c){
  const{rows,cols,numerator:n,denominator:d}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel,total=rows*cols;
  const cells=Array.from({length:total}).map((_,i)=>{
    const on=sel.has(i);
    return `<div data-idx="${i}" style="width:42px;height:42px;border-radius:7px;background:${on?c.s:c.soft};border:2px solid ${on?c.p:c.s};cursor:${S.done?'default':'pointer'};transition:all .15s"></div>`;
  }).join('');
  return `
    <p class="instr">Vybarvi <strong style="color:${c.p}">${n}/${d}</strong> políček.</p>
    <div id="grid-wrap" style="display:grid;grid-template-columns:repeat(${cols},42px);gap:4px">${cells}</div>
    <p class="sel-count">Vybráno: <strong>${sel.size}</strong> z ${total}</p>
    ${btnCheck(c,S.done||sel.size===0,'grid-check')}`;
}

// ── STRIP ──
function renderStrip(q,c){
  const{numerator:n,denominator:d}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel;
  const W=300,H=70,sw=W/d;
  const rects=Array.from({length:d}).map((_,i)=>{
    const on=sel.has(i);
    return `<g data-idx="${i}" class="strip-seg" style="cursor:${S.done?'default':'pointer'}">
      <rect x="${i*sw}" y="8" width="${sw}" height="${H-16}" fill="${on?c.s:c.soft}"/>
      <rect x="${i*sw}" y="8" width="${sw}" height="${H-16}" fill="none" stroke="${c.p}" stroke-width="1.5" style="pointer-events:none"/>
      ${d<=10?`<text x="${i*sw+sw/2}" y="${H/2+5}" text-anchor="middle" font-size="11" fill="${on?'#0E1F2B':c.m}" font-family="inherit" style="pointer-events:none">${i+1}</text>`:''}
    </g>`;
  }).join('');
  return `
    <p class="instr">Vybarvi <strong style="color:${c.p}">${n}/${d}</strong> pásku.</p>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" id="strip-svg">
      ${rects}
      <rect x="0" y="8" width="${W}" height="${H-16}" rx="8" fill="none" stroke="${c.p}" stroke-width="2.5" style="pointer-events:none"/>
    </svg>
    <p class="sel-count">Vybráno: <strong>${sel.size}</strong> z ${d}</p>
    ${btnCheck(c,S.done||sel.size===0,'strip-check')}`;
}

// ── APARTMENTS ──
function renderApart(q,c){
  const{numerator:n,denominator:d,floors,flatsPerFloor}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel,total=floors*flatsPerFloor;
  const cw=56,ch=48,g=5,bW=flatsPerFloor*(cw+g)+g,bH=floors*(ch+g)+g+32;
  const flats=[];
  for(let row=0;row<floors;row++)for(let col=0;col<flatsPerFloor;col++){
    const idx=row*flatsPerFloor+col;
    const x=g+col*(cw+g),y=32+g+row*(ch+g),on=sel.has(idx);
    flats.push(`<g data-idx="${idx}" class="flat-btn" style="cursor:${S.done?'default':'pointer'}">
      <rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="4" fill="${on?c.s:'white'}" stroke="${on?c.p:c.soft}" stroke-width="${on?2:1.5}"/>
      <rect x="${x+8}" y="${y+7}" width="13" height="16" rx="2" fill="${on?c.p:c.s}" style="pointer-events:none"/>
      <rect x="${x+35}" y="${y+7}" width="13" height="16" rx="2" fill="${on?c.p:c.s}" style="pointer-events:none"/>
      ${row===floors-1?`<rect x="${x+19}" y="${y+28}" width="18" height="16" rx="2" fill="${on?'#0E1F2B':c.m}" style="pointer-events:none"/>`:''}
    </g>`);
  }
  return `
    <p class="instr">Vybarvi <strong style="color:${c.p}">${n}/${d}</strong> bytů v domě.</p>
    <svg width="${bW}" height="${bH}" viewBox="0 0 ${bW} ${bH}">
      <polygon points="${bW/2},2 ${bW-6},30 6,30" fill="${c.p}"/>
      <rect x="0" y="27" width="${bW}" height="${bH-27}" fill="${c.soft}" rx="5"/>
      ${flats.join('')}
    </svg>
    <p class="sel-count">Vybráno: <strong>${sel.size}</strong> z ${total}</p>
    ${btnCheck(c,S.done||sel.size===0,'apart-check')}`;
}

// ── CLOCK ──
function renderClock(q,c){
  const{numerator:n,denominator:d}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel;
  const cx=130,cy=130,r=95;
  const sectors=Array.from({length:d}).map((_,i)=>{
    const on=sel.has(i);
    return `<path data-idx="${i}" d="${sectorPath(i,d,cx,cy,r)}" fill="${on?c.s:c.soft}" stroke="white" stroke-width="2" class="${S.done?'':'clickable'}"/>`;
  }).join('');
  const ticks=Array.from({length:12}).map((_,i)=>{
    const a=(i*30-90)*Math.PI/180;
    return `<line x1="${cx+100*Math.cos(a)}" y1="${cy+100*Math.sin(a)}" x2="${cx+(i%3===0?110:104)*Math.cos(a)}" y2="${cy+(i%3===0?110:104)*Math.sin(a)}" stroke="${c.m}" stroke-width="${i%3===0?2.5:1.5}"/>
      ${i%3===0?`<text x="${cx+118*Math.cos(a)}" y="${cy+118*Math.sin(a)+4}" text-anchor="middle" font-size="11" fill="${c.m}" font-family="inherit">${i===0?12:i}</text>`:''}`;
  }).join('');
  return `
    <p class="instr">Vybarvi <strong style="color:${c.p}">${n}/${d}</strong> ciferníku.</p>
    <svg width="260" height="260" viewBox="0 0 260 260" id="clock-svg">
      <circle cx="${cx}" cy="${cy}" r="118" fill="white" stroke="#DDD" stroke-width="1.5"/>
      ${sectors}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c.p}" stroke-width="3"/>
      ${ticks}
      <circle cx="${cx}" cy="${cy}" r="8" fill="${c.p}"/>
    </svg>
    <p class="sel-count">Vybráno: <strong>${sel.size}</strong> z ${d}</p>
    ${btnCheck(c,S.done||sel.size===0,'clock-check')}`;
}

// ── GROUP ──
function renderGroup(q,c){
  const{numerator:n,denominator:d,icon}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel;
  const cols=Math.min(d,5);
  const btns=Array.from({length:d}).map((_,i)=>{
    const on=sel.has(i);
    return `<button data-idx="${i}" class="group-item" style="width:52px;height:52px;border-radius:12px;font-size:26px;background:${on?c.s:c.soft};border:2.5px solid ${on?c.p:c.s};transform:${on?'scale(1.1)':'scale(1)'};min-height:44px">${icon}</button>`;
  }).join('');
  return `
    <p class="instr">Vyber <strong style="color:${c.p}">${n}/${d}</strong> z těchto předmětů.</p>
    <div id="group-wrap" style="display:grid;grid-template-columns:repeat(${cols},52px);gap:8px">${btns}</div>
    <p class="sel-count">Vybráno: <strong>${sel.size}</strong> z ${d}</p>
    ${btnCheck(c,S.done||sel.size===0,'group-check')}`;
}

// ── JAR ──
function renderJar(q,c){
  const{numerator:n,denominator:d}=q;
  const fill=S.dragVal;
  const W=160,H=220,BOTT=30,TOP=20,innerH=H-BOTT-TOP;
  const waterY=H-BOTT-fill*innerH;
  const jarPath=`M30,${TOP} L20,${H-BOTT} Q${W/2},${H-5} ${W-20},${H-BOTT} L${W-30},${TOP} Z`;
  const fillColor=S.done?(Math.abs(fill-n/d)<=0.5/d?'#22C55E':'#EF4444'):c.s;
  return `
    <p class="instr">Naplň sklenici na <strong style="color:${c.p}">${n}/${d}</strong>.</p>
    <div style="display:flex;gap:16px;align-items:center">
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" id="jar-svg" style="overflow:visible;touch-action:none;cursor:${S.done?'default':'ns-resize'}">
        <path d="${jarPath}" fill="none" stroke="${c.p}" stroke-width="3" stroke-linejoin="round"/>
        <clipPath id="jClip"><path d="${jarPath}"/></clipPath>
        <rect x="0" y="${waterY}" width="${W}" height="${H}" clip-path="url(#jClip)" fill="${fillColor}" opacity="0.75"/>
        ${S.done?`<line x1="15" y1="${H-BOTT-n/d*innerH}" x2="${W-15}" y2="${H-BOTT-n/d*innerH}" stroke="#22C55E" stroke-width="2.5" stroke-dasharray="5,3"/>`:''}
        ${!S.done?`<line x1="25" y1="${waterY}" x2="${W-25}" y2="${waterY}" stroke="${c.p}" stroke-width="3"/>
          <circle id="jar-handle" cx="${W/2}" cy="${waterY}" r="10" fill="${S.placed?c.p:'#CCC'}" stroke="white" stroke-width="2" style="cursor:ns-resize"/>`:''}
        ${S.placed&&!S.done?`<rect x="${W/2-22}" y="${waterY-36}" width="44" height="22" rx="6" fill="${c.p}"/>
          <polygon points="${W/2-5},${waterY-14} ${W/2+5},${waterY-14} ${W/2},${waterY-8}" fill="${c.p}"/>
          <text x="${W/2}" y="${waterY-21}" text-anchor="middle" font-size="11" fill="white" font-family="inherit" font-weight="bold">${Math.round(fill*d)}/${d}</text>`:''}
      </svg>
      <div style="font-size:12px;color:${c.m};display:flex;flex-direction:column;justify-content:space-between;height:${innerH}px;padding-top:${TOP}px">
        <span>1</span><span>0</span>
      </div>
    </div>
    <div style="font-size:12px;color:${c.m}">Táhni nebo klikni na sklenici</div>
    ${btnCheck(c,S.done||!S.placed,'jar-check')}`;
}

// ── THERMO ──
function renderThermo(q,c){
  const{numerator:n,denominator:d}=q;
  const fill=S.dragVal;
  const W=80,H=260,BULB=24,TPAD=20,trackH=H-BULB*2-TPAD;
  const CX=W/2,TW=18;
  const merY=H-BULB-fill*trackH;
  const correctY=H-BULB-n/d*trackH;
  const merColor=S.done?(Math.abs(fill-n/d)<=0.5/d?'#22C55E':'#EF4444'):c.s;
  const ticks=Array.from({length:d+1}).map((_,i)=>{
    const y=H-BULB-i/d*trackH,isEnd=i===0||i===d;
    return `<line x1="${CX+TW/2}" y1="${y}" x2="${CX+TW/2+(isEnd?10:6)}" y2="${y}" stroke="${isEnd?c.p:c.m}" stroke-width="${isEnd?2:1.5}"/>
      ${isEnd?`<text x="${CX+TW/2+14}" y="${y+4}" font-size="12" font-weight="bold" fill="${c.p}" font-family="inherit">${i===0?'0':'1'}</text>`:''}`;
  }).join('');
  return `
    <p class="instr">Nastav teploměr na <strong style="color:${c.p}">${n}/${d}</strong>.</p>
    <div style="display:flex;gap:10px;align-items:flex-start">
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" id="thermo-svg" style="overflow:visible;touch-action:none;cursor:${S.done?'default':'ns-resize'}">
        <rect x="${CX-TW/2}" y="${TPAD}" width="${TW}" height="${trackH+BULB}" rx="${TW/2}" fill="${c.soft}"/>
        <clipPath id="tClip"><rect x="${CX-TW/2}" y="${TPAD}" width="${TW}" height="${trackH+BULB}" rx="${TW/2}"/></clipPath>
        <rect x="${CX-TW/2}" y="${merY}" width="${TW}" height="${H}" clip-path="url(#tClip)" fill="${merColor}"/>
        <circle cx="${CX}" cy="${H-BULB}" r="${BULB}" fill="${merColor}"/>
        <circle cx="${CX}" cy="${H-BULB}" r="${BULB}" fill="none" stroke="${c.p}" stroke-width="2.5"/>
        <rect x="${CX-TW/2}" y="${TPAD}" width="${TW}" height="${trackH}" rx="${TW/2}" fill="none" stroke="${c.p}" stroke-width="2.5"/>
        ${ticks}
        ${S.done?`<line x1="${CX-TW/2-4}" y1="${correctY}" x2="${CX+TW/2+4}" y2="${correctY}" stroke="#22C55E" stroke-width="2.5" stroke-dasharray="4,2"/>`:''}
        ${!S.done?`<circle id="thermo-handle" cx="${CX}" cy="${merY}" r="10" fill="${S.placed?c.p:'#CCC'}" stroke="white" stroke-width="2.5" style="cursor:ns-resize"/>`:''}
      </svg>
      <div style="padding-top:${TPAD}px;font-size:13px;color:${c.m};width:60px">
        ${S.placed&&!S.done?`<div style="background:${c.p};color:white;border-radius:8px;padding:3px 7px;font-size:12px;font-weight:700;text-align:center">${Math.round(fill*d)}/${d}</div>`:''}
      </div>
    </div>
    <div style="font-size:12px;color:${c.m}">Táhni rtuť nebo klikni na teploměr</div>
    ${btnCheck(c,S.done||!S.placed,'thermo-check')}`;
}

// ── RECIPE ──
function renderRecipe(q,c){
  const{numerator:n,denominator:d,ingredient:ing}=q;
  const sel=S.sel??0;
  const pct=sel/d;
  const W=220,H=160;
  const bL=18,bR=W-18,bTop=18,bBot=H-18,bW2=bR-bL,bH=bBot-bTop;
  const bowlPath=`M${bL},${bTop} L${bR},${bTop} Q${bR+8},${bTop+bH*.4} ${(bL+bR)/2},${bBot} Q${bL-8},${bTop+bH*.4} ${bL},${bTop} Z`;
  const fillY=bTop+bH*(1-pct);
  return `
    <p class="instr">Odměř <strong style="color:${c.p}">${n}/${d}</strong> ${ing.unitGen} ${ing.label} ${ing.emoji} do mísy.</p>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs><clipPath id="bowl"><path d="${bowlPath}"/></clipPath></defs>
      <path d="${bowlPath}" fill="${c.soft}"/>
      <rect x="0" y="${fillY}" width="${W}" height="${H-fillY}" fill="${c.s}" clip-path="url(#bowl)"/>
      <path d="${bowlPath}" fill="none" stroke="${c.p}" stroke-width="3" stroke-linejoin="round"/>
      <text x="${W/2}" y="${bTop+bH*.52+8}" text-anchor="middle" font-size="26" font-family="inherit">${ing.emoji}</text>
      <text x="${W/2}" y="${bTop+bH*.82}" text-anchor="middle" font-size="14" font-weight="bold" fill="${pct>.6?'white':c.p}" font-family="inherit">${sel}/${d}</text>
    </svg>
    <div style="display:flex;gap:16px;align-items:center">
      <button id="recipe-minus" style="width:44px;height:44px;border-radius:50%;font-size:22px;font-weight:bold;background:${sel>0?c.s:c.soft};color:#0E1F2B;border:2px solid ${c.p};min-height:44px" ${S.done||sel<=0?'disabled':''}>−</button>
      <div style="font-size:20px">${Array.from({length:d}).map((_,i)=>`<span style="opacity:${i<sel?1:.2}">${ing.emoji}</span>`).join('')}</div>
      <button id="recipe-plus"  style="width:44px;height:44px;border-radius:50%;font-size:22px;font-weight:bold;background:${sel<d?c.s:c.soft};color:#0E1F2B;border:2px solid ${c.p};min-height:44px" ${S.done||sel>=d?'disabled':''}>+</button>
    </div>
    ${btnCheck(c,S.done||sel===0,'recipe-check')}`;
}

// ── STAIRS ──
function renderStairs(q,c){
  const{numerator:n,denominator:d}=q;
  if(!S.sel)S.sel=new Set();
  const sel=S.sel;
  const SVG_W=280,SVG_H=200;
  const stepH=Math.min(36,Math.floor((SVG_H-20)/d));
  const stepW=Math.min(40,Math.floor((SVG_W-20)/d));
  const bX=10,bY=SVG_H-10;
  const steps=Array.from({length:d}).map((_,i)=>{
    const x=bX+i*stepW,y=bY-(i+1)*stepH,w=(d-i)*stepW,h=stepH;
    const on=sel.has(i);
    return `<g data-idx="${i}" class="stair-step" style="cursor:${S.done?'default':'pointer'}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${on?c.s:c.soft}" stroke="${c.p}" stroke-width="1.5"/>
      <text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" font-size="${Math.min(12,h*.55)}" fill="${on?'#0E1F2B':c.m}" font-family="inherit" font-weight="bold" style="pointer-events:none">${i+1}</text>
    </g>`;
  }).join('');
  // Frog on top step
  let frog='';
  if(sel.size>0){
    const top=Math.max(...sel);
    const x=bX+top*stepW,y=bY-(top+1)*stepH,w=(d-top)*stepW;
    const px=x+w-18,py=y-2;
    frog=`<g style="pointer-events:none">
      <ellipse cx="${px}" cy="${py-10}" rx="10" ry="9" fill="#2ECC71"/>
      <circle cx="${px-4}" cy="${py-17}" r="5" fill="#2ECC71"/>
      <circle cx="${px+4}" cy="${py-17}" r="5" fill="#2ECC71"/>
      <circle cx="${px-4}" cy="${py-17}" r="3" fill="white"/>
      <circle cx="${px+4}" cy="${py-17}" r="3" fill="white"/>
      <circle cx="${px-3}" cy="${py-17}" r="1.5" fill="#0E1F2B"/>
      <circle cx="${px+5}" cy="${py-17}" r="1.5" fill="#0E1F2B"/>
    </g>`;
  }
  return `
    <p class="instr">Označ <strong style="color:${c.p}">${n}/${d}</strong> schodů schodiště.</p>
    <svg width="${SVG_W}" height="${SVG_H}" viewBox="0 0 ${SVG_W} ${SVG_H}" id="stairs-svg">
      <line x1="${bX}" y1="${bY}" x2="${bX+d*stepW+10}" y2="${bY}" stroke="${c.m}" stroke-width="2"/>
      ${steps}${frog}
    </svg>
    <p class="sel-count">Označeno: <strong>${sel.size}</strong> z ${d} schodů</p>
    ${btnCheck(c,S.done||sel.size===0,'stairs-check')}`;
}

function btnCheck(c,disabled,id){
  return `<button id="${id}" class="btn-primary" style="background:${disabled?'#CBD5E1':c.p}" ${disabled?'disabled':''}>Zkontrolovat ✓</button>`;
}

// ─── Render ───────────────────────────────────────────────────────────────────
function render(){
  const app=document.getElementById('app');
  const c=PAL[S.envIdx];
  const g=GUIDES[S.envIdx];

  // Header
  let html=`<div class="header">
    <div style="font-size:42px;animation:bounce 2s infinite;display:inline-block">🦁</div>
    <h1>Zlomková zoo</h1>
    <p>Zkoumej zlomky. Průvodce je s tebou. 🌿</p>
  </div>`;

  if(S.phase==='menu'){
    html+=`<div class="env-grid">`;
    ENVS.forEach((e,i)=>{
      const ec=PAL[i];
      html+=`<button class="env-btn" data-env="${i}" style="background:${ec.bg};border-color:${ec.soft}">
        <span class="icon">${e.name.split(' ')[0]}</span>
        <span class="name" style="color:${ec.p}">${e.name.split(' ').slice(1).join(' ')}</span>
        <span class="desc">${e.desc}</span>
      </button>`;
    });
    html+=`</div>
    <div style="width:100%;padding:12px 16px;background:white;border-radius:14px;border:1.5px solid #E2EBF0">
      <div style="font-size:12px;color:#6B7280;margin-bottom:8px;font-weight:700">Průvodci prostředí:</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${GUIDES.map((g,i)=>`<div style="display:flex;align-items:center;gap:4px;padding:5px 10px;background:${PAL[i].bg};border-radius:20px;border:1.5px solid ${PAL[i].soft}">
          <span style="font-size:16px">${g.e}</span>
          <span style="font-size:11px;color:${PAL[i].p};font-weight:700">${ENVS[i].name.split(' ').slice(1).join(' ')}</span>
        </div>`).join('')}
      </div>
      <div style="font-size:11px;color:#9CA3AF;margin-top:8px">Průvodce komentuje postup, ne výsledek. Mluví vždy – při správné i špatné odpovědi.</div>
    </div>`;
  }

  if(S.phase==='playing'&&S.q){
    // Stats
    html+=`<div class="stats-bar" style="background:${c.bg};border-color:${c.soft}">
      <div>🌿</div>
      <div class="stats-name" style="color:${c.p}">${ENVS[S.envIdx].name.split(' ').slice(1).join(' ')}</div>
      <div>${S.total}/10 otázek</div>
    </div>`;
    // Progress dots
    html+=`<div class="dots">${Array.from({length:10}).map((_,i)=>`<div class="dot ${i<S.total?'done':''}" style="background:${i<S.total?c.s:c.soft};border-color:${i<S.total?c.p:c.s}"></div>`).join('')}</div>`;
    // Progress bar
    html+=`<div class="progress-track" style="background:${c.soft}"><div class="progress-fill" style="width:${S.total*10}%;background:${c.p}"></div></div>`;
    // Guide bubble
    const hasFb=!!S.feedback;
    html+=`<div class="bubble-wrap" id="bubble">
      <div class="bubble-avatar" style="border-color:${c.s};background:${c.soft}">${g.e}</div>
      <div class="bubble-msg ${hasFb?'active':''}" style="border-color:${hasFb?c.s:c.soft};background:${hasFb?'#fff':c.bg};color:${hasFb?'#0E1F2B':'#9CA3AF'}">
        ${hasFb
          ?`<div class="bubble-label">${g.n}:</div><div>„${S.feedback.msg}"</div>${S.feedback.retry?`<div><button class="btn-retry" id="retry-btn" style="color:${c.p};border:2px solid ${c.p}">Zkusit znovu ↩</button></div>`:''}`
          :`<span style="font-size:13px">${g.n} je tady s tebou.</span>`}
      </div>
    </div>`;
    // Question card
    html+=`<div class="q-card" style="box-shadow:0 4px 20px ${c.soft};border-color:${c.soft}" id="qcard-${S.retryKey}">
      ${renderEnv()}
    </div>`;
    // Back button
    html+=`<button class="btn-ghost" id="back-btn">← Zpět do menu</button>`;
  }

  if(S.phase==='result'){
    html+=`<div class="result-card">
      <div style="font-size:60px">${g.e}</div>
      <h2 style="font-size:26px;font-weight:800;color:#0E1F2B">Prozkoumávání dokončeno.</h2>
      <p style="color:#6B7280;font-size:15px">Prošel/a jsi všech 10 otázek.</p>
      <div class="dots">${Array.from({length:10}).map((_,i)=>`<div class="dot done" style="background:${c.s};border-color:${c.p}"></div>`).join('')}</div>
      <div class="result-guide-bubble">
        <div class="bubble-avatar" style="border-color:${c.s};background:${c.soft}">${g.e}</div>
        <div class="bubble-msg active" style="border-color:${c.s}">
          <div class="bubble-label">${g.n}:</div>
          <div>„Co z dnešního zkoumání si odnášíš? Co bylo překvapivé?"</div>
        </div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center">
        <button id="play-again" class="btn-primary" style="background:${c.p}">Zkoumat znovu 🔄</button>
        <button id="to-menu" class="btn-outline" style="border:2px solid ${c.p};color:${c.p}">Menu 🏠</button>
      </div>
    </div>`;
  }

  app.innerHTML=html;
  attachListeners();
}

// ─── Event listeners ──────────────────────────────────────────────────────────
function attachListeners(){
  const c=PAL[S.envIdx];
  const t=S.envIdx<ENVS.length?ENVS[S.envIdx].type:'';

  // Menu
  document.querySelectorAll('.env-btn').forEach(btn=>{
    btn.addEventListener('click',()=>startGame(+btn.dataset.env));
    btn.addEventListener('mouseenter',()=>{btn.style.boxShadow=`0 6px 16px ${PAL[+btn.dataset.env].soft}`;});
    btn.addEventListener('mouseleave',()=>{btn.style.boxShadow='';});
  });

  // Back / retry / result
  document.getElementById('back-btn')?.addEventListener('click',()=>{clearTimeout(_autoTimer);setState({phase:'menu'});});
  document.getElementById('retry-btn')?.addEventListener('click',()=>retry());
  document.getElementById('play-again')?.addEventListener('click',()=>startGame(S.envIdx));
  document.getElementById('to-menu')?.addEventListener('click',()=>setState({phase:'menu'}));

  if(S.phase!=='playing')return;

  // Pizza
  if(t==='pizza'){
    document.querySelectorAll('#pizza-svg path[data-idx]').forEach(el=>{
      el.addEventListener('click',()=>{
        if(S.done)return;
        const i=+el.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('pizza-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }

  // Line
  if(t==='line'){
    const svg=document.getElementById('line-svg');
    let dragging=false;
    const PAD=40,W=320,TL=W-PAD*2;
    const getPos=e=>{
      const r=svg.getBoundingClientRect();
      const cx=e.touches?e.touches[0].clientX:e.clientX;
      return Math.max(0,Math.min(1,(cx-r.left)*(W/r.width)-PAD)/TL);
    };
    svg?.addEventListener('mousedown',e=>{if(S.done)return;dragging=true;S.dragVal=getPos(e);S.placed=true;render();});
    svg?.addEventListener('touchstart',e=>{if(S.done)return;dragging=true;S.dragVal=getPos(e);S.placed=true;render();},{passive:true});
    svg?.addEventListener('click',e=>{if(S.done||dragging)return;S.dragVal=getPos(e);S.placed=true;render();});
    window.addEventListener('mousemove',e=>{if(!dragging||S.done)return;S.dragVal=getPos(e);S.placed=true;render();},{once:false});
    window.addEventListener('mouseup',()=>{dragging=false;});
    window.addEventListener('touchmove',e=>{if(!dragging||S.done)return;S.dragVal=getPos(e);S.placed=true;render();},{passive:true});
    window.addEventListener('touchend',()=>{dragging=false;});
    document.getElementById('line-hint')?.addEventListener('click',()=>{S.lineHint=!S.lineHint;render();});
    document.getElementById('line-check')?.addEventListener('click',()=>{
      if(S.done||!S.placed)return;
      const ok=Math.abs(S.dragVal-S.q.numerator/S.q.denominator)<=0.5/S.q.denominator;
      handleAnswer(ok);
    });
  }

  // Compare
  if(t==='compare'){
    document.querySelectorAll('.sym-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{if(S.done)return;S.sel=btn.dataset.sym;render();});
    });
    document.getElementById('compare-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      const{fractionA:fa,fractionB:fb}=S.q;
      const vA=fa[0]/fa[1],vB=fb[0]/fb[1];
      const correct=vA>vB?'>':vA<vB?'<':'=';
      handleAnswer(S.sel===correct);
    });
  }

  // Grid
  if(t==='grid'){
    document.querySelectorAll('#grid-wrap div[data-idx]').forEach(el=>{
      el.addEventListener('click',()=>{
        if(S.done)return;
        const i=+el.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('grid-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }

  // Strip
  if(t==='strip'){
    document.querySelectorAll('.strip-seg[data-idx]').forEach(el=>{
      el.addEventListener('click',()=>{
        if(S.done)return;
        const i=+el.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('strip-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }

  // Apartments
  if(t==='apart'){
    document.querySelectorAll('.flat-btn[data-idx]').forEach(el=>{
      el.addEventListener('click',()=>{
        if(S.done)return;
        const i=+el.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('apart-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }

  // Clock
  if(t==='clock'){
    document.querySelectorAll('#clock-svg path[data-idx]').forEach(el=>{
      el.addEventListener('click',()=>{
        if(S.done)return;
        const i=+el.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('clock-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }

  // Group
  if(t==='group'){
    document.querySelectorAll('.group-item[data-idx]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        if(S.done)return;
        const i=+btn.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('group-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }

  // Jar
  if(t==='jar'){
    const svg=document.getElementById('jar-svg');
    let dragging=false;
    const W=160,H=220,BOTT=30,TOP=20,innerH=H-BOTT-TOP;
    const getVal=e=>{
      const r=svg.getBoundingClientRect();
      const cy=e.touches?e.touches[0].clientY:e.clientY;
      const y=(cy-r.top)*(H/r.height);
      return Math.max(0,Math.min(1,(H-BOTT-y)/innerH));
    };
    svg?.addEventListener('mousedown',e=>{if(S.done)return;dragging=true;S.dragVal=getVal(e);S.placed=true;render();});
    svg?.addEventListener('touchstart',e=>{if(S.done)return;dragging=true;S.dragVal=getVal(e);S.placed=true;render();},{passive:true});
    svg?.addEventListener('click',e=>{if(S.done)return;S.dragVal=getVal(e);S.placed=true;render();});
    window.addEventListener('mousemove',e=>{if(!dragging||S.done)return;S.dragVal=getVal(e);S.placed=true;render();});
    window.addEventListener('mouseup',()=>{dragging=false;});
    window.addEventListener('touchmove',e=>{if(!dragging||S.done)return;S.dragVal=getVal(e);S.placed=true;render();},{passive:true});
    window.addEventListener('touchend',()=>{dragging=false;});
    document.getElementById('jar-check')?.addEventListener('click',()=>{
      if(S.done||!S.placed)return;
      handleAnswer(Math.abs(S.dragVal-S.q.numerator/S.q.denominator)<=0.5/S.q.denominator);
    });
  }

  // Thermo
  if(t==='thermo'){
    const svg=document.getElementById('thermo-svg');
    let dragging=false;
    const H=260,BULB=24,TPAD=20,trackH=H-BULB*2-TPAD;
    const getVal=e=>{
      const r=svg.getBoundingClientRect();
      const cy=e.touches?e.touches[0].clientY:e.clientY;
      const y=(cy-r.top)*(H/r.height);
      return Math.max(0,Math.min(1,(H-BULB-y)/trackH));
    };
    svg?.addEventListener('mousedown',e=>{if(S.done)return;dragging=true;S.dragVal=getVal(e);S.placed=true;render();});
    svg?.addEventListener('touchstart',e=>{if(S.done)return;dragging=true;S.dragVal=getVal(e);S.placed=true;render();},{passive:true});
    svg?.addEventListener('click',e=>{if(S.done)return;S.dragVal=getVal(e);S.placed=true;render();});
    window.addEventListener('mousemove',e=>{if(!dragging||S.done)return;S.dragVal=getVal(e);S.placed=true;render();});
    window.addEventListener('mouseup',()=>{dragging=false;});
    window.addEventListener('touchmove',e=>{if(!dragging||S.done)return;S.dragVal=getVal(e);S.placed=true;render();},{passive:true});
    window.addEventListener('touchend',()=>{dragging=false;});
    document.getElementById('thermo-check')?.addEventListener('click',()=>{
      if(S.done||!S.placed)return;
      handleAnswer(Math.abs(S.dragVal-S.q.numerator/S.q.denominator)<=0.5/S.q.denominator);
    });
  }

  // Recipe
  if(t==='recipe'){
    if(!S.sel&&S.sel!==0)S.sel=0;
    document.getElementById('recipe-minus')?.addEventListener('click',()=>{if(S.done||S.sel<=0)return;S.sel--;render();});
    document.getElementById('recipe-plus')?.addEventListener('click',()=>{if(S.done||S.sel>=S.q.denominator)return;S.sel++;render();});
    document.getElementById('recipe-check')?.addEventListener('click',()=>{
      if(S.done||S.sel===0)return;
      handleAnswer(S.sel===S.q.numerator);
    });
  }

  // Stairs
  if(t==='stairs'){
    document.querySelectorAll('.stair-step[data-idx]').forEach(el=>{
      el.addEventListener('click',()=>{
        if(S.done)return;
        const i=+el.dataset.idx;
        if(!S.sel)S.sel=new Set();
        S.sel.has(i)?S.sel.delete(i):S.sel.add(i);
        render();
      });
    });
    document.getElementById('stairs-check')?.addEventListener('click',()=>{
      if(S.done||!S.sel)return;
      handleAnswer(S.sel.size===S.q.numerator);
    });
  }
}

render();
</script>
</body>
</html>
