'use strict';
/* ============================================================
   MATH ARCADE — three games with a different feel. No clocks:
   the challenge is aim, estimation, and strategy.
   - Number Line Lander: land a rocket on a number (estimation)
   - Star Forge: combine number stars to hit a target (strategy)
   - Angle Launch: aim a rocket by degrees at a planet (angles)
   ============================================================ */
function gameBest(key,score){
  progress.gameBest=progress.gameBest||{};const prev=progress.gameBest[key]||0;
  if(score>prev){progress.gameBest[key]=score;save();return true}return false;
}
const gameStars=(score,max)=>score>=max*.75?3:score>=max*.45?2:1;
function svgPoint(svgEl,e){const pt=svgEl.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(svgEl.getScreenCTM().inverse())}
const ROCKET_G=`<path d="M0 -26 Q12 -14 12 4 L12 14 L-12 14 L-12 4 Q-12 -14 0 -26Z" fill="#f1ebff" stroke="#231e52" stroke-width="2.5"/><path d="M0 -26 Q8 -18 10 -10 L-10 -10 Q-8 -18 0 -26Z" fill="#ff6fc0" stroke="#231e52" stroke-width="2"/><circle cx="0" cy="0" r="5" fill="#73c2ff" stroke="#231e52" stroke-width="2"/><path d="M-12 6 L-20 18 L-12 14Z M12 6 L20 18 L12 14Z" fill="#ff6fc0" stroke="#231e52" stroke-width="2" stroke-linejoin="round"/>`;
const STARFIELD=Array.from({length:40},(_,i)=>`<circle cx="${(i*137)%600}" cy="${(i*71)%200}" r="${i%5?1:1.8}" fill="#fff" opacity="${.3+(i%4)*.15}"/>`).join('');
function finishGame(g,key,max,extra){
  g.done=true;app.clearInput();
  const pb=gameBest(key+g.level,g.score);
  g.result={stars:gameStars(g.score,max),score:g.score,pb};
  app.solved(`You scored <b>${g.score}</b> out of ${max}.${pb?' 🏆 New personal best!':''} ${extra||''}`);
}

