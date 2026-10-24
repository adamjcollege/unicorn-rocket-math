'use strict';
/* ============================================================
   REWARDS — mission patches (achievements), daily streaks, the
   daily flight-plan bonus, and pilot ranks. Patches are checked
   against saved progress, so past play counts too.
   ============================================================ */
const today=()=>{const d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/864e5)};
function stats(){progress.stats=progress.stats||{};return progress.stats}
function statBump(k,n=1){const s=stats();s[k]=(s[k]||0)+n;save()}
const playedTotal=()=>Object.values(progress.played||{}).reduce((a,b)=>a+b,0);
const bestEntries=()=>Object.entries(progress.best||{}).map(([k,v])=>({id:k.slice(0,-1),level:+k.slice(-1),stars:v})).filter(e=>BYID[e.id]);
const zoneIds=z=>MISSIONS.filter(m=>m.zone===z&&m.id!=='hw').map(m=>m.id);
const starredIds=()=>new Set(bestEntries().filter(e=>e.stars>0).map(e=>e.id));
const factBestOf=mode=>Math.max(0,...Object.entries(progress.factBest||{}).filter(([k])=>k.endsWith(mode)).map(([,v])=>v));
const countOf=(list,pred)=>list.filter(pred).length;

// [id, icon, name, how to earn, () => [current, goal]]
const PATCHES=[
 ['firstflight','🚀','First Flight','Finish your first mission',()=>[playedTotal(),1]],
 ['flyer25','✈️','Frequent Flyer','Finish 25 missions',()=>[playedTotal(),25]],
 ['flyer75','🛸','Mission Marathon','Finish 75 missions',()=>[playedTotal(),75]],
 ['flyer150','🌠','Space Legend','Finish 150 missions',()=>[playedTotal(),150]],
 ['stars50','⭐','Star Catcher','Collect 50 stars',()=>[progress.stars,50]],
 ['stars150','🌟','Star Hoarder','Collect 150 stars',()=>[progress.stars,150]],
 ['stars300','💫','Supernova','Collect 300 stars',()=>[progress.stars,300]],
 ['perfect10','🏅','Flawless Ten','Get 3 stars on 10 different mission levels',()=>[countOf(bestEntries(),e=>e.stars===3),10]],
 ['perfect30','🏆','Perfection Machine','Get 3 stars on 30 different mission levels',()=>[countOf(bestEntries(),e=>e.stars===3),30]],
 ['explorer','🧭','Explorer','Earn stars in 20 different missions',()=>[starredIds().size,20]],
 ['deep10','🌌','Deep Space Diver','Earn stars on 10 Deep Space levels',()=>[countOf(bestEntries(),e=>e.level===2&&e.stars>0&&!BYID[e.id].chapters),10]],
 ['allMath','🧮','Math Galaxy Master','Earn stars in every Math Galaxy mission',()=>{const ids=zoneIds('math'),s=starredIds();return [countOf(ids,id=>s.has(id)),ids.length]}],
 ['allWords','📚','Word Workshop Master','Earn stars in every Word Workshop mission',()=>{const ids=zoneIds('words'),s=starredIds();return [countOf(ids,id=>s.has(id)),ids.length]}],
 ['chapters','📖','Bookworm','Finish every chapter of the chapter book',()=>{const m=BYID.saga;return m?[countOf(m.levels,(_,l)=>(progress.best['saga'+l]||0)>0),m.levels.length]:[0,1]}],
 ['homework5','✏️','Homework Hero','Use the Homework Helper 5 times',()=>[(progress.played||{}).hw||0,5]],
 ['facts25','⚡','Lightning Facts','Get a streak of 25 in Fact Fuel-Up',()=>[factBestOf('streak'),25]],
 ['strikes30','🛡','Shield Master','Get 30 right in a Three Strikes round',()=>[factBestOf('strikes'),30]],
 ['factsAll','➕','Fully Fueled','Play all four Fact Fuel-Up missions',()=>[countOf(['fadd','fsub','fmul','fdiv'],id=>(progress.played||{})[id]),4]],
 ['author','✍️','Author','Finish an opinion, informative, and story paragraph',()=>[countOf([0,1,2],l=>(progress.best['write'+l]||0)>0),3]],
 ['neat','🖋','Neat Printer','Get 3 stars on Print Lab sentences',()=>[(progress.best.print2||0)===3?1:0,1]],
 ['methods','🔢','Method Mixer','Finish × and ÷ missions with 4 different methods',()=>[(stats().methods||[]).length,4]],
 ['nohints','🧠','Brain Power','Finish 10 missions without using a hint',()=>[stats().nohint||0,10]],
 ['grit','💪','Never Give Up','Finish a mission even after 5 or more mistakes',()=>[stats().grit||0,1]],
 ['streak3','🔥','On a Roll','Play 3 days in a row',()=>[(progress.streak||{}).best||0,3]],
 ['streak7','☄️','Week Warrior','Play 7 days in a row',()=>[(progress.streak||{}).best||0,7]],
 ['streak14','🌋','Unstoppable','Play 14 days in a row',()=>[(progress.streak||{}).best||0,14]],
 ['plan1','🗺','Flight Plan Finisher','Finish all three Today\'s Flight Plan missions in one day',()=>[stats().plans||0,1]],
 ['plan5','🎯','Plan Pro','Finish Today\'s Flight Plan 5 times',()=>[stats().plans||0,5]],
 ['dj','🎵','DJ Bolt','Play music on your robot\'s boombox',()=>[stats().dj||0,1]],
 ['stylist','🎨','Robot Stylist','Change your robot\'s parts 30 times',()=>[stats().style||0,30]]
];
const PATCH_BY=Object.fromEntries(PATCHES.map(([id,icon,name,desc,fn])=>[id,{id,icon,name,desc,fn}]));
const hasPatch=id=>!!(progress.patches||{})[id];
// award any patches whose goal is met; returns the newly earned ones
function checkPatches(){
  progress.patches=progress.patches||{};const got=[];
  for(const [id] of PATCHES){if(progress.patches[id])continue;const [cur,goal]=PATCH_BY[id].fn();if(cur>=goal){progress.patches[id]=today();got.push(PATCH_BY[id])}}
  if(got.length){progress.patchNew=[...(progress.patchNew||[]),...got.map(p=>p.id)];save()}
  return got;
}
// robot parts that open with a patch
const patchParts=id=>ROBOT_CATALOG.flatMap(c=>c.items.filter(it=>it[3]===id).map(it=>`${it[1]} (${c.label.toLowerCase()})`));

