'use strict';
/* ============================================================
   MATH GALAXY — missions, generators and visuals
   ============================================================ */

/* ---------- shared visuals (the notebook is always light paper) ---------- */
const svg=(w,h,inner,label='')=>`<svg class="viz" viewBox="0 0 ${w} ${h}" width="${w}" role="img"${label?` aria-label="${esc(label)}"`:''}>${inner}</svg>`;
const INK='#231e52',DIM='#6b6496',PINK='#ff6fc0',SKY='#73c2ff',MINT='#3fdcb4',GOLD='#ffc843',LAV='#b39bff';
function numHi(n,p){ // formatted number with the digit at place p highlighted
  const s=String(n),L=s.length;let out='';
  for(let i=0;i<L;i++){const pl=L-1-i;const ch=s[i];out+=pl===p?`<mark class="hi">${ch}</mark>`:ch;if(pl%3===0&&pl>0)out+=','}
  return out;
}
function pvChart(n,hi=-1,places=5){
  const L=Math.max(places,String(n).length);let th='',td='';
  for(let p=L-1;p>=0;p--){const show=p<String(n).length;th+=`<th class="pl-${p}">${PLACE_SHORT[p]||''}</th>`;td+=`<td class="pl-${p}${p===hi?' hi':''}">${show?digitAt(n,p):''}</td>`}
  return `<table class="pv"><tr>${th}</tr><tr>${td}</tr></table>`;
}
function fracBar(n,d,o={}){
  const W=o.w||320,H=o.h||38,color=o.color||PINK;const wholes=Math.max(1,Math.ceil(n/d));let g='';
  for(let k=0;k<wholes;k++){
    const y=k*(H+10);
    for(let i=0;i<d;i++){const x=2+i*(W-4)/d,filled=k*d+i<n;g+=`<rect x="${x}" y="${y+2}" width="${(W-4)/d}" height="${H}" fill="${filled?color:'#fff'}" stroke="${INK}" stroke-width="2"/>`}
  }
  return svg(W,wholes*(H+10),g,`${n} out of ${d} parts shaded`);
}
function decGrid(k,size=10,color=GOLD){ // k hundredths shaded, filling columns first
  const c=16,pad=2;let g='';
  for(let col=0;col<10;col++)for(let row=0;row<10;row++){const idx=col*10+row;g+=`<rect x="${pad+col*c}" y="${pad+row*c}" width="${c}" height="${c}" fill="${idx<k?color:'#fff'}" stroke="#b9aee6" stroke-width="1"/>`}
  g+=`<rect x="${pad}" y="${pad}" width="${c*10}" height="${c*10}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  return svg(c*10+pad*2,c*10+pad*2,g,`${k} out of 100 squares shaded`);
}
function brickArray(rows,cols,o={}){
  const s=o.s||Math.min(30,Math.floor(300/Math.max(cols,1)));let g='';
  const colors=[PINK,SKY,MINT,GOLD,LAV];
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=4+c*s,y=8+r*(s+2);const col=o.color||colors[r%colors.length];g+=`<rect x="${x}" y="${y}" width="${s-2}" height="${s-4}" rx="3" fill="${col}" stroke="${INK}" stroke-width="1.5"/><circle cx="${x+(s-2)/2}" cy="${y-1}" r="${s/7}" fill="${col}" stroke="${INK}" stroke-width="1.2"/>`}
  if(o.extra)for(let c=0;c<o.extra;c++){const x=4+c*s,y=8+rows*(s+2)+6;g+=`<rect x="${x}" y="${y}" width="${s-2}" height="${s-4}" rx="3" fill="#fff" stroke="${PINK}" stroke-width="2" stroke-dasharray="4 3"/>`}
  return svg(8+cols*s,16+(rows+(o.extra?1:0))*(s+2)+6,g,`${rows} rows of ${cols} bricks`);
}
function tape(rows){ // rows: [{label, parts:[{w,t,fill}]}]
  const unit=Math.min(46,520/Math.max(...rows.map(r=>r.parts.reduce((s,p)=>s+p.w,0))));let g='',y=6;
  rows.forEach(r=>{let x=96;g+=`<text x="88" y="${y+22}" text-anchor="end" font-size="15" font-weight="700" fill="${INK}">${r.label}</text>`;
    r.parts.forEach(p=>{const w=p.w*unit;g+=`<rect x="${x}" y="${y}" width="${w}" height="34" rx="5" fill="${p.fill||'#fff'}" stroke="${INK}" stroke-width="2"/><text x="${x+w/2}" y="${y+23}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${p.t}</text>`;x+=w});
    y+=46});
  const W=96+Math.max(...rows.map(r=>r.parts.reduce((s,p)=>s+p.w,0)))*unit+10;
  return svg(W,y,g,'tape diagram');
}