/* ===================== Number Line Lander ===================== */
const LX0=40,LX1=560,LY=250;
class LanderGame{
  constructor(level){this.level=level;this.round=0;this.total=8;this.score=0;this.bulls=0;this.done=false;this.seen=new Set();this.next()}
  next(){this.t=this.makeTarget();this.mark=null;this.landed=null;this.anim=false;this.ticks=false;this.round++}
  makeTarget(){
    for(let tries=0;tries<50;tries++){
      let t;
      if(this.level===0){
        const [hi,step]=pick([[100,1],[1000,10],[10000,100],[100000,1000],[1000,25],[50,1]]);
        const v=rand(2,hi/step-2)*step;t={lo:0,hi,v,label:fmt(v),key:'w'+hi+v,tickN:4,tickLbl:x=>fmt(x),explain:`${fmt(v)} is ${Math.round(100*v/hi)}% of the way from 0 to ${fmt(hi)}.`,mid:true};
      }else if(this.level===1){
        const d=pick([2,3,4,5,6,8,10,12]),two=Math.random()<.35,n=rand(1,two?2*d-1:d-1);if(n%d===0)continue;
        const v=n/d,w=Math.floor(n/d),r=n%d;
        t={lo:0,hi:two?2:1,v,label:two&&w?`${w} ${frac(r,d)}`:frac(n,d),plain:two&&w?`${w} ${r}/${d}`:`${n}/${d}`,key:'f'+n+'/'+d+two,tickN:d*(two?2:1),tickLbl:x=>Math.abs(x-Math.round(x))<1e-9?String(Math.round(x)):'',explain:`${two&&w?`${w} ${r}/${d}`:`${n}/${d}`} means ${n} ${plural(n,'jump')} of 1/${d}. Split each whole into ${d} equal parts and count ${n}.`};
      }else{
        const kind=rand(0,2);
        if(kind===0){const h=rand(3,97);t={lo:0,hi:1,v:h/100,label:(h/100).toFixed(2),key:'d'+h,tickN:10,tickLbl:x=>x===0||x===1?String(x):'',explain:`${(h/100).toFixed(2)} is ${h} hundredths: between ${(Math.floor(h/10)/10).toFixed(1)} and ${(Math.ceil(h/10)/10).toFixed(1)}.`}}
        else if(kind===1){const hi=pick([5,10]),v=rand(1,hi*4-1)/4;if(v%1===0)continue;t={lo:0,hi,v,label:String(v),key:'q'+hi+v,tickN:hi*4,tickLbl:x=>Math.abs(x-Math.round(x))<1e-9?String(Math.round(x)):'',explain:`${v} is ${Math.floor(v)} and ${v%1===.5?'one half':v%1===.25?'one quarter':'three quarters'}.`}}
        else{const [n,d]=pick([[1,4],[3,4],[1,2],[2,5],[3,5],[7,10],[3,10],[1,5],[9,10],[4,5]]);const v=n/d;t={lo:0,hi:1,v,label:`${(v).toFixed(2)} (= ${frac(n,d)})`,plain:v.toFixed(2),key:'e'+n+d,tickN:10,tickLbl:x=>x===0||x===1?String(x):'',explain:`${n}/${d} = ${v.toFixed(2)}, which is ${Math.round(v*100)} hundredths.`}}
      }
      if(this.seen.has(t.key))continue;this.seen.add(t.key);return t;
    }
    return this.makeTarget();
  }
  X(v){return LX0+(v-this.t.lo)/(this.t.hi-this.t.lo)*(LX1-LX0)}
  V(x){return this.t.lo+(x-LX0)/(LX1-LX0)*(this.t.hi-this.t.lo)}
  start(){app.clearInput();app.say(`Number Line Lander! Tap the line to aim, nudge with the arrows, then press <b>Land</b>. The closer you land, the more points. There's no clock, so take your time!`,'happy')}
  act(name){
    if(this.done)return false;
    if(name==='nudge-l'||name==='nudge-r'){if(this.landed!==null)return false;const x=this.mark===null?(LX0+LX1)/2:this.mark;this.mark=Math.max(LX0,Math.min(LX1,x+(name==='nudge-l'?-5.2:5.2)));sound('pop');return}
    if(name==='land'){if(this.mark===null||this.landed!==null)return false;this.land();return}
    if(name==='next'){if(this.landed===null)return false;if(this.round>=this.total){finishGame(this,'lander',this.total*100,`${this.bulls} ${plural(this.bulls,'bullseye')}!`);return}this.next();app.say(`Round ${this.round} of ${this.total}. Where does <b>${this.t.label}</b> go?`,'happy');return}
    return false;
  }
  land(){
    const got=this.V(this.mark),err=Math.abs(got-this.t.v)/(this.t.hi-this.t.lo);
    let pts=err<=.015?100:err<=.04?75:err<=.08?50:err<=.15?25:10;if(this.ticks)pts=Math.min(pts,75);
    const word=pts===100?'Bullseye!':pts>=75?'Great landing!':pts>=50?'Good landing!':pts>=25?'Close!':'Landed, but far away.';
    if(pts===100){this.bulls++;statBump('bullseye')}
    this.landed={x:this.mark,pts,word};this.score+=pts;this.anim=true;
    sound(pts>=75?'win':'pop');
    setTimeout(()=>{if(mission&&mission.problem===this){const r=$('#work').getBoundingClientRect();if(pts>=75)burst(r.left+r.width/2,r.top+180,pts===100?60:25)}},900);
    app.say(`<b>${word}</b> +${pts} points. ${this.t.explain}`,pts>=50?'cheer':'think');
  }
  hint(){
    if(this.landed!==null)return 'Press Next to keep going.';
    this.ticks=true;
    return this.level===1?`I added marks that split each whole into equal parts. Count the jumps! (Hints cap this round at 75 points.)`:`I added helper marks. Use them to count your way there. (Hints cap this round at 75 points.)`;
  }
  html(){
    const t=this.t;let g=`<rect width="600" height="300" rx="18" fill="#15123b"/>${STARFIELD}<path d="M0 262 Q150 250 300 262 T600 262 V300 H0Z" fill="#8e88bd"/><circle cx="90" cy="282" r="9" fill="#77719f"/><circle cx="420" cy="286" r="12" fill="#77719f"/>`;
    g+=`<line x1="${LX0}" y1="${LY}" x2="${LX1}" y2="${LY}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
    const tick=(v,lbl,big)=>`<line x1="${this.X(v)}" y1="${LY-(big?12:7)}" x2="${this.X(v)}" y2="${LY+(big?12:7)}" stroke="#fff" stroke-width="${big?3:2}"/>${lbl?`<text x="${this.X(v)}" y="${LY+32}" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">${lbl}</text>`:''}`;
    g+=tick(t.lo,t.tickLbl(t.lo)||String(t.lo),true)+tick(t.hi,t.tickLbl(t.hi)||String(t.hi),true);
    if(t.hi===2)g+=tick(1,'1',true);
    if(t.mid&&!this.ticks)g+=tick((t.lo+t.hi)/2,'',false);
    if(this.ticks)for(let k=1;k<t.tickN;k++){const v=t.lo+(t.hi-t.lo)*k/t.tickN;g+=tick(v,t.tickLbl(v),Math.abs(v-Math.round(v))<1e-9)}
    if(this.mark!==null&&this.landed===null)g+=`<line x1="${this.mark}" y1="40" x2="${this.mark}" y2="${LY}" stroke="#ffc843" stroke-width="2" stroke-dasharray="6 6"/><circle cx="${this.mark}" cy="${LY}" r="9" fill="none" stroke="#ffc843" stroke-width="3"/>`;
    const L=this.landed;
    if(L){
      const tx=this.X(t.v);
      g+=`<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${this.anim?'0.9s':'0s'}" dur=".3s" fill="freeze"/><line x1="${tx}" y1="${LY-56}" x2="${tx}" y2="${LY}" stroke="#3fdcb4" stroke-width="3"/><path d="M${tx} ${LY-56} l24 8 l-24 8z" fill="#3fdcb4"/><text x="${tx}" y="${LY-64}" text-anchor="middle" font-size="15" font-weight="700" fill="#3fdcb4">${esc(t.plain||t.label)}</text>${Math.abs(tx-L.x)>3?`<line x1="${Math.min(tx,L.x)}" y1="${LY+44}" x2="${Math.max(tx,L.x)}" y2="${LY+44}" stroke="#ffc843" stroke-width="3" stroke-dasharray="4 4"/>`:''}</g>`;
      g+=`<g transform="translate(${L.x} ${LY-16})">${this.anim?`<animateTransform attributeName="transform" type="translate" from="300 40" to="${L.x} ${LY-16}" dur="0.9s" fill="freeze" calcMode="spline" keySplines=".3 .1 .3 1" keyTimes="0;1"/>`:''}${ROCKET_G}</g>`;
    }else g+=`<g transform="translate(${this.mark===null?300:this.mark} 60)" ><animateTransform attributeName="transform" type="translate" values="0 0;0 7;0 0" dur="1.6s" repeatCount="indefinite" additive="sum"/>${ROCKET_G}<path d="M-6 16 q6 14 12 0z" fill="#ffc843"/></g>`;
    this.anim=false;
    const text=`<div class="arc-top"><span class="arc-chip">Round ${this.round} / ${this.total}</span><span class="arc-target">Land at <b>${t.label}</b></span><span class="arc-chip">Score ${this.score}</span></div>`;
    const ctrls=this.landed===null?`<div class="arc-ctrls"><button type="button" class="btn" data-act="nudge-l" aria-label="Move left">◀</button><button type="button" class="btn btn-hot" data-act="land"${this.mark===null?' disabled':''}>🚀 Land here</button><button type="button" class="btn" data-act="nudge-r" aria-label="Move right">▶</button></div>`
      :`<div class="arc-ctrls"><span class="arc-pts">${this.landed.word} +${this.landed.pts}</span><button type="button" class="btn btn-mint" data-act="next">${this.round>=this.total?'See my score':'Next round →'}</button></div>`;
    if(this.done)return `<div class="arcade">${text}${this.summaryHtml()}</div>`;
    return `<div class="arcade">${text}<svg class="arc-svg lander" viewBox="0 0 600 300" role="img" aria-label="Number line from ${t.lo} to ${t.hi}">${g}</svg>${ctrls}</div>`;
  }
  summaryHtml(){const b=(progress.gameBest||{})['lander'+this.level]||0;return `<div class="arc-sum"><div class="eq">🎯 ${this.score} points</div><p>${this.bulls} ${plural(this.bulls,'bullseye')} · Best score: ${b}</p></div>`}
  mount(w){
    const s=w.querySelector('svg.lander');if(!s||this.landed!==null||this.done)return;
    s.addEventListener('pointerdown',e=>{const p=svgPoint(s,e);this.mark=Math.max(LX0,Math.min(LX1,p.x));sound('pop');renderWork()});
  }
}

