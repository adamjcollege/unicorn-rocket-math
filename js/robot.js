'use strict';
/* ============================================================
   ROBOT STUDIO — stars unlock paint, eyes, hats, arms, chest
   gadgets, pets, and scenes. Stars are never spent. A few
   special parts unlock with mission patches instead (rewards.js).
   Item: [id, name, stars needed, patch needed (optional)]
   ============================================================ */
const ROBOT_CATALOG=[
 {key:'paint',label:'Paint',items:[['sky','Sky blue',0],['mint','Mint',0],['bubble','Bubblegum',3],['sun','Sunshine',8],['lav','Lavender',14],['lava','Lava orange',20],['chrome','Chrome',34],['rainbow','Rainbow',50],['neon','Neon lime',58],['galaxy','Galaxy',75],['ice','Ice crystal',95],['camo','Space camo',110],['candy','Candy stripes',130],['holo','Hologram',220],['gold','Solid gold',0,'perfect10']]},
 {key:'eyes',label:'Eyes',items:[['round','Round',0],['happy','Happy',5],['hearts','Hearts',16],['stars','Stars',30],['scan','Scanner',45],['wink','Wink',60],['visor','Laser visor',70],['shades','Cool shades',85],['pixel','Pixel eyes',100],['cyclops','Cyclops eye',125],['swirl','Hypno swirls',150],['sparkle','Sparkle eyes',0,'facts25']]},
 {key:'top',label:'On top',items:[['antenna','Antenna',0],['none','Nothing',0],['propeller','Propeller',10],['cap','Ball cap',18],['party','Party hat',26],['horn','Unicorn horn',38],['wizard','Wizard hat',55],['headphones','Headphones',62],['tophat','Top hat',75],['crown','Crown',90],['chef','Chef hat',105],['viking','Viking helmet',135],['mohawk','Spiky mohawk',170],['halo','Halo',200],['dome','Space helmet',0,'chapters'],['grad','Graduation cap',0,'allMath'],['joystick','Joystick',0,'bullseye10']]},
 {key:'chest',label:'Chest',items:[['lights','Lights',0],['heart','Heart',6],['bolt','Lightning',22],['smile','Smiley',32],['keypad','Number keypad',40],['star','Star',48],['tv','TV screen',66],['boombox','Boombox',76],['radar','Radar',92],['fishtank','Fish tank',115],['gears','Spinning gears',140],['core','Power core',180],['arcade','Arcade game',240],['eq','Music bars',0,'dj']]},
 {key:'arms',label:'Arms',items:[['classic','Claw arms',0],['mitts','Big mitts',0],['springs','Spring arms',30],['pincers','Crab pincers',56],['magnets','Magnet hands',68],['rocket','Rocket fists',82],['tools','Drill & wrench',98],['tentacles','Squid arms',120],['noodle','Noodle arms',145],['blasters','Star blasters',190],['lightning','Lightning arms',0,'streak7']]},
 {key:'move',label:'Moves on',items:[['wheels','Wheels',0],['treads','Tank treads',12],['legs','Robot legs',24],['boots','Rocket boots',42],['hover','Hover jets',70],['skates','Roller skates',72],['spider','Spider legs',112],['pogo','Pogo stick',155],['unicycle','Unicycle',210],['rainbow','Rainbow jets',260]]},
 {key:'extra',label:'Extras',items:[['none','Nothing',0],['bowtie','Bow tie',4],['scarf','Scarf',15],['ball','Basketball',22],['jetpack','Jetpack',28],['stick','Hockey stick',35],['cape','Star cape',40],['football','Football',46],['wings','Wings',65],['guitar','Guitar',78],['balloon','Balloon',88],['shield','Star shield',118],['sword','Glow sword',165],['flag','Team flag',0,'homework5'],['trophy','Trophy',0,'plan5']]},
 {key:'pet',label:'Pet',items:[['none','No pet',0],['duck','Rubber duck',0,'firstflight'],['drone','Mini drone',60],['robodog','Robo-dog',90],['catbot','Cat bot',128],['owl','Owl bot',175],['unicorn','Baby unicorn',230],['dragon','Tiny dragon',300],['ufo','Mini UFO',0,'arcade']]},
 {key:'scene',label:'Scene',items:[['lab','Robot lab',0],['stars','Starry night',0],['moon','Moon base',45],['mars','Mars',80],['ocean','Under the sea',138],['stadium','Stadium',160],['rainbowsky','Rainbow sky',260],['disco','Disco',0,'dj']]}
];
const ROBOT_DEFAULT={name:'Sprocket',paint:'sky',eyes:'round',top:'antenna',chest:'lights',arms:'classic',move:'wheels',extra:'none',pet:'none',scene:'lab',tvch:0};
function robotCfg(){progress.robot=Object.assign({},ROBOT_DEFAULT,progress.robot||{});return progress.robot}
const itemOpen=([,,need,patch],stars=progress.stars)=>stars>=need&&(!patch||hasPatch(patch));
const allItems=()=>ROBOT_CATALOG.flatMap(c=>c.items.map(it=>({cat:c,it,key:c.key+'|'+it[0]})));
function robotUnlockedList(){return allItems().filter(x=>itemOpen(x.it))}
// parts that open between two star totals (patch parts are announced with their patch)
function robotUnlocks(before,after){return allItems().filter(({it})=>!it[3]&&it[2]>0&&before<it[2]&&after>=it[2]).map(({cat,it})=>`${it[1]} (${cat.label.toLowerCase()})`)}
function nextRobotUnlock(stars=progress.stars){
  const next=allItems().filter(({it})=>!it[3]&&it[2]>stars).sort((a,b)=>a.it[2]-b.it[2])[0];
  return next?{name:next.it[1],cat:next.cat.label,need:next.it[2],more:next.it[2]-stars}:null;
}
const PAINTS={sky:'#9fd3ff',mint:'#8ff0d2',bubble:'#ff9fd6',sun:'#ffe08a',lav:'#cdbbff',lava:'#ffab7a',chrome:'url(#r-chrome)',rainbow:'url(#r-bow)',galaxy:'url(#r-gal)',neon:'#c6ff5e',ice:'url(#r-ice)',camo:'url(#r-camo)',candy:'url(#r-candy)',holo:'url(#r-holo)',gold:'url(#r-gold)'};
const PAINT_SWATCH={chrome:'linear-gradient(135deg,#f4f6fb,#b9c0d4)',rainbow:'linear-gradient(135deg,#ff9fd6,#ffe08a,#8ff0d2,#9fd3ff)',galaxy:'radial-gradient(circle,#6a4fd1,#1b1640)',ice:'linear-gradient(135deg,#ffffff,#bfe9ff,#e9f7ff)',camo:'repeating-linear-gradient(45deg,#7d86c9 0 8px,#5a5fa8 8px 14px,#a9b0e8 14px 20px)',candy:'repeating-linear-gradient(45deg,#fff 0 7px,#ff6fc0 7px 14px)',holo:'linear-gradient(135deg,#c6fff1,#e3c6ff,#c6e3ff,#fff1c6)',gold:'linear-gradient(135deg,#fff1a8,#e0a91c,#fff1a8)'};
const K='#231e52',ST=`stroke="${K}" stroke-width="3" stroke-linejoin="round"`;
const HAND_L=[30,168],HAND_R=[190,168];