/* ===================== column arithmetic engines ===================== */
function regroups(a,b){let c=0,br=0;while(a>0){const x=a%10-br,y=b%10;if(x<y){c++;br=1}else br=0;a=Math.floor(a/10);b=Math.floor(b/10)}return c}
function carries(a,b){let c=0,cr=0;while(a>0||b>0){const s=a%10+b%10+cr;if(s>=10){c++;cr=1}else cr=0;a=Math.floor(a/10);b=Math.floor(b/10)}return c}
function genSub(l){
  for(;;){
    let a,b;
    if(l===0){if(Math.random()<.5){a=rand(31,98);b=rand(11,a-1)}else{a=rand(210,999);b=rand(101,a-1)}if(digitAt(b,0)<=digitAt(a,0)||regroups(a,b)<1||a-b<10)continue}
    else if(l===1){
      a=Math.random()<.5?rand(201,999):rand(1001,9899);a-=digitAt(a,1)*10;
      if(a>=1000&&Math.random()<.45)a-=digitAt(a,2)*100;
      b=rand(Math.ceil(a/4),a-1);if(b<10||digitAt(b,0)<=digitAt(a,0)||a-b<10)continue;
    }else{
      a=rand(10001,99999);if(Math.random()<.5)a-=digitAt(a,1)*10+digitAt(a,2)*100;
      b=rand(Math.ceil(a/5),a-1);if(b<1000||regroups(a,b)<2||a-b<100)continue;
    }
    return [a,b];
  }
}
function genAdd(l){
  for(;;){
    let a,b;
    if(l===0){a=rand(105,899);b=rand(105,899);if(carries(a,b)<1||a+b>999)continue}
    else if(l===1){a=rand(1005,8999);b=rand(105,8999);if(carries(a,b)<2||a+b>9999)continue}
    else{a=rand(10005,79999);b=rand(1005,59999);if(carries(a,b)<2||a+b>100000)continue}
    return [a,b];
  }
}
class SubProblem{
  constructor([a,b],level){
    this.a=a;this.b=b;this.level=level;this.ans=a-b;this.n=String(a).length;this.L=String(this.ans).length;
    this.top=[];this.bot=[];for(let p=0;p<this.n;p++){this.top.push(digitAt(a,p));this.bot.push(p<String(b).length?digitAt(b,p):null)}
    this.cur=this.top.slice();this.marks=this.top.map(()=>[]);this.res=Array(this.n).fill(null);
    this.c=0;this.hintLvl=0;this.glow=null;this.done=false;
  }
  bv(p){return this.bot[p]??0}
  needs(){return this.cur[this.c]<this.bv(this.c)}
  lender(){let k=this.c+1;while(k<this.n&&this.cur[k]===0)k++;return k}
  start(){this.prompt(`Let's solve <b>${fmt(this.a)} − ${fmt(this.b)}</b>. We always start in the <b>ones</b> place. `)}
  prompt(pre=''){
    const p=this.c,t=this.cur[p],b=this.bv(p);this.hintLvl=0;this.glow=null;
    let msg;
    if(this.level===0&&this.needs()&&!this.marks[p].length)msg=`<b>${cap(PLACE[p])}:</b> ${t} − ${b}? ${t} is smaller than ${b}, so we need to <b>regroup</b>. Tap the ${PLACE[this.lender()]} digit to borrow.`;
    else if(this.marks[p].length||(!this.needs()&&this.level===0))msg=`<b>${cap(PLACE[p])}:</b> what is ${t} − ${b}?`;
    else msg=`<b>${cap(PLACE[p])}:</b> ${t} − ${b}. Can you take ${b} from ${t}? If yes, type the answer. If not, tap a digit to regroup.`;
    app.say(pre+msg,PRAISE.some(x=>pre.includes(x))?'cheer':'happy');
    app.setInput({len:1,onSubmit:v=>this.answer(v)});
  }
  answer(v){
    const p=this.c,t=this.cur[p],b=this.bv(p);
    if(t<b){
      const L=PLACE[this.lender()];
      if(v===b-t)app.oops(`Careful! It's always <b>top minus bottom</b>. ${t} is smaller than ${b}, so we can't take ${b} away yet. Tap the ${L} digit to regroup first.`);
      else app.oops(`${t} is smaller than ${b}, so we can't take ${b} away yet. Tap the ${L} digit to regroup first.`);
      return false;
    }
    if(v===t-b){
      this.res[p]=v;this.c++;
      if(this.c>=this.L){this.finish();return true}
      this.prompt(app.praise()+`Now the <b>${PLACE[this.c]}</b> place. `);return true;
    }
    if(Math.abs(v-(t-b))===1)app.oops(`Off by just one! Count up from ${b} to ${t}.`);
    else app.oops(`What number do you add to ${b} to make ${t}?`);
    return false;
  }
  act(name,v){
    if(name!=='tap'||this.done)return false;
    const k=+v,p=this.c,t=this.cur[p],b=this.bv(p);
    if(k===p){app.say(`To regroup, tap the digit to the <b>left</b>, in the ${PLACE[p+1]??PLACE[p]} place.`,'think');return}
    if(k<p){app.say(`The ${PLACE[k]} place is already done! We're working on the <b>${PLACE[p]}</b> place now.`,'think');return}
    if(!this.needs()){app.say(`No need to regroup here. ${t} is big enough to take away ${b}. Just type ${t} − ${b}.`,'think');return}
    const n=this.lender();
    if(k===n){
      this.cur[k]--;this.marks[k].push(this.cur[k]);this.cur[k-1]+=10;this.marks[k-1].push(this.cur[k-1]);sound('pop');this.glow=null;
      if(k-1===p){app.say(`<b>Regrouped!</b> 1 ${UNIT[k]} became 10 ${PLACE[p]}. The ${PLACE[k]} went down by 1, and the ${PLACE[p]} went up by 10. Now: <b>${this.cur[p]} − ${b}</b> = ?`,'cheer');this.hintLvl=0}
      else app.say(`Nice! 1 ${UNIT[k]} became 10 ${PLACE[k-1]}. Now the ${PLACE[k-1]} place has something to share. <b>Tap the ${PLACE[k-1]} digit</b> to regroup again.`,'cheer');
      return;
    }
    if(k>n){app.say(`Grab the <b>closest</b> neighbor that has something to lend: the ${PLACE[n]} place.`,'think');return}
    app.say(`The ${PLACE[k]} place has <b>0</b>, so it has nothing to lend yet! It has to borrow from the ${PLACE[n]} place first. Tap the ${PLACE[n]} digit.`,'think');
  }
  finish(){
    this.done=true;
    const zeroNote=this.L<this.n?` (The leftover places end up 0, and we don't write zeros at the front.)`:'';
    app.solved(`<b>${fmt(this.a)} − ${fmt(this.b)} = ${fmt(this.ans)}</b>.${zeroNote}`);
  }
  hint(){
    const p=this.c,t=this.cur[p],b=this.bv(p),l=this.hintLvl++;
    if(this.needs()){
      const n=this.lender();
      if(l===0)return `${t} is smaller than ${b}. When the top digit is too small, we <b>regroup</b>: borrow 1 from the neighbor on the left.`;
      this.glow=n;return `Tap the glowing <b>${PLACE[n]}</b> digit to borrow from it.`;
    }
    if(l===0)return `Start at ${b} and count up to ${t}. How many jumps is that?`;
    if(l===1)return `Think: ${b} + ? = ${t}.`;
    return `${t} − ${b} = ${t-b}. Type <b>${t-b}</b>!`;
  }
  html(){
    const n=this.n,I=app.input;let h=`<div class="sub-grid" style="--n:${n}">`;
    h+=`<div></div>`;for(let p=n-1;p>=0;p--)h+=`<div class="sg sg-label pl-${p}">${PLACE_SHORT[p]}</div>`;
    h+=`<div></div>`;for(let p=n-1;p>=0;p--){const m=this.marks[p];h+=`<div class="sg sg-marks pl-${p}">${m.map((v,i)=>i<m.length-1?`<s>${v}</s>`:`<span>${v}</span>`).join('')}</div>`}
    h+=`<div class="sg sg-num sg-sign"></div>`;
    for(let p=n-1;p>=0;p--)h+=`<div class="sg sg-num pl-${p}"><button type="button" class="tdig${this.marks[p].length?' crossed':''}${this.glow===p?' glow':''}" data-act="tap" data-v="${p}" aria-label="${PLACE[p]} digit ${this.top[p]}">${this.top[p]}</button></div>`;
    h+=`<div class="sg sg-num sg-sign">−</div>`;
    for(let p=n-1;p>=0;p--)h+=`<div class="sg sg-num pl-${p}">${this.bot[p]??''}</div>`;
    h+=`<div class="sg-rule"></div><div></div>`;
    for(let p=n-1;p>=0;p--){
      let inner='';
      if(p<this.L){
        if(this.res[p]!==null)inner=`<div class="abox done">${this.res[p]}</div>`;
        else if(p===this.c&&!this.done)inner=`<div class="abox active${shakeNext?' shake':''}">${I.buffer}<i class="caret"></i></div>`;
        else inner=`<div class="abox"></div>`;
      }
      h+=`<div class="sg sg-ans pl-${p}">${inner}</div>`;
    }
    h+=`</div>`;
    if(this.done)h+=`<p class="check-line">Check with addition: ${fmt(this.ans)} + ${fmt(this.b)} = ${fmt(this.a)} ✓</p>`;
    return h;
  }
}
// Column addition for two or more numbers: one place at a time, right to left, with carries.
// Used on its own (Carry Cargo, Homework Helper) and inside other problems via o.onDone.
class ColAdd{
  constructor(nums,level=1,o={}){
    this.nums=nums;this.level=level;this.o=o;this.ans=nums.reduce((s,x)=>s+x,0);this.n=String(this.ans).length;
    this.last=Math.max(...nums.map(x=>String(x).length))-1;
    this.rows=nums.map(x=>{const L=String(x).length;return Array.from({length:this.n},(_,p)=>p<L?digitAt(x,p):null)});
    this.carry=Array(this.n+1).fill(0);this.res=Array(this.n).fill(null);this.c=0;this.hintLvl=0;this.done=false;
  }
  get a(){return this.nums[0]}
  get b(){return this.nums[1]}
  sum(p){return this.rows.reduce((s,r)=>s+(r[p]??0),0)+this.carry[p]}
  parts(p){
    const ds=this.rows.map(r=>r[p]).filter(x=>x!==null),nz=ds.length>2?ds.filter(x=>x):ds;
    return [...(this.carry[p]?[this.carry[p]]:[]),...(nz.length?nz:ds)];
  }
  eq(){return this.nums.map(fmt).join(' + ')}
  start(pre){this.prompt(pre??`Let's add <b>${this.eq()}</b>. Start in the <b>ones</b> place. `)}
  prompt(pre=''){
    const p=this.c;this.hintLvl=0;
    const carryNote=this.carry[p]?` (don't forget the carried ${this.carry[p]}!)`:'';
    app.say(pre+`<b>${cap(PLACE[p])}:</b> ${this.parts(p).join(' + ')} = ?${carryNote}`,PRAISE.some(x=>pre.includes(x))?'cheer':'happy');
    app.setInput({len:String(this.sum(p)).length,onSubmit:v=>this.answer(v)});
  }
  answer(v){
    const p=this.c,s=this.sum(p);
    if(v===s){
      let msg='';const up=Math.floor(s/10);
      if(s>=10&&p<this.last){this.res[p]=s%10;this.carry[p+1]=up;msg=`${s} ${PLACE[p]} = ${up} ${up>1?PLACE[p+1]:UNIT[p+1]} and ${s%10} ${PLACE[p]}. Write the <b>${s%10}</b> and carry the <b>${up}</b> to the ${PLACE[p+1]}. `}
      else if(s>=10){this.res[p]=s%10;this.res[p+1]=up}
      else this.res[p]=s;
      this.c++;
      if(this.c>this.last){this.finish();return true}
      this.prompt(app.praise()+msg+`Now the <b>${PLACE[this.c]}</b>. `);return true;
    }
    const cr=this.carry[p];
    if(cr&&v===s-cr)app.oops(`Don't forget the carried ${cr} on top of the ${PLACE[p]}!`);
    else if(s>=10&&v===s%10)app.oops(`${v} is only part of it. Type the whole column total (it's more than 9).`);
    else if(Math.abs(v-s)===1)app.oops(`Off by one! Add the column again: ${this.parts(p).join(' + ')}.`);
    else app.oops(`Add the column again: ${this.parts(p).join(' + ')}.`);
    return false;
  }
  finish(){
    this.done=true;
    if(this.o.onDone)this.o.onDone();
    else app.solved(`<b>${this.eq()} = ${fmt(this.ans)}</b>.`);
  }
  hint(){
    const p=this.c,s=this.sum(p),l=this.hintLvl++,ps=this.parts(p);
    if(ps.length<2)return `There's only ${ps[0]} in this column, so the answer is <b>${s}</b>.`;
    if(l===0)return `Add two numbers first: ${ps[0]} + ${ps[1]} = ${ps[0]+ps[1]}${ps.length>2?`, then add ${ps.slice(2).join(', then ')}`:''}.`;
    if(l===1&&s>=10)return `The column adds up to more than 9. That means you'll carry to the next place.`;
    return `${ps.join(' + ')} = <b>${s}</b>.`;
  }
  html(){
    const n=this.n,I=app.input,R=this.rows.length;let h=`<div class="sub-grid" style="--n:${n}">`;
    h+=`<div></div>`;for(let p=n-1;p>=0;p--)h+=`<div class="sg sg-label pl-${p}">${PLACE_SHORT[p]}</div>`;
    h+=`<div></div>`;for(let p=n-1;p>=0;p--)h+=`<div class="sg sg-marks pl-${p}">${this.carry[p]?`<span>${this.carry[p]}</span>`:''}</div>`;
    this.rows.forEach((row,k)=>{
      h+=`<div class="sg sg-num sg-sign">${k===R-1?'+':''}</div>`;
      for(let p=n-1;p>=0;p--)h+=`<div class="sg sg-num pl-${p}${p===this.c&&!this.done?' cur':''}">${row[p]??''}</div>`;
    });
    h+=`<div class="sg-rule"></div><div></div>`;
    for(let p=n-1;p>=0;p--){
      let inner;
      if(this.res[p]!==null)inner=`<div class="abox done">${this.res[p]}</div>`;
      else if(p===this.c&&!this.done)inner=`<div class="abox active${shakeNext?' shake':''}" style="${I.buffer.length>1?'font-size:calc(var(--cell)*.5)':''}">${I.buffer}<i class="caret"></i></div>`;
      else inner=p<=this.last?`<div class="abox"></div>`:'';
      h+=`<div class="sg sg-ans pl-${p}">${inner}</div>`;
    }
    return h+`</div>`;
  }
}
class AddProblem extends ColAdd{
  constructor(pair,level){super(pair,level)}
  html(){
    let h=super.html();
    if(this.done&&this.nums.length===2)h+=`<p class="check-line">Check with subtraction: ${fmt(this.ans)} − ${fmt(this.b)} = ${fmt(this.a)} ✓</p>`;
    return h;
  }
}
// Should this sum be worked in columns? Yes once it is more than a single-digit fact.
const colWorthy=nums=>nums.reduce((s,x)=>s+x,0)>=10&&(nums.some(x=>x>=10)||nums.length>2);
/* ---- multiplication: area model ---- */
function genMul(l){
  for(;;){
    let A,B;
    if(l===0){A=rand(12,99);B=rand(3,9)}
    else if(l===1){A=Math.random()<.6?rand(102,999):rand(1012,4999);B=rand(3,9)}
    else{if(Math.random()<.5){A=rand(12,99);B=rand(12,79)}else{A=rand(102,899);B=rand(12,59)}}
    if(A%10===0||B%10===0)continue;
    return [A,B];
  }
}
function partsOf(N){const ds=digitsOf(N),L=ds.length,out=[];ds.forEach((d,i)=>{const z=L-1-i;if(d)out.push({d,z,v:d*10**z})});return out}
class MulProblem{
  constructor([A,B],level){
    this.A=A;this.B=B;this.level=level;this.ans=A*B;this.ap=partsOf(A);this.bp=B>=10?partsOf(B):[{d:B,z:0,v:B}];
    this.queue=[...this.ap.map((_,i)=>['a',i]),...(B>=10?this.bp.map((_,i)=>['b',i]):[])];
    this.filled={a:[],b:[]};this.eIdx=0;
    this.boxes=[];this.bp.forEach(b=>this.ap.forEach(a=>this.boxes.push({a,b,val:null})));
    this.bIdx=0;this.stage='expand';this.hintLvl=0;this.done=false;
  }
  start(){this.askExpand(`Let's solve <b>${fmt(this.A)} × ${this.B}</b> with rocket panels! `)}
  askExpand(pre=''){
    const [w,k]=this.queue[this.eIdx],N=w==='a'?this.A:this.B,part=(w==='a'?this.ap:this.bp)[k];this.hintLvl=0;
    const first=k===0?`First, break <b>${fmt(N)}</b> into place values. `:'';
    app.say(pre+first+`The <b>${part.d}</b> is in the <b>${PLACE[part.z]}</b> place. How much is it worth?`,pre&&PRAISE.some(x=>pre.includes(x))?'cheer':'happy');
    app.setInput({len:String(part.v).length,onSubmit:v=>this.answerExpand(v)});
  }
  answerExpand(v){
    const [w,k]=this.queue[this.eIdx],part=(w==='a'?this.ap:this.bp)[k];
    if(v===part.v){
      this.filled[w][k]=true;this.eIdx++;
      if(this.eIdx<this.queue.length){this.askExpand(app.praise());return true}
      this.stage='boxes';this.bIdx=this.nextBox();this.askBox(app.praise()+`Now fill each rocket panel by multiplying. We'll start with the smallest one. <small>(You can tap any panel to do it first.)</small> `);return true;
    }
    if(v===part.d)app.oops(`That's the digit! But it's in the ${PLACE[part.z]} place, so it's worth ${part.d} ${PLACE[part.z]}. Add zeros to show that.`);
    else if(v%part.d===0&&/^10*$/.test(String(v/part.d)))app.oops(`${fmt(v)} is ${part.d} ${PLACE[String(v/part.d).length-1]}. This ${part.d} is in the <b>${PLACE[part.z]}</b> place.`);
    else app.oops(`${part.d} ${PLACE[part.z]} = ${part.d} × ${fmt(10**part.z)}. What number is that?`);
    return false;
  }
  // smallest (ones) panel first: the bottom-right one, then leftward and upward
  nextBox(){for(let k=this.boxes.length-1;k>=0;k--)if(this.boxes[k].val===null)return k;return -1}
  act(name,v){
    if(name!=='box'||this.stage!=='boxes'||this.done)return false;
    const k=+v;if(!this.boxes[k]||this.boxes[k].val!==null||k===this.bIdx)return false;
    this.bIdx=k;sound('pop');this.askBox();
  }
  askBox(pre=''){
    const bx=this.boxes[this.bIdx];this.hintLvl=0;
    const z=bx.a.z+bx.b.z;
    const tip=this.level===0&&z>0?` Tip: do ${bx.a.d} × ${bx.b.d} first, then add ${z} zero${z>1?'s':''}.`:'';
    app.say(pre+`<b>${fmt(bx.a.v)} × ${fmt(bx.b.v)}</b> = ?`+tip,pre?'cheer':'happy');
    app.setInput({len:String(bx.a.v*bx.b.v).length,onSubmit:v=>this.answerBox(v)});
  }
  answerBox(v){
    const bx=this.boxes[this.bIdx],fact=bx.a.d*bx.b.d,z=bx.a.z+bx.b.z;
    if(v===bx.a.v*bx.b.v){
      bx.val=v;this.bIdx=this.nextBox();
      if(this.bIdx>=0){this.askBox(app.praise());return true}
      this.stage='sum';this.askSum(app.praise());return true;
    }
    if(v===fact&&z>0)app.oops(`You found ${bx.a.d} × ${bx.b.d} = ${fact}. Great start! Now add the ${z} zero${z>1?'s':''} from ${fmt(bx.a.v)} and ${fmt(bx.b.v)}.`);
    else if(v%fact===0&&/^10*$/.test(String(v/fact)))app.oops(`Count the zeros again! ${fmt(bx.a.v)} and ${fmt(bx.b.v)} have ${z} zero${z===1?'':'s'} in all.`);
    else app.oops(`Start with the basic fact: ${bx.a.d} × ${bx.b.d}.${z?` Then add ${z} zero${z>1?'s':''}.`:''}`);
    return false;
  }
  sumOrder(){return this.boxes.map(b=>b.val).sort((x,y)=>y-x)}
  askSum(pre=''){
    this.hintLvl=0;
    this.col=new ColAdd(this.sumOrder(),1,{onDone:()=>this.finishSum()});
    this.col.start(pre+`Last step: <b>add up all the panels</b>. They're lined up by place value below. Start with the <b>ones</b>. `);
  }
  finishSum(){this.done=true;this.stage='done';app.solved(`<b>${fmt(this.A)} × ${fmt(this.B)} = ${fmt(this.ans)}</b>. You built it from ${this.boxes.length} panels!`)}
  hint(){
    const l=this.hintLvl++;
    if(this.stage==='expand'){
      const [w,k]=this.queue[this.eIdx],part=(w==='a'?this.ap:this.bp)[k];
      if(l===0)return `${part.d} ${PLACE[part.z]} means ${part.d} × ${fmt(10**part.z)}.`;
      return `${part.d} ${PLACE[part.z]} is <b>${fmt(part.v)}</b>.`;
    }
    if(this.stage==='boxes'){
      const bx=this.boxes[this.bIdx],z=bx.a.z+bx.b.z,fact=bx.a.d*bx.b.d;
      if(l===0)return z?`Cover up the zeros and multiply ${bx.a.d} × ${bx.b.d}. Then put ${z} zero${z>1?'s':''} back on the end.`:`What is ${bx.a.d} × ${bx.b.d}? Skip-count by ${bx.b.d}s if you need to.`;
      if(l===1&&z)return `${bx.a.d} × ${bx.b.d} = ${fact}. Now add ${z} zero${z>1?'s':''}.`;
      return `${fmt(bx.a.v)} × ${fmt(bx.b.v)} = <b>${fmt(bx.a.v*bx.b.v)}</b>.`;
    }
    this.hintLvl--;return this.col.hint();
  }
  expandHtml(w){
    const N=w==='a'?this.A:this.B,parts=w==='a'?this.ap:this.bp,ds=digitsOf(N),I=app.input;
    const whole=ds.map((d,i)=>{const z=ds.length-1-i;return `<span class="pl-${z}" style="${d?'':'color:var(--paper-dim)'}">${d}</span>`}).join('');
    const boxes=parts.map((p,k)=>{
      const idx=this.queue.findIndex(q=>q[0]===w&&q[1]===k);
      if(this.filled[w][k])return `<span class="part done pl-${p.z}">${fmt(p.v)}</span>`;
      if(this.stage==='expand'&&idx===this.eIdx)return `<span class="part active pl-${p.z}${shakeNext?' shake':''}">${I.buffer}<i class="caret"></i></span>`;
      return `<span class="part pl-${p.z}">?</span>`;
    }).join('<span>+</span>');
    return `<div class="expand"><span class="whole">${whole}</span><span>=</span>${boxes}</div>`;
  }
  html(){
    const I=app.input;let h=`<div class="mul"><div class="expand" style="font-size:clamp(1.8rem,7vw,2.6rem)">${fmt(this.A)} × ${this.B}${this.done?` = <span style="color:var(--good-ink)">${fmt(this.ans)}</span>`:''}</div>`;
    h+=this.expandHtml('a');if(this.B>=10)h+=this.expandHtml('b');
    if(this.stage!=='expand'){
      h+=`<div class="area" style="grid-template-columns:auto repeat(${this.ap.length},minmax(0,1fr))"><div class="hd corner">×</div>`;
      this.ap.forEach(a=>h+=`<div class="hd pl-${a.z}">${fmt(a.v)}</div>`);
      this.bp.forEach((b,j)=>{
        h+=`<div class="hd pl-${b.z}">${fmt(b.v)}</div>`;
        this.ap.forEach((a,i)=>{
          const k=j*this.ap.length+i,bx=this.boxes[k];let cls='box',val='?';
          if(bx.val!==null){cls+=' done';val=fmt(bx.val)}
          else if(this.stage==='boxes'&&k===this.bIdx){cls+=' active'+(shakeNext?' shake':'');val=`${I.buffer}<i class="caret"></i>`}
          else if(this.stage==='boxes'){h+=`<button type="button" class="box tap" data-act="box" data-v="${k}" aria-label="Do ${fmt(a.v)} × ${fmt(b.v)} next"><small>${fmt(a.v)} × ${fmt(b.v)}</small><b>?</b></button>`;return}
          h+=`<div class="${cls}"><small>${fmt(a.v)} × ${fmt(b.v)}</small><b>${val}</b></div>`;
        });
      });
      h+=`</div>`;
    }
    if(this.col)h+=`<p class="legend">Add the panels</p><div class="col-wrap">${this.col.html()}</div>`;
    return h+`</div>`;
  }
}
/* ---- long division ---- */
function genDiv(l){
  if(l===0){const d=rand(2,5);const q=rand(11,Math.floor(99/d));return [q*d,d]}
  if(l===1){const d=rand(3,9);return [rand(100,999),d]}
  const d=rand(3,9);return [rand(1000,9999),d];
}
class DivProblem{
  constructor([N,d],level){
    this.N=N;this.d=d;this.level=level;this.D=digitsOf(N);this.n=this.D.length;this.Q=Math.floor(N/d);this.R=N%d;
    let i=0,cur=this.D[0];this.grouped=false;
    while(cur<d&&i<this.n-1){i++;cur=cur*10+this.D[i];this.grouped=true}
    this.steps=[];
    for(;;){const q=Math.floor(cur/d),prod=q*d,rem=cur-prod;this.steps.push({col:i,cur,q,prod,rem});if(i===this.n-1)break;i++;cur=rem*10+this.D[i]}
    this.si=0;this.phase='divide';this.hintLvl=0;this.glowChip=null;this.done=false;
  }
  get s(){return this.steps[this.si]}
  start(){
    const pre=`Let's solve <b>${fmt(this.N)} ÷ ${this.d}</b>. `+(this.grouped?`${this.d} can't fit into ${this.D.slice(0,this.s.col).join('')}, so we start with the first ${this.s.col+1} digits: <b>${this.s.cur}</b>. `:'');
    this.ask(pre);
  }
  ask(pre=''){
    const s=this.s,d=this.d;this.hintLvl=0;this.glowChip=null;const mood=pre&&PRAISE.some(x=>pre.includes(x))?'cheer':'happy';
    if(this.phase==='divide'){app.say(pre+`<b>Divide:</b> how many ${d}s fit into <b>${s.cur}</b>?`,mood);app.setInput({len:1,onSubmit:v=>this.answer(v)})}
    else if(this.phase==='multiply'){app.say(pre+`<b>Multiply:</b> ${s.q} × ${d} = ? Write it under ${s.cur}.`,mood);app.setInput({len:String(s.prod).length,onSubmit:v=>this.answer(v)})}
    else if(this.phase==='subtract'){app.say(pre+`<b>Subtract:</b> ${s.cur} − ${s.prod} = ?`,mood);app.setInput({len:String(s.rem).length,onSubmit:v=>this.answer(v)})}
    else if(this.phase==='bring'){app.say(pre+`<b>Bring down</b> the next digit, the <b>${this.D[s.col+1]}</b>. Tap the blue button.`,mood);app.clearInput();app.enter=()=>{this.bring();renderWork()}}
  }
  answer(v){
    const s=this.s,d=this.d;
    if(this.phase==='divide'){
      if(v===s.q){this.phase='multiply';this.ask(app.praise());return true}
      if(v*d>s.cur)app.oops(`${v} × ${d} = ${v*d}. That's more than ${s.cur}, so ${v} is too many.`);
      else app.oops(`${v} × ${d} = ${v*d}. There's still room for another ${d} in ${s.cur}. Try a bigger number!`);
      return false;
    }
    if(this.phase==='multiply'){
      if(v===s.prod){this.phase='subtract';this.ask(app.praise());return true}
      app.oops(s.q===0?`Zero times any number is 0.`:`Find ${s.q} × ${d} in the times table helper below.`);return false;
    }
    if(v===s.rem){
      if(this.si===this.steps.length-1){this.finish();return true}
      this.phase='bring';this.ask(app.praise());return true;
    }
    app.oops(`Start at ${s.prod} and count up to ${s.cur}. How far is it?`);return false;
  }
  act(name){if(name!=='bring')return false;this.bring()}
  bring(){
    if(this.phase!=='bring')return;
    sound('pop');this.si++;this.phase='divide';this.ask(`Down it comes! Now we have <b>${this.s.cur}</b>. `);
  }
  finish(){
    this.done=true;this.phase='done';const R=this.R;
    app.solved(`<b>${fmt(this.N)} ÷ ${this.d} = ${fmt(this.Q)}${R?' R '+R:''}</b>. `+(R?`The ${R} left over is the <b>remainder</b>. `:'')+`Check: ${fmt(this.Q)} × ${this.d}${R?' + '+R:''} = ${fmt(this.N)} ✓`);
  }
  hint(){
    const s=this.s,d=this.d,l=this.hintLvl++;
    if(this.phase==='divide'){
      if(s.q===0)return l===0?`Is ${d} bigger than ${s.cur}? Then ${d} fits 0 times.`:`${d} doesn't fit into ${s.cur} at all. Type <b>0</b>.`;
      if(l===0)return `In the times table helper, find the biggest answer that is <b>not more than ${s.cur}</b>.`;
      this.glowChip=s.q;return `${s.q} × ${d} = ${s.prod}. That fits in ${s.cur}! Type <b>${s.q}</b>.`;
    }
    if(this.phase==='multiply'){if(l===0){this.glowChip=s.q;return `Look at the glowing fact in the times table helper.`}return `${s.q} × ${d} = <b>${s.prod}</b>.`}
    if(this.phase==='subtract'){if(l===0)return `Start at ${s.prod} and count up to ${s.cur}.`;return `${s.cur} − ${s.prod} = <b>${s.rem}</b>.`}
    if(this.phase==='bring')return `Tap the blue <b>Bring down</b> button to slide the ${this.D[s.col+1]} down next to the ${s.rem}.`;
    return '';
  }
  html(){
    const n=this.n,C=n+4,I=app.input,S=this.steps,si=this.si,ph=this.phase,rows=[];
    const mk=()=>Array.from({length:C},()=>({t:'',c:''}));
    const put=(row,str,end,cls)=>{str=String(str);for(let k=0;k<str.length;k++)row[end-str.length+1+k]={t:str[k],c:cls};return end-str.length+1};
    const slots=(row,len,end,extra='')=>{for(let k=0;k<len;k++){const ch=I.buffer[k]??'';row[end-len+1+k]={t:ch,c:'slot'+(k===I.buffer.length?' caret-on':'')+extra+(shakeNext?' shake':'')}}return end-len+1};
    const qr=mk();
    S.forEach((s,k)=>{const col=2+s.col;if(k<si||(k===si&&ph!=='divide'))qr[col]={t:s.q,c:'q'};else if(k===si&&!this.done)slots(qr,1,col)});
    if(this.done&&this.R){qr[2+n]={t:'R',c:'q rlabel'};qr[3+n]={t:this.R,c:'q rem'}}
    rows.push(qr);
    const dr=mk();dr[0]={t:this.d,c:'divisor'};this.D.forEach((x,k)=>dr[2+k]={t:x,c:'dd'+(k===0?' dd-first':'')});
    if(si===0&&ph==='divide')for(let k=0;k<=S[0].col;k++)dr[2+k].c+=' focus';
    rows.push(dr);
    S.forEach((s,k)=>{
      if(k>si)return;const end=2+s.col;
      const activeProd=k===si&&ph==='multiply',showProd=k<si||['subtract','bring','done'].includes(ph);
      if(showProd||activeProd){const pr=mk();const st=activeProd?slots(pr,String(s.prod).length,end,' under'):put(pr,s.prod,end,'under');pr[st-1]={t:'−',c:'minus'};rows.push(pr)}
      const activeDiff=k===si&&ph==='subtract',showDiff=k<si||['bring','done'].includes(ph);
      if(showDiff||activeDiff){
        const r=mk();
        if(activeDiff)slots(r,String(s.rem).length,end);
        else put(r,s.rem,end,(s.rem===0&&k<si)?'ghost':(this.done&&k===S.length-1?'rem':''));
        if(k<si)r[end+1]={t:this.D[s.col+1],c:'brought'};
        if(k===si-1&&ph==='divide')r.forEach(c=>{if(c.t!=='')c.c+=' focus'});
        rows.push(r);
      }
    });
    const phases=['divide','multiply','subtract','bring'],names=['Divide','Multiply','Subtract','Bring down'];
    let h=`<div class="dmsb">${phases.map((p,i)=>`<span class="${p===ph?'on':''}">${names[i]}</span>`).join('')}</div>`;
    h+=`<p class="dmsb-cap"><b>D</b>aring <b>M</b>issions <b>S</b>oar <b>B</b>eyond!</p>`;
    h+=`<div class="ld-wrap"><div class="ld" style="--cols:${C}">`+rows.map(r=>r.map(c=>`<div class="ldc ${c.c}">${c.t}</div>`).join('')).join('')+`</div></div>`;
    if(ph==='bring')h+=`<button type="button" class="bring-btn" data-act="bring">Bring down the ${this.D[this.s.col+1]} ⬇</button>`;
    h+=`<div class="helper-table"><p>Times table helper: ${this.d}s</p><div class="chips">`;
    for(let k=0;k<=9;k++)h+=`<span class="chip${this.glowChip===k?' glow':''}">${k} × ${this.d} = ${k*this.d}</span>`;
    return h+`</div></div>`;
  }
}

