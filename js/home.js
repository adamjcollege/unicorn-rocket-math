'use strict';
/* ============================================================
   MISSION CONTROL — home tabs, flight plan, hangar, grown-ups
   ============================================================ */
const SECTORS=[
  {id:'pv',zone:'math',title:'Place Value Port',blurb:'Big numbers up to 100,000'},
  {id:'ops',zone:'math',title:'Operation Orbit',blurb:'Add, subtract, multiply, divide'},
  {id:'ps',zone:'math',title:'Problem-Solving Station',blurb:'Word problems, factors, patterns'},
  {id:'fr',zone:'math',title:'Fraction Factory',blurb:'Fractions and decimals'},
  {id:'md',zone:'math',title:'Measurement Moon',blurb:'Units, time, area, data, angles, shapes'},
  {id:'rd',zone:'words',title:'Reading Radar',blurb:'Read closely, then prove it'},
  {id:'cv',zone:'words',title:'Spelling & Conventions',blurb:'Spelling, capitals, commas, grammar'},
  {id:'wr',zone:'words',title:'Writing Workshop',blurb:'Neat print and strong paragraphs'},
  {id:'wp',zone:'words',title:'Word Power',blurb:'Word parts and meanings'}
];
const PLAN_GROUPS=[
  {label:'Number skills',ids:['sub','div','mul','add']},
  {label:'Careful reading',ids:['story','facts','listen']},
  {label:'Writing tools',ids:['caps','spell','print','comma']}
];
let homeTab='math';
const bestSum=id=>[0,1,2].reduce((s,l)=>s+(progress.best[id+l]||0),0);
const nextLevel=id=>{for(let l=0;l<3;l++)if((progress.best[id+l]||0)<3)return l;return 2};