/* ---------------- ranks ---------------- */
const RANKS=[['Cadet',0],['Pilot',20],['Navigator',45],['Captain',75],['Commander',110],['Star Admiral',160],['Galaxy Legend',250],['Unicorn Legend',400]];
function rankOf(stars=progress.stars){let i=0;RANKS.forEach(([,n],k)=>{if(stars>=n)i=k});const next=RANKS[i+1];return {name:RANKS[i][0],i,next:next?{name:next[0],need:next[1],more:next[1]-stars,pct:Math.round(100*(stars-RANKS[i][1])/(next[1]-RANKS[i][1]))}:null}}

/* ---------------- daily streak ---------------- */
function bumpStreak(){
  const st=progress.streak||{day:null,count:0,best:0},d=today();
  if(st.day===d)return {count:st.count,changed:false};
  st.count=st.day===d-1?st.count+1:1;st.day=d;st.best=Math.max(st.best||0,st.count);progress.streak=st;save();
  return {count:st.count,changed:true};
}
const streakNow=()=>{const st=progress.streak;if(!st)return 0;const d=today();return st.day===d||st.day===d-1?st.count:0};

/* ---------------- today's flight plan (fixed for the whole day) ---------------- */
function todaysPlan(){
  const d=today();
  if(!progress.plan||progress.plan.day!==d||!progress.plan.picks.every(p=>BYID[p.id])){
    const picks=PLAN_GROUPS.map(g=>{const ids=g.ids.filter(id=>BYID[id]).sort((a,b)=>bestSum(a)-bestSum(b)||((g.ids.indexOf(a)+d)%g.ids.length)-((g.ids.indexOf(b)+d)%g.ids.length));const id=ids[0];return {id,level:BYID[id].chapters?0:nextLevel(id),label:g.label,done:false}});
    progress.plan={day:d,picks,claimed:false};save();
  }
  return progress.plan;
}
const PLAN_BONUS=3;
// called when a mission finishes; returns bonus stars earned (0 if none)
function markPlan(id){
  const p=todaysPlan();const pk=p.picks.find(x=>x.id===id&&!x.done);if(pk)pk.done=true;
  if(!p.claimed&&p.picks.every(x=>x.done)){p.claimed=true;statBump('plans');save();return PLAN_BONUS}
  save();return 0;
}