/* ===================== number words ===================== */
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const w99=n=>n<20?ONES[n]:TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:'');
const w999=n=>{const h=Math.floor(n/100),r=n%100;return [h?ONES[h]+' hundred':'',r?w99(r):''].filter(Boolean).join(' ')};
function words(n){if(n===0)return 'zero';const th=Math.floor(n/1000),r=n%1000;return [th?w999(th)+' thousand':'',r?w999(r):''].filter(Boolean).join(th&&r?', ':' ')}
function expanded(n){return digitsOf(n).map((d,i,a)=>d*10**(a.length-1-i)).filter(Boolean).map(fmt).join(' + ')}

/* ===================== place value generators ===================== */
function genTenx(l){
  if(l===0){
    const n=rand(1000,9999+Math.floor(Math.random()*2)*80000);let p;do{p=rand(0,String(n).length-1)}while(digitAt(n,p)===0);
    const d=digitAt(n,p),ans=d*10**p;
    return {key:'t'+n+p,text:`What is the value of the highlighted digit in <b>${numHi(n,p)}</b>?`,viz:pvChart(n,p),
      steps:[numStep(`What is the highlighted <b>${d}</b> worth?`,ans,{hints:[`Look at the chart. The ${d} is in the ${PLACE[p]} place.`,`${d} ${PLACE[p]} = ${d} × ${fmt(10**p)} = ${fmt(ans)}.`],
        wrong:v=>v===d?`That's the digit. In the ${PLACE[p]} place it's worth more!`:(v%d===0&&/^10*$/.test(String(v/d)))?`${fmt(v)} would be ${d} ${PLACE[String(v/d).length-1]}. Count places from the right: ones, tens, hundreds...`:`Which place is the ${d} in? Check the chart.`})],
      summary:`The ${d} in ${fmt(n)} is worth <b>${fmt(ans)}</b>.`};
  }
  if(l===1){
    const t=rand(0,2);
    if(t===0){const d=rand(2,9),n=d*1110;return {key:'r'+n,text:`Look at <b>${fmt(n)}</b>. The ${d} in the <b>hundreds</b> place is worth how many times as much as the ${d} in the <b>tens</b> place?`,viz:pvChart(n,2,4),
      steps:[numStep('How many times as much?',10,{hints:[`The hundreds ${d} is worth ${d*100}. The tens ${d} is worth ${d*10}.`,`${d*10} × 10 = ${d*100}. One place to the left means 10 times as much.`],wrong:v=>v===100?'Hundreds is just ONE place left of tens. One place left = 10 times as much.':`Compare ${d*100} and ${d*10}.`})],
      summary:`Each place is worth <b>10 times</b> the place to its right: ${d*100} = 10 × ${d*10}.`}}
    if(t===1){const d=rand(2,9),p=rand(1,3),big=d*10**p,small=big/10;const askBig=Math.random()<.5;
      return askBig?{key:'m'+big,text:`<b>${fmt(big)}</b> is how many times as much as <b>${fmt(small)}</b>?`,steps:[numStep('How many times?',10,{hints:['Multiply the smaller number by 10. What do you get?'],wrong:()=>`What number times ${fmt(small)} makes ${fmt(big)}?`})],summary:`${fmt(big)} = 10 × ${fmt(small)}.`}
        :{key:'s'+big,text:`<b>${fmt(big)}</b> is 10 times as much as what number?`,steps:[numStep('What number?',small,{hints:['Ten times as much means one place to the left. Go one place to the right instead.',`${fmt(small)} × 10 = ${fmt(big)}.`]})],summary:`${fmt(big)} is 10 times ${fmt(small)}.`}}
    const unit=pick([[1,'tens',10],[2,'hundreds',100]]);const n=rand(12,99)*unit[2];
    return {key:'h'+n,text:`How many <b>${unit[1]}</b> are in <b>${fmt(n)}</b>?`,viz:pvChart(n,unit[0],4),steps:[numStep(`How many ${unit[1]}?`,n/unit[2],{hints:[`Cover the ${unit[0]===1?'ones':'tens and ones'} digit${unit[0]===1?'':'s'}. What number is left?`,`${fmt(n)} = ${n/unit[2]} × ${unit[2]}.`]})],summary:`${fmt(n)} = <b>${n/unit[2]} ${unit[1]}</b>.`};
  }
  const t=rand(0,2);
  if(t===0){const bill=pick([[10,'ten'],[100,'hundred']]),k=pick([25,26,40,48,260,130]);
    return {key:'b'+k+bill[0],text:`Gina has <b>${k} ${bill[1]}-dollar bills</b>. How much money does she have?`,steps:[numStep('How many dollars?',k*bill[0],{unit:'dollars',hints:[`${k} groups of ${bill[0]} = ${k} × ${bill[0]}.`,`Multiplying by ${bill[0]} adds ${bill[0]===10?'one zero':'two zeros'}.`]})],summary:`${k} × $${bill[0]} = <b>$${fmt(k*bill[0])}</b>.`}}
  if(t===1){const n=rand(11,99)*1000;return {key:'k'+n,text:`How many <b>thousands</b> are in <b>${fmt(n)}</b>?`,viz:pvChart(n,3),steps:[numStep('How many thousands?',n/1000,{hints:['Cover up the hundreds, tens and ones. What number is left?']})],summary:`${fmt(n)} = <b>${n/1000} thousands</b>.`}}
  const d=rand(2,9);return {key:'x'+d,text:`The ${d} in <b>${fmt(d*1000)}</b> is worth how many times as much as the ${d} in <b>${d*10}</b>?`,steps:[numStep('How many times?',100,{hints:['Thousands is two places to the left of tens.','Two places left = 10 × 10 = 100 times as much.'],wrong:v=>v===10?'That would be one place. Thousands is TWO places left of tens.':'Count the places between tens and thousands.'})],summary:`Two places to the left = <b>100 times</b> as much.`};
}
function genForms(l){
  if(l===0){const n=rand(1000,9999)-(Math.random()<.4?digitAt(rand(0,999),0)*10:0);const m=Math.max(1000,n);
    return {key:'f'+m,text:`Write this number with digits:<br><b>${words(m)}</b>`,steps:[numStep('Type the number.',m,{hints:['Listen for the place words: thousand, hundred.',`It's ${expanded(m)}.`],wrong:v=>String(v).length<String(m).length?'Remember: zeros hold empty places! A thousands number has 4 digits.':'Check each place: thousands, hundreds, tens, ones.'})],summary:`<b>${words(m)}</b> = ${fmt(m)}`}}
  if(l===1){
    let n=rand(10000,99999);if(Math.random()<.5)n-=digitAt(n,pick([1,2]))*10**pick([1,2]);n=Math.max(10000,n);
    if(Math.random()<.5)return {key:'e'+n,text:`Write this expanded form as one number:<br><b>${expanded(n)}</b>`,steps:[numStep('Type the number.',n,{hints:['Line up each part in its place.','Missing places get a 0.']})],summary:`${expanded(n)} = <b>${fmt(n)}</b>`};
    const s=String(n);const swap=s[0]+s[2]+s[1]+s.slice(3);const drop=Number(s.slice(0,2)+s.slice(3));
    return {key:'w'+n,text:`Which is the word form of <b>${fmt(n)}</b>?`,steps:[mcStep({prompt:'Pick the matching word form.',right:words(n),wrong:[[words(Number(swap)===n?n+1000:Number(swap)),'Check the order of the digits.'],[words(drop),'That number has only four digits.'],[words(n+(n%1000<900?100:-100)),'Check the hundreds.']]})],summary:`${fmt(n)} is <b>${words(n)}</b>.`};
  }
  const th=rand(1,4),hu=rand(10,18),te=rand(1,9),on=rand(1,9);const v=th*1000+hu*100+te*10+on;
  if(Math.random()<.5)return {key:'g'+v,text:`A crate holds 1,000 bricks, a case holds 100, and a box holds 10. Leo has <b>${th} ${plural(th,'crate')}, ${hu} cases, ${te} ${plural(te,'box','boxes')} and ${on} loose ${plural(on,'brick')}</b>. How many bricks is that?`,
    steps:[numStep(`How many bricks are in the ${hu} cases?`,hu*100,{hints:[`${hu} × 100`]}),numStep('How many bricks in all?',v,{add:[th*1000,hu*100,te*10,on],hints:[`${fmt(th*1000)} + ${fmt(hu*100)} + ${te*10} + ${on}`]})],summary:`${fmt(th*1000)} + ${fmt(hu*100)} + ${te*10} + ${on} = <b>${fmt(v)}</b> bricks.`};
  return {key:'u'+v,text:`What number is <b>${th} thousands, ${hu} hundreds, ${te} tens and ${on} ones</b>?`,steps:[numStep(`First: ${hu} hundreds = ?`,hu*100,{hints:[`${hu} × 100`]}),numStep('Now the whole number:',v,{add:[th*1000,hu*100,te*10,on],hints:[`${fmt(th*1000)} + ${fmt(hu*100)} + ${te*10} + ${on}`]})],summary:`That's <b>${fmt(v)}</b>. ${hu} hundreds is the same as 1 thousand and ${hu-10} hundreds!`};
}
function cmpSym(a,b){return a<b?'<':a>b?'>':'='}
function genCompare(l){
  let a,b,showA,showB;
  if(l===0){a=rand(1000,9999);const p=rand(0,3);b=a+(rand(1,9)*(Math.random()<.5?1:-1))*10**p;if(b<1000||b>9999||Math.random()<.12)b=a}
  else if(l===1){a=rand(10000,99999);const p=rand(0,2);b=a+rand(1,8)*10**p*(Math.random()<.5?1:-1);if(Math.random()<.25)b=rand(9000,9999);if(b<1000)b=a}
  else{a=rand(10000,99999);b=a+rand(1,9)*10**rand(0,3)*(Math.random()<.5?1:-1);}
  if(b>99999)b=a-(b-a);
  showA=fmt(a);showB=fmt(b);
  if(l===2){if(Math.random()<.5)showA=`<span style="font-size:.7em">${words(a)}</span>`;else showB=`<span style="font-size:.7em">${expanded(b)}</span>`}
  const sym=cmpSym(a,b);let p=Math.max(String(a).length,String(b).length)-1;while(p>0&&digitAt(a,p)===digitAt(b,p))p--;
  const why=String(a).length!==String(b).length?`${fmt(a)} and ${fmt(b)} have different numbers of digits. More digits means a bigger number.`:a===b?'All the digits are the same!':`The first place that is different is the <b>${PLACE[p]}</b>: ${digitAt(a,p)} vs ${digitAt(b,p)}.`;
  return {key:'c'+a+'-'+b,text:`Compare the numbers. Pick &lt;, = or &gt;.`,
    viz:q=>`<div class="cmp-line"><span>${showA}</span><span class="cmp-slot">${q.done?esc(sym):''}</span><span>${showB}</span></div>`+(q.showHintViz?`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">${pvChart(a,p)}${pvChart(b,p)}</div>`:''),
    steps:[cmpStep('Which symbol goes in the box? (The open mouth eats the bigger number.)',sym,{hints:['Line up the places. Start at the biggest place on the left.',why],wrong:()=>why})],
    summary:`${fmt(a)} <b>${esc(sym)}</b> ${fmt(b)}. ${why}`};
}