function planHtml(){
  const day=Math.floor(Date.now()/864e5);
  const picks=PLAN_GROUPS.map((g,gi)=>{const ids=g.ids.slice().sort((a,b)=>bestSum(a)-bestSum(b)||((g.ids.indexOf(a)+day)%g.ids.length)-((g.ids.indexOf(b)+day)%g.ids.length));return {g,m:BYID[ids[0]]}});
  return `<div class="plan-head"><h2>Today's flight plan</h2><p>Three missions picked for you. Do them in any order!</p></div><div class="plan-row">${picks.map(({g,m})=>{const l=nextLevel(m.id);return `<button type="button" class="plan-go" data-mission="${m.id}" data-level="${l}"><span class="badge" style="--bc:${m.color}">${m.sym}</span><span style="min-width:0"><small>${g.label}</small><b>${esc(m.title)}</b><span class="lvlname">${LEVEL_NAMES[l]}</span></span></button>`}).join('')}</div>`;
}
function missionCard(m){
  return `<article class="mcard"><div class="mcard-top"><div class="badge" style="--bc:${m.color}">${m.sym}</div><div><h4>${esc(m.title)}</h4><p class="skill">${esc(m.skill)}</p></div></div>
  <div class="stds">${m.std.map(s=>`<span class="std">NC.4.${s}</span>`).join('')}</div>
  <div class="lvls">${m.levels.map((info,l)=>{const b=progress.best[m.id+l]||0;return `<button type="button" class="lv" data-mission="${m.id}" data-level="${l}" title="${esc(LEVEL_NAMES[l]+': '+info)}"><span>${LEVEL_NAMES[l]}</span><span class="st" aria-label="${b} of 3 stars">${starStr(b)}</span></button>`}).join('')}</div></article>`;
}
function zoneHtml(zone){
  const intro=zone==='math'?`<div class="zone-intro"><svg viewBox="0 0 60 70" aria-hidden="true"><use href="#uni"/></svg><p>Comet the unicorn flies the math missions. Every mission has three levels: <b>Launch Pad</b>, <b>Orbit</b>, and <b>Deep Space</b>.</p></div>`
    :`<div class="zone-intro"><svg viewBox="0 0 60 70" aria-hidden="true"><use href="#bolt"/></svg><p>Bolt the robot runs the Word Workshop: reading, spelling, capitals, commas, grammar, and writing. Remember: slow and careful wins!</p></div>`;
  return intro+SECTORS.filter(s=>s.zone===zone).map(s=>`<section class="sector"><div class="sector-head"><h3>${esc(s.title)}</h3><p>${esc(s.blurb)}</p></div><div class="cards">${MISSIONS.filter(m=>m.sector===s.id).map(missionCard).join('')}</div></section>`).join('');
}
function robotSvg(){
  const has=id=>progress.stars>=ROBOT_PARTS.find(p=>p.id===id).need;
  const P=(id,inner)=>`<g class="${has(id)?'':'ghost'}">${inner}</g>`;
  const paint=has('paint');
  return `<svg class="rb" viewBox="0 0 220 260" role="img" aria-label="Your robot">
  ${P('cape',`<path d="M62 112 L36 236 L184 236 L158 112 Z" fill="#8a4fff" stroke="#231e52" stroke-width="3"/><path d="M70 200 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#ffc843"/><path d="M140 170 l3 6 6 1 -4 4 1 6 -6 -3 -6 3 1 -6 -4 -4 6 -1z" fill="#ffc843"/>`)}
  ${P('jet',`<rect x="38" y="118" width="22" height="58" rx="8" fill="#ffc843" stroke="#231e52" stroke-width="3"/><rect x="160" y="118" width="22" height="58" rx="8" fill="#ffc843" stroke="#231e52" stroke-width="3"/><path d="M42 176 q7 22 14 0z M164 176 q7 22 14 0z" fill="#ff8f6b"/>`)}
  ${P('wheels',`<circle cx="80" cy="222" r="22" fill="#231e52"/><circle cx="80" cy="222" r="8" fill="#b39bff"/><circle cx="140" cy="222" r="22" fill="#231e52"/><circle cx="140" cy="222" r="8" fill="#b39bff"/>`)}
  ${P('arms',`<path d="M62 132 L30 168 L22 160 M30 168 L36 178" fill="none" stroke="#231e52" stroke-width="7" stroke-linecap="round"/><path d="M158 132 L190 168 L198 160 M190 168 L184 178" fill="none" stroke="#231e52" stroke-width="7" stroke-linecap="round"/>`)}
  ${P('body',`<rect x="60" y="108" width="100" height="100" rx="16" fill="${paint?'url(#rbow)':'#d6f2ff'}" stroke="#231e52" stroke-width="3"/><rect x="80" y="130" width="60" height="40" rx="8" fill="#fff" stroke="#231e52" stroke-width="2"/><circle cx="96" cy="150" r="6" fill="#ff6fc0"/><circle cx="110" cy="150" r="6" fill="#ffc843"/><circle cx="124" cy="150" r="6" fill="#3fdcb4"/>`)}
  ${P('head',`<rect x="96" y="96" width="28" height="14" fill="#9aa6d6" stroke="#231e52" stroke-width="2"/><rect x="66" y="38" width="88" height="62" rx="16" fill="#d6f2ff" stroke="#231e52" stroke-width="3"/><rect x="76" y="52" width="68" height="28" rx="14" fill="#231e52"/><circle cx="96" cy="66" r="7" fill="#3fdcb4"/><circle cx="124" cy="66" r="7" fill="#3fdcb4"/><path d="M98 88 q12 7 24 0" fill="none" stroke="#231e52" stroke-width="3" stroke-linecap="round"/>`)}
  ${P('antenna',`<line x1="80" y1="38" x2="70" y2="14" stroke="#231e52" stroke-width="3"/><circle cx="70" cy="12" r="7" fill="#ff6fc0" stroke="#231e52" stroke-width="2"/>`)}
  ${P('horn',`<polygon points="102,40 112,2 122,40" fill="#ffc843" stroke="#231e52" stroke-width="3" stroke-linejoin="round"/><path d="M106 28 L118 24 M108 18 L116 15" stroke="#b56b00" stroke-width="2.5"/>`)}
  <defs><linearGradient id="rbow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9fd6"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#8ff0d2"/><stop offset="1" stop-color="#9fd3ff"/></linearGradient></defs></svg>`;
}
function hangarHtml(){
  const here=PLANETS.filter(p=>progress.stars>=p.need).length-1;
  return `<div class="hangar" style="margin-top:14px"><div class="robot-bay"><h3 style="font-size:1.5rem">Your robot</h3>${robotSvg()}<ul class="parts">${ROBOT_PARTS.map(p=>`<li class="${progress.stars>=p.need?'got':''}"><span>${progress.stars>=p.need?'✓ ':''}${p.name}</span><span>★ ${p.need}</span></li>`).join('')}</ul></div>
  <div><h3 style="font-size:1.5rem;margin-bottom:12px">Galaxy map</h3><div class="galaxy">${PLANETS.map((p,i)=>`<div class="planet${progress.stars<p.need?' locked':''}${i===here?' here':''}"><div class="orb${p.ring?' ring':''}" style="--a:${p.a};--b:${p.b}"></div><span class="planet-name">${p.name}</span><span class="planet-need">${i===here?'You are here':progress.stars>=p.need?'Visited':`★ ${p.need}`}</span></div>`).join('')}</div>
  <p style="color:var(--ink-dim);margin-top:14px">You have <b style="color:var(--gold)">★ ${progress.stars}</b> stars. Every mission you finish earns 1 to 3 stars, even if you play it again. Stars unlock planets and robot parts.</p></div></div>`;
}