/* ---------- parts ---------- */
function armsSvg(kind){
  const line=(x1,y1,x2,y2,w=7,c=K)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  const both=fn=>fn(62,132,...HAND_L,-1)+fn(158,132,...HAND_R,1);
  switch(kind){
    case 'mitts':return both((sx,sy,hx,hy,d)=>line(sx,sy,hx,hy)+`<circle cx="${hx}" cy="${hy+2}" r="12" fill="#fff" ${ST}/><circle cx="${hx-d*9}" cy="${hy-7}" r="5" fill="#fff" ${ST}/>`);
    case 'springs':return both((sx,sy,hx,hy)=>{const n=9,pts=[];for(let i=0;i<=n;i++){const t=i/n,x=sx+(hx-sx)*t,y=sy+(hy-sy)*t,dx=-(hy-sy),dy=hx-sx,L=Math.hypot(dx,dy),o=i===0||i===n?0:(i%2?7:-7);pts.push(`${(x+dx/L*o).toFixed(1)},${(y+dy/L*o).toFixed(1)}`)}
      return `<polyline points="${pts.join(' ')}" fill="none" stroke="#9aa6d6" stroke-width="4.5" stroke-linejoin="round"/><polyline points="${pts.join(' ')}" fill="none" stroke="${K}" stroke-width="1.2"/><circle cx="${hx}" cy="${hy}" r="9" fill="#ffc843" ${ST}/>`});
    case 'pincers':return both((sx,sy,hx,hy,d)=>{const mx=(sx+hx)/2,my=(sy+hy)/2-6;return `<path d="M${sx} ${sy} L${mx} ${my} L${hx} ${hy}" fill="none" stroke="${K}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sx} ${sy} L${mx} ${my} L${hx} ${hy}" fill="none" stroke="#ff8f6b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${mx}" cy="${my}" r="5" fill="#ffc843" stroke="${K}" stroke-width="2"/>`+
      `<path d="M${hx} ${hy} q${d*20} -4 ${d*18} -20 q${-d*4} 10 ${-d*14} 12 z" fill="#ff6f6f" ${ST}/><path d="M${hx} ${hy} q${d*20} 4 ${d*18} 20 q${-d*4} -10 ${-d*14} -12 z" fill="#ff6f6f" ${ST}/>`});
    case 'magnets':return both((sx,sy,hx,hy,d)=>line(sx,sy,hx,hy)+`<path d="M${hx-12} ${hy} v10 a12 12 0 0 0 24 0 v-10 h-8 v10 a4 4 0 0 1 -8 0 v-10 z" fill="#e0453a" ${ST}/><rect x="${hx-12}" y="${hy-6}" width="8" height="7" fill="#e8ebf3" stroke="${K}" stroke-width="2"/><rect x="${hx+4}" y="${hy-6}" width="8" height="7" fill="#e8ebf3" stroke="${K}" stroke-width="2"/><path d="M${hx+d*18} ${hy-4} l${d*6} -4 M${hx+d*19} ${hy+4} l${d*7} 1" stroke="#ffc843" stroke-width="2.5" stroke-linecap="round"/>`);
    case 'rocket':return both((sx,sy,hx,hy,d)=>line(sx,sy,hx,hy,5)+`<path d="M${(sx+hx)/2} ${(sy+hy)/2} q${d*6} 10 ${-d*4} 18" fill="none" stroke="#ff8f6b" stroke-width="6" stroke-linecap="round" opacity=".8"/><rect x="${hx-11}" y="${hy-9}" width="22" height="20" rx="7" fill="#9aa6d6" ${ST}/><path d="M${hx-8} ${hy-9} v-4 M${hx-2} ${hy-9} v-5 M${hx+4} ${hy-9} v-4" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/><path d="M${hx-6} ${hy+11} q6 16 12 0z" fill="#ffc843" class="flame-s"/>`);
    case 'tools':return line(62,132,...HAND_L)+`<path d="M${HAND_L[0]+6} ${HAND_L[1]-8} L${HAND_L[0]-22} ${HAND_L[1]+18} L${HAND_L[0]+10} ${HAND_L[1]+6} Z" fill="#c7cde0" ${ST}/><path d="M${HAND_L[0]-4} ${HAND_L[1]+2} l-6 6 M${HAND_L[0]-10} ${HAND_L[1]+9} l-5 5 M${HAND_L[0]+2} ${HAND_L[1]-4} l-6 6" stroke="${K}" stroke-width="2"/><rect x="${HAND_L[0]-2}" y="${HAND_L[1]-14}" width="16" height="12" rx="3" fill="#ffc843" ${ST}/>`+
      line(158,132,...HAND_R)+`<path d="M${HAND_R[0]} ${HAND_R[1]} l14 12" stroke="#c7cde0" stroke-width="8" stroke-linecap="round"/><path d="M${HAND_R[0]+12} ${HAND_R[1]+6} a9 9 0 1 0 8 14 l-6 -4 l2 -6 z" fill="#c7cde0" ${ST}/>`;
    case 'tentacles':return both((sx,sy,hx,hy,d)=>{const p=`M${sx} ${sy} C${sx+d*30} ${sy-30} ${hx-d*30} ${hy+30} ${hx} ${hy} q${d*10} 10 ${d*4} 18`;return `<path d="${p}" fill="none" stroke="${K}" stroke-width="13" stroke-linecap="round"/><path d="${p}" fill="none" stroke="#b39bff" stroke-width="9" stroke-linecap="round"/>${[.35,.6,.85].map(t=>`<circle cx="${(sx+(hx-sx)*t).toFixed(0)}" cy="${(sy+(hy-sy)*t+(t<.5?-6:6)).toFixed(0)}" r="2.6" fill="#ffd6f0"/>`).join('')}`});
    case 'noodle':return both((sx,sy,hx,hy,d)=>{const p=`M${sx} ${sy} q${d*-4} -26 ${d*14} -22 q${d*18} 6 ${d*2} 22 q${d*-14} 16 ${d*6} 22 q${d*16} 4 ${(hx-sx)-d*16} ${hy-sy-22}`;return `<path d="${p}" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="${p}" fill="none" stroke="${d<0?'#3fdcb4':'#ff6fc0'}" stroke-width="8" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="7" fill="#ffc843" ${ST}/>`});
    case 'blasters':return both((sx,sy,hx,hy,d)=>line(sx,sy,hx,hy)+`<rect x="${hx-10}" y="${hy-10}" width="20" height="24" rx="5" fill="#6a4fd1" ${ST}/><rect x="${hx-6}" y="${hy+12}" width="12" height="8" fill="#9aa6d6" stroke="${K}" stroke-width="2"/><circle cx="${hx}" cy="${hy+24}" r="6" fill="#73c2ff" class="pulse-s"/><path d="M${hx} ${hy-4} l2 4 4 .5 -3 2.6 1 4 -4 -2 -4 2 1 -4 -3 -2.6 4 -.5z" fill="#ffc843"/>`);
    case 'lightning':return both((sx,sy,hx,hy,d)=>{const p=`M${sx} ${sy} L${sx+(hx-sx)*.35+d*8} ${sy+(hy-sy)*.3} L${sx+(hx-sx)*.45-d*8} ${sy+(hy-sy)*.55} L${hx} ${hy}`;return `<path d="${p}" fill="none" stroke="${K}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><path d="${p}" fill="none" stroke="#ffc843" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="8" fill="#fff6c2" ${ST}/>`});
    default:return `<path d="M62 132 L30 168 L22 160 M30 168 L36 178" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M158 132 L190 168 L198 160 M190 168 L184 178" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/>`;
  }
}
const TV_CHANNELS=['static','rocket','unicorn','soccer','bars','fish'];
function chestSvg(cfg){
  const kind=cfg.chest,panel=(fill='#fff')=>`<rect x="80" y="130" width="60" height="40" rx="8" fill="${fill}" stroke="${K}" stroke-width="2"/>`;
  if(kind==='tv'){
    const ch=TV_CHANNELS[(cfg.tvch||0)%TV_CHANNELS.length];
    const show={static:`<rect x="83" y="133" width="42" height="34" fill="#c9c9d6"/><g class="tv-static">${Array.from({length:9},(_,i)=>`<rect x="83" y="${134+i*3.6}" width="42" height="1.6" fill="${i%2?'#fff':'#8b8ba3'}" opacity=".8"/>`).join('')}</g>`,
      rocket:`<rect x="83" y="133" width="42" height="34" fill="#211c58"/><circle cx="90" cy="139" r="1" fill="#fff"/><circle cx="118" cy="160" r="1" fill="#fff"/><g class="tv-bob"><path d="M104 138 q8 6 6 16 h-12 q-2 -10 6 -16z" fill="#f1ebff" stroke="${K}" stroke-width="1.2"/><circle cx="104" cy="148" r="2.6" fill="#73c2ff"/><path d="M100 154 q4 9 8 0z" fill="#ff8f6b"/></g>`,
      unicorn:`<rect x="83" y="133" width="42" height="34" fill="#ffd6f0"/><path d="M96 162 q-2 -14 8 -18 q8 -2 10 6 l-6 2 q0 6 -4 10z" fill="#fff" stroke="${K}" stroke-width="1.2"/><path d="M110 144 l4 -8 l-1 9z" fill="#ffc843"/><path d="M98 146 q-4 4 -2 10" fill="none" stroke="#b39bff" stroke-width="3" stroke-linecap="round"/><circle cx="108" cy="148" r="1.2" fill="${K}"/>`,
      soccer:`<rect x="83" y="133" width="42" height="34" fill="#3faa5c"/><path d="M83 150 h42 M104 133 v34" stroke="#fff" stroke-width="1" opacity=".7"/><g class="tv-bob"><circle cx="104" cy="150" r="6.5" fill="#fff" stroke="${K}" stroke-width="1.2"/><path d="M104 147 l2.4 1.8 -.9 2.8 h-3 l-.9 -2.8z" fill="${K}"/></g>`,
      bars:['#fff','#ffc843','#73c2ff','#3fdcb4','#ff6fc0','#e0453a','#5a3fb5'].map((c,i)=>`<rect x="${83+i*6}" y="133" width="6" height="34" fill="${c}"/>`).join(''),
      fish:`<rect x="83" y="133" width="42" height="34" fill="#73c2ff"/><g class="tv-swim"><path d="M96 150 q8 -8 16 0 q-8 8 -16 0z M96 150 l-6 -5 v10z" fill="#ff8f3a" stroke="${K}" stroke-width="1"/><circle cx="108" cy="149" r="1" fill="${K}"/></g>`}[ch];
    return `<g class="chest-hit" data-chest="tv"><path d="M98 126 l-8 -10 M112 126 l8 -10" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/><circle cx="90" cy="115" r="2.5" fill="#ff6fc0"/><circle cx="120" cy="115" r="2.5" fill="#ff6fc0"/>
      <rect x="77" y="126" width="66" height="46" rx="8" fill="#8a5a3c" stroke="${K}" stroke-width="2.5"/><clipPath id="tvclip"><rect x="83" y="133" width="42" height="34" rx="5"/></clipPath><g clip-path="url(#tvclip)">${show}</g><rect x="83" y="133" width="42" height="34" rx="5" fill="none" stroke="${K}" stroke-width="2"/><circle cx="134" cy="141" r="3.5" fill="#ffc843" stroke="${K}" stroke-width="1.5"/><circle cx="134" cy="154" r="3.5" fill="#ffc843" stroke="${K}" stroke-width="1.5"/><rect x="130" y="161" width="8" height="5" rx="1" fill="${K}"/></g>`;
  }
  if(kind==='boombox')return `<g class="chest-hit boombox" data-chest="boombox"><path d="M90 132 v-9 h40 v9" fill="none" stroke="${K}" stroke-width="3.5"/><rect x="74" y="131" width="72" height="38" rx="7" fill="#3b3f5c" stroke="${K}" stroke-width="2.5"/>${[91,129].map(x=>`<circle cx="${x}" cy="152" r="12" fill="#1f2236" stroke="#9aa6d6" stroke-width="2"/><g class="spk" style="transform-origin:${x}px 152px"><circle cx="${x}" cy="152" r="7" fill="#6b6f8f"/><circle cx="${x}" cy="152" r="2.5" fill="#c9cde6"/></g>`).join('')}<rect x="103" y="143" width="14" height="10" rx="1.5" fill="#ffc843" stroke="${K}" stroke-width="1.2"/><circle cx="107" cy="148" r="1.6" fill="${K}"/><circle cx="113" cy="148" r="1.6" fill="${K}"/><rect x="103" y="157" width="4" height="3" fill="#ff6fc0"/><rect x="108" y="157" width="4" height="3" fill="#3fdcb4"/><rect x="113" y="157" width="4" height="3" fill="#73c2ff"/><circle cx="110" cy="137" r="2" fill="#ff6fc0" class="pulse-s"/></g>`;
  if(kind==='keypad')return panel('#e9edf7')+[1,2,3,4,5,6,7,8,9].map((n,i)=>{const x=89+(i%3)*14,y=134+Math.floor(i/3)*11.5;return `<rect x="${x}" y="${y}" width="12" height="9.5" rx="2" fill="#fff" stroke="${K}" stroke-width="1.2"/><text x="${x+6}" y="${y+7.6}" text-anchor="middle" font-size="7.5" font-weight="700" fill="${K}">${n}</text>`}).join('');
  if(kind==='radar')return panel('#0d3b2e')+`<circle cx="110" cy="150" r="16" fill="none" stroke="#3fdcb4" stroke-width="1.5"/><circle cx="110" cy="150" r="8" fill="none" stroke="#3fdcb4" stroke-width="1" opacity=".7"/><path d="M94 150 h32 M110 134 v32" stroke="#3fdcb4" stroke-width=".8" opacity=".6"/><g class="spin" style="transform-origin:110px 150px"><path d="M110 150 L110 134 A16 16 0 0 1 124 142 Z" fill="#3fdcb4" opacity=".45"/></g><circle cx="117" cy="143" r="2" fill="#ffc843" class="pulse-s"/>`;
  if(kind==='fishtank')return `<rect x="80" y="130" width="60" height="40" rx="8" fill="#73c2ff" stroke="${K}" stroke-width="2"/><path d="M80 138 h60" stroke="#fff" stroke-width="1.5" opacity=".6"/><path d="M88 170 q-3 -10 2 -16 q4 8 -1 16 M128 170 q4 -12 -2 -18 q-3 8 1 18" fill="#3fdcb4"/><g class="tv-swim"><path d="M98 150 q7 -7 14 0 q-7 7 -14 0z M98 150 l-6 -4 v8z" fill="#ff8f3a" stroke="${K}" stroke-width="1"/><circle cx="108" cy="149" r="1" fill="${K}"/></g><path d="M118 160 q4 -4 8 0 q-4 4 -8 0z M118 160 l-3 -2 v4z" fill="#ffc843"/><g class="bubbles"><circle cx="114" cy="146" r="1.6" fill="none" stroke="#fff"/><circle cx="117" cy="140" r="1.2" fill="none" stroke="#fff"/></g>`;
  if(kind==='gears'){const gear=(x,y,r,c,cls)=>`<g class="${cls}" style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="5" stroke-dasharray="3 2.6"/><circle cx="${x}" cy="${y}" r="${r-2}" fill="${c}"/><circle cx="${x}" cy="${y}" r="3" fill="#fff"/></g>`;return panel('#eef0f8')+gear(100,147,12,'#9aa6d6','spin')+gear(122,157,9,'#ffc843','spin-r')}
  if(kind==='core')return panel('#1b1640')+`<defs><radialGradient id="r-core"><stop offset="0" stop-color="#fff"/><stop offset=".4" stroke-width="0" stop-color="#73c2ff"/><stop offset="1" stop-color="#73c2ff" stop-opacity="0"/></radialGradient></defs><circle cx="110" cy="150" r="17" fill="url(#r-core)" class="pulse-s"/><circle cx="110" cy="150" r="7" fill="#fff"/><path d="M110 136 v6 M110 158 v6 M96 150 h6 M118 150 h6" stroke="#73c2ff" stroke-width="2" stroke-linecap="round"/>`;
  if(kind==='eq')return panel('#1b1640')+['#ff6fc0','#ffc843','#3fdcb4','#73c2ff','#b39bff','#ff8f6b'].map((c,i)=>`<rect x="${86+i*8.4}" y="136" width="6" height="28" rx="2" fill="${c}" class="eqbar" style="transform-origin:${89+i*8.4}px 164px;animation-delay:${i*.13}s"/>`).join('');
  if(kind==='arcade')return panel('#14112f')+`<g fill="#3fdcb4" class="tv-bob">${[[3,0],[9,0],[4,1],[5,1],[6,1],[7,1],[8,1],[3,2],[4,2],[6,2],[8,2],[9,2],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[2,4],[4,4],[5,4],[6,4],[7,4],[8,4],[10,4],[2,5],[4,5],[8,5],[10,5],[5,6],[7,6]].map(([x,y])=>`<rect x="${94+x*2.6}" y="${138+y*2.6}" width="2.6" height="2.6"/>`).join('')}</g><text x="137" y="166" text-anchor="end" font-size="6" font-weight="700" fill="#ffc843">999</text><rect x="86" y="163" width="10" height="3" fill="#ff6fc0"/>`;
  const cs={lights:`<circle cx="96" cy="150" r="6" fill="#ff6fc0"/><circle cx="110" cy="150" r="6" fill="#ffc843"/><circle cx="124" cy="150" r="6" fill="#3fdcb4"/>`,
    heart:`<path d="M110 162 C96 152 92 144 98 139 C103 135 108 138 110 142 C112 138 117 135 122 139 C128 144 124 152 110 162 Z" fill="#ff6fc0"/>`,
    bolt:`<path d="M114 136 L100 152 H110 L106 166 L122 148 H112 Z" fill="#ffc843" stroke="${K}" stroke-width="1.5"/>`,
    smile:`<circle cx="102" cy="145" r="3" fill="${K}"/><circle cx="118" cy="145" r="3" fill="${K}"/><path d="M100 154 q10 9 20 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`,
    star:`<path d="M110 136 l4 9 10 1 -8 6 3 10 -9 -5 -9 5 3 -10 -8 -6 10 -1z" fill="#ffc843" stroke="${K}" stroke-width="1.5"/>`}[kind]||'';
  return panel()+cs;
}
function eyesSvg(kind){
  return {round:`<circle cx="96" cy="66" r="7" fill="#3fdcb4"/><circle cx="124" cy="66" r="7" fill="#3fdcb4"/><circle cx="98" cy="64" r="2" fill="#fff"/><circle cx="126" cy="64" r="2" fill="#fff"/>`,
    happy:`<path d="M88 70 q8 -10 16 0 M116 70 q8 -10 16 0" fill="none" stroke="#3fdcb4" stroke-width="4" stroke-linecap="round"/>`,
    hearts:[96,124].map(x=>`<path d="M${x} 74 C${x-9} 67 ${x-10} 61 ${x-6} 58 C${x-3} 56 ${x} 58 ${x} 61 C${x} 58 ${x+3} 56 ${x+6} 58 C${x+10} 61 ${x+9} 67 ${x} 74 Z" fill="#ff6fc0"/>`).join(''),
    stars:[96,124].map(x=>`<path d="M${x} 57 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#ffc843"/>`).join(''),
    scan:`<rect x="84" y="63" width="52" height="7" rx="3.5" fill="#ff6fc0"/><rect x="106" y="63" width="12" height="7" rx="3.5" fill="#fff" class="scanner"/>`,
    wink:`<circle cx="96" cy="66" r="7" fill="#3fdcb4"/><path d="M116 67 h16" stroke="#3fdcb4" stroke-width="4" stroke-linecap="round"/>`,
    visor:`<rect x="80" y="59" width="60" height="13" rx="6.5" fill="#ff6fc0"/><rect x="84" y="61" width="20" height="3" rx="1.5" fill="#fff" opacity=".7"/><rect x="80" y="59" width="60" height="13" rx="6.5" fill="none" stroke="#ffd6f0" stroke-width="2" class="pulse-s"/>`,
    shades:`<path d="M80 60 h26 v6 q0 9 -9 9 h-8 q-9 0 -9 -9z M114 60 h26 v6 q0 9 -9 9 h-8 q-9 0 -9 -9z" fill="#0d0b22" stroke="#ffc843" stroke-width="2"/><path d="M106 63 h8" stroke="#ffc843" stroke-width="2.5"/><path d="M84 63 l6 0 M118 63 l6 0" stroke="#fff" stroke-width="2" opacity=".7"/>`,
    pixel:[90,118].map(x=>`<rect x="${x}" y="59" width="13" height="13" fill="#3fdcb4"/><rect x="${x+2}" y="61" width="4" height="4" fill="#fff"/>`).join(''),
    cyclops:`<circle cx="110" cy="66" r="11" fill="#fff"/><circle cx="111" cy="67" r="6" fill="#3fdcb4"/><circle cx="111" cy="67" r="2.5" fill="${K}"/><circle cx="107" cy="62" r="2" fill="#fff"/>`,
    swirl:[96,124].map(x=>`<g class="spin" style="transform-origin:${x}px 66px"><path d="M${x} 66 m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -6 0 a5 5 0 1 1 10 0 a7 7 0 1 1 -14 0" fill="none" stroke="#b39bff" stroke-width="2.4" stroke-linecap="round"/></g>`).join(''),
    sparkle:`<circle cx="96" cy="66" r="7" fill="#ffc843"/><circle cx="124" cy="66" r="7" fill="#ffc843"/><circle cx="98" cy="64" r="2.4" fill="#fff"/><circle cx="126" cy="64" r="2.4" fill="#fff"/><path d="M84 58 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z M136 70 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5 -3 -3 -1.5 3 -1.5z" fill="#fff" class="twinkle"/>`}[kind]||'';
}
function topSvg(kind){
  return {antenna:`<line x1="80" y1="40" x2="70" y2="16" stroke="${K}" stroke-width="3"/><circle cx="70" cy="13" r="7" fill="#ff6fc0" ${ST}/>`,none:'',
    propeller:`<line x1="110" y1="40" x2="110" y2="20" stroke="${K}" stroke-width="3"/><g class="spin-y" style="transform-origin:110px 18px"><ellipse cx="94" cy="18" rx="16" ry="5" fill="#ff6fc0" ${ST}/><ellipse cx="126" cy="18" rx="16" ry="5" fill="#73c2ff" ${ST}/></g><circle cx="110" cy="18" r="4" fill="#ffc843" ${ST}/>`,
    cap:`<path d="M70 44 Q110 6 150 44 Z" fill="#e0507f" ${ST}/><path d="M146 42 h30 q4 6 -4 8 h-28 z" fill="#e0507f" ${ST}/><circle cx="110" cy="20" r="4" fill="#fff"/>`,
    party:`<path d="M92 42 L110 2 L128 42 Z" fill="#73c2ff" ${ST}/><path d="M100 26 L120 26 M96 34 L124 34" stroke="#ffc843" stroke-width="4"/><circle cx="110" cy="3" r="6" fill="#ff6fc0" ${ST}/>`,
    horn:`<polygon points="100,42 110,2 120,42" fill="#ffc843" ${ST}/><path d="M104 30 L117 26 M106 20 L115 17" stroke="#b56b00" stroke-width="2.5"/>`,
    wizard:`<path d="M72 44 Q110 30 148 44 Z" fill="#5a3fb5" ${ST}/><path d="M86 40 L114 -2 L134 40 Z" fill="#6a4fd1" ${ST}/><path d="M108 18 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z" fill="#ffc843"/>`,
    crown:`<path d="M80 42 L82 12 L96 26 L110 6 L124 26 L138 12 L140 42 Z" fill="#ffc843" ${ST}/><circle cx="96" cy="34" r="4" fill="#ff6fc0"/><circle cx="110" cy="32" r="4" fill="#3fdcb4"/><circle cx="124" cy="34" r="4" fill="#73c2ff"/>`,
    headphones:`<path d="M64 66 Q64 14 110 14 Q156 14 156 66" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M64 66 Q64 14 110 14 Q156 14 156 66" fill="none" stroke="#ff6fc0" stroke-width="5" stroke-linecap="round"/><rect x="52" y="54" width="18" height="30" rx="8" fill="#ff6fc0" ${ST}/><rect x="150" y="54" width="18" height="30" rx="8" fill="#ff6fc0" ${ST}/><circle cx="61" cy="69" r="4" fill="#ffc843"/><circle cx="159" cy="69" r="4" fill="#ffc843"/>`,
    tophat:`<ellipse cx="110" cy="40" rx="36" ry="7" fill="#231e52" ${ST}/><rect x="88" y="2" width="44" height="38" rx="4" fill="#2f2878" ${ST}/><rect x="88" y="28" width="44" height="7" fill="#ff6fc0" stroke="${K}" stroke-width="2"/>`,
    chef:`<rect x="86" y="26" width="48" height="16" rx="3" fill="#fff" ${ST}/><path d="M86 28 q-14 -10 -4 -20 q6 -8 16 -4 q6 -10 18 -6 q10 -6 18 4 q12 2 8 14 q-2 8 -8 12z" fill="#fff" ${ST}/>`,
    viking:`<path d="M70 44 Q70 10 110 10 Q150 10 150 44 Z" fill="#b9c0d4" ${ST}/><path d="M70 44 h80" stroke="#b56b00" stroke-width="6"/><path d="M74 30 q-22 -6 -24 -28 q12 16 30 16 z M146 30 q22 -6 24 -28 q-12 16 -30 16 z" fill="#fff6dd" ${ST}/><circle cx="110" cy="26" r="4" fill="#ffc843" ${ST}/>`,
    mohawk:`<path d="M84 42 L88 14 L96 32 L102 4 L108 30 L114 2 L120 30 L126 6 L130 32 L136 16 L138 42 Z" fill="#ff6fc0" ${ST}/><path d="M96 32 L102 14 M114 26 L116 12" stroke="#ffc843" stroke-width="3"/>`,
    halo:`<ellipse cx="110" cy="18" rx="30" ry="8" fill="none" stroke="#ffc843" stroke-width="6" class="pulse-s"/><ellipse cx="110" cy="18" rx="30" ry="8" fill="none" stroke="#fff6c2" stroke-width="2"/>`,
    dome:`<path d="M44 104 A66 66 0 1 1 176 104" fill="#bfe9ff" fill-opacity=".25" stroke="#e9f7ff" stroke-width="4"/><path d="M44 104 A66 66 0 1 1 176 104" fill="none" stroke="${K}" stroke-width="2" stroke-opacity=".5"/><path d="M66 46 q14 -24 40 -26" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/><rect x="40" y="100" width="140" height="10" rx="5" fill="#b9c0d4" ${ST}/>`,
    joystick:`<rect x="88" y="26" width="44" height="16" rx="5" fill="#2f2878" ${ST}/><path d="M110 26 V8" stroke="${K}" stroke-width="6" stroke-linecap="round"/><circle cx="110" cy="8" r="9" fill="#ff6f6f" ${ST}/><circle cx="96" cy="34" r="3.5" fill="#ffc843"/><circle cx="124" cy="34" r="3.5" fill="#3fdcb4"/>`,
    grad:`<rect x="88" y="26" width="44" height="16" rx="3" fill="#231e52" ${ST}/><path d="M66 22 L110 6 L154 22 L110 38 Z" fill="#2f2878" ${ST}/><path d="M110 22 L148 28 V48" fill="none" stroke="#ffc843" stroke-width="3"/><circle cx="148" cy="50" r="4" fill="#ffc843"/>`}[kind]||'';
}
function moveSvg(kind){
  return {wheels:`<circle cx="80" cy="226" r="22" fill="${K}"/><circle cx="80" cy="226" r="8" fill="#b39bff"/><circle cx="140" cy="226" r="22" fill="${K}"/><circle cx="140" cy="226" r="8" fill="#b39bff"/>`,
    treads:`<rect x="52" y="204" width="116" height="44" rx="22" fill="${K}"/>${[74,96,118,140].map(x=>`<circle cx="${x+3}" cy="226" r="9" fill="#9aa6d6"/>`).join('')}`,
    legs:`<rect x="78" y="200" width="16" height="36" fill="#9aa6d6" ${ST}/><rect x="126" y="200" width="16" height="36" fill="#9aa6d6" ${ST}/><ellipse cx="84" cy="240" rx="20" ry="9" fill="${K}"/><ellipse cx="136" cy="240" rx="20" ry="9" fill="${K}"/>`,
    boots:`<rect x="78" y="200" width="16" height="36" fill="#9aa6d6" ${ST}/><rect x="126" y="200" width="16" height="36" fill="#9aa6d6" ${ST}/><rect x="68" y="226" width="34" height="18" rx="6" fill="#ff6fc0" ${ST}/><rect x="118" y="226" width="34" height="18" rx="6" fill="#ff6fc0" ${ST}/><path d="M74 244 q11 22 22 0z M124 244 q11 22 22 0z" fill="#ffc843" class="flame-s"/>`,
    hover:`<ellipse cx="110" cy="246" rx="62" ry="10" fill="#73c2ff" opacity=".45"/><path d="M84 204 h52 l-8 20 h-36 z" fill="#9aa6d6" ${ST}/><path d="M94 224 q16 26 32 0z" fill="#73c2ff" opacity=".8" class="flame-s"/>`,
    skates:`<rect x="78" y="200" width="16" height="28" fill="#9aa6d6" ${ST}/><rect x="126" y="200" width="16" height="28" fill="#9aa6d6" ${ST}/><path d="M70 226 h30 v12 h-30 q-4 -6 0 -12z M120 226 h30 v12 h-30 q-4 -6 0 -12z" fill="#3fdcb4" ${ST}/>${[74,94,124,144].map(x=>`<circle cx="${x}" cy="244" r="5.5" fill="#ffc843" stroke="${K}" stroke-width="2"/>`).join('')}`,
    spider:[[-1,70],[-1,90],[-1,104],[1,116],[1,130],[1,150]].map(([d,x],i)=>{const kx=x+d*(14+i%3*6),fx=kx+d*10;return `<path d="M${x} 200 L${kx} 222 L${fx} 246" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x} 200 L${kx} 222 L${fx} 246" fill="none" stroke="#9aa6d6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`}).join(''),
    pogo:`<rect x="104" y="200" width="12" height="24" fill="#9aa6d6" ${ST}/><path d="M80 214 h60" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M110 224 l-8 4 l16 4 l-16 4 l16 4 l-8 4" fill="none" stroke="#ff6fc0" stroke-width="4" stroke-linejoin="round"/><rect x="104" y="246" width="12" height="6" rx="3" fill="${K}"/>`,
    unicycle:`<path d="M110 200 v22" stroke="${K}" stroke-width="7"/><path d="M98 204 h24" stroke="${K}" stroke-width="6" stroke-linecap="round"/><circle cx="110" cy="232" r="20" fill="none" stroke="${K}" stroke-width="7"/><g class="spin" style="transform-origin:110px 232px"><path d="M110 214 v36 M92 232 h36" stroke="#9aa6d6" stroke-width="2.5"/></g><circle cx="110" cy="232" r="4" fill="#ffc843"/>`,
    rainbow:`<path d="M84 204 h52 l-8 18 h-36 z" fill="#9aa6d6" ${ST}/>${['#ff6fc0','#ffc843','#3fdcb4','#73c2ff','#b39bff'].map((c,i)=>`<path d="M${96+i*0} ${222} q${-30-i*6} ${14+i*4} ${-70} ${18+i*6}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".9"/>`).join('')}`}[kind]||'';
}
function extraSvg(kind,where){ // where: 'back' or 'front'
  const [hx,hy]=HAND_R;
  if(where==='back')return {cape:`<path d="M64 112 L36 240 L184 240 L156 112 Z" fill="#8a4fff" ${ST}/><path d="M78 196 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#ffc843"/><path d="M140 168 l3 6 6 1 -4 4 1 6 -6 -3 -6 3 1 -6 -4 -4 6 -1z" fill="#ffc843"/>`,
    wings:`<path d="M62 130 C20 90 4 140 30 170 C14 176 30 196 62 176 Z" fill="#ffffff" ${ST}/><path d="M158 130 C200 90 216 140 190 170 C206 176 190 196 158 176 Z" fill="#ffffff" ${ST}/>`,
    jetpack:`<rect x="38" y="118" width="22" height="58" rx="8" fill="#ffc843" ${ST}/><rect x="160" y="118" width="22" height="58" rx="8" fill="#ffc843" ${ST}/><path d="M42 176 q7 24 14 0z M164 176 q7 24 14 0z" fill="#ff8f6b" class="flame-s"/>`,
    balloon:`<path d="M${hx} ${hy} q14 -30 10 -62" fill="none" stroke="${K}" stroke-width="1.5"/><ellipse cx="${hx+12}" cy="${hy-84}" rx="17" ry="21" fill="#ff6f6f" ${ST}/><path d="M${hx+6} ${hy-96} q4 -6 10 -4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M${hx+9} ${hy-62} l3 4 l3 -4z" fill="#ff6f6f" stroke="${K}" stroke-width="1.5"/>`}[kind]||'';
  return {stick:`<path d="M196 150 L178 238 L150 240" fill="none" stroke="#b56b00" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><rect x="146" y="234" width="30" height="10" rx="3" fill="${K}"/>`,
    ball:`<circle cx="196" cy="186" r="17" fill="#ff8f3a" ${ST}/><path d="M179 186 h34 M196 169 v34 M184 174 q12 12 0 24 M208 174 q-12 12 0 24" fill="none" stroke="${K}" stroke-width="2"/>`,
    football:`<ellipse cx="198" cy="184" rx="20" ry="12" transform="rotate(-30 198 184)" fill="#a0522d" ${ST}/><path d="M190 186 l14 -8 M193 180 l3 5 M197 178 l3 5 M201 175 l3 5" stroke="#fff" stroke-width="2"/>`,
    bowtie:`<path d="M110 112 l-18 -9 v18 z M110 112 l18 -9 v18 z" fill="#ff6fc0" ${ST}/><circle cx="110" cy="112" r="4" fill="#ff6fc0" ${ST}/>`,
    scarf:`<path d="M84 104 h52 v14 h-52 z" fill="#3fdcb4" ${ST}/><path d="M124 116 l8 34 l-14 2 l-4 -36 z" fill="#3fdcb4" ${ST}/>`,
    guitar:`<path d="M186 178 L214 110" stroke="#8a5a3c" stroke-width="7" stroke-linecap="round"/><rect x="208" y="98" width="12" height="16" rx="3" fill="#8a5a3c" ${ST} transform="rotate(22 214 106)"/><path d="M178 172 q-16 4 -12 20 q-10 14 6 24 q14 8 24 -6 q14 -4 8 -20 q-4 -14 -26 -18z" fill="#ff6f6f" ${ST}/><circle cx="184" cy="196" r="6" fill="${K}"/><path d="M182 210 l6 -14" stroke="#ffc843" stroke-width="3"/>`,
    shield:`<circle cx="${HAND_L[0]-4}" cy="${HAND_L[1]+6}" r="24" fill="#73c2ff" ${ST}/><circle cx="${HAND_L[0]-4}" cy="${HAND_L[1]+6}" r="16" fill="#fff" stroke="${K}" stroke-width="2"/><path d="M${HAND_L[0]-4} ${HAND_L[1]-6} l3.5 7.5 8 1 -6 5.5 1.6 8 -7.1 -4 -7.1 4 1.6 -8 -6 -5.5 8 -1z" fill="#ffc843" stroke="${K}" stroke-width="1.5"/>`,
    sword:`<path d="M${hx+2} ${hy-4} L${hx+26} ${hy-84}" stroke="#73c2ff" stroke-width="11" stroke-linecap="round" opacity=".55" class="pulse-s"/><path d="M${hx+2} ${hy-4} L${hx+26} ${hy-84}" stroke="#e9f7ff" stroke-width="4" stroke-linecap="round"/><path d="M${hx-10} ${hy-2} l22 6" stroke="${K}" stroke-width="5" stroke-linecap="round"/><path d="M${hx} ${hy} l-4 14" stroke="#9aa6d6" stroke-width="7" stroke-linecap="round"/>`,
    flag:`<path d="M${hx+4} ${hy+10} L${hx+4} ${hy-80}" stroke="#b56b00" stroke-width="5" stroke-linecap="round"/><path d="M${hx+4} ${hy-80} q20 -6 36 4 q-14 8 -36 20z" fill="#ff6fc0" ${ST}/><path d="M${hx+18} ${hy-74} l2 4 4 .5 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -.5z" fill="#ffc843"/>`,
    trophy:`<path d="M${hx-12} ${hy-22} h28 v8 q0 16 -14 18 q-14 -2 -14 -18 z" fill="#ffc843" ${ST}/><path d="M${hx-12} ${hy-18} q-9 0 -7 7 q2 5 8 5 M${hx+16} ${hy-18} q9 0 7 7 q-2 5 -8 5" fill="none" stroke="${K}" stroke-width="2.5"/><rect x="${hx-2}" y="${hy+4}" width="8" height="8" fill="#ffc843" stroke="${K}" stroke-width="2"/><rect x="${hx-8}" y="${hy+12}" width="20" height="7" rx="2" fill="#b56b00" stroke="${K}" stroke-width="2"/>`}[kind]||'';
}
function petSvg(kind){
  const s=`stroke="${K}" stroke-width="2.2" stroke-linejoin="round"`;
  return {duck:`<g class="tv-bob"><ellipse cx="22" cy="236" rx="18" ry="11" fill="#ffd23f" ${s}/><circle cx="30" cy="220" r="10" fill="#ffd23f" ${s}/><path d="M38 220 l9 2 l-9 4z" fill="#ff8f3a" ${s}/><circle cx="32" cy="217" r="2" fill="${K}"/><path d="M10 230 q8 -2 12 6" fill="none" stroke="${K}" stroke-width="1.8"/></g>`,
    drone:`<g class="hover-s"><path d="M8 26 h40" stroke="${K}" stroke-width="3"/><g class="spin-y" style="transform-origin:8px 20px"><ellipse cx="8" cy="20" rx="10" ry="2.5" fill="#9aa6d6" ${s}/></g><g class="spin-y" style="transform-origin:48px 20px"><ellipse cx="48" cy="20" rx="10" ry="2.5" fill="#9aa6d6" ${s}/></g><path d="M8 20 v6 M48 20 v6" stroke="${K}" stroke-width="2.5"/><rect x="16" y="24" width="24" height="14" rx="6" fill="#73c2ff" ${s}/><circle cx="28" cy="31" r="4" fill="${K}"/><circle cx="29" cy="30" r="1.4" fill="#3fdcb4"/></g>`,
    robodog:`<rect x="2" y="222" width="34" height="16" rx="6" fill="#c7cde0" ${s}/><rect x="28" y="210" width="20" height="16" rx="5" fill="#c7cde0" ${s}/><path d="M30 210 l-2 -8 l6 6 M44 210 l3 -8 l-1 9" fill="#c7cde0" ${s}/><circle cx="41" cy="217" r="2" fill="${K}"/><circle cx="48" cy="221" r="2.2" fill="#ff6fc0"/><path d="M8 238 v10 M16 238 v10 M24 238 v10 M32 238 v10" stroke="${K}" stroke-width="4" stroke-linecap="round"/><path d="M2 226 q-8 -8 -4 -16" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round" class="wag" style="transform-origin:2px 226px"/><circle cx="-2" cy="209" r="3" fill="#ffc843"/>`,
    catbot:`<rect x="6" y="226" width="34" height="20" rx="8" fill="#ffab7a" ${s}/><rect x="10" y="202" width="28" height="24" rx="8" fill="#ffab7a" ${s}/><path d="M12 206 l-2 -12 l10 8 M36 206 l2 -12 l-10 8" fill="#ffab7a" ${s}/><rect x="14" y="210" width="20" height="9" rx="4" fill="${K}"/><circle cx="19" cy="214.5" r="2.2" fill="#3fdcb4"/><circle cx="29" cy="214.5" r="2.2" fill="#3fdcb4"/><path d="M40 238 q14 -2 10 -16" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round" class="wag" style="transform-origin:40px 238px"/>`,
    owl:`<ellipse cx="24" cy="226" rx="18" ry="22" fill="#b39bff" ${s}/><path d="M8 210 l2 -12 l8 8 M40 210 l-2 -12 l-8 8" fill="#b39bff" ${s}/><circle cx="17" cy="218" r="7" fill="#fff" ${s}/><circle cx="31" cy="218" r="7" fill="#fff" ${s}/><circle cx="17" cy="218" r="3" fill="${K}"/><circle cx="31" cy="218" r="3" fill="${K}"/><path d="M22 224 l2 5 l2 -5z" fill="#ffc843"/><path d="M14 246 v4 M34 246 v4" stroke="#ffc843" stroke-width="3"/>`,
    unicorn:`<ellipse cx="22" cy="232" rx="20" ry="12" fill="#fff" ${s}/><path d="M8 240 v10 M16 242 v8 M28 242 v8 M36 240 v10" stroke="${K}" stroke-width="3.5" stroke-linecap="round"/><path d="M34 228 q4 -16 12 -18 q8 0 8 8 l-6 4 q-2 6 -8 10z" fill="#fff" ${s}/><path d="M48 210 l4 -12 l1 13z" fill="#ffc843" ${s}/><path d="M38 214 q-8 4 -6 14 M2 230 q-6 6 -2 14" fill="none" stroke="#ff6fc0" stroke-width="4" stroke-linecap="round"/><circle cx="48" cy="216" r="1.6" fill="${K}"/>`,
    ufo:`<g class="hover-s"><path d="M12 40 L4 70 L48 70 L40 40Z" fill="#3fdcb4" opacity=".25"/><ellipse cx="26" cy="36" rx="25" ry="8" fill="#9aa6d6" ${s}/><path d="M12 34 Q14 16 26 16 Q38 16 40 34Z" fill="#bfe9ff" ${s}/><circle cx="26" cy="27" r="5" fill="#3fdcb4"/><circle cx="24.5" cy="26" r="1.2" fill="${K}"/><circle cx="27.5" cy="26" r="1.2" fill="${K}"/>${[8,18,34,44].map((x,i)=>`<circle cx="${x}" cy="37" r="2" fill="${['#ff6fc0','#ffc843','#73c2ff','#ff6fc0'][i]}" class="twinkle"/>`).join('')}</g>`,
    dragon:`<path d="M12 222 q-12 -14 -6 -26 q8 8 14 16" fill="#8ff0d2" ${s} class="wag" style="transform-origin:14px 222px"/><ellipse cx="22" cy="234" rx="18" ry="12" fill="#3fdcb4" ${s}/><path d="M34 228 q2 -14 12 -16 q8 2 6 10 l-6 2 q-2 6 -10 8z" fill="#3fdcb4" ${s}/><circle cx="46" cy="216" r="1.8" fill="${K}"/><path d="M52 220 q6 -2 8 2" fill="none" stroke="#ff8f6b" stroke-width="3" stroke-linecap="round" class="flame-s"/><path d="M10 244 v6 M30 244 v6" stroke="${K}" stroke-width="4" stroke-linecap="round"/><path d="M4 236 q-10 4 -8 12" fill="none" stroke="${K}" stroke-width="3"/>`}[kind]||'';
}
function robotSvg(cfg,size){
  cfg=cfg||robotCfg();const fill=PAINTS[cfg.paint]||PAINTS.sky;
  const gal=cfg.paint==='galaxy'?`<g fill="#fff">${[[72,128],[150,150],[90,190],[132,118],[80,52],[140,88],[116,196]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g>`:'';
  const top=cfg.top==='dome'?'':topSvg(cfg.top),dome=cfg.top==='dome'?topSvg('dome'):'';
  return `<svg class="rb" viewBox="-8 -10 236 268" ${size?`width="${size}"`:''} role="img" aria-label="${esc(cfg.name)} the robot">
  <defs><linearGradient id="r-bow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9fd6"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#8ff0d2"/><stop offset="1" stop-color="#9fd3ff"/></linearGradient>
  <linearGradient id="r-chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6fb"/><stop offset=".5" stop-color="#b9c0d4"/><stop offset="1" stop-color="#e8ebf3"/></linearGradient>
  <radialGradient id="r-gal" cx=".3" cy=".3" r=".9"><stop offset="0" stop-color="#6a4fd1"/><stop offset="1" stop-color="#1b1640"/></radialGradient>
  <linearGradient id="r-ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#bfe9ff"/><stop offset="1" stop-color="#e9f7ff"/></linearGradient>
  <linearGradient id="r-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1a8"/><stop offset=".5" stop-color="#e0a91c"/><stop offset="1" stop-color="#fff1a8"/></linearGradient>
  <linearGradient id="r-holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c6fff1"/><stop offset=".35" stop-color="#e3c6ff"/><stop offset=".7" stop-color="#c6e3ff"/><stop offset="1" stop-color="#fff1c6"/></linearGradient>
  <pattern id="r-camo" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#7d86c9"/><path d="M4 6 q10 -6 16 4 q-4 10 -14 6z M24 22 q12 -4 14 8 q-8 8 -16 2z" fill="#5a5fa8"/><path d="M22 2 q6 2 6 8 q-6 2 -8 -4z M2 26 q8 0 8 8 q-6 4 -10 -2z" fill="#a9b0e8"/></pattern>
  <pattern id="r-candy" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#fff"/><rect width="8" height="16" fill="#ff9fd6"/></pattern></defs>
  <g class="rb-pet">${petSvg(cfg.pet)}</g>
  <g class="rb-body">
  ${extraSvg(cfg.extra,'back')}${moveSvg(cfg.move)}<g class="rb-arms">${armsSvg(cfg.arms)}</g>
  <rect x="60" y="108" width="100" height="96" rx="16" fill="${fill}" ${ST}/>${chestSvg(cfg)}
  <rect x="96" y="96" width="28" height="14" fill="#9aa6d6" stroke="${K}" stroke-width="2"/>
  <rect x="66" y="38" width="88" height="62" rx="16" fill="${fill}" ${ST}/>${gal}
  <rect x="76" y="52" width="68" height="28" rx="14" fill="${K}"/><g class="rb-eyes">${eyesSvg(cfg.eyes)}</g>
  <path d="M98 88 q12 7 24 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="62" cy="69" r="6" fill="#ffc843" stroke="${K}" stroke-width="2"/><circle cx="158" cy="69" r="6" fill="#ffc843" stroke="${K}" stroke-width="2"/>
  ${top}${extraSvg(cfg.extra,'front')}${dome}</g></svg>`;
}

/* ---------- studio UI ---------- */
let studioCat='paint';
const seenSet=()=>new Set(progress.robotSeen||[]);
// parts from the first Robot Studio count as seen; anything newer that is already unlocked shows NEW
const LEGACY='paint|sky paint|mint paint|bubble paint|sun paint|lav paint|lava paint|chrome paint|rainbow paint|galaxy eyes|round eyes|happy eyes|hearts eyes|stars eyes|scan eyes|wink top|antenna top|none top|propeller top|cap top|party top|horn top|wizard top|crown chest|lights chest|heart chest|bolt chest|smile chest|star move|wheels move|treads move|legs move|boots move|hover extra|none extra|bowtie extra|scarf extra|ball extra|jetpack extra|stick extra|cape extra|football extra|wings arms|classic pet|none scene|lab'.split(' ');
function initSeen(){if(!progress.robotSeen){progress.robotSeen=robotUnlockedList().map(x=>x.key).filter(k=>LEGACY.includes(k));save()}}
function robotNewCount(){initSeen();const seen=seenSet();return robotUnlockedList().filter(x=>!seen.has(x.key)).length}
function catHasNew(cat){const seen=seenSet();return cat.items.some(it=>itemOpen(it)&&!seen.has(cat.key+'|'+it[0]))}
function studioHtml(){
  initSeen();
  const cfg=robotCfg(),cat=ROBOT_CATALOG.find(c=>c.key===studioCat)||ROBOT_CATALOG[0],seen=seenSet();
  const items=cat.items.map(it=>{
    const [id,name,need,patch]=it,open=itemOpen(it),on=cfg[cat.key]===id,isNew=open&&!seen.has(cat.key+'|'+id);
    const sw=cat.key==='paint'?`<span class="sw" style="background:${PAINT_SWATCH[id]||PAINTS[id]}"></span>`:'';
    const lock=patch?`🔒 Patch: ${esc(PATCH_BY[patch]?PATCH_BY[patch].name:patch)}`:`🔒 ★ ${need}`;
    return `<button type="button" class="ritem${on?' on':''}${open?'':' locked'}${patch?' special':''}" data-ritem="${cat.key}|${id}"${open?'':' disabled'}>${sw}<b>${esc(name)}${isNew?' <span class="newtag">NEW</span>':''}</b><small>${open?(on?'Wearing it':'Unlocked'):lock}</small></button>`;
  }).join('');
  // looking at a category marks its new items as seen
  const add=cat.items.filter(it=>itemOpen(it)).map(it=>cat.key+'|'+it[0]).filter(k=>!seen.has(k));
  if(add.length){progress.robotSeen=[...seen,...add];save()}
  const total=allItems().length,have=robotUnlockedList().length,nx=nextRobotUnlock();
  return `<div class="studio"><div class="studio-tabs" role="tablist">${ROBOT_CATALOG.map(c=>`<button type="button" class="mini-pill${c.key===cat.key?' on':''}${c.key!==cat.key&&catHasNew(c)?' hasnew':''}" data-rcat="${c.key}">${c.label}</button>`).join('')}</div>
  <div class="studio-items">${items}</div>
  <div class="collect"><div class="collect-row"><span>Parts unlocked: <b>${have}</b> of ${total}</span>${nx?`<span>Next: <b>${esc(nx.name)}</b> in ${nx.more} ${plural(nx.more,'star')}</span>`:'<span>Every star part unlocked!</span>'}</div><div class="fmeter"><i style="width:${Math.round(100*have/total)}%"></i></div></div></div>`;
}

/* ---------- play with your robot ---------- */
let beatTimer=null;
function robotPlay(kind){
  const box=$('#robot-preview');if(!box)return;
  if(kind==='dance'){box.classList.remove('dancing');void box.offsetWidth;box.classList.add('dancing');sound('win');setTimeout(()=>box.classList.remove('dancing'),2600);statBump('dance');return}
  if(kind==='tv'){const c=robotCfg();c.tvch=((c.tvch||0)+1)%TV_CHANNELS.length;save();box.innerHTML=robotSvg();sound('pop');return}
  if(kind==='music'){
    if(box.classList.contains('playing')){stopBeat();return}
    box.classList.add('playing');statBump('dj');playBeat(()=>box.classList.remove('playing'));
  }
}
function stopBeat(){clearInterval(beatTimer);beatTimer=null;const b=$('#robot-preview');if(b)b.classList.remove('playing')}
// a short beat: kick, snare, hi-hat, and a little bass line, for about 10 seconds
function playBeat(done){
  clearInterval(beatTimer);
  if(!progress.sound){beatTimer=setTimeout(done,6000);return}
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(e){done();return}
  const bass=[110,110,147,131,110,110,165,147];let step=0;const spb=60/112/2;
  const noise=(t,dur,vol,hp)=>{const n=actx.createBufferSource(),buf=actx.createBuffer(1,actx.sampleRate*dur,actx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;n.buffer=buf;const f=actx.createBiquadFilter();f.type='highpass';f.frequency.value=hp;const g=actx.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);n.connect(f).connect(g).connect(actx.destination);n.start(t)};
  const kick=t=>{const o=actx.createOscillator(),g=actx.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(40,t+.15);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g).connect(actx.destination);o.start(t);o.stop(t+.22)};
  const tick=()=>{
    const t=actx.currentTime+.02,s=step%8;
    if(s===0||s===4)kick(t);if(s===2||s===6)noise(t,.12,.25,1200);noise(t,.04,.08,6000);
    if(s%2===0)tone(bass[(step/2|0)%8],t,spb*1.6,'triangle',.12);
    if(++step>=8*10){clearInterval(beatTimer);beatTimer=null;done()}
  };
  tick();beatTimer=setInterval(tick,spb*1000);
}