/* ===================== problem-solving generators ===================== */
const NAMES=['Maya','Leo','Aisha','Sam','Rosa','Kai','Jada','Omar','Lily','Ben'];
function genOA1(l){
  const who=shuffle(NAMES);const thing=pick([['gears','gear'],['bricks','brick'],['stickers','sticker'],['moon rocks','moon rock'],['bolts','bolt']]);
  const k=rand(2,9),a=rand(3,12);
  if(l===0)return {key:'p'+k+a,text:`${who[0]} has <b>${a} ${thing[0]}</b>. ${who[1]} has <b>${k} times as many</b> ${thing[0]} as ${who[0]}. How many ${thing[0]} does ${who[1]} have?`,
    viz:tape([{label:who[0],parts:[{w:1,t:a,fill:'#e1f2ff'}]},{label:who[1],parts:Array.from({length:k},()=>({w:1,t:a,fill:'#fde4f4'}))}]),
    steps:[mcStep({prompt:'Which equation matches the story? (g = how many '+who[1]+' has)',right:`${a} × ${k} = g`,wrong:[[`${a} + ${k} = g`,'"Times as many" means multiply, not add.'],[`${a} − ${k} = g`,`${who[1]} has MORE, so it's not subtraction.`],[`${a} ÷ ${k} = g`,`${who[1]} has more, so the answer should be bigger than ${a}.`]],record:`${a} × ${k} = g`}),
      numStep(`Now solve: ${a} × ${k} = ?`,a*k,{unit:thing[0],hints:[`Skip-count by ${a}s, ${k} times.`]})],
    summary:`${who[1]} has <b>${a*k} ${thing[0]}</b>. "${k} times as many" means ${a} × ${k}.`};
  if(l===1){
    if(Math.random()<.5){const b=a,t=a*k;
      return {key:'s'+k+a,text:`The red rocket is <b>${t} feet</b> tall. That is <b>${k} times as tall</b> as the blue rocket. How tall is the blue rocket?`,
        viz:tape([{label:'Red',parts:Array.from({length:k},()=>({w:1,t:'?',fill:'#fde4f4'}))},{label:'Blue',parts:[{w:1,t:'?',fill:'#e1f2ff'}]}]),
        steps:[mcStep({prompt:'Which equation matches? (b = blue rocket height)',right:`${k} × b = ${t}`,wrong:[[`${t} × ${k} = b`,'The blue rocket is SHORTER, so b must be smaller than '+t+'.'],[`${t} + ${k} = b`,'This is a "times as" comparison, not adding.'],[`b − ${k} = ${t}`,'Think: the red rocket is '+k+' groups of the blue rocket.']],record:`${k} × b = ${t}`}),
          numStep(`Solve: ${t} ÷ ${k} = ?`,b,{unit:'feet',hints:[`What times ${k} equals ${t}?`]})],summary:`The blue rocket is <b>${b} feet</b> tall, because ${k} × ${b} = ${t}.`};}
    const t=a*k;return {key:'n'+k+a,text:`A unicorn jumped <b>${t} centimeters</b>. A frog jumped <b>${a} centimeters</b>. How many times as far did the unicorn jump?`,
      viz:tape([{label:'Unicorn',parts:Array.from({length:k},()=>({w:1,t:a,fill:'#fde4f4'}))},{label:'Frog',parts:[{w:1,t:a,fill:'#e1f2ff'}]}]),
      steps:[numStep(`${a} × ? = ${t}`,k,{label:'times as far:',hints:[`How many ${a}s fit into ${t}?`,`Count by ${a}s until you reach ${t}.`]})],summary:`<b>${k} times</b> as far: ${a} × ${k} = ${t}.`};
  }
  const mult=Math.random()<.5;const more=rand(3,9);
  const text=mult?`${who[0]} built <b>${a} towers</b>. ${who[1]} built <b>${k} times as many</b> towers as ${who[0]}. How many towers did ${who[1]} build?`
    :`${who[0]} built <b>${a} towers</b>. ${who[1]} built <b>${more} more</b> towers than ${who[0]}. How many towers did ${who[1]} build?`;
  return {key:'d'+mult+k+a+more,text,
    steps:[mcStep({prompt:'What kind of comparison is this?',keep:true,right:mult?'Times as many → multiply':'More than → add',wrong:[[mult?'More than → add':'Times as many → multiply',mult?'Look for the words "times as many".':'Look for the words "more than".']],record:mult?'Times as many → multiply':'More than → add'}),
      numStep(mult?`${a} × ${k} = ?`:`${a} + ${more} = ?`,mult?a*k:a+more,{unit:'towers',add:mult?null:[a,more]})],
    summary:mult?`<b>${a*k}</b> towers. "Times as many" means multiply.`:`<b>${a+more}</b> towers. "More than" means add.`};
}
function genOA3(l){
  const who=pick(NAMES);
  if(l===0){
    const t=rand(0,2);
    if(t===0){const b=rand(3,6),n=rand(12,48),x=rand(5,30);return {key:'a'+b+n+x,text:`The robot club has <b>${b} boxes</b> with <b>${n} bricks</b> in each box, plus <b>${x} loose bricks</b>. How many bricks are there in all?`,
      viz:`<div class="eq">t = ${b} × ${n} + ${x}</div>`,steps:[numStep('Step 1: How many bricks are in the boxes?',b*n,{record:`Boxes: ${b} × ${n} = ${b*n}`,hints:[`${b} groups of ${n}: ${b} × ${n}.`]}),numStep('Step 2: Add the loose bricks. How many in all?',b*n+x,{add:[b*n,x],hints:[`${b*n} + ${x}`]})],summary:`t = <b>${b*n+x}</b> bricks.`}}
    if(t===1){const b=rand(3,7),n=rand(15,40),x=rand(4,b*n-10);return {key:'b'+b+n+x,text:`Comet's rocket carries <b>${b} crates</b> of <b>${n} moon rocks</b> each. On the way home, <b>${x} rocks</b> fell out. How many rocks are left?`,
      viz:`<div class="eq">r = ${b} × ${n} − ${x}</div>`,steps:[numStep('Step 1: How many rocks were in the crates?',b*n,{record:`${b} × ${n} = ${b*n}`}),numStep('Step 2: How many are left?',b*n-x,{hints:[`${b*n} − ${x}`]})],summary:`r = <b>${b*n-x}</b> rocks.`}}
    const p=rand(6,15),k=rand(3,6),x=rand(5,20);return {key:'c'+p+k+x,text:`Space show tickets cost <b>$${p}</b> each. ${who}'s family buys <b>${k} tickets</b> and a <b>$${x} poster</b>. How much do they spend?`,
      viz:`<div class="eq">s = ${k} × ${p} + ${x}</div>`,steps:[numStep('Step 1: How much do the tickets cost?',k*p,{unit:'dollars',record:`${k} × $${p} = $${k*p}`}),numStep('Step 2: How much in all?',k*p+x,{unit:'dollars',add:[k*p,x]})],summary:`s = <b>$${k*p+x}</b>.`};
  }
  if(l===1){
    const t=rand(0,2);
    if(t===0){const k=rand(3,8),each=rand(12,30),g=rand(2,9),N=k*each;return {key:'d'+N+k+g,text:`<b>${N} stickers</b> are shared equally among <b>${k} kids</b>. Then each kid gives <b>${g} stickers</b> to a friend. How many stickers does each kid have now?`,
      viz:`<div class="eq">s = ${N} ÷ ${k} − ${g}</div>`,steps:[numStep('Step 1: How many stickers does each kid get?',each,{record:`${N} ÷ ${k} = ${each}`,hints:[`What times ${k} is ${N}?`]}),numStep('Step 2: How many are left after giving some away?',each-g)],summary:`s = <b>${each-g}</b> stickers each.`}}
    if(t===1){const a=rand(210,480),b=rand(150,390),c=Math.ceil((a+b+rand(80,300))/10)*10;const est=Math.round(a/100)*100+Math.round(b/100)*100;
      return {key:'e'+a+b+c,text:`A rover drove <b>${a} meters</b> on Monday and <b>${b} meters</b> on Tuesday. It needs to drive <b>${fmt(c)} meters</b> in all. How many more meters does it need to drive?`,
        viz:`<div class="eq">m = ${fmt(c)} − (${a} + ${b})</div>`,
        steps:[mcStep({prompt:'First, estimate: about how far has it driven so far? (Round each number to the nearest hundred.)',right:`about ${est}`,wrong:[`about ${est+300}`,`about ${Math.max(100,est-300)}`,`about ${est*2}`],record:`Estimate: about ${est} meters`}),numStep('Step 1: Exactly how far so far?',a+b,{add:[a,b],record:`${a} + ${b} = ${a+b}`}),numStep('Step 2: How many more meters?',c-a-b,{hints:[`${fmt(c)} − ${a+b}`]})],
        summary:`m = <b>${c-a-b} meters</b>. Does it make sense? ${a+b} is close to our estimate of ${est}. ✓`}}
    const k=rand(4,8),bags=rand(9,15),g=rand(2,6),N=k*bags;return {key:'f'+N+k+g,text:`Bolt has <b>${N} bolts</b>. He puts them in bags of <b>${k}</b>. Then he gives away <b>${g} bags</b>. How many bags does he have left?`,
      viz:`<div class="eq">b = ${N} ÷ ${k} − ${g}</div>`,steps:[numStep('Step 1: How many bags does he fill?',bags,{record:`${N} ÷ ${k} = ${bags}`}),numStep('Step 2: How many bags are left?',bags-g)],summary:`b = <b>${bags-g}</b> bags.`};
  }
  let k,N,q,r;do{k=rand(4,9);N=rand(30,200);q=Math.floor(N/k);r=N%k}while(r===0);
  const t=rand(0,2);
  const story=[`<b>${N} students</b> are riding moon buses. Each bus holds <b>${k} students</b>. How many buses are needed so everyone gets a ride?`,
    `${who} has <b>${N} bricks</b>. Each robot needs <b>${k} bricks</b>. How many <b>whole robots</b> can ${who} build?`,
    `<b>${N} gems</b> are shared equally among <b>${k} unicorns</b>. The leftover gems go into the treasure box. How many gems go into the box?`][t];
  const ans=[q+1,q,r][t];
  const why=[`${q} buses carry ${q*k} students, but ${r} more students still need a seat. So we need one more bus: <b>${q+1}</b>.`,`Only <b>${q}</b> whole robots. The ${r} extra bricks aren't enough for another robot.`,`Each unicorn gets ${q}, and the <b>${r}</b> left over go in the box.`][t];
  const choices=[[q+1,'Round up: one more'],[q,'The quotient'],[r,'The remainder']];
  return {key:'g'+N+k+t,text:story,viz:`<div class="eq">${N} ÷ ${k} = ?</div>`,
    steps:[numStep(`Step 1: ${N} ÷ ${k} = ? R ?  First, the quotient:`,q,{record:`${N} ÷ ${k} = ${q} R ${r}`,hints:[`How many ${k}s fit in ${N}? ${k} × ${q} = ${k*q}.`]}),numStep('Step 2: What is the remainder?',r,{hints:[`${N} − ${k*q}`]}),
      mcFixed(`Step 3: The answer is ${q} R ${r}. What does the question need?`,choices.map(c=>`<b>${c[0]}</b> (${c[1]})`),t,{why:[0,1,2].map(i=>i===t?'':`Read the question again: ${['does everyone need a seat?','can you build part of a robot?','which gems go in the box?'][t]}`)})],
    summary:why};
}
const FACTORABLE=[12,16,18,20,24,28,30,32,36,40,42,44,45,48,50];
const factorsOf=n=>{const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f};
function genFactor(l){
  if(l===0){
    if(Math.random()<.5){const d=rand(3,9);const yes=Math.random()<.55;let N;do{N=yes?d*rand(3,9):rand(15,50)}while(!yes&&N%d===0);
      return {key:'m'+N+d,text:`Is <b>${N}</b> a multiple of <b>${d}</b>?`,viz:q=>q.done||q.showHintViz?brickArray(Math.floor(N/d),d,{extra:N%d}):'',
        steps:[mcFixed('Is it a multiple?',[`Yes, ${N} is a multiple of ${d}`,`No, ${N} is not a multiple of ${d}`],yes?0:1,{hints:[`Skip-count by ${d}s. Do you land on ${N}?`,`${N} ÷ ${d} = ${Math.floor(N/d)}${N%d?` R ${N%d}`:''}.`],why:[`${N} ÷ ${d} has a remainder of ${N%d}, so it's not a multiple.`,`${d} × ${N/d} = ${N}, so it is a multiple!`]})],
        summary:yes?`Yes! ${d} × ${N/d} = ${N}. The bricks make ${N/d} full rows of ${d}.`:`No. ${N} ÷ ${d} = ${Math.floor(N/d)} R ${N%d}. The rows don't come out even.`};}
    const N=pick(FACTORABLE),fs=factorsOf(N).filter(x=>x>1&&x<N);const f=pick(fs);const non=shuffle([...Array(N).keys()].map(i=>i+1).filter(x=>N%x!==0&&x<N&&x>2)).slice(0,3);
    return {key:'f'+N+f,text:`Which number is a <b>factor</b> of <b>${N}</b>?`,steps:[mcStep({prompt:'Pick the factor.',right:String(f),wrong:non.map(x=>[String(x),`${N} ÷ ${x} has a remainder, so ${x} is not a factor.`]),short:true,hints:['A factor divides evenly with no remainder.']})],summary:`${f} × ${N/f} = ${N}, so ${f} is a factor of ${N}.`};
  }
  if(l===1){
    const N=pick(FACTORABLE),fs=factorsOf(N),pairs=Math.ceil(fs.length/2);
    return {key:'p'+N,text:`Find <b>all the factors</b> of <b>${N}</b>. Tap every number that divides ${N} evenly, then check.`,
      viz:q=>q.done?`<div class="chips">${fs.filter((x,i)=>i<pairs).map(x=>`<span class="chip">${x} × ${N/x}</span>`).join('')}</div>`:'',
      steps:[{kind:'pick',prompt:`Tap all the factors of ${N}. Tip: factors come in pairs, like 1 × ${N}.`,options:[...Array(N).keys()].map(i=>i+1),answer:fs,
        hints:[`Start with 1 × ${N}. Then try 2, 3, 4... does each one divide ${N} evenly?`,`There are ${fs.length} factors in all.`],
        pickMsg:(miss,extra)=>extra.length?`${extra[0]} is not a factor: ${N} ÷ ${extra[0]} has a remainder of ${N%extra[0]}.`:`You found ${fs.length-miss.length} of them. There ${miss.length===1?'is 1 more':`are ${miss.length} more`}. Remember each factor's partner!`,record:`Factors of ${N}: ${fs.join(', ')}`},
        numStep(`How many factor pairs does ${N} have?`,pairs,{hints:[`Match them up: 1 × ${N}, ${fs[1]} × ${N/fs[1]}, ...`,'A number times itself counts as one pair.']})],
      summary:`${N} has <b>${pairs} factor pairs</b>.`};
  }
  const N=pick([1,2,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,37,39,41,43,47,49]);const fs=factorsOf(N);
  const kind=N===1?2:fs.length===2?0:1;
  return {key:'q'+N,text:`Is <b>${N}</b> prime or composite?`,viz:q=>q.done||q.showHintViz?`<p class="legend">Factors of ${N}: ${fs.join(', ')}</p>`:'',
    steps:[mcFixed('Pick one.',['Prime (exactly 2 factors)','Composite (more than 2 factors)','Neither'],kind,{hints:[`List the factors of ${N}.`,`${N} has ${fs.length} ${plural(fs.length,'factor')}.`],why:['','','Only the number 1 is neither prime nor composite.']})],
    summary:kind===0?`${N} is <b>prime</b>: its only factors are 1 and ${N}.`:kind===1?`${N} is <b>composite</b>: its factors are ${fs.join(', ')}.${N%2?' Not every odd number is prime!':''}`:`<b>1 is neither</b> prime nor composite. It has only one factor.`};
}
function genPattern(l){
  if(l===0){const s=rand(1,12),a=rand(2,9);const terms=[s,s+a,s+2*a,s+3*a];
    return {key:'a'+s+a,text:`Bolt's pattern starts at <b>${s}</b>. The rule is <b>add ${a}</b>. Fill in the next numbers.`,
      viz:q=>`<table class="tbl"><tr><th>Step</th>${terms.map((_,i)=>`<td>${i+1}</td>`).join('')}</tr><tr><th>Number</th>${terms.map((t,i)=>`<td>${i===0||i<=q.i||q.done?t:i===q.i+1?'{{slot}}':'?'}</td>`).join('')}</tr></table>`,
      steps:[1,2,3].map(i=>numStep(`Step ${i+1}: ${terms[i-1]} + ${a} = ?`,terms[i],{add:[terms[i-1],a]})),summary:`${terms.join(', ')}... Each number is ${a} more than the one before.`};}
  if(l===1){
    const t=rand(0,2);
    if(t===0){const s=rand(1,9)*2+1;const terms=[s,s+2,s+4,s+6];return {key:'o'+s,text:`Start at <b>${s}</b>. The rule is <b>add 2</b>.`,viz:`<div class="eq">${terms.join(', ')}, ...</div>`,
      steps:[numStep('What comes next?',s+8),mcStep({prompt:'What do you notice about all the numbers?',right:'They are all odd.',wrong:['They are all even.','They all end in 0.','They get smaller.'],hints:['Look at the ones digits.','Odd + 2 is always odd.']})],summary:`All the numbers are odd, because adding 2 to an odd number always makes another odd number.`}}
    if(t===1){const s=rand(1,5);const terms=[s,s*2,s*4,s*8];return {key:'d'+s,text:`Start at <b>${s}</b>. The rule is <b>multiply by 2</b>.`,viz:`<div class="eq">${terms.join(', ')}, ...</div>`,
      steps:[numStep('What comes next?',s*16),mcStep({prompt:'Which is true about this pattern?',right:'Each number is double the one before.',wrong:['Each number is 2 more than the one before.','The numbers are all odd.','The numbers get smaller.']})],summary:`Each number is double the one before: ${terms.join(', ')}, ${s*16}.`}}
    const s=5*rand(1,4);const terms=[s,s+5,s+10,s+15];return {key:'f'+s,text:`Start at <b>${s}</b>. The rule is <b>add 5</b>.`,viz:`<div class="eq">${terms.join(', ')}, ...</div>`,
      steps:[numStep('What comes next?',s+20),mcStep({prompt:'What do you notice?',right:'Every number ends in 0 or 5.',wrong:['Every number is odd.','Every number ends in 5.','The numbers repeat.']})],summary:'Adding 5 to a number ending in 0 or 5 always lands on another 0 or 5.'};
  }
  if(Math.random()<.5){const s=rand(3,8),a=rand(2,5),n=rand(6,10);
    return {key:'t'+s+a+n,text:`Tower 1 has <b>${s} bricks</b>. Each new tower has <b>${a} more bricks</b> than the one before. How many bricks are in tower <b>${n}</b>?`,
      viz:`<table class="tbl"><tr><th>Tower</th><td>1</td><td>2</td><td>3</td><td>...</td><td>${n}</td></tr><tr><th>Bricks</th><td>${s}</td><td>${s+a}</td><td>${s+2*a}</td><td>...</td><td>?</td></tr></table>`,
      steps:[numStep(`How many times do we add ${a} to get from tower 1 to tower ${n}?`,n-1,{hints:['Count the jumps: 1 to 2 is one jump, 1 to 3 is two jumps...']}),numStep(`So tower ${n} has ${s} + ${n-1} × ${a} = ?`,s+(n-1)*a,{hints:[`${n-1} × ${a} = ${(n-1)*a}, then add ${s}.`]})],
      summary:`Tower ${n} has <b>${s+(n-1)*a}</b> bricks.`}}
  const n=rand(5,12);
  return {key:'b'+n,text:`At a space party, one person sits at each side of a triangle table. When triangle tables are pushed together in a row, they share sides. 1 table seats 3, 2 tables seat 4, 3 tables seat 5. How many people can sit at <b>${n} tables</b>?`,
    viz:`<table class="tbl"><tr><th>Tables</th><td>1</td><td>2</td><td>3</td><td>4</td><td>...</td><td>${n}</td></tr><tr><th>People</th><td>3</td><td>4</td><td>5</td><td>6</td><td>...</td><td>?</td></tr></table>`,
    steps:[mcStep({prompt:'What is the rule?',right:'People = tables + 2',wrong:['People = tables × 3','People = tables + 1','People = tables × 2']}),numStep(`${n} tables seat ? people`,n+2,{add:[n,2]})],summary:`${n} + 2 = <b>${n+2}</b> people.`};
}