/* ---------------- grown-ups: standards coverage ---------------- */
const STANDARDS=[
 ['Math'],
 ['OA.1','Multiplicative comparison word problems',['oa1']],
 ['OA.3','Two-step word problems, estimation, interpreting remainders',['oa3']],
 ['OA.4','Factor pairs, multiples, prime and composite (to 50)',['fac']],
 ['OA.5','Number and shape patterns that follow a rule',['pat']],
 ['NBT.1','A digit is worth 10 times the place to its right',['tenx']],
 ['NBT.2','Read and write numbers to 100,000 (words, expanded form)',['forms']],
 ['NBT.4','Add and subtract to 100,000 with the standard algorithm',['add','sub']],
 ['NBT.5','Multiply up to 3-digit × 1-digit and 2-digit × 2-digit (the app goes to 4-digit × 1-digit and 3-digit × 2-digit to match homework)',['mul']],
 ['NBT.6','Divide up to 3-digit by 1-digit with remainders (the app goes to 4-digit to match homework)',['div','oa3']],
 ['NBT.7','Compare numbers to 100,000',['cmp']],
 ['NF.1','Equivalent fractions with area and length models',['nf1']],
 ['NF.2','Compare fractions (benchmarks, common parts)',['nf2']],
 ['NF.3','Add and subtract like fractions, decompose, mixed numbers',['nf3']],
 ['NF.4','Multiply a whole number by a fraction',['nf4']],
 ['NF.6','Decimal notation for tenths and hundredths',['dec']],
 ['NF.7','Compare decimals to hundredths',['dec']],
 ['MD.1','Metric units and one-step metric word problems',['metric']],
 ['MD.2','Convert larger metric units to smaller ones',['metric']],
 ['MD.3','Area and perimeter',['area']],
 ['MD.4','Frequency tables, scaled bar graphs, line plots',['data']],
 ['MD.6','Angles: kinds, protractor, missing angles',['angle']],
 ['MD.8','Elapsed time across the hour',['time']],
 ['G.1','Points, lines, segments, rays, parallel and perpendicular',['shape']],
 ['G.2','Classify triangles and quadrilaterals (NC uses the exclusive trapezoid definition)',['shape']],
 ['G.3','Lines of symmetry',['shape']],
 ['Reading'],
 ['RL.1','Details and inferences in literature',['story','listen']],
 ['RL.2','Theme and summary',['story']],
 ['RL.3','Describe characters, setting, events',['story']],
 ['RL.4','Word and phrase meaning, tone',['story','context']],
 ['RL.5','Poems, drama, and prose',['story']],
 ['RL.6','First- and third-person point of view',['story']],
 ['RL.7','Compare a text with a spoken or visual version',['listen'],'Watch a movie version of a book he has read and talk about what changed.'],
 ['RL.9','Compare themes and events across stories and cultures',['story'],'Read two versions of the same fairy tale from different countries (Cinderella has many).'],
 ['RL.10','Read grade 4–5 literature independently',[],'20 minutes of daily reading. Ask him to tell you the most important part, with proof from the book.'],
 ['RI.1','Details and inferences in nonfiction',['facts','listen']],
 ['RI.2','Main idea, key details, summary',['facts']],
 ['RI.3','Explain events, ideas, and cause and effect',['facts']],
 ['RI.4','Academic and topic vocabulary',['facts','context']],
 ['RI.5','Text structure (sequence, cause/effect, problem/solution)',['facts']],
 ['RI.6','Firsthand vs. secondhand accounts',['facts']],
 ['RI.7','Charts and visual information',['facts']],
 ['RI.8','Reasons and evidence',['facts']],
 ['RI.9','Combine information from two texts',['facts']],
 ['RI.10','Read grade 4–5 nonfiction independently',[],'Library books about space, robots, or engineering. Have him read a page aloud, then explain it in his own words.'],
 ['Foundations, Writing, Speaking & Listening'],
 ['RF.2','Legible handwriting (NC grade 4 = cursive)',['print'],'The app practices neat print for now. When his class starts cursive, ten minutes a day of copying sentences works well.'],
 ['RF.4','Phonics and word analysis for multisyllable words',['parts','spell']],
 ['RF.5','Fluency: accuracy, rate, and expression',['listen'],'Repeated reading: he reads the same short passage aloud 3 times, trying to sound like a storyteller.'],
 ['W.1','Opinion writing',['write']],
 ['W.2','Informative writing',['write']],
 ['W.3','Narrative writing',['write']],
 ['W.4','Use digital tools; keyboarding',['write']],
 ['W.5','Short research projects',[],'Pick a planet or robot. Write 3 questions, find answers in 2 books or sites, and make a mini poster.'],
 ['W.6','Gather information and list sources',[],'During the research project, have him keep notes in categories and list his sources at the bottom.'],
 ['SL.1','Collaborative discussions',[],'Dinner-table discussions using starters like "I agree with ___ because..." and "Can you explain...?"'],
 ['SL.2','Paraphrase information read aloud',['listen']],
 ['SL.3','Identify a speaker\'s reasons and evidence',['listen']],
 ['SL.4','Report on a topic or tell a story with details',[],'Have him present his Paragraph Builder writing to the family, speaking clearly.'],
 ['SL.5','Add audio or visuals to presentations',[],'Add a drawing or a short slideshow to one of his research posters.'],
 ['Language'],
 ['L.1','Grammar: agreement, tenses, sentences, pronouns',['grammar','write']],
 ['L.2','Capitalization, punctuation, spelling',['caps','comma','spell','write','print']],
 ['L.3','Word choice, punctuation for effect, formal vs. informal',['figure']],
 ['L.4','Context clues, word parts, reference materials',['context','parts']],
 ['L.5','Similes, metaphors, idioms, adages, proverbs',['figure']],
 ['L.6','Precise academic and topic words',['figure','context']]
];
function grownupsHtml(){
  const totalMissions=Object.values(progress.played||{}).reduce((a,b)=>a+b,0);
  const rows=STANDARDS.map(r=>{
    if(r.length===1)return `<tr class="sub"><td colspan="4">${r[0]}</td></tr>`;
    const [code,txt,ids,off]=r;const status=ids.length&&!off?'in':ids.length?'part':'off';
    const prog=ids.map(id=>`<button type="button" class="linkish" data-mission="${id}" data-level="${nextLevel(id)}">${esc(BYID[id].title)}</button> <span style="color:var(--gold)">${'★'.repeat(bestSum(id))}</span>`).join('<br>');
    return `<tr><td class="code">NC.4.${code}</td><td>${esc(txt)}${off?`<br><span style="color:var(--ink-dim)">Off-screen idea: ${esc(off)}</span>`:''}</td><td><span class="pill ${status}">${{in:'In the app',part:'App + off-screen',off:'Off-screen'}[status]}</span></td><td>${prog||'—'}</td></tr>`;
  }).join('');
  return `<div class="gu" style="margin-top:14px">
  <div class="gu-card"><h3>How it works</h3><ul>
    <li><b>Step by step, not just answers.</b> Math missions walk through each step (regrouping, place-value panels, Divide-Multiply-Subtract-Bring down). Wrong answers get a specific tip, and the Hint button gets more direct each time.</li>
    <li><b>Built for a rushing reader.</b> Reading questions unlock only after a "reading fuel" bar fills, and every answer has a <b>Prove it!</b> step: he taps the sentence in the text that supports it. A wrong answer sends him back to the text before he can try again.</li>
    <li><b>Mechanics on purpose.</b> Capital Patrol, Comma Commander, Spelling Bricks (with the rule behind each mistake), Print Lab tracing on Sit/Size/Space lines, and a Paragraph Builder that checks capitals, end marks, the word I, common misspellings, and lowercase days and months.</li>
    <li><b>Paper missions.</b> Print Lab and Paragraph Builder end with a short paper task and a checklist, so the neatness carries over to real handwriting.</li>
    <li><b>No timers on answers.</b> Every finished mission earns 1 to 3 stars, which unlock planets and robot parts in the Hangar.</li>
    <li>Progress is saved in this browser on this device only. ${totalMissions?`So far: <b>${totalMissions}</b> ${plural(totalMissions,'mission')} finished and <b>★ ${progress.stars}</b> stars.`:''}</li>
  </ul></div>
  <div class="gu-card"><h3>NC Standard Course of Study coverage (Grade 4)</h3><p>Every grade 4 math and ELA standard from your two guides, with the missions that practice it. Tap a mission name to open it. Some standards (discussions, research, presentations) work better away from a screen, so those rows have a quick idea instead.</p>
    <div class="table-wrap"><table class="cov"><tr><th>Standard</th><th>What it means</th><th>Where</th><th>Missions and best stars</th></tr>${rows}</table></div></div>
  <div class="gu-card"><h3>Reset</h3><div class="reset-row" id="reset-row"><button type="button" class="btn" id="reset-ask">Reset all progress…</button></div></div>
  </div>`;
}