/* ===================== Star Forge ===================== */
const OPS_F={'+':(a,b)=>a+b,'−':(a,b)=>a-b,'×':(a,b)=>a*b,'÷':(a,b)=>b&&a%b===0?a/b:null};
class ForgeGame{
  constructor(level){this.level=level;this.round=0;this.total=5;this.score=0;this.done=false;this.next()}
  build(){
    const L=this.level;
    for(let tries=0;tries<400;tries++){
      let nums,ops,steps;
      if(L===0){nums=[rand(1,9),rand(1,9),rand(2,10),rand(2,10)];ops=['+','−','×'];steps=2}
      else if(L===1){nums=[rand(2,9),rand(2,9),rand(2,9),pick([10,12,15,20,25])];ops=['+','−','×','÷'];steps=3}
      else{nums=[pick([25,50,75,100]),rand(2,10),rand(2,10),rand(1,9),rand(2,9)];ops=['+','−','×','÷'];steps=rand(3,4)}
      let pool=nums.map(v=>v),sol=[],ok=true;
      for(let s=0;s<steps;s++){
        const i=rand(0,pool.length-1);let j;do{j=rand(0,pool.length-1)}while(j===i);
        let a=pool[i],b=pool[j],op=pick(ops);
        if(op==='−'&&a<b)[a,b]=[b,a];
        if(op==='÷'){if(a<b)[a,b]=[b,a];if(b<2||a%b){op='+'}}
        if(op==='×'&&a*b>(L===2?900:150)){op='+'}
        const r=OPS_F[op](a,b);if(r===null||r<=0){ok=false;break}
        sol.push([a,op,b,r]);pool=pool.filter((_,k)=>k!==i&&k!==j);pool.push(r);
      }
      const tgt=sol.length?sol[sol.length-1][3]:0;
      const [lo,hi]=L===0?[10,60]:L===1?[20,150]:[100,700];
      if(!ok||tgt<lo||tgt>hi||nums.includes(tgt))continue;
      if(sol.some(([a,op,b])=>(op==='×'&&(a===1||b===1))))continue;
      return {nums,tgt,sol};
    }
    return {nums:[3,4,5,6],tgt:26,sol:[[4,'×',5,20],[20,'+',6,26]]};
  }
  next(){
    const p=this.build();this.nums=p.nums;this.tgt=p.tgt;this.sol=p.sol;this.round++;
    let id=0;this.tiles=p.nums.map(v=>({id:id++,v}));this.nextId=id;this.history=[];this.log=[];this.sel=null;this.op=null;this.hints=0;this.solved=false;this.skipped=false;this.fresh=null;
  }
  start(){app.clearInput();app.say(`Star Forge! Combine the number stars to make the <b>target</b>. Tap a star, tap + − × or ÷, then tap another star. You don't have to use them all.`,'happy')}
  act(name,v){
    if(this.done)return false;
    if(name==='next'){if(!this.solved&&!this.skipped)return false;if(this.round>=this.total){finishGame(this,'forge',this.total*100);return}this.next();app.say(`Puzzle ${this.round} of ${this.total}: make <b>${this.tgt}</b>.`,'happy');return}
    if(this.solved||this.skipped)return false;
    if(name==='tile'){
      const t=this.tiles.find(x=>x.id===+v);if(!t)return false;
      if(this.sel===null||this.op===null){this.sel=this.sel===t.id?null:t.id;this.op=null;sound('pop');return}
      if(t.id===this.sel){this.sel=null;this.op=null;return}
      const a=this.tiles.find(x=>x.id===this.sel);let A=a.v,B=t.v,op=this.op;
      if(op==='−'&&A<B){app.oops(`${A} − ${B} would go below zero. Try ${B} − ${A} by tapping ${B} first.`,false);this.op=null;return}
      const r=OPS_F[op](A,B);
      if(r===null){app.oops(`${A} ÷ ${B} doesn't come out even. Star Forge only makes whole numbers.`,false);this.op=null;return}
      this.history.push({tiles:this.tiles.map(x=>({...x})),log:this.log.slice()});
      const nt={id:this.nextId++,v:r};const idx=this.tiles.indexOf(a);
      this.tiles=this.tiles.filter(x=>x!==a&&x!==t);this.tiles.splice(Math.min(idx,this.tiles.length),0,nt);
      this.log.push(`${A} ${op} ${B} = ${r}`);this.fresh=nt.id;this.sel=null;this.op=null;sound('good');
      if(r===this.tgt){this.win();return}
      if(this.tiles.length===1)app.say(`That's <b>${r}</b>, not ${this.tgt}. Tap <b>Undo</b> or <b>Start over</b> and try another way!`,'think');
      else app.say(`${A} ${op} ${B} = <b>${r}</b>. Keep forging!`,'happy');
      return;
    }
    if(name==='op'){if(this.sel===null){app.say('First tap a number star, then the operation.','think');return}this.op=v;sound('pop');return}
    if(name==='undo'){const h=this.history.pop();if(!h)return false;this.tiles=h.tiles;this.log=h.log;this.sel=null;this.op=null;this.fresh=null;return}
    if(name==='reset'){if(!this.history.length)return false;const h=this.history[0];this.history=[];this.tiles=h.tiles;this.log=h.log;this.sel=null;this.op=null;this.fresh=null;app.say(`Fresh start! Make <b>${this.tgt}</b>.`,'happy');return}
    if(name==='skip'){this.skipped=true;app.say(`Here's one way: ${this.sol.map(s=>`${s[0]} ${s[1]} ${s[2]} = ${s[3]}`).join(', then ')}.`,'think');return}
    return false;
  }
  win(){
    this.solved=true;const pts=Math.max(40,100-25*this.hints);this.score+=pts;sound('win');
    const r=$('#work').getBoundingClientRect();setTimeout(()=>burst(r.left+r.width/2,r.top+120,50),50);
    app.say(`<b>Forged it!</b> You made ${this.tgt}. +${pts} points.${this.log.length>1?` Your steps: ${this.log.join(', ')}.`:''}`,'cheer');
  }
  hint(){
    if(this.solved||this.skipped)return 'Press Next to keep going.';
    const k=Math.min(this.hints,this.sol.length-1);this.hints++;
    const [a,op,b,r]=this.sol[k];
    return `${k===0?'Start with':'Then try'} <b>${a} ${op} ${b} = ${r}</b>.${this.history.length&&k===0?' (Tap Start over first.)':''} <small>Each hint takes 25 points off this puzzle.</small>`;
  }
  html(){
    if(this.done)return `<div class="arcade"><div class="arc-sum"><div class="eq">⭐ ${this.score} points</div><p>Best score: ${(progress.gameBest||{})['forge'+this.level]||0}</p></div></div>`;
    const top=`<div class="arc-top"><span class="arc-chip">Puzzle ${this.round} / ${this.total}</span><span class="arc-target">Make <b class="forge-tgt${this.solved?' hit':''}">${this.tgt}</b></span><span class="arc-chip">Score ${this.score}</span></div>`;
    const tiles=`<div class="forge-tiles">${this.tiles.map(t=>`<button type="button" class="fstar${t.id===this.sel?' sel':''}${t.id===this.fresh?' fresh':''}${t.v===this.tgt?' win':''}" data-act="tile" data-v="${t.id}"${this.solved||this.skipped?' disabled':''}><span>${fmt(t.v)}</span></button>`).join('')}</div>`;
    this.fresh=null;
    const ops=`<div class="forge-ops">${Object.keys(OPS_F).map(o=>`<button type="button" class="fop${this.op===o?' on':''}" data-act="op" data-v="${o}"${this.solved||this.skipped?' disabled':''} aria-label="${{'+':'plus','−':'minus','×':'times','÷':'divided by'}[o]}">${o}</button>`).join('')}</div>`;
    const log=`<div class="forge-log">${this.log.length?this.log.map(l=>`<span>${l}</span>`).join(''):'<span class="dim">Your steps will show here.</span>'}</div>`;
    const ctr=this.solved||this.skipped?`<div class="arc-ctrls"><button type="button" class="btn btn-mint" data-act="next">${this.round>=this.total?'See my score':'Next puzzle →'}</button></div>`
      :`<div class="arc-ctrls"><button type="button" class="btn" data-act="undo"${this.history.length?'':' disabled'}>↶ Undo</button><button type="button" class="btn" data-act="reset"${this.history.length?'':' disabled'}>Start over</button><button type="button" class="btn" data-act="skip">Show me</button></div>`;
    return `<div class="arcade forge">${top}<p class="legend">${this.sel===null?'Tap a number star.':this.op===null?'Now tap + − × or ÷ (or another star).':`Now tap the star to ${({'+':'add','−':'subtract','×':'multiply by','÷':'divide by'})[this.op]}.`}</p>${tiles}${ops}${log}${ctr}</div>`;
  }
}