/* ===================== fraction generators ===================== */
const EQ_PAIRS=[[2,4],[2,6],[2,8],[2,10],[2,12],[3,6],[3,12],[4,8],[4,12],[5,10],[6,12]];
function genNF1(l){
  const [d1,d2]=pick(EQ_PAIRS),m=d2/d1,a=rand(1,d1-1),b=a*m;
  if(l===0)return {key:'e'+a+d1+d2,text:`Fill in the missing numerator so the fractions are equal.`,
    viz:q=>`<div class="eq">${frac(a,d1)} = ${frac(q.done?b:'{{slot}}',d2)}</div>${fracBar(a,d1)}${fracBar(q.done?b:0,d2,{color:SKY})}`,
    steps:[numStep(`${a}/${d1} = ?/${d2}`,b,{hints:[`The bottom bar has ${m} times as many pieces. Each ${d1===2?'half':'piece'} is split into ${m}.`,`Multiply the top by ${m} too: ${a} × ${m}.`]})],
    summary:`${a}/${d1} = <b>${b}/${d2}</b>. There are ${m} times as many parts, and each part is ${m} times smaller, so the amount stays the same.`};
  if(l===1)return {key:'d'+a+d1+d2,text:`Fill in the missing denominator.`,viz:q=>`<div class="eq">${frac(a,d1)} = ${frac(b,q.done?d2:'{{slot}}')}</div>`+(q.showHintViz||q.done?fracBar(a,d1)+fracBar(b,d2,{color:SKY}):''),
    steps:[numStep(`${a}/${d1} = ${b}/?`,d2,{hints:[`${a} × ${m} = ${b}. The top was multiplied by ${m}.`,`Do the same to the bottom: ${d1} × ${m}.`]})],summary:`${a}/${d1} = <b>${b}/${d2}</b>.`};
  const right=`${b}/${d2}`;const wr=[`${a+1}/${d2}`,`${a}/${d2}`,`${b}/${d2+d1}`].filter(x=>x!==right);
  return {key:'m'+a+d1+d2,text:`Which fraction is <b>equal</b> to ${frac(a,d1)}?`,viz:q=>q.showHintViz||q.done?fracBar(a,d1):'',
    steps:[mcStep({prompt:'Pick the equivalent fraction.',right:frac(b,d2),wrong:wr.slice(0,3).map(w=>{const [x,y]=w.split('/');return [frac(x,y),`Is ${x}/${y} the same amount? Multiply ${a}/${d1} by the same number on top and bottom.`]}),short:true,hints:['Equivalent fractions: multiply the top and bottom by the SAME number.']})],
    summary:`${a}/${d1} = ${b}/${d2} (top and bottom × ${m}).`};
}
function genNF2(l){
  let a,b,c,d;
  if(l===0){if(Math.random()<.5){b=d=pick([3,4,5,6,8,10,12]);a=rand(1,b-1);c=rand(1,d-1)}else{a=c=rand(1,3);b=pick([3,4,5,6,8]);do{d=pick([3,4,5,6,8,10,12])}while(d===b);if(a>=Math.min(b,d))a=c=1}}
  else if(l===1){b=pick([3,4,5,6,8]);d=pick([4,6,8,10,12]);a=rand(Math.ceil(b/2)+(b%2?0:1),b-1);c=rand(1,Math.floor((d-1)/2));if(Math.random()<.5){[a,b,c,d]=[c,d,a,b]}}
  else{const p=pick([[3,5],[2,3],[3,4],[4,6],[5,8],[10,100],[3,8],[5,6]]);b=p[0];d=p[1];a=rand(1,b-1);c=d===100?rand(10,95):rand(1,d-1)}
  const sym=cmpSym(a*d,c*b);
  let why;
  if(b===d)why=`Same-size pieces, so compare the counts: ${a} vs ${c}.`;
  else if(a===c)why=`Same number of pieces, but ${b<d?'1/'+b+' pieces are bigger than 1/'+d:'1/'+d+' pieces are bigger than 1/'+b}.`;
  else if((a/b-.5)*(c/d-.5)<0)why=`One is more than half and the other is less than half.`;
  else why=`Make the bottoms match: ${a}/${b} = ${a*d}/${b*d} and ${c}/${d} = ${c*b}/${b*d}.`;
  return {key:'c'+a+b+c+d,text:`Compare the fractions. Both are parts of the <b>same-size</b> whole.`,
    viz:q=>`<div class="cmp-line">${frac(a,b)}<span class="cmp-slot">${q.done?esc(sym):''}</span>${frac(c,d)}</div>`+(q.showHintViz||q.done?(d===100?decGrid(c)+'':'')+fracBar(a,b)+(d===100?'':fracBar(c,d,{color:SKY})):''),
    steps:[cmpStep('Pick <, = or >.',sym,{hints:['Is each fraction more or less than one half?',why],wrong:()=>why})],summary:`${a}/${b} <b>${esc(sym)}</b> ${c}/${d}. ${why}`};
}
function genNF3(l){
  if(l===0){const d=pick([4,5,6,8,10,12]);const add=Math.random()<.6;let a=rand(1,d-1),b=rand(1,d-1);if(add&&a+b>d){b=d-a||1}if(!add&&b>a)[a,b]=[b,a];const r=add?a+b:a-b;
    const ctx=pick([`Bolt painted ${a}/${d} of a wall, then ${b}/${d} more.`,`A pizza had ${a}/${d} left. Comet ate ${b}/${d}.`]);
    return {key:'s'+a+b+d+add,text:`${frac(a,d)} ${add?'+':'−'} ${frac(b,d)} = ?`,viz:q=>`<div class="eq">${frac(a,d)} ${add?'+':'−'} ${frac(b,d)} = ${frac(q.done?r:'{{slot}}',d)}</div>`+fracBar(q.done?r:a,d),
      steps:[numStep(`How many ${d}ths?`,r,{hints:[`The pieces are all ${d}ths, so the bottom stays ${d}.`,`${add?'Join':'Take away'} the tops: ${a} ${add?'+':'−'} ${b}.`],wrong:()=>`Only ${add?'add':'subtract'} the numerators. The size of the pieces doesn't change.`})],summary:`${a}/${d} ${add?'+':'−'} ${b}/${d} = <b>${r}/${d}</b>. The denominator stays the same because the pieces are the same size.`};}
  if(l===1){
    if(Math.random()<.5){const d=pick([4,6,8,10,12]),n=rand(3,d-1);const p1=rand(1,n-2),p2=rand(1,n-p1-1),p3=n-p1-p2;
      return {key:'k'+n+d+p1,text:`Which is another way to write ${frac(n,d)}?`,viz:fracBar(n,d),
        steps:[mcStep({prompt:'Pick the one that adds up to the same amount.',right:`${frac(p1,d)} + ${frac(p2,d)} + ${frac(p3,d)}`,wrong:[[`${frac(p1,d)} + ${frac(n-p1,d+2)}`,'The pieces must all be the same size.'],[`${frac(n,d)} + ${frac(1,d)}`,'That adds up to more.'],[`${frac(1,d)} + ${frac(1,d)}`,'That only makes 2/'+d+'.']]})],summary:`${p1} + ${p2} + ${p3} = ${n}, so it's ${n}/${d}. Fractions can be broken into smaller same-size parts.`}}
    const d=pick([3,4,5,6,8]),w=rand(1,3),n=rand(1,d-1),imp=w*d+n;
    return {key:'i'+w+n+d,text:`Write ${w} ${frac(n,d)} as a fraction.`,viz:q=>`<div class="eq">${w} ${frac(n,d)} = ${frac(q.done?imp:'{{slot}}',d)}</div>`+fracBar(imp,d,{w:240,h:30}),
      steps:[numStep(`${w} wholes = ?/${d}`,w*d,{record:`${w} wholes = ${w*d}/${d}`,hints:[`Each whole has ${d} pieces. ${w} × ${d}.`]}),numStep(`Add the ${n}/${d}: total ${d}ths?`,imp,{add:[w*d,n]})],summary:`${w} ${n}/${d} = <b>${imp}/${d}</b>.`};
  }
  const d=pick([3,4,6,8]);const w1=rand(1,3),n1=rand(1,d-1),w2=rand(1,2),n2=rand(1,d-1);const add=Math.random()<.6;
  let A=w1*d+n1,B=w2*d+n2;if(!add&&A<B){[A,B]=[B,A]}
  const W1=Math.floor(A/d),N1=A%d,W2=Math.floor(B/d),N2=B%d;if(!add&&(N1===0||N2===0))return genNF3(2);
  const R=add?A+B:A-B,RW=Math.floor(R/d),RN=R%d;
  const story=add?`${pick(NAMES)} ran <b>${W1} ${N1}/${d} miles</b>. Kim ran <b>${W2} ${N2}/${d} miles</b> more than that. How far did Kim run?`:`A robot had <b>${W1} ${N1}/${d} meters</b> of wire and used <b>${W2} ${N2}/${d} meters</b>. How much wire is left?`;
  return {key:'x'+A+B+d+add,text:story,viz:`<div class="eq">${W1} ${frac(N1,d)} ${add?'+':'−'} ${W2} ${frac(N2,d)} = ?</div>`,
    steps:[numStep(`Change ${W1} ${N1}/${d} into ${d}ths: ?/${d}`,A,{record:`${W1} ${N1}/${d} = ${A}/${d}`,hints:[`${W1} × ${d} + ${N1}`]}),numStep(`Change ${W2} ${N2}/${d} into ${d}ths: ?/${d}`,B,{record:`${W2} ${N2}/${d} = ${B}/${d}`,hints:[`${W2} × ${d} + ${N2}`]}),
      numStep(`${A}/${d} ${add?'+':'−'} ${B}/${d} = ?/${d}`,R,{add:add?[A,B]:null,record:`${A}/${d} ${add?'+':'−'} ${B}/${d} = ${R}/${d}`}),numStep(`${R}/${d} = how many wholes?`,RW,{hints:[`How many ${d}s fit in ${R}?`]}),...(RN?[numStep(`and how many ${d}ths left over?`,RN)]:[])],
    summary:`The answer is <b>${RW}${RN?` ${RN}/${d}`:''}</b> ${add?'miles':'meters'}.`};
}
function genNF4(l){
  const d=pick([2,3,4,5,6,8,10,12]),k=rand(2,6);
  if(l===0)return {key:'u'+k+d,text:`${k} × ${frac(1,d)} = ?`,viz:q=>`<div class="eq">${k} × ${frac(1,d)} = ${frac(q.done?k:'{{slot}}',d)}</div>${fracBar(q.done?k:1,d)}`,
    steps:[numStep(`${k} groups of 1/${d} is how many ${d}ths?`,k,{hints:[`1/${d} + 1/${d} + ... (${k} times).`]})],summary:`${k} × 1/${d} = <b>${k}/${d}</b>.`};
  const a=rand(2,d-1);
  if(l===1)return {key:'f'+k+a+d,text:`${k} × ${frac(a,d)} = ?`,viz:q=>`<div class="eq">${k} × ${frac(a,d)} = ${frac(q.done?k*a:'{{slot}}',d)}</div>`+(q.showHintViz||q.done?fracBar(k*a,d,{w:260,h:28}):''),
    steps:[numStep(`${k} × ${a}/${d} = ?/${d}`,k*a,{hints:[`${a}/${d} is ${a} pieces of 1/${d}. ${k} groups of ${a} pieces is ${k} × ${a}.`]})],summary:`${k} × ${a}/${d} = <b>${k*a}/${d}</b>. Only the top is multiplied; the piece size stays ${d}ths.`};
  const tot=k*a,lo=Math.floor(tot/d);
  return {key:'w'+k+a+d,text:`Each robot arm needs <b>${a}/${d} meter</b> of wire. Bolt builds <b>${k} arms</b>. How much wire does he need?`,viz:q=>q.showHintViz||q.done?fracBar(tot,d,{w:260,h:28}):'',
    steps:[numStep(`${k} × ${a}/${d} = ?/${d}`,tot,{record:`${k} × ${a}/${d} = ${tot}/${d}`}),...(tot%d?[mcStep({prompt:`${tot}/${d} meters is between which two whole numbers?`,right:`${lo} and ${lo+1}`,wrong:[`${lo+1} and ${lo+2}`,`${Math.max(0,lo-1)} and ${lo}`.replace(/^0 and 0$/,'5 and 6'),`${tot} and ${tot+1}`],hints:[`Every ${d}/${d} makes 1 whole. How many wholes are in ${tot}/${d}?`]})]:[])],
    summary:`${tot}/${d} meters of wire${tot%d?`, which is between ${lo} and ${lo+1} meters`:` = ${tot/d} meters`}.`};
}
function decStr(h){return (h/100).toFixed(2)}
function genDec(l){
  if(l===0){
    if(Math.random()<.5){const t=rand(1,9);return {key:'t'+t,text:`What decimal shows the shaded part?`,viz:decGrid(t*10,10,SKY),steps:[mcStep({prompt:`${t} of the 10 columns are shaded.`,right:`0.${t}`,wrong:[[`0.0${t}`,'0.0'+t+' is only '+t+' small squares.'],[`${t}.0`,`${t}.0 would be ${t} whole grids!`],[`0.${t}${t}`,'Count the columns again.']],short:true})],summary:`${t}/10 = <b>0.${t}</b> (${t} tenths).`}}
    const h=rand(11,98);return {key:'h'+h,text:`The grid has 100 squares. How many hundredths are shaded?`,viz:decGrid(h),steps:[numStep('How many hundredths?',h,{label:'?/100:',hints:['Each full column is 10. Count full columns, then the extra squares.']}),mcStep({prompt:`Write ${h}/100 as a decimal.`,right:decStr(h),wrong:[(h/10).toFixed(1),'0.0'+h,String(h)],short:true})],summary:`${h}/100 = <b>${decStr(h)}</b>.`};
  }
  if(l===1){
    if(Math.random()<.5){const t=rand(1,9);return {key:'e'+t,text:`${frac(t,10)} = ${frac('?',100)}`,viz:q=>`<div class="eq">${frac(t,10)} = ${frac(q.done?t*10:'{{slot}}',100)}</div>${decGrid(t*10,10,SKY)}`,steps:[numStep(`${t}/10 = ?/100`,t*10,{hints:['Each tenth (column) has 10 hundredths.']}),mcStep({prompt:'As a decimal, that is...',right:`0.${t}0 (or 0.${t})`,wrong:[`0.0${t}`,`${t}.10`,`0.${t}1`]})],summary:`${t}/10 = ${t*10}/100 = 0.${t}0 = <b>0.${t}</b>.`}}
    const t=rand(1,6),h=rand(11,39);const tot=t*10+h;return {key:'a'+t+h,text:`Add: ${frac(t,10)} + ${frac(h,100)}`,viz:q=>`<div class="eq">${frac(t,10)} + ${frac(h,100)} = ${frac(q.i>=2||q.done?tot:q.i===1?'{{slot}}':'?',100)}</div>`,
      steps:[numStep(`First, ${t}/10 = ?/100`,t*10,{record:`${t}/10 = ${t*10}/100`}),numStep(`${t*10}/100 + ${h}/100 = ?/100`,tot,{add:[t*10,h]}),mcStep({prompt:'Write the answer as a decimal.',right:decStr(tot),wrong:[(tot/10).toFixed(1),`0.${t}${h}`,'0.0'+tot].filter(x=>x!==decStr(tot)).slice(0,3),short:true})],summary:`${t}/10 + ${h}/100 = ${tot}/100 = <b>${decStr(tot)}</b>.`};
  }
  const traps=[[40,37],[60,59],[7,70],[30,30],[67,76],[5,50],[89,98],[20,19],[45,54],[80,8]];const [x,y]=pick(traps);const sx=x%10===0&&Math.random()<.6?(x/100).toFixed(1):decStr(x),sy=y%10===0&&Math.random()<.6?(y/100).toFixed(1):decStr(y);
  const sym=cmpSym(x,y);
  return {key:'c'+x+y,text:`Compare the decimals. Both are parts of the same whole.`,viz:q=>`<div class="cmp-line"><span>${sx}</span><span class="cmp-slot">${q.done?esc(sym):''}</span><span>${sy}</span></div>`+(q.showHintViz||q.done?`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">${decGrid(x)}${decGrid(y,10,SKY)}</div>`:''),
    steps:[cmpStep('Pick <, = or >.',sym,{hints:['Write both with two digits after the point: tenths and hundredths.',`${sx} = ${x} hundredths and ${sy} = ${y} hundredths.`],wrong:()=>`Think in hundredths: ${sx} is ${x}/100 and ${sy} is ${y}/100.`})],
    summary:`${sx} <b>${esc(sym)}</b> ${sy} because ${x} hundredths ${sym==='='?'equals':sym==='<'?'is less than':'is more than'} ${y} hundredths.`};
}