/* ---------------- after every mission ---------------- */
// returns everything worth celebrating on the finish screen
function afterMission(m,stars,before){
  const out={};
  if(m.hints===0)statBump('nohint');
  if(m.mistakes>=5)statBump('grit');
  if(m.id==='mul'||m.id==='div'){const s=stats(),k=m.id+':'+(m.id==='mul'?S().mulMethod:S().divMethod);s.methods=[...new Set([...(s.methods||[]),k])];save()}
  const sk=bumpStreak();out.streak=sk;
  out.bonus=markPlan(m.id);if(out.bonus)progress.stars+=out.bonus;
  out.patches=checkPatches();
  out.parts=robotUnlocks(before,progress.stars).concat(out.patches.flatMap(p=>patchParts(p.id)));
  const r0=rankOf(before),r1=rankOf(progress.stars);if(r1.i>r0.i)out.rank=r1.name;
  out.next=nextRobotUnlock();
  save();return out;
}

/* ---------------- patch wall ---------------- */
function patchCard(id,fresh){
  const P=PATCH_BY[id],got=hasPatch(id),[cur,goal]=P.fn(),parts=patchParts(id);
  return `<div class="patch${got?' got':''}${fresh.has(id)?' fresh':''}"><span class="pi">${P.icon}</span><b>${esc(P.name)}</b><small>${esc(P.desc)}</small>${got?'':`<div class="fmeter"><i style="width:${Math.min(100,Math.round(100*cur/goal))}%"></i></div><small class="pc">${Math.min(cur,goal)} / ${goal}</small>`}${parts.length?`<small class="pp">${got?'Unlocked':'Unlocks'}: ${esc(parts.join(', '))}</small>`:''}${fresh.has(id)?'<span class="newtag">NEW</span>':''}</div>`;
}
function patchWallHtml(){
  const fresh=new Set(progress.patchNew||[]),ids=PATCHES.map(p=>p[0]),earned=ids.filter(hasPatch);
  const ratio=id=>{const [c,g]=PATCH_BY[id].fn();return Math.min(1,c/g)};
  const near=ids.filter(id=>!hasPatch(id)).sort((a,b)=>ratio(b)-ratio(a)).slice(0,3);
  const shelf=earned.length?`<div class="shelf">${earned.map(id=>`<span class="shelf-p${fresh.has(id)?' fresh':''}" title="${esc(PATCH_BY[id].name)}">${PATCH_BY[id].icon}</span>`).join('')}</div>`:'<p class="legend" style="text-align:left">Finish missions to earn your first patch!</p>';
  const freshCards=[...fresh].filter(id=>PATCH_BY[id]);
  const html=`<div class="patch-head"><h3 style="font-size:1.5rem">Mission patches</h3><span>${earned.length} of ${ids.length} earned</span></div>${shelf}
  ${freshCards.length?`<p class="patch-sub">Just earned</p><div class="patches">${freshCards.map(id=>patchCard(id,fresh)).join('')}</div>`:''}
  ${near.length?`<p class="patch-sub">Almost there</p><div class="patches">${near.map(id=>patchCard(id,fresh)).join('')}</div>`:''}
  <details class="all-patches"><summary>See all ${ids.length} patches</summary><div class="patches">${ids.map(id=>patchCard(id,fresh)).join('')}</div></details>`;
  if(fresh.size){progress.patchNew=[];save()}
  return html;
}