/* ===================== Angle Launch ===================== */
const AC={x:300,y:300},AR=250;
const polar=(deg,r)=>[AC.x+r*Math.cos(deg*Math.PI/180),AC.y-r*Math.sin(deg*Math.PI/180)];
class AngleGame{
  constructor(level){this.level=level;this.round=0;this.total=6;this.score=0;this.done=false;this.next()}
  next(){
    this.round++;const L=this.level;
    let th;do{th=L===0?rand(1,17)*10:L===1?rand(2,34)*5:rand(25,165)}while(this.prev!==undefined&&Math.abs(th-this.prev)<20);this.prev=th;
    this.th=th;this.dist=rand(170,215);this.base=L===2?rand(1,5)*10:0;if(L===2&&th-this.base<15)this.th=this.base+rand(20,60);
    this.shots=[];this.over=false;this.flying=false;this.anim=null;
  }
  get tol(){return [5,4,3][this.level]}
  start(){this.askAngle(`Angle Launch! Type an angle in degrees and press Check to launch. 0° points right, 90° points up, 180° points left. 3 shots per planet. `)}
  askAngle(pre=''){
    const L=this.level;
    app.say(pre+(L===2?`The launch rail is tilted to <b>${this.base}°</b>. How many degrees should the rocket <b>turn from the rail</b> to point at the planet?`:`What angle points at the planet? <small>(Shot ${this.shots.length+1} of 3)</small>`),'happy');
    app.setInput({len:3,onSubmit:v=>this.fire(v)});
  }
  fire(v){
    const dir=v+this.base;
    if(dir>180){app.oops(this.level===2?`${this.base}° + ${v}° = ${dir}°. That points underground! Try a smaller turn.`:'This protractor goes from 0° to 180°.',false);return false}
    const hit=Math.abs(dir-this.th)<=this.tol;
    this.shots.push({v,dir,hit});this.flying=true;this.anim=this.shots.length-1;app.clearInput();sound('launch');
    setTimeout(()=>this.land(hit,dir),1150);
    return true;
  }
  land(hit,dir){
    if(!mission||mission.problem!==this)return;
    this.flying=false;const n=this.shots.length;
    if(hit){const pts=[100,60,30][n-1];this.score+=pts;this.over=true;sound('win');const r=$('#work').getBoundingClientRect();burst(r.left+r.width/2,r.top+140,45);
      app.say(`<b>Direct hit!</b> The planet is at ${this.th}°${this.level===2?` (${this.base}° + ${this.th-this.base}°)`:''}. +${pts} points.`,'cheer')}
    else{
      const off=dir-this.th,side=off<0?'to the right of':'to the left of';
      if(n>=3){this.over=true;app.say(`So close! The planet was at <b>${this.th}°</b>${this.level===2?`, so the turn was ${this.th}° − ${this.base}° = <b>${this.th-this.base}°</b>`:''}. No points this time, but you'll get the next one.`,'think')}
      else{app.oops(`Your rocket went ${side} the planet, about ${Math.abs(off)}° off. Try a ${off<0?'bigger':'smaller'} angle!`,false);setTimeout(()=>{if(mission.problem===this&&!this.over){app.setInput({len:3,onSubmit:v=>this.fire(v)});renderWork()}},50)}
    }
    renderWork();
  }
  act(name){
    if(this.done)return false;
    if(name==='next'){if(!this.over)return false;if(this.round>=this.total){finishGame(this,'angles',this.total*100);return}this.next();this.askAngle();return}
    return false;
  }
  hint(){
    if(this.over)return 'Press Next to keep going.';
    const q=this.th<90?'between 0° and 90°: an acute angle':this.th>90?'between 90° and 180°: an obtuse angle':'right at 90°';
    if(this.level===2)return `First find the planet's angle from the ground. It's ${q}. Then subtract the rail's ${this.base}°.`;
    return `The planet is ${q}. Find the closest labeled line on the protractor and count the small marks.`;
  }
  html(){
    if(this.done)return `<div class="arcade"><div class="arc-sum"><div class="eq">🪐 ${this.score} points</div><p>Best score: ${(progress.gameBest||{})['angles'+this.level]||0}</p></div></div>`;
    const L=this.level;let g=`<rect width="600" height="340" rx="18" fill="#15123b"/>${STARFIELD}`;
    g+=`<path d="M${AC.x-AR} ${AC.y} A${AR} ${AR} 0 0 1 ${AC.x+AR} ${AC.y}" fill="#ffffff10" stroke="#b39bff" stroke-width="2"/>`;
    for(let d=0;d<=180;d+=5){const big=d%30===0,mid=d%10===0;if(L===1&&!big&&d%15)continue;const [x1,y1]=polar(d,AR),[x2,y2]=polar(d,AR-(big?18:mid?12:7));g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d8ccff" stroke-width="${big?2.5:1.2}"/>`;
      if((L!==1&&big)||(L===1&&(d===0||d===90||d===180))){const [tx,ty]=polar(d,AR+16);g+=`<text x="${tx}" y="${ty+5}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">${d}°</text>`}}
    g+=`<line x1="${AC.x-AR-10}" y1="${AC.y}" x2="${AC.x+AR+10}" y2="${AC.y}" stroke="#fff" stroke-width="3"/>`;
    if(L===2){const [bx,by]=polar(this.base,AR*.82);g+=`<line x1="${AC.x}" y1="${AC.y}" x2="${bx}" y2="${by}" stroke="#ffc843" stroke-width="5" stroke-linecap="round"/><text x="${bx+6}" y="${by-6}" font-size="14" font-weight="700" fill="#ffc843">rail ${this.base}°</text>`}
    const [px,py]=polar(this.th,this.dist);
    g+=`<g class="${this.over&&this.shots.length&&this.shots[this.shots.length-1].hit?'planet-hit':''}"><circle cx="${px}" cy="${py}" r="22" fill="#ff8f6b" stroke="#fff" stroke-width="2"/><ellipse cx="${px}" cy="${py}" rx="34" ry="8" fill="none" stroke="#ffc843" stroke-width="3" transform="rotate(-18 ${px} ${py})"/><circle cx="${px-7}" cy="${py-6}" r="5" fill="#ffb08f"/></g>`;
    if(this.over)g+=`<text x="${px}" y="${py-34}" text-anchor="middle" font-size="15" font-weight="700" fill="#3fdcb4">${this.th}°</text>`;
    this.shots.forEach((s,i)=>{
      const end=s.hit?this.dist-24:AR-6,[ex,ey]=polar(s.dir,end),rot=90-s.dir,last=i===this.shots.length-1;
      g+=`<line x1="${AC.x}" y1="${AC.y}" x2="${ex}" y2="${ey}" stroke="${s.hit?'#3fdcb4':'#ff6fc0'}" stroke-width="2.5" stroke-dasharray="6 6" opacity="${last?1:.5}"/>`;
      if(!last)g+=`<text x="${ex}" y="${ey-8}" text-anchor="middle" font-size="12" fill="#ff6fc0">${s.dir}°</text>`;
      if(last)g+=`<g transform="translate(${ex} ${ey})">${this.anim===i?`<animateTransform attributeName="transform" type="translate" from="${AC.x} ${AC.y}" to="${ex} ${ey}" dur="1.1s" fill="freeze"/>`:''}<g transform="rotate(${rot})">${ROCKET_G}</g></g>`;
    });
    if(!this.shots.length)g+=`<g transform="translate(${AC.x} ${AC.y-16}) rotate(${90-(L===2?this.base:90)})">${ROCKET_G}</g>`;
    this.anim=null;
    g+=`<circle cx="${AC.x}" cy="${AC.y}" r="7" fill="#ffc843" stroke="#231e52" stroke-width="2"/>`;
    const I=app.input,typing=I.active?`<span class="numbox active${shakeNext?' shake':''}">${I.buffer}<i class="caret"></i></span>°`:'';
    const top=`<div class="arc-top"><span class="arc-chip">Planet ${this.round} / ${this.total}</span><span class="arc-target">${L===2?'Turn from the rail: ':'Launch angle: '}${typing||'…'}</span><span class="arc-chip">Score ${this.score}</span></div>`;
    const shots=`<div class="shots">${[0,1,2].map(i=>{const s=this.shots[i];return `<span class="shot${s?(s.hit?' hit':' miss'):''}">${s?(s.hit?'🎯':'✕'):'🚀'}</span>`}).join('')}</div>`;
    const ctr=this.over?`<div class="arc-ctrls"><button type="button" class="btn btn-mint" data-act="next">${this.round>=this.total?'See my score':'Next planet →'}</button></div>`:'';
    return `<div class="arcade">${top}<svg class="arc-svg" viewBox="0 0 600 340" role="img" aria-label="Protractor with a planet">${g}</svg>${shots}${ctr}</div>`;
  }
}