/* ---------------- render + events ---------------- */
function renderHome(){
  $('#star-count').textContent=progress.stars;
  $('#pilot-name').textContent=progress.name||'Space Cadet';
  $('#plan').innerHTML=planHtml();
  $$('.tab').forEach(t=>t.setAttribute('aria-selected',String(t.dataset.tab===homeTab)));
  $('#pane').innerHTML=homeTab==='math'?zoneHtml('math'):homeTab==='words'?zoneHtml('words'):homeTab==='hangar'?hangarHtml():grownupsHtml();
}
function goHome(){TTS.stop();renderHome();show('home')}
document.addEventListener('click',e=>{
  const m=e.target.closest('[data-mission]');if(m&&!$('#home').hidden){startMission(m.dataset.mission,+m.dataset.level);return}
  const t=e.target.closest('[data-tab]');if(t){homeTab=t.dataset.tab;try{history.replaceState(null,'','#'+homeTab)}catch(err){}renderHome();return}
  if(e.target.id==='reset-ask'){$('#reset-row').innerHTML=`<span>This erases all stars, robot parts, and drafts on this device.</span><button type="button" class="btn btn-hot" id="reset-yes">Yes, reset</button><button type="button" class="btn" id="reset-no">Cancel</button>`;return}
  if(e.target.id==='reset-yes'){const keep={name:progress.name,sound:progress.sound};progress={name:keep.name,stars:0,best:{},sound:keep.sound,drafts:{},played:{}};save();renderHome();return}
  if(e.target.id==='reset-no'){renderHome();return}
});
$('#back').onclick=goHome;
$('#go-home').onclick=goHome;
$('#edit-name').onclick=()=>{$('#pilot-view').hidden=true;$('#name-form').hidden=false;$('#name-input').value=progress.name;$('#name-input').focus()};
$('#name-form').onsubmit=e=>{e.preventDefault();progress.name=$('#name-input').value.trim().slice(0,18);save();$('#name-form').hidden=true;$('#pilot-view').hidden=false;renderHome()};

/* ---------------- start ---------------- */
(function init(){
  const h=(location.hash||'').slice(1);if(['math','words','hangar','grownups'].includes(h))homeTab=h;
  drawSky();syncSoundBtns();renderHome();
})();