/* ===================== measurement generators ===================== */
const CONV=[['meters','centimeters',100,'m','cm'],['kilograms','grams',1000,'kg','g'],['liters','milliliters',1000,'L','mL']];
function genMetric(l){
  if(l===0){const c=pick(CONV),k=rand(2,12);
    return {key:'c'+c[0]+k,text:`1 ${c[0].slice(0,-1)} = ${fmt(c[2])} ${c[1]}. Complete the table.`,
      viz:q=>`<table class="tbl"><tr><th>${cap(c[0])}</th><th>${cap(c[1])}</th></tr><tr><td>1</td><td>${fmt(c[2])}</td></tr><tr><td>2</td><td>${fmt(2*c[2])}</td></tr><tr><td>${k}</td><td>${q.done?fmt(k*c[2]):'{{slot}}'}</td></tr></table>`,
      steps:[numStep(`${k} ${c[3]} = ? ${c[4]}`,k*c[2],{hints:[`Each ${c[0].slice(0,-1)} is ${fmt(c[2])} ${c[1]}. ${k} × ${fmt(c[2])}.`]})],summary:`${k} ${c[0]} = <b>${fmt(k*c[2])} ${c[1]}</b>.`};}
  if(l===1){
    if(Math.random()<.5){const items=[['the mass of a paper clip','grams'],['the mass of a bike','kilograms'],['the length of a crayon','centimeters'],['the length of a soccer field','meters'],['the water in a bathtub','liters'],['the medicine in a spoon','milliliters'],['the mass of a watermelon','kilograms'],['the length of a pencil','centimeters']];const it=pick(items);
      const all=['grams','kilograms','centimeters','meters','liters','milliliters'];
      return {key:'u'+it[0],text:`Which unit would you use to measure <b>${it[0]}</b>?`,steps:[mcStep({prompt:'Pick the best unit.',right:it[1],wrong:shuffle(all.filter(u=>u!==it[1])).slice(0,3),short:true,hints:['Mass: grams (light) or kilograms (heavy). Length: centimeters (small) or meters (big). Liquid: milliliters (small) or liters (big).']})],summary:`<b>${cap(it[1])}</b> make sense for ${it[0]}.`}}
    const c=pick(CONV),k=pick([7,9,12,15,20,35,120]);return {key:'b'+c[0]+k,text:`Convert: <b>${k} ${c[3]}</b> = ? ${c[4]}`,steps:[numStep(`${k} × ${fmt(c[2])} = ?`,k*c[2],{unit:c[4],hints:[`1 ${c[3]} = ${fmt(c[2])} ${c[4]}.`]})],summary:`${k} ${c[3]} = <b>${fmt(k*c[2])} ${c[4]}</b>.`};
  }
  const t=rand(0,3);
  if(t===0){const m=rand(250,400),k=rand(3,6);return {key:'w'+m+k,text:`A can holds <b>${m} mL</b> of juice. A jug holds <b>${k} times as much</b>. How much does the jug hold?`,steps:[numStep(`${m} × ${k} = ?`,m*k,{unit:'mL'})],summary:`The jug holds <b>${fmt(m*k)} mL</b>.`}}
  if(t===1){const k=rand(3,6),each=rand(120,900);const tot=k*each;return {key:'x'+tot+k,text:`There are <b>${fmt(tot)} liters</b> of rocket fuel. It is shared equally among <b>${k} tanks</b>. How much goes in each tank?`,steps:[numStep(`${fmt(tot)} ÷ ${k} = ?`,each,{unit:'liters'})],summary:`Each tank gets <b>${fmt(each)} liters</b>.`}}
  if(t===2){const a=rand(1200,4800),b=rand(300,1100);return {key:'y'+a+b,text:`A space crate has a mass of <b>${fmt(a)} grams</b>. Bolt takes out a tool that has a mass of <b>${fmt(b)} grams</b>. What is the mass of the crate now?`,steps:[numStep(`${fmt(a)} − ${fmt(b)} = ?`,a-b,{unit:'grams'})],summary:`<b>${fmt(a-b)} grams</b>.`}}
  const a=rand(35,95),b=rand(25,80);return {key:'z'+a+b,text:`Comet's ribbon is <b>${a} cm</b> long. Starla's ribbon is <b>${b} cm</b> long. How long are they together?`,steps:[numStep(`${a} + ${b} = ?`,a+b,{unit:'cm',add:[a,b]})],summary:`<b>${a+b} cm</b> together.`};
}
const t12=m=>{let h=Math.floor(m/60)%12;if(h===0)h=12;return `${h}:${String(m%60).padStart(2,'0')}`};
function clockSvg(min){
  const h=(min/60)%12,m=min%60;const cx=70,cy=70;let g=`<circle cx="${cx}" cy="${cy}" r="64" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
  for(let i=0;i<60;i++){const a=i*6*Math.PI/180,r1=i%5?58:52;g+=`<line x1="${cx+Math.sin(a)*r1}" y1="${cy-Math.cos(a)*r1}" x2="${cx+Math.sin(a)*61}" y2="${cy-Math.cos(a)*61}" stroke="${INK}" stroke-width="${i%5?1:2.5}"/>`}
  for(let i=1;i<=12;i++){const a=i*30*Math.PI/180;g+=`<text x="${cx+Math.sin(a)*42}" y="${cy-Math.cos(a)*42+5}" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}">${i}</text>`}
  const ha=(h*30)*Math.PI/180,ma=m*6*Math.PI/180;
  g+=`<line x1="${cx}" y1="${cy}" x2="${cx+Math.sin(ha)*30}" y2="${cy-Math.cos(ha)*30}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.sin(ma)*50}" y2="${cy-Math.cos(ma)*50}" stroke="${PINK}" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="4" fill="${INK}"/>`;
  return svg(140,140,g,'clock showing '+t12(min));
}
function timeline(a,b){ // minutes from midnight
  const start=Math.floor(a/60)*60,end=Math.ceil(b/60)*60,W=460,sc=(W-40)/(end-start||60);let g=`<line x1="20" y1="40" x2="${W-20}" y2="40" stroke="${INK}" stroke-width="3"/>`;
  for(let t=start;t<=end;t+=60){const x=20+(t-start)*sc;g+=`<line x1="${x}" y1="30" x2="${x}" y2="50" stroke="${INK}" stroke-width="3"/><text x="${x}" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${t12(t)}</text>`}
  const xa=20+(a-start)*sc,xb=20+(b-start)*sc;g+=`<circle cx="${xa}" cy="40" r="7" fill="${PINK}"/><circle cx="${xb}" cy="40" r="7" fill="${MINT}"/><text x="${xa}" y="20" text-anchor="middle" font-size="12" fill="${PINK}" font-weight="700">${t12(a)}</text><text x="${xb}" y="20" text-anchor="middle" font-size="12" fill="${DIM}" font-weight="700">${t12(b)}</text>`;
  return svg(W,76,g,'timeline');
}
function genTime(l){
  const start=rand(13,17)*60+rand(1,11)*5;
  if(l===0){
    if(Math.random()<.5){const dur=rand(Math.ceil((60-start%60)/5)+1,11)*5;const end=start+dur;const wrongs=[t12(end-60),t12(end+60),`${Math.floor(start/60)%12||12}:${start%60+dur}`].filter(x=>x!==t12(end));
      return {key:'e'+start+dur,text:`Launch practice starts at <b>${t12(start)}</b> and lasts <b>${dur} minutes</b>. What time does it end?`,viz:q=>clockSvg(start)+(q.showHintViz||q.done?timeline(start,end):''),
        steps:[mcStep({prompt:'Pick the end time.',right:t12(end),wrong:wrongs.slice(0,3),short:true,hints:[`How many minutes until the next hour? ${60-start%60} minutes gets you to ${t12(start+60-start%60)}.`,`Then add the other ${dur-(60-start%60)} minutes.`]})],summary:`${t12(start)} + ${dur} minutes = <b>${t12(end)}</b>.`};}
    const dur=rand(Math.ceil((60-start%60)/5)+1,11)*5,end=start+dur;
    return {key:'d'+start+dur,text:`A robot show starts at <b>${t12(start)}</b> and ends at <b>${t12(end)}</b>. How many minutes long is it?`,viz:q=>timeline(start,end),
      steps:[numStep(`From ${t12(start)} to ${t12(start+60-start%60)} is ? minutes`,60-start%60,{record:`${t12(start)} → ${t12(start+60-start%60)}: ${60-start%60} min`}),numStep(`Total minutes from ${t12(start)} to ${t12(end)}?`,dur,{unit:'minutes',hints:[`Add the jump to the hour and the minutes after the hour: ${60-start%60} + ${end%60}.`]})],summary:`The show is <b>${dur} minutes</b> long.`};
  }
  if(l===1){
    if(Math.random()<.5){const dh=1,dm=rand(2,11)*5,end=start+60+dm;
      return {key:'h'+start+dm,text:`A movie starts at <b>${t12(start)}</b> and lasts <b>1 hour ${dm} minutes</b>. When does it end?`,viz:q=>clockSvg(start)+(q.showHintViz||q.done?timeline(start,end):''),
        steps:[mcStep({prompt:'Pick the end time.',right:t12(end),wrong:[t12(end-60),t12(start+dm),t12(end+10)].filter(x=>x!==t12(end)).slice(0,3),short:true,hints:[`First jump 1 hour: ${t12(start+60)}.`,`Then add ${dm} minutes.`]})],summary:`${t12(start)} + 1 hour = ${t12(start+60)}, + ${dm} min = <b>${t12(end)}</b>.`};}
    const dur=rand(13,22)*5,end=start+dur;
    return {key:'k'+start+dur,text:`Bolt charged from <b>${t12(start)}</b> to <b>${t12(end)}</b>. How long did he charge?`,viz:timeline(start,end),
      steps:[numStep('How many whole hours?',Math.floor(dur/60),{unit:'hour'}),numStep('and how many more minutes?',dur%60,{unit:'minutes',hints:[`After 1 hour it's ${t12(start+60)}. How many minutes from there to ${t12(end)}?`]})],summary:`<b>${Math.floor(dur/60)} hour ${dur%60} minutes</b> (that's ${dur} minutes).`};
  }
  if(Math.random()<.5){const dur=rand(5,11)*5,end=start+dur+60;const st=end-dur;
    return {key:'s'+end+dur,text:`A space walk ended at <b>${t12(end)}</b>. It lasted <b>${dur} minutes</b>. When did it start?`,viz:q=>clockSvg(end)+(q.done?timeline(st,end):''),
      steps:[mcStep({prompt:'Pick the start time. (Count backward!)',right:t12(st),wrong:[t12(st+60),t12(end+dur),t12(st-60)].filter(x=>x!==t12(st)).slice(0,3),short:true,hints:[`Go back ${end%60} minutes to get to ${t12(end-end%60)}.`,`Then go back the other ${dur-end%60} minutes.`]})],summary:`${t12(end)} − ${dur} minutes = <b>${t12(st)}</b>.`};}
  const a=rand(6,10)*5,br=pick([10,15]),b=rand(5,9)*5,end=start+a+br+b;
  return {key:'p'+start+a+b,text:`The space show starts at <b>${t12(start)}</b>. Part 1 lasts <b>${a} min</b>, then a <b>${br} min</b> break, then Part 2 lasts <b>${b} min</b>. When does it end?`,
    steps:[numStep('How many minutes in all?',a+br+b,{unit:'minutes',add:[a,br,b],record:`${a} + ${br} + ${b} = ${a+br+b} min`}),mcStep({prompt:'What time does it end?',right:t12(end),wrong:[t12(end-60),t12(end+15),t12(start+a+b)].filter(x=>x!==t12(end)).slice(0,3),short:true})],summary:`It ends at <b>${t12(end)}</b>.`};
}
function rectGrid(w,h,o={}){
  const s=Math.min(34,Math.floor(320/Math.max(w,h)));let g='';
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)g+=`<rect x="${30+x*s}" y="${10+y*s}" width="${s}" height="${s}" fill="${o.grid===false?'#fff':'#fde4f4'}" stroke="${o.grid===false?'#fff':'#e8a6cf'}" stroke-width="1"/>`;
  g+=`<rect x="30" y="10" width="${w*s}" height="${h*s}" fill="none" stroke="${INK}" stroke-width="3"/>`;
  g+=`<text x="${30+w*s/2}" y="${h*s+30}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${o.wl??w} ${o.u||'units'}</text><text x="22" y="${10+h*s/2}" text-anchor="end" font-size="15" font-weight="700" fill="${INK}">${o.hl??h}</text>`;
  return svg(40+w*s+20,h*s+40,g,`rectangle ${w} by ${h}`);
}
function lShape(w1,h1,w2,h2){ // A on top-left (w1×h1), B below (w2×h2), aligned left
  const s=Math.min(30,Math.floor(300/Math.max(w1,w2)),Math.floor(260/(h1+h2)));let g='';
  for(let y=0;y<h1;y++)for(let x=0;x<w1;x++)g+=`<rect x="${30+x*s}" y="${10+y*s}" width="${s}" height="${s}" fill="#e1f2ff" stroke="#9cc7ea"/>`;
  for(let y=0;y<h2;y++)for(let x=0;x<w2;x++)g+=`<rect x="${30+x*s}" y="${10+(h1+y)*s}" width="${s}" height="${s}" fill="#fde4f4" stroke="#e8a6cf"/>`;
  g+=`<path d="M30 10 h${w1*s} v${h1*s} h${(w2-w1)*s} v${h2*s} h${-w2*s} Z" fill="none" stroke="${INK}" stroke-width="3"/>`;
  g+=`<text x="${30+w1*s/2}" y="${10+h1*s/2+5}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">A</text><text x="${30+w2*s/2}" y="${10+(h1+h2/2)*s+5}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">B</text>`;
  return svg(40+Math.max(w1,w2)*s+20,(h1+h2)*s+24,g,'L-shaped figure');
}
function genArea(l){
  if(l===0){const w=rand(3,9),h=rand(2,7);return {key:'r'+w+h,text:`Bolt is building a rectangle floor with square bricks. It is <b>${w} units</b> long and <b>${h} units</b> wide.`,viz:rectGrid(w,h),
    steps:[numStep('What is the area?',w*h,{unit:'square units',record:`Area = ${w} × ${h} = ${w*h} square units`,hints:['Area = length × width (count the squares inside).']}),numStep('What is the perimeter?',2*(w+h),{unit:'units',add:[w,h,w,h],hints:['Perimeter is the distance all the way around.',`${w} + ${h} + ${w} + ${h}`],wrong:v=>v===w*h?'That is the area. Perimeter goes around the outside edge.':`Add all four sides: ${w} + ${h} + ${w} + ${h}.`})],summary:`Area <b>${w*h} square units</b>, perimeter <b>${2*(w+h)} units</b>.`};}
  if(l===1){const w=rand(4,12),h=rand(3,9);
    if(Math.random()<.5)return {key:'a'+w+h,text:`A rectangle garden on Mars has an area of <b>${w*h} square meters</b>. One side is <b>${h} meters</b>. How long is the other side?`,viz:rectGrid(Math.min(w,12),h,{grid:false,wl:'?',hl:h,u:'m'}),steps:[numStep(`${h} × ? = ${w*h}`,w,{unit:'meters',hints:[`Area = length × width, so divide: ${w*h} ÷ ${h}.`]})],summary:`${h} × ${w} = ${w*h}, so the side is <b>${w} meters</b>.`};
    return {key:'p'+w+h,text:`A rectangle robot pen has a perimeter of <b>${2*(w+h)} meters</b>. Its length is <b>${w} meters</b>. How wide is it?`,viz:rectGrid(Math.min(w,12),h,{grid:false,wl:w,hl:'?',u:'m'}),
      steps:[numStep(`Two lengths: ${w} + ${w} = ?`,2*w,{add:[w,w],record:`Two lengths = ${2*w} m`}),numStep(`The two widths together: ${2*(w+h)} − ${2*w} = ?`,2*h),numStep('So one width is...',h,{unit:'meters'})],summary:`The width is <b>${h} meters</b>.`};}
  if(Math.random()<.6){const w1=rand(2,4),h1=rand(2,4),w2=rand(w1+2,8),h2=rand(2,4);
    return {key:'l'+w1+h1+w2+h2,text:`Find the area of this brick floor. Split it into two rectangles, A and B.`,viz:lShape(w1,h1,w2,h2)+`<p class="legend">A is ${w1} × ${h1}. B is ${w2} × ${h2}.</p>`,
      steps:[numStep('Area of A?',w1*h1,{record:`A = ${w1} × ${h1} = ${w1*h1}`}),numStep('Area of B?',w2*h2,{record:`B = ${w2} × ${h2} = ${w2*h2}`}),numStep('Total area?',w1*h1+w2*h2,{unit:'square units',add:[w1*h1,w2*h2]})],summary:`${w1*h1} + ${w2*h2} = <b>${w1*h1+w2*h2} square units</b>.`};}
  const A=pick([12,16,18,24]);const fs=factorsOf(A).filter(x=>x*x<=A).map(x=>[x,A/x]);const best=fs[fs.length-1];
  return {key:'f'+A,text:`You want a rectangle with an area of <b>${A} square meters</b> that needs the <b>least fencing</b> (smallest perimeter). Which one?`,
    viz:`<table class="tbl"><tr><th>Length</th><th>Width</th><th>Perimeter</th></tr>${fs.map(([a,b])=>`<tr><td>${b}</td><td>${a}</td><td>?</td></tr>`).join('')}</table>`,
    steps:[mcStep({prompt:'Pick the rectangle.',right:`${best[1]} m by ${best[0]} m`,wrong:fs.slice(0,-1).map(([a,b])=>[`${b} m by ${a} m`,`Perimeter = ${b}+${a}+${b}+${a} = ${2*(a+b)} m. Is there a smaller one?`]),hints:['Find each perimeter: add all four sides.','Rectangles closer to a square shape have smaller perimeters.']})],
    summary:`${best[1]} by ${best[0]} has perimeter ${2*(best[0]+best[1])} m, the smallest. Squarer shapes use less fencing.`};
}
function barGraph(cats,vals,scale,title,ylab){
  const top=Math.ceil(Math.max(...vals)/scale)*scale+scale,H=200,W=60+cats.length*80,y0=230,k=H/top;let g=`<text x="${W/2}" y="16" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${title}</text>`;
  for(let v=0;v<=top;v+=scale){const y=y0-v*k;g+=`<line x1="50" y1="${y}" x2="${W-10}" y2="${y}" stroke="#e4dcfb"/><text x="44" y="${y+4}" text-anchor="end" font-size="12" fill="${INK}">${v}</text>`}
  const cols=[PINK,SKY,MINT,GOLD,LAV];
  cats.forEach((c,i)=>{const x=64+i*80,h=vals[i]*k;g+=`<rect x="${x}" y="${y0-h}" width="50" height="${h}" fill="${cols[i%5]}" stroke="${INK}" stroke-width="2"/><text x="${x+25}" y="${y0+18}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${c}</text>`});
  g+=`<line x1="50" y1="${y0}" x2="${W-10}" y2="${y0}" stroke="${INK}" stroke-width="2"/><line x1="50" y1="30" x2="50" y2="${y0}" stroke="${INK}" stroke-width="2"/><text x="14" y="${y0-H/2}" font-size="12" fill="${DIM}" transform="rotate(-90 14 ${y0-H/2})" text-anchor="middle">${ylab}</text>`;
  return svg(W,y0+28,g,title);
}
function linePlot(vals,lo,hi,title){
  const W=60+(hi-lo)*50,count={};vals.forEach(v=>count[v]=(count[v]||0)+1);const mx=Math.max(...Object.values(count));const y0=40+mx*22;
  let g=`<text x="${W/2}" y="16" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}">${title}</text><line x1="20" y1="${y0}" x2="${W-20}" y2="${y0}" stroke="${INK}" stroke-width="2"/>`;
  for(let v=lo;v<=hi;v++){const x=30+(v-lo)*50;g+=`<line x1="${x}" y1="${y0-6}" x2="${x}" y2="${y0+6}" stroke="${INK}" stroke-width="2"/><text x="${x}" y="${y0+24}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${v}</text>`;
    for(let i=0;i<(count[v]||0);i++)g+=`<text x="${x}" y="${y0-12-i*22}" text-anchor="middle" font-size="20" font-weight="700" fill="${PINK}">✕</text>`}
  return svg(W,y0+32,g,title);
}
function genData(l){
  if(l===0){const cats=shuffle(['Red','Blue','Green','Purple','Gold']).slice(0,4);const scale=pick([2,5]);const vals=cats.map(()=>rand(1,8)*scale);
    const i=rand(0,3);let j;do{j=rand(0,3)}while(j===i||vals[j]===vals[i]);const [bigI,smallI]=vals[i]>vals[j]?[i,j]:[j,i];
    const g=barGraph(cats,vals,scale,'Favorite Robot Color','Kids');
    return {key:'b'+vals.join(),text:`Bolt asked kids, "What color should a robot be?"`,viz:g,
      steps:[numStep(`How many kids chose ${cats[i]}?`,vals[i],{hints:[`Each line on the scale is worth ${scale}.`,'Read across from the top of the bar to the numbers.']}),numStep(`How many more kids chose ${cats[bigI]} than ${cats[smallI]}?`,vals[bigI]-vals[smallI],{hints:[`${vals[bigI]} − ${vals[smallI]}`]})],summary:`${vals[bigI]} − ${vals[smallI]} = <b>${vals[bigI]-vals[smallI]}</b> more.`};}
  if(l===1){const lo=10,hi=16;const vals=Array.from({length:rand(12,16)},()=>Math.round(13+ (Math.random()+Math.random()+Math.random()-1.5)*3)).map(v=>Math.min(hi,Math.max(lo,v)));
    const cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);const mode=+Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];const top=Object.values(cnt).filter(c=>c===cnt[mode]).length===1;
    const t=pick([11,12,13,14]);const less=vals.filter(v=>v<t).length;
    return {key:'p'+vals.join(),text:`Each ✕ is one robot's time in the race, in seconds.`,viz:linePlot(vals,lo,hi,'Robot Race Times (seconds)'),
      steps:[numStep('How many robots raced in all?',vals.length,{hints:['Count every ✕.']}),numStep(`How many robots finished in less than ${t} seconds?`,less,{hints:[`Count the ✕s to the LEFT of ${t}. Don't count ${t} itself.`]}),...(top?[numStep('Which time was the most common?',mode,{unit:'seconds',hints:['Find the tallest stack of ✕s.']})]:[])],summary:`Line plots show how often each number shows up.`};}
  if(Math.random()<.5){const qs=[['What is your favorite planet?',0],['How many pets do you have?',1],['How tall are you, in centimeters?',1],['What color is your bike?',0],['Which month were you born in?',0],['How many books did you read this month?',1],['What is your favorite robot name?',0],['How many minutes does it take you to get to school?',1]];const [qq,k]=pick(qs);
    return {key:'k'+qq,text:`A survey asks: <b>"${qq}"</b>`,steps:[mcFixed('What kind of data will this question collect?',['Categorical (groups, like colors or names)','Numerical (numbers you can measure or count)'],k,{why:['','']})],summary:k?'The answers are numbers you can count or measure, so the data is <b>numerical</b>.':'The answers are groups or names, so the data is <b>categorical</b>.'};}
  const cats=['Mars','Moon','Saturn','Comet'],vals=cats.map(()=>rand(2,9)*5);const i=rand(0,3),j=(i+1+rand(0,2))%4;
  return {key:'t'+vals.join(),text:`Kids voted for their favorite space trip.`,viz:barGraph(cats,vals,5,'Favorite Space Trip','Votes'),steps:[numStep(`How many votes did ${cats[i]} and ${cats[j]} get together?`,vals[i]+vals[j],{add:[vals[i],vals[j]],hints:['Each line is worth 5.',`${vals[i]} + ${vals[j]}`]}),numStep('How many votes in all?',vals.reduce((a,b)=>a+b,0),{add:vals})],summary:`${vals.join(' + ')} = <b>${vals.reduce((a,b)=>a+b,0)}</b> votes.`};
}
function angleSvg(deg,o={}){
  const cx=180,cy=190,R=150;let g='';
  if(o.prot){
    g+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy} Z" fill="#fff8d6" stroke="${GOLD}" stroke-width="2"/>`;
    for(let a=0;a<=180;a+=5){const r=a*Math.PI/180,len=a%10?8:14;g+=`<line x1="${cx+Math.cos(r)*R}" y1="${cy-Math.sin(r)*R}" x2="${cx+Math.cos(r)*(R-len)}" y2="${cy-Math.sin(r)*(R-len)}" stroke="#b58a00" stroke-width="1.5"/>`;
      if(a%10===0){g+=`<text x="${cx+Math.cos(r)*(R-24)}" y="${cy-Math.sin(r)*(R-24)+4}" text-anchor="middle" font-size="10" font-weight="700" fill="${INK}">${a}</text><text x="${cx+Math.cos(r)*(R-40)}" y="${cy-Math.sin(r)*(R-40)+4}" text-anchor="middle" font-size="9" fill="${DIM}">${180-a}</text>`}}
  }
  const r=deg*Math.PI/180,L=o.prot?R+10:130;
  g+=`<line x1="${cx}" y1="${cy}" x2="${cx+L}" y2="${cy}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(r)*L}" y2="${cy-Math.sin(r)*L}" stroke="${PINK}" stroke-width="4" stroke-linecap="round"/>`;
  if(!o.prot){if(deg===90)g+=`<path d="M${cx+22} ${cy} v-22 h-22" fill="none" stroke="${INK}" stroke-width="2"/>`;else g+=`<path d="M${cx+34} ${cy} A34 34 0 0 0 ${cx+Math.cos(r)*34} ${cy-Math.sin(r)*34}" fill="none" stroke="${INK}" stroke-width="2"/>`}
  g+=`<circle cx="${cx}" cy="${cy}" r="4" fill="${INK}"/>`;
  return svg(360,206,g,'angle');
}
function splitAngle(total,a,known){ // two angles sharing a ray; labels
  const cx=180,cy=190,R=120;let g='';const r1=a*Math.PI/180,r2=total*Math.PI/180;
  g+=`<line x1="${cx}" y1="${cy}" x2="${cx+R+20}" y2="${cy}" stroke="${INK}" stroke-width="4"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(r1)*R}" y2="${cy-Math.sin(r1)*R}" stroke="${SKY}" stroke-width="4"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(r2)*(R+20)}" y2="${cy-Math.sin(r2)*(R+20)}" stroke="${INK}" stroke-width="4"/>`;
  const m1=r1/2,m2=(r1+r2)/2;g+=`<text x="${cx+Math.cos(m1)*70}" y="${cy-Math.sin(m1)*70+5}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">${known[0]}</text><text x="${cx+Math.cos(m2)*70}" y="${cy-Math.sin(m2)*70+5}" text-anchor="middle" font-size="16" font-weight="700" fill="${PINK}">${known[1]}</text>`;
  if(total===90)g+=`<path d="M${cx+18} ${cy} v-18 h-18" fill="none" stroke="${INK}" stroke-width="2"/>`;
  return svg(360,206,g,'angles');
}
function genAngle(l){
  if(l===0){const k=rand(0,3);const deg=[rand(3,16)*5,90,rand(20,34)*5,180][k];
    return {key:'k'+deg,text:`What kind of angle is this?`,viz:angleSvg(deg),steps:[mcFixed('Pick one.',['Acute (less than 90°)','Right (exactly 90°)','Obtuse (more than 90°, less than 180°)','Straight (180°)'],k,{hints:['Compare it to the corner of a piece of paper. That corner is a right angle (90°).'],why:['','','','']})],summary:`It's about ${deg}°, so it's <b>${['acute','right','obtuse','straight'][k]}</b>.`};}
  if(l===1){const deg=rand(2,17)*10;return {key:'p'+deg,text:`Read the protractor. How many degrees is the pink angle?`,viz:angleSvg(deg,{prot:true}),
    steps:[numStep('How many degrees?',deg,{unit:'°',hints:['The black ray points at 0 on the OUTER numbers. Use the outer scale.',`Is the angle acute or obtuse? That tells you if the answer is less or more than 90.`],wrong:v=>v===180-deg?`You read the inner scale. The black ray lines up with 0 on the outer scale. This angle is ${deg<90?'acute, so less':'obtuse, so more'} than 90°.`:'Find where the pink ray crosses the outer numbers.'})],summary:`The angle measures <b>${deg}°</b>.`};}
  const t=rand(0,3);
  if(t===0){const a=rand(3,15)*5;return {key:'r'+a,text:`The whole angle is a <b>right angle (90°)</b>. One part is <b>${a}°</b>. What is the other part, m?`,viz:splitAngle(90,a,[a+'°','m']),steps:[numStep(`${a} + m = 90, so m = ?`,90-a,{unit:'°',hints:['Angles add up: the parts make the whole.',`90 − ${a}`]})],summary:`m = <b>${90-a}°</b>.`}}
  if(t===1){const a=rand(4,30)*5;return {key:'s'+a,text:`The two angles make a <b>straight line (180°)</b>. One is <b>${a}°</b>. What is the other, m?`,viz:splitAngle(180,a,[a+'°','m']),steps:[numStep(`m = 180 − ${a}`,180-a,{unit:'°'})],summary:`m = <b>${180-a}°</b>.`}}
  if(t===2){const a=rand(5,14)*5,b=rand(3,9)*5;return {key:'w'+a+b,text:`A sprinkler robot turns <b>${a}°</b>, pauses, then turns <b>${b}°</b> more. How many degrees did it turn in all?`,viz:splitAngle(a+b,a,[a+'°',b+'°']),steps:[numStep(`${a} + ${b} = ?`,a+b,{unit:'°',add:[a,b]})],summary:`<b>${a+b}°</b> in all.`}}
  const h=rand(2,6);return {key:'c'+h,text:`When a clock's hands point at 12 and 1, the angle is 30°. What is the angle when the hands point at <b>12 and ${h}</b>?`,viz:clockSvg(h*60),steps:[numStep(`${h} jumps of 30° = ?`,30*h,{unit:'°',hints:['Each number on the clock is 30° from the next.',`${h} × 30`]})],summary:`${h} × 30° = <b>${30*h}°</b>.`};
}
/* ---- geometry ---- */
function figSvg(kind){
  const A=`<polygon points="0,0 -10,-5 -10,5" fill="${INK}"/>`;let g='';const arrow=(x1,y1,x2,y2,both=true,dot=false)=>{const ang=Math.atan2(y2-y1,x2-x1)*180/Math.PI;let s=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="3"/>`;s+=`<g transform="translate(${x2} ${y2}) rotate(${ang})">${A}</g>`;if(both)s+=`<g transform="translate(${x1} ${y1}) rotate(${ang+180})">${A}</g>`;if(dot)s+=`<circle cx="${x1}" cy="${y1}" r="6" fill="${INK}"/>`;return s};
  if(kind==='point')g=`<circle cx="150" cy="70" r="7" fill="${INK}"/><text x="162" y="62" font-size="16" font-weight="700" fill="${INK}">P</text>`;
  if(kind==='line')g=arrow(40,100,260,40);
  if(kind==='segment')g=`<line x1="50" y1="100" x2="250" y2="40" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="100" r="6" fill="${INK}"/><circle cx="250" cy="40" r="6" fill="${INK}"/>`;
  if(kind==='ray')g=arrow(50,100,260,40,false,true);
  if(kind==='parallel')g=arrow(40,45,260,45)+arrow(40,105,260,105);
  if(kind==='perpendicular')g=arrow(40,75,260,75)+arrow(150,10,150,135)+`<path d="M150 63 h12 v12" fill="none" stroke="${INK}" stroke-width="2"/>`;
  if(kind==='intersecting')g=arrow(50,120,250,20)+arrow(60,30,240,120);
  return svg(300,140,g,kind);
}
const SHAPES={
  equilateral:{pts:'150,20 230,158 70,158',marks:'sides3',side:'equilateral',angle:'acute'},
  isosRight:{pts:'70,30 70,160 200,160',ra:[70,160],side:'isosceles',angle:'right'},
  scaleneObtuse:{pts:'40,150 260,150 100,60',side:'scalene',angle:'obtuse'},
  isosAcute:{pts:'150,15 205,160 95,160',side:'isosceles',angle:'acute'},
  scaleneRight:{pts:'60,40 60,160 250,160',ra:[60,160],side:'scalene',angle:'right'},
  square:{pts:'90,30 210,30 210,150 90,150',q:'square'},rectangle:{pts:'50,50 250,50 250,140 50,140',q:'rectangle'},
  rhombus:{pts:'150,15 230,90 150,165 70,90',q:'rhombus'},parallelogram:{pts:'90,40 260,40 210,140 40,140',q:'parallelogram'},trapezoid:{pts:'100,40 200,40 260,140 40,140',q:'trapezoid'}
};
function shapeSvg(name){const s=SHAPES[name];let g=`<polygon points="${s.pts}" fill="#e1f2ff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;if(s.ra)g+=`<path d="M${s.ra[0]} ${s.ra[1]-16} h16 v16" fill="none" stroke="${INK}" stroke-width="2"/>`;if(s.q==='square'||s.q==='rectangle'){const p=s.pts.split(' ').map(x=>x.split(',').map(Number));p.forEach(([x,y],i)=>{const dx=i===0||i===3?1:-1,dy=i<2?1:-1;g+=`<path d="M${x+dx*14} ${y} v${dy*14} h${-dx*14}" fill="none" stroke="${INK}" stroke-width="2"/>`})}return svg(300,180,g,name)}
const SYM=[['square',4],['rectangle',2],['equilateral',3],['isosAcute',1],['scaleneObtuse',0],['rhombus',2],['parallelogram',0],['trapezoid',1]];
const SYM_LETTERS={A:1,H:2,T:1,U:1,V:1,W:1,X:2,Y:1,M:1,F:0,G:0,J:0,L:0,N:0,P:0,R:0,S:0,Z:0};
function genShape(l){
  if(l===0){const kinds=['point','line','segment','ray','parallel','perpendicular','intersecting'];const names={point:'Point',line:'Line',segment:'Line segment',ray:'Ray',parallel:'Parallel lines',perpendicular:'Perpendicular lines',intersecting:'Intersecting lines (not perpendicular)'};
    const k=pick(kinds);const tips={point:'A point is an exact location, shown with a dot.',line:'A line goes on forever in BOTH directions (arrows on both ends).',segment:'A line segment has two endpoints. It stops at both ends.',ray:'A ray has one endpoint and goes on forever in one direction.',parallel:'Parallel lines never cross and stay the same distance apart.',perpendicular:'Perpendicular lines cross to make square corners (right angles).',intersecting:'Intersecting lines cross each other.'};
    return {key:'f'+k,text:'What is this?',viz:figSvg(k),steps:[mcStep({prompt:'Pick the name.',right:names[k],wrong:shuffle(kinds.filter(x=>x!==k&&!(k==='perpendicular'&&x==='intersecting'))).slice(0,3).map(x=>[names[x],tips[x]]),hints:['Look at the ends: arrows mean it keeps going, dots mean it stops.']})],summary:tips[k]};}
  if(l===1){const t=rand(0,2);
    if(t===0){const n=pick(['equilateral','isosRight','scaleneObtuse','isosAcute','scaleneRight']),s=SHAPES[n];const byAngle=Math.random()<.5;
      return {key:'t'+n+byAngle,text:byAngle?'Classify this triangle by its <b>angles</b>.':'Classify this triangle by its <b>sides</b>.',viz:shapeSvg(n),
        steps:[byAngle?mcFixed('Pick one.',['Acute triangle (all angles less than 90°)','Right triangle (one right angle)','Obtuse triangle (one angle more than 90°)'],['acute','right','obtuse'].indexOf(s.angle),{hints:['Look for a square corner, or a wide-open corner.']}):mcFixed('Pick one.',['Equilateral (all 3 sides equal)','Isosceles (2 sides equal)','Scalene (no sides equal)'],['equilateral','isosceles','scalene'].indexOf(s.side),{hints:['Compare the side lengths. Are any the same?']})],
        summary:`This is ${byAngle?(s.angle==='right'?'a':'an')+' <b>'+s.angle+'</b>':(s.side==='scalene'?'a':'an')+' <b>'+s.side+'</b>'} triangle.`};}
    if(t===1){const n=pick(['square','rectangle','rhombus','parallelogram','trapezoid']);const names=['Square','Rectangle','Rhombus','Parallelogram','Trapezoid'];
      const facts={square:'4 equal sides and 4 right angles.',rectangle:'4 right angles, opposite sides equal.',rhombus:'4 equal sides, but no right angles.',parallelogram:'2 pairs of parallel sides, no right angles.',trapezoid:'Exactly ONE pair of parallel sides (North Carolina\'s rule).'};
      return {key:'q'+n,text:'What is the best name for this quadrilateral?',viz:shapeSvg(n),steps:[mcFixed('Pick the most exact name.',names,names.findIndex(x=>x.toLowerCase()===n),{hints:['Count the pairs of parallel sides.','Look for right angles and equal sides.'],why:names.map(x=>facts[x.toLowerCase()]?`A ${x.toLowerCase()} has ${facts[x.toLowerCase()].toLowerCase()}`:'')})],summary:`A ${n} has ${facts[n].charAt(0).toLowerCase()+facts[n].slice(1)}`};}
    const items=[['Every square is a rectangle.',['Every rectangle is a square.','Every trapezoid is a parallelogram.','A triangle can have two right angles.']],['A rectangle has 2 pairs of parallel sides.',['A trapezoid has 2 pairs of parallel sides.','A rhombus always has right angles.','A right triangle has two right angles.']],['A square has 4 right angles.',['A parallelogram always has 4 right angles.','A rhombus has only 3 sides.','An obtuse triangle has 2 obtuse angles.']]];const it=pick(items);
    return {key:'v'+it[0],text:'Which statement is <b>always true</b>?',steps:[mcStep({prompt:'Pick the true statement.',right:it[0],wrong:it[1],hints:['Draw a quick sketch of each shape in your head or on paper.']})],summary:it[0]};}
  if(Math.random()<.5){const [n,k]=pick(SYM);return {key:'y'+n,text:'How many <b>lines of symmetry</b> does this shape have?',viz:shapeSvg(n),steps:[numStep('Lines of symmetry:',k,{hints:['A line of symmetry folds the shape so both halves match exactly.','Try folding up-down, side-to-side and corner-to-corner.']})],summary:`It has <b>${k}</b> ${plural(k,'line')} of symmetry.`}}
  const L=pick(Object.keys(SYM_LETTERS)),k=SYM_LETTERS[L];
  return {key:'z'+L,text:'How many <b>lines of symmetry</b> does this letter have?',viz:svg(160,160,`<text x="80" y="135" text-anchor="middle" font-size="150" font-weight="700" font-family="Lexend, Arial, sans-serif" fill="${SKY}" stroke="${INK}" stroke-width="2">${L}</text>`,'letter '+L),
    steps:[numStep('Lines of symmetry:',k,{hints:['Imagine folding the letter. Do both halves match?','Try a fold straight down the middle and a fold across the middle.']})],summary:`${L} has <b>${k}</b> ${plural(k,'line')} of symmetry.`};
}

/* ===================== mission definitions ===================== */
const qMake=gen=>(l,i,ctx)=>Q(uniq(ctx,()=>gen(l),s=>s.key));
defMission({id:'tenx',zone:'math',sector:'pv',title:'Ten Times Tower',sym:'10×',color:'#73c2ff',std:['NBT.1'],skill:'Each place is worth 10 times the place to its right',guide:'comet',
  levels:['Value of a digit','10 times as much','Bills and big numbers'],make:qMake(genTenx),
  manual:`<h3>Place value</h3><ul><li>Each place is worth <b>10 times</b> the place to its right.</li><li>ones → tens → hundreds → thousands → ten thousands</li><li>The 7 in 7,000 is worth 10 times the 7 in 700.</li></ul>`});
defMission({id:'forms',zone:'math',sector:'pv',title:'Number Forms',sym:'Aa',color:'#b39bff',std:['NBT.2'],skill:'Read and write numbers to 100,000 in words and expanded form',guide:'comet',
  levels:['Words to digits','Expanded and word form','Tricky regrouped forms'],make:qMake(genForms),
  manual:`<h3>Three ways to write a number</h3><ul><li>Standard: 47,305</li><li>Word: forty-seven thousand, three hundred five</li><li>Expanded: 40,000 + 7,000 + 300 + 5</li></ul><p>Zeros hold empty places.</p>`});
defMission({id:'cmp',zone:'math',sector:'pv',title:'Compare Crater',sym:'<>',color:'#ffc843',std:['NBT.7'],skill:'Compare numbers to 100,000 with <, = and >',guide:'comet',
  levels:['4-digit numbers','5-digit numbers','Different forms'],make:qMake(genCompare),
  manual:`<h3>Comparing numbers</h3><ol><li>More digits = bigger number.</li><li>Same number of digits? Start at the left.</li><li>The first place that is different decides.</li></ol><p>The open side of &lt; or &gt; faces the bigger number.</p>`});
defMission({id:'add',zone:'math',sector:'ops',title:'Carry Cargo',sym:'+',color:'#3fdcb4',std:['NBT.4'],skill:'Addition with regrouping (carrying) up to 100,000',guide:'comet',
  levels:['3-digit numbers','4-digit numbers','5-digit numbers'],make:(l,i,ctx)=>new AddProblem(uniq(ctx,()=>genAdd(l)),l),
  manual:`<h3>How to carry</h3><ol><li>Start in the ones place.</li><li>Add the column. If it's 10 or more, write the ones digit and carry 1 to the next place.</li><li>Add the carried 1 into the next column.</li></ol><p>Check by subtracting.</p>`});
defMission({id:'sub',zone:'math',sector:'ops',title:'Regroup Rescue',sym:'−',color:'#73c2ff',std:['NBT.4'],skill:'Subtraction with regrouping, including across zeros',guide:'comet',
  levels:['2 and 3-digit','Regrouping across zeros','5-digit numbers'],make:(l,i,ctx)=>new SubProblem(uniq(ctx,()=>genSub(l)),l),
  manual:`<h3>How to regroup</h3><ol><li>Start in the <b>ones</b> place. Always do top minus bottom.</li><li>Top digit too small? <b>Regroup!</b> Tap the digit to its left. That digit goes down by 1, and your digit gets 10 more.</li><li>Neighbor is 0? It borrows from <i>its</i> neighbor first.</li><li>Move left, one place at a time.</li></ol><p>Check: answer + bottom number = top number.</p>`});
defMission({id:'mul',zone:'math',sector:'ops',title:'Product Power-Up',sym:'×',color:'#ff6fc0',std:['NBT.5'],skill:'Multiply up to 3-digit × 2-digit: area model, partial products, or lattice',guide:'comet',
  levels:['2-digit × 1-digit','3 or 4-digit × 1-digit','2 or 3-digit × 2-digit'],make:(l,i,ctx)=>makeMul(uniq(ctx,()=>genMul(l)),l),
  manual:()=>mulManual(S().mulMethod)+methodSwitch('mul')});
defMission({id:'div',zone:'math',sector:'ops',title:'Quotient Quest',sym:'÷',color:'#3fdcb4',std:['NBT.6'],skill:'Divide up to 4-digit ÷ 1-digit: long division, partial quotients, or area model',guide:'comet',
  levels:['2-digit ÷ 1-digit','3-digit, remainders','4-digit, remainders'],make:(l,i,ctx)=>makeDiv(uniq(ctx,()=>genDiv(l)),l),
  manual:()=>divManual(S().divMethod)+methodSwitch('div')});
defMission({id:'oa1',zone:'math',sector:'ps',title:'Times as Many',sym:'×?',color:'#ffc843',std:['OA.1'],skill:'Comparison word problems: "times as many" vs. "more than"',guide:'comet',
  levels:['Find the bigger amount','Find the smaller amount','Times or more?'],make:qMake(genOA1),
  manual:`<h3>Comparing with multiplication</h3><ul><li>"<b>3 times as many</b> as 5" means 3 × 5.</li><li>"<b>3 more</b> than 5" means 5 + 3.</li><li>Draw a bar for each amount to see it.</li></ul>`});
defMission({id:'oa3',zone:'math',sector:'ps',title:'Two-Step Missions',sym:'2⃣',color:'#ff6fc0',std:['OA.3'],skill:'Two-step word problems, estimating, and remainders',guide:'comet',
  levels:['Multiply, then add or subtract','Divide, and estimate','What to do with remainders'],make:qMake(genOA3),
  manual:`<h3>Solving word problems</h3><ol><li>Read the whole problem. What is the question?</li><li>What do you need to find first?</li><li>Solve step 1, then step 2.</li><li>Does your answer make sense? Estimate to check.</li></ol><p>Remainders: sometimes you round up, sometimes you drop it, and sometimes the remainder IS the answer.</p>`});
defMission({id:'fac',zone:'math',sector:'ps',title:'Factor Factory',sym:'⁂',color:'#73c2ff',std:['OA.4'],skill:'Factors, multiples, prime and composite numbers to 50',guide:'comet',
  levels:['Multiples and factors','All factor pairs','Prime or composite'],make:qMake(genFactor),
  manual:`<h3>Factors and multiples</h3><ul><li>Factors multiply to make a number: 3 × 4 = 12, so 3 and 4 are factors of 12.</li><li>Multiples are what you land on when you skip-count: 4, 8, 12...</li><li>Prime: exactly 2 factors (1 and itself). Composite: more than 2.</li><li>1 is neither!</li></ul>`});
defMission({id:'pat',zone:'math',sector:'ps',title:'Robot Patterns',sym:'↗',color:'#b39bff',std:['OA.5'],skill:'Follow a rule to make number and shape patterns',guide:'comet',
  levels:['Follow the rule','Notice features','Growing patterns'],make:qMake(genPattern),
  manual:`<h3>Patterns</h3><ul><li>A rule tells you what to do each time, like "add 3".</li><li>Use a table to keep track.</li><li>Look for features: are the numbers all odd? Do they end in 0 or 5?</li></ul>`});
defMission({id:'nf1',zone:'math',sector:'fr',title:'Equal Parts',sym:'½',color:'#ff6fc0',std:['NF.1'],skill:'Equivalent fractions with fraction bars',guide:'comet',
  levels:['Find the numerator','Find the denominator','Which ones are equal?'],make:qMake(genNF1),
  manual:`<h3>Equivalent fractions</h3><ul><li>Equal fractions cover the same amount of the whole.</li><li>Multiply top AND bottom by the same number: 1/2 = 2/4 = 3/6.</li><li>More pieces means smaller pieces.</li></ul>`});
defMission({id:'nf2',zone:'math',sector:'fr',title:'Fraction Face-off',sym:'⅔',color:'#73c2ff',std:['NF.2'],skill:'Compare fractions with <, = and >',guide:'comet',
  levels:['Same top or bottom','Compare to one half','Make them match'],make:qMake(genNF2),
  manual:`<h3>Comparing fractions</h3><ul><li>Same denominator: compare the tops.</li><li>Same numerator: the smaller denominator has bigger pieces.</li><li>Compare each to 1/2.</li><li>Or make the denominators match.</li></ul>`});
defMission({id:'nf3',zone:'math',sector:'fr',title:'Piece by Piece',sym:'¼+',color:'#3fdcb4',std:['NF.3'],skill:'Add and subtract fractions and mixed numbers',guide:'comet',
  levels:['Add and subtract','Break apart fractions','Mixed numbers'],make:qMake(genNF3),
  manual:`<h3>Adding fractions</h3><ul><li>Same denominator: add or subtract the tops. The bottom stays the same.</li><li>Mixed numbers: change them into fractions first (2 1/4 = 9/4).</li><li>Change your answer back into a mixed number.</li></ul>`});
defMission({id:'nf4',zone:'math',sector:'fr',title:'Fraction Times',sym:'3×⅓',color:'#ffc843',std:['NF.4'],skill:'Multiply a whole number by a fraction',guide:'comet',
  levels:['Unit fractions','Any fraction','Word problems'],make:qMake(genNF4),
  manual:`<h3>Whole number × fraction</h3><ul><li>4 × 2/3 means 4 groups of 2/3.</li><li>Multiply the top: 4 × 2 = 8, so 8/3.</li><li>The bottom stays the same because the piece size doesn't change.</li></ul>`});
defMission({id:'dec',zone:'math',sector:'fr',title:'Decimal Docking',sym:'.1',color:'#b39bff',std:['NF.6','NF.7'],skill:'Tenths, hundredths, and comparing decimals',guide:'comet',
  levels:['Read the grid','Tenths to hundredths','Compare decimals'],make:qMake(genDec),
  manual:`<h3>Decimals</h3><ul><li>0.3 = 3/10 = 30/100 (three tenths)</li><li>0.07 = 7/100 (seven hundredths)</li><li>To compare, write both in hundredths: 0.4 = 0.40, which is more than 0.37.</li></ul>`});
defMission({id:'metric',zone:'math',sector:'md',title:'Metric Mission',sym:'cm',color:'#3fdcb4',std:['MD.1','MD.2'],skill:'Metric units and conversions',guide:'comet',
  levels:['Conversion tables','Pick the unit','Word problems'],make:qMake(genMetric),
  manual:`<h3>Metric facts</h3><ul><li>1 meter = 100 centimeters</li><li>1 kilogram = 1,000 grams</li><li>1 liter = 1,000 milliliters</li></ul><p>Going to a smaller unit? Multiply.</p>`});
defMission({id:'time',zone:'math',sector:'md',title:'Mission Clock',sym:'⏱',color:'#ff6fc0',std:['MD.8'],skill:'Elapsed time across the hour',guide:'comet',
  levels:['Within an hour','Hours and minutes','Count backward'],make:qMake(genTime),
  manual:`<h3>Elapsed time</h3><ol><li>Jump to the next hour first.</li><li>Then add the rest of the minutes.</li><li>Use a timeline to keep track of jumps.</li></ol><p>60 minutes = 1 hour.</p>`});
defMission({id:'area',zone:'math',sector:'md',title:'Area & Perimeter',sym:'▦',color:'#73c2ff',std:['MD.3'],skill:'Area and perimeter of rectangles and brick shapes',guide:'comet',
  levels:['Rectangles','Missing sides','L-shapes and fencing'],make:qMake(genArea),
  manual:`<h3>Area and perimeter</h3><ul><li><b>Area</b> = squares inside = length × width.</li><li><b>Perimeter</b> = distance around = add all the sides.</li><li>Odd shapes: split into rectangles, then add the areas.</li></ul>`});
defMission({id:'data',zone:'math',sector:'md',title:'Data Dock',sym:'▮▮',color:'#ffc843',std:['MD.4'],skill:'Bar graphs, line plots, and kinds of data',guide:'comet',
  levels:['Scaled bar graphs','Line plots','Kinds of data'],make:qMake(genData),
  manual:`<h3>Reading graphs</h3><ul><li>Check the scale: each line might be worth 2 or 5.</li><li>On a line plot, each ✕ is one piece of data.</li><li>Categorical data = groups. Numerical data = numbers.</li></ul>`});
defMission({id:'angle',zone:'math',sector:'md',title:'Angle Lab',sym:'∠',color:'#b39bff',std:['MD.6'],skill:'Kinds of angles, protractors, and missing angles',guide:'comet',
  levels:['Kinds of angles','Read a protractor','Missing angles'],make:qMake(genAngle),
  manual:`<h3>Angles</h3><ul><li>Acute: less than 90°. Right: 90°. Obtuse: between 90° and 180°. Straight: 180°.</li><li>Protractor: line one ray up with 0, then read where the other ray crosses.</li><li>Angle parts add up to the whole angle.</li></ul>`});
defMission({id:'shape',zone:'math',sector:'md',title:'Shape Scanner',sym:'△',color:'#3fdcb4',std:['G.1','G.2','G.3'],skill:'Lines, rays, shapes, and lines of symmetry',guide:'comet',
  levels:['Points, lines and rays','Triangles and quadrilaterals','Lines of symmetry'],make:qMake(genShape),
  manual:`<h3>Shapes</h3><ul><li>Line: arrows on both ends. Ray: one endpoint. Segment: two endpoints.</li><li>Parallel lines never meet. Perpendicular lines make right angles.</li><li>Trapezoid (in NC): exactly one pair of parallel sides.</li><li>A line of symmetry folds a shape into two matching halves.</li></ul>`});