/* ===================== missions ===================== */
const gameStarsOf=m=>m.problem&&m.problem.result?m.problem.result.stars:1;
defMission({id:'lander',zone:'math',sector:'arc',title:'Number Line Lander',sym:'🎯',color:'#ff6fc0',std:['NBT.2','NF.2','NF.6'],skill:'Land a rocket right on a number: big numbers, fractions, and decimals',guide:'comet',
  levels:['Big numbers','Fractions','Decimals'],count:()=>1,make:l=>new LanderGame(l),stars:gameStarsOf,
  manual:`<h3>Landing tips</h3><ul><li>Find the halfway point first. Is your number more or less than half?</li><li>For fractions, picture the line cut into equal parts. 3/4 is 3 of 4 parts.</li><li>For decimals, 0.5 is halfway, 0.25 is a quarter of the way.</li><li>Use ◀ ▶ to fine-tune before you land.</li></ul><p>Bullseye = 100 points. No clock, so aim carefully!</p>`});
defMission({id:'forge',zone:'math',sector:'arc',title:'Star Forge',sym:'✦',color:'#ffc843',std:['OA.3','NBT.5','NBT.6'],skill:'Combine number stars with + − × ÷ to hit the target',guide:'comet',
  levels:['Two steps','Three steps with ÷','Big numbers'],count:()=>1,make:l=>new ForgeGame(l),stars:gameStarsOf,
  manual:`<h3>Forging tips</h3><ul><li>Look at the target. Is it close to a product you know?</li><li>Multiply to get big fast, then add or subtract to fine-tune.</li><li>Stuck? Undo, Start over, or tap Hint (hints cost 25 points).</li></ul><p>There's always at least one way to make it!</p>`});
defMission({id:'angles',zone:'math',sector:'arc',title:'Angle Launch',sym:'∡',color:'#73c2ff',std:['MD.5','MD.6','MD.7'],skill:'Aim by degrees to hit a planet on a giant protractor',guide:'comet',
  levels:['Tens of degrees','Estimate with fewer marks','Turn from a tilted rail'],count:()=>1,make:l=>new AngleGame(l),stars:gameStarsOf,
  manual:`<h3>Aiming tips</h3><ul><li>0° points right, 90° points straight up, 180° points left.</li><li>Less than 90° is acute. More than 90° is obtuse.</li><li>Missed? Look at your dotted line. Is the planet to the left (bigger angle) or right (smaller angle)?</li><li>Tilted rail: the turn = the planet's angle − the rail's angle.</li></ul>`});
