'use strict';
/* ============================================================
   ROBOT STUDIO — stars unlock paint, eyes, hats, and more.
   Stars are never spent: earning them unlocks new choices.
   ============================================================ */
const ROBOT_CATALOG=[
 {key:'paint',label:'Paint',items:[['sky','Sky blue',0],['mint','Mint',0],['bubble','Bubblegum',3],['sun','Sunshine',8],['lav','Lavender',14],['lava','Lava orange',20],['chrome','Chrome',34],['rainbow','Rainbow',50],['galaxy','Galaxy',75]]},
 {key:'eyes',label:'Eyes',items:[['round','Round',0],['happy','Happy',5],['hearts','Hearts',16],['stars','Stars',30],['scan','Scanner',45],['wink','Wink',60]]},
 {key:'top',label:'On top',items:[['antenna','Antenna',0],['none','Nothing',0],['propeller','Propeller',10],['cap','Ball cap',18],['party','Party hat',26],['horn','Unicorn horn',38],['wizard','Wizard hat',55],['crown','Crown',90]]},
 {key:'chest',label:'Chest screen',items:[['lights','Lights',0],['heart','Heart',6],['bolt','Lightning',22],['smile','Smiley',32],['star','Star',48]]},
 {key:'move',label:'Moves on',items:[['wheels','Wheels',0],['treads','Tank treads',12],['legs','Robot legs',24],['boots','Rocket boots',42],['hover','Hover jets',70]]},
 {key:'extra',label:'Extras',items:[['none','Nothing',0],['bowtie','Bow tie',4],['scarf','Scarf',15],['ball','Basketball',22],['jetpack','Jetpack',28],['stick','Hockey stick',35],['cape','Star cape',40],['football','Football',46],['wings','Wings',65]]}
];
const ROBOT_DEFAULT={name:'Sprocket',paint:'sky',eyes:'round',top:'antenna',chest:'lights',move:'wheels',extra:'none'};
function robotCfg(){progress.robot=Object.assign({},ROBOT_DEFAULT,progress.robot||{});return progress.robot}
function robotUnlock(before,after){
  for(const cat of ROBOT_CATALOG)for(const [,name,need] of cat.items)if(need>0&&before<need&&after>=need)return `${name} (${cat.label.toLowerCase()})`;
  return null;
}
const PAINTS={sky:'#9fd3ff',mint:'#8ff0d2',bubble:'#ff9fd6',sun:'#ffe08a',lav:'#cdbbff',lava:'#ffab7a',chrome:'url(#r-chrome)',rainbow:'url(#r-bow)',galaxy:'url(#r-gal)'};
function robotSvg(cfg,size){
  cfg=cfg||robotCfg();const fill=PAINTS[cfg.paint]||PAINTS.sky,K='#231e52';
  const st=`stroke="${K}" stroke-width="3" stroke-linejoin="round"`;
  let back='',move='',front='',top='',eyes='',chest='';
  // things behind the body
  if(cfg.extra==='cape')back+=`<path d="M64 112 L36 240 L184 240 L156 112 Z" fill="#8a4fff" ${st}/><path d="M78 196 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#ffc843"/><path d="M140 168 l3 6 6 1 -4 4 1 6 -6 -3 -6 3 1 -6 -4 -4 6 -1z" fill="#ffc843"/>`;
  if(cfg.extra==='wings')back+=`<path d="M62 130 C20 90 4 140 30 170 C14 176 30 196 62 176 Z" fill="#ffffff" ${st}/><path d="M158 130 C200 90 216 140 190 170 C206 176 190 196 158 176 Z" fill="#ffffff" ${st}/>`;
  if(cfg.extra==='jetpack')back+=`<rect x="38" y="118" width="22" height="58" rx="8" fill="#ffc843" ${st}/><rect x="160" y="118" width="22" height="58" rx="8" fill="#ffc843" ${st}/><path d="M42 176 q7 24 14 0z M164 176 q7 24 14 0z" fill="#ff8f6b"/>`;
  // how it moves
  if(cfg.move==='wheels')move=`<circle cx="80" cy="226" r="22" fill="${K}"/><circle cx="80" cy="226" r="8" fill="#b39bff"/><circle cx="140" cy="226" r="22" fill="${K}"/><circle cx="140" cy="226" r="8" fill="#b39bff"/>`;
  if(cfg.move==='treads')move=`<rect x="52" y="204" width="116" height="44" rx="22" fill="${K}"/>${[74,96,118,140].map(x=>`<circle cx="${x+3}" cy="226" r="9" fill="#9aa6d6"/>`).join('')}`;
  if(cfg.move==='legs'||cfg.move==='boots')move=`<rect x="78" y="200" width="16" height="36" fill="#9aa6d6" ${st}/><rect x="126" y="200" width="16" height="36" fill="#9aa6d6" ${st}/>`+(cfg.move==='legs'?`<ellipse cx="84" cy="240" rx="20" ry="9" fill="${K}"/><ellipse cx="136" cy="240" rx="20" ry="9" fill="${K}"/>`:`<rect x="68" y="226" width="34" height="18" rx="6" fill="#ff6fc0" ${st}/><rect x="118" y="226" width="34" height="18" rx="6" fill="#ff6fc0" ${st}/><path d="M74 244 q11 22 22 0z M124 244 q11 22 22 0z" fill="#ffc843"/>`);
  if(cfg.move==='hover')move=`<ellipse cx="110" cy="246" rx="62" ry="10" fill="#73c2ff" opacity=".45"/><path d="M84 204 h52 l-8 20 h-36 z" fill="#9aa6d6" ${st}/><path d="M94 224 q16 26 32 0z" fill="#73c2ff" opacity=".8"/>`;
  // arms (hold sports gear when chosen)
  const arms=`<path d="M62 132 L30 168 L22 160 M30 168 L36 178" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M158 132 L190 168 L198 160 M190 168 L184 178" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/>`;
  if(cfg.extra==='stick')front+=`<path d="M196 150 L178 238 L150 240" fill="none" stroke="#b56b00" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><rect x="146" y="234" width="30" height="10" rx="3" fill="${K}"/>`;
  if(cfg.extra==='ball')front+=`<circle cx="196" cy="186" r="17" fill="#ff8f3a" ${st}/><path d="M179 186 h34 M196 169 v34 M184 174 q12 12 0 24 M208 174 q-12 12 0 24" fill="none" stroke="${K}" stroke-width="2"/>`;
  if(cfg.extra==='football')front+=`<ellipse cx="198" cy="184" rx="20" ry="12" transform="rotate(-30 198 184)" fill="#a0522d" ${st}/><path d="M190 186 l14 -8 M193 180 l3 5 M197 178 l3 5 M201 175 l3 5" stroke="#fff" stroke-width="2"/>`;
  if(cfg.extra==='bowtie')front+=`<path d="M110 112 l-18 -9 v18 z M110 112 l18 -9 v18 z" fill="#ff6fc0" ${st}/><circle cx="110" cy="112" r="4" fill="#ff6fc0" ${st}/>`;
  if(cfg.extra==='scarf')front+=`<path d="M84 104 h52 v14 h-52 z" fill="#3fdcb4" ${st}/><path d="M124 116 l8 34 l-14 2 l-4 -36 z" fill="#3fdcb4" ${st}/>`;
  // chest screen
  const cs={lights:`<circle cx="96" cy="150" r="6" fill="#ff6fc0"/><circle cx="110" cy="150" r="6" fill="#ffc843"/><circle cx="124" cy="150" r="6" fill="#3fdcb4"/>`,
    heart:`<path d="M110 162 C96 152 92 144 98 139 C103 135 108 138 110 142 C112 138 117 135 122 139 C128 144 124 152 110 162 Z" fill="#ff6fc0"/>`,
    bolt:`<path d="M114 136 L100 152 H110 L106 166 L122 148 H112 Z" fill="#ffc843" stroke="${K}" stroke-width="1.5"/>`,
    smile:`<circle cx="102" cy="145" r="3" fill="${K}"/><circle cx="118" cy="145" r="3" fill="${K}"/><path d="M100 154 q10 9 20 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`,
    star:`<path d="M110 136 l4 9 10 1 -8 6 3 10 -9 -5 -9 5 3 -10 -8 -6 10 -1z" fill="#ffc843" stroke="${K}" stroke-width="1.5"/>`}[cfg.chest]||'';
  chest=`<rect x="80" y="130" width="60" height="40" rx="8" fill="#fff" stroke="${K}" stroke-width="2"/>${cs}`;
  // eyes inside the visor
  const E={round:`<circle cx="96" cy="66" r="7" fill="#3fdcb4"/><circle cx="124" cy="66" r="7" fill="#3fdcb4"/><circle cx="98" cy="64" r="2" fill="#fff"/><circle cx="126" cy="64" r="2" fill="#fff"/>`,
    happy:`<path d="M88 70 q8 -10 16 0 M116 70 q8 -10 16 0" fill="none" stroke="#3fdcb4" stroke-width="4" stroke-linecap="round"/>`,
    hearts:[96,124].map(x=>`<path d="M${x} 74 C${x-9} 67 ${x-10} 61 ${x-6} 58 C${x-3} 56 ${x} 58 ${x} 61 C${x} 58 ${x+3} 56 ${x+6} 58 C${x+10} 61 ${x+9} 67 ${x} 74 Z" fill="#ff6fc0"/>`).join(''),
    stars:[96,124].map(x=>`<path d="M${x} 57 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#ffc843"/>`).join(''),
    scan:`<rect x="84" y="63" width="52" height="7" rx="3.5" fill="#ff6fc0"/><rect x="106" y="63" width="12" height="7" rx="3.5" fill="#fff"/>`,
    wink:`<circle cx="96" cy="66" r="7" fill="#3fdcb4"/><path d="M116 67 h16" stroke="#3fdcb4" stroke-width="4" stroke-linecap="round"/>`}[cfg.eyes]||'';
  eyes=E;
  // on top of the head
  top={antenna:`<line x1="80" y1="40" x2="70" y2="16" stroke="${K}" stroke-width="3"/><circle cx="70" cy="13" r="7" fill="#ff6fc0" ${st}/>`,none:'',
    propeller:`<line x1="110" y1="40" x2="110" y2="20" stroke="${K}" stroke-width="3"/><ellipse cx="94" cy="18" rx="16" ry="5" fill="#ff6fc0" ${st}/><ellipse cx="126" cy="18" rx="16" ry="5" fill="#73c2ff" ${st}/><circle cx="110" cy="18" r="4" fill="#ffc843" ${st}/>`,
    cap:`<path d="M70 44 Q110 6 150 44 Z" fill="#e0507f" ${st}/><path d="M146 42 h30 q4 6 -4 8 h-28 z" fill="#e0507f" ${st}/><circle cx="110" cy="20" r="4" fill="#fff"/>`,
    party:`<path d="M92 42 L110 2 L128 42 Z" fill="#73c2ff" ${st}/><path d="M100 26 L120 26 M96 34 L124 34" stroke="#ffc843" stroke-width="4"/><circle cx="110" cy="3" r="6" fill="#ff6fc0" ${st}/>`,
    horn:`<polygon points="100,42 110,2 120,42" fill="#ffc843" ${st}/><path d="M104 30 L117 26 M106 20 L115 17" stroke="#b56b00" stroke-width="2.5"/>`,
    wizard:`<path d="M72 44 Q110 30 148 44 Z" fill="#5a3fb5" ${st}/><path d="M86 40 L114 -2 L134 40 Z" fill="#6a4fd1" ${st}/><path d="M108 18 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z" fill="#ffc843"/>`,
    crown:`<path d="M80 42 L82 12 L96 26 L110 6 L124 26 L138 12 L140 42 Z" fill="#ffc843" ${st}/><circle cx="96" cy="34" r="4" fill="#ff6fc0"/><circle cx="110" cy="32" r="4" fill="#3fdcb4"/><circle cx="124" cy="34" r="4" fill="#73c2ff"/>`}[cfg.top]||'';
  const gal=cfg.paint==='galaxy'?`<g fill="#fff">${[[72,128],[150,150],[90,190],[132,118],[80,52],[140,88],[116,196]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g>`:'';
  return `<svg class="rb" viewBox="-6 -6 232 264" ${size?`width="${size}"`:''} role="img" aria-label="${esc(cfg.name)} the robot">
  <defs><linearGradient id="r-bow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9fd6"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#8ff0d2"/><stop offset="1" stop-color="#9fd3ff"/></linearGradient>
  <linearGradient id="r-chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6fb"/><stop offset=".5" stop-color="#b9c0d4"/><stop offset="1" stop-color="#e8ebf3"/></linearGradient>
  <radialGradient id="r-gal" cx=".3" cy=".3" r=".9"><stop offset="0" stop-color="#6a4fd1"/><stop offset="1" stop-color="#1b1640"/></radialGradient></defs>
  ${back}${move}${arms}
  <rect x="60" y="108" width="100" height="96" rx="16" fill="${fill}" ${st}/>${chest}
  <rect x="96" y="96" width="28" height="14" fill="#9aa6d6" stroke="${K}" stroke-width="2"/>
  <rect x="66" y="38" width="88" height="62" rx="16" fill="${fill}" ${st}/>${gal}
  <rect x="76" y="52" width="68" height="28" rx="14" fill="${K}"/>${eyes}
  <path d="M98 88 q12 7 24 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="62" cy="69" r="6" fill="#ffc843" stroke="${K}" stroke-width="2"/><circle cx="158" cy="69" r="6" fill="#ffc843" stroke="${K}" stroke-width="2"/>
  ${top}${front}</svg>`;
}
let studioCat='paint';
function studioHtml(){
  const cfg=robotCfg(),cat=ROBOT_CATALOG.find(c=>c.key===studioCat)||ROBOT_CATALOG[0];
  return `<div class="studio"><div class="studio-tabs" role="tablist">${ROBOT_CATALOG.map(c=>`<button type="button" class="mini-pill${c.key===cat.key?' on':''}" data-rcat="${c.key}">${c.label}</button>`).join('')}</div>
  <div class="studio-items">${cat.items.map(([id,name,need])=>{const open=progress.stars>=need,on=cfg[cat.key]===id;return `<button type="button" class="ritem${on?' on':''}${open?'':' locked'}" data-ritem="${cat.key}|${id}"${open?'':' disabled'}><span class="sw" data-paint="${cat.key==='paint'?id:''}" style="${cat.key==='paint'?`background:${PAINTS[id].startsWith('url')?{chrome:'linear-gradient(135deg,#f4f6fb,#b9c0d4)',rainbow:'linear-gradient(135deg,#ff9fd6,#ffe08a,#8ff0d2,#9fd3ff)',galaxy:'radial-gradient(circle,#6a4fd1,#1b1640)'}[id]:PAINTS[id]}`:''}"></span><b>${esc(name)}</b><small>${open?(on?'Wearing it':'Unlocked'):`🔒 ★ ${need}`}</small></button>`}).join('')}</div></div>`;
}
