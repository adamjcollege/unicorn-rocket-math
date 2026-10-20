'use strict';
/* ============================================================
   WORD WORKSHOP — word parts, vocabulary, spelling, capitals,
   commas and grammar
   ============================================================ */

/* ---------------- multiple-choice banks: [question, right, [wrong...], why] ---------------- */
const BANK={
grammar:[
 [ // subject-verb agreement, irregular plurals, confused words
  ['The robots ____ across the floor every morning.','roll',['rolls'],'"Robots" is plural (more than one), so we use "roll."'],
  ['Each of the astronauts ____ a helmet.','has',['have'],'"Each" means each ONE, so it is singular: "has."'],
  ['Comet and Starla ____ best friends.','are',['is'],'Two people (Comet AND Starla) take "are."'],
  ['Either Leo or Aisha ____ going to drive the robot.','is',['are'],'With "either... or," the verb matches the closest name, Aisha, so it\'s "is."'],
  ['The team ____ practicing for the robot contest.','is',['are'],'"Team" is one group, so we use "is."'],
  ['Three ____ swam past the boat.','geese',['gooses','geeses'],'Goose has an irregular plural: geese.'],
  ['We saw two ____ in the barn.','mice',['mouses','mices'],'Mouse has an irregular plural: mice.'],
  ['I brushed all of my ____.','teeth',['tooths','teeths'],'Tooth has an irregular plural: teeth.'],
  ['I want ____ go to the space museum.','to',['too','two'],'"To" goes with an action: to go, to build.'],
  ['We built ____ robots.','two',['to','too'],'"Two" is the number 2.'],
  ['Can I come, ____?','too',['to','two'],'"Too" means "also" (or "very much").'],
  ['The astronauts put on ____ helmets.','their',['there','they\'re'],'"Their" means it belongs to them.'],
  ['____ going to launch at noon.','They\'re',['Their','There'],'"They\'re" is short for "they are."'],
  ['Put the box over ____.','there',['their','they\'re'],'"There" tells about a place. It has "here" inside it!'],
  ['The rover lost ____ wheel.','its',['it\'s'],'"Its" shows belonging. "It\'s" means "it is."'],
  ['____ time to launch!','It\'s',['Its'],'"It\'s" is short for "it is": It is time to launch.'],
  ['Mars is smaller ____ Earth.','than',['then'],'Use "than" to compare. Use "then" for time.'],
  ['____ welcome to join our team!','You\'re',['Your'],'"You\'re" is short for "you are."'],
  ['____ rocket is the shiny one?','Whose',['Who\'s'],'"Whose" asks who something belongs to. "Who\'s" means "who is."']
 ],
 [ // verbs, modals, adjectives and adverbs
  ['Right now, Bolt ____ a tower.','is building',['built','will build'],'"Right now" means it is happening: is + building (present progressive).'],
  ['Yesterday at noon, we ____ the rocket when it started to rain.','were painting',['are painting','will be painting'],'It was happening in the past: were + painting (past progressive).'],
  ['Tomorrow at 3:00, Comet ____ over the Moon.','will be flying',['was flying','is flown'],'It will be happening in the future: will be + flying (future progressive).'],
  ['You ____ wear a helmet in space. It\'s a rule!','must',['might','could'],'"Must" shows something is necessary, like a rule.'],
  ['It ____ rain later, so bring an umbrella just in case.','might',['must','has to'],'"Might" shows something is possible, but not sure.'],
  ['____ I borrow your screwdriver, please?','May',['Must','Will'],'"May" asks for permission politely.'],
  ['Leo ____ already finished his robot.','has',['have','having'],'"Has finished" is the present perfect tense for one person.'],
  ['By the time we got there, the rocket ____ already launched.','had',['has','will'],'"Had launched" shows it happened before something else in the past.'],
  ['Jupiter is ____ than Mars.','bigger',['biggest','more big'],'Comparing two things: add -er (bigger).'],
  ['Of all the planets, Jupiter is the ____.','biggest',['bigger','most big'],'Comparing three or more: add -est (biggest).'],
  ['This puzzle is ____ than the last one.','more difficult',['difficulter','most difficult'],'Long words use "more" to compare two things.'],
  ['The rover moved ____ over the rocks.','carefully',['careful'],'"Carefully" is an adverb. It tells HOW the rover moved.'],
  ['Bolt is a ____ builder.','careful',['carefully'],'"Careful" is an adjective. It describes the builder (a noun).'],
  ['Comet flew ____ than the other pilots.','faster',['fastest','more fast'],'Comparing Comet with the others: faster.'],
  ['We saw a ____ rocket.','big red',['red big'],'Size words usually come before color words.'],
  ['Grandma gave me a ____ box.','beautiful old wooden',['wooden old beautiful','old wooden beautiful'],'Adjective order: opinion (beautiful), then age (old), then material (wooden).']
 ],
 [ // sentences, conjunctions, pronouns, phrases
  ['Which is a complete sentence?','The robot rolled across the floor.',['Rolled across the floor.','The shiny robot with blue wheels.'],'A complete sentence needs a subject (who) and a predicate (what they did).'],
  ['Which is a run-on sentence?','The rocket launched it flew to the Moon.',['The rocket launched, and it flew to the Moon.','The rocket launched. It flew to the Moon.'],'A run-on jams two sentences together with nothing to join them.'],
  ['How can you fix this run-on? "Bolt was tired he went to sleep."','Bolt was tired, so he went to sleep.',['Bolt was tired he, went to sleep.','Bolt was tired. he went to sleep.'],'Add a comma and a joining word (so), or split it into two sentences with a capital letter.'],
  ['What is "Because the battery died"?','A fragment (it is not a complete thought)',['A complete sentence','A question'],'"Because..." leaves you waiting. It needs more: "The robot stopped because the battery died."'],
  ['You can ____ build a rocket or a rover.','either',['neither','both'],'"Either" goes with "or."'],
  ['____ Comet nor Starla was late.','Neither',['Either','Both'],'"Neither" goes with "nor."'],
  ['We wanted to play outside, ____ it was raining.','but',['so','or'],'"But" shows a surprise or a problem.'],
  ['We waited inside ____ the storm passed.','until',['but','or'],'"Until" tells how long we waited.'],
  ['The astronaut ____ walked on the Moon gave a speech.','who',['which','whose'],'Use "who" for people.'],
  ['The rocket, ____ was painted silver, launched at noon.','which',['who','whom'],'Use "which" for things.'],
  ['Leo, ____ robot won second place, smiled.','whose',['who\'s','which'],'"Whose" shows the robot belongs to Leo.'],
  ['This is the lab ____ we built Clunk.','where',['when','why'],'"Where" tells about a place.'],
  ['I remember the day ____ the rover landed.','when',['where','which'],'"When" tells about a time.'],
  ['Each robot needs ____ own battery.','its',['their','it\'s'],'"Each robot" is one robot, so use "its."'],
  ['Maya and Leo brought ____ robot to school.','their',['her','his'],'Maya AND Leo is two people, so use "their."'],
  ['Which words are a prepositional phrase? "The cat hid under the bed."','under the bed',['the cat','cat hid'],'A prepositional phrase starts with a word like under, over, in, or across.'],
  ['Which word is an interjection? "Wow, the rocket is huge!"','Wow',['rocket','huge'],'An interjection shows a strong feeling: Wow! Oops! Hooray!'],
  ['Which is an abstract noun (something you cannot touch)?','courage',['helmet','rocket'],'You can\'t touch courage. It\'s a feeling or idea.'],
  ['Which sentence uses quotation marks correctly?','Bolt said, "Let\'s go."',['Bolt said, "Let\'s go.','"Bolt said, Let\'s go."'],'Quotation marks go around the exact words someone says.'],
  ['How do you write the title of a song, like Twinkle, Twinkle, Little Star?','In quotation marks',['Underlined or in italics','In all capital letters'],'Short works (songs, poems, articles) go in quotation marks. Long works (books, movies) are underlined or in italics.'],
  ['How do you write the title of a book, like The Wild Robot, by hand?','Underline it',['Put it in quotation marks','Write it in all capitals'],'Book titles are underlined when handwritten, and in italics when typed.']
 ]
],
context:[
 [
  ['The rover\'s path was so <b>treacherous</b>, full of sharp rocks and deep holes, that the engineers drove it very slowly. What does <b>treacherous</b> mean?','dangerous',['smooth','colorful','short'],'Sharp rocks and deep holes are clues that the path is dangerous.'],
  ['Bolt was <b>exhausted</b> after building all day. His battery was almost empty, and he could barely roll. What does <b>exhausted</b> mean?','very tired',['very happy','very hungry','very fast'],'An empty battery and barely rolling are clues: exhausted means very tired.'],
  ['The unicorn\'s mane was <b>vibrant</b>, glowing with bright pinks, blues, and greens. What does <b>vibrant</b> mean?','full of bright color',['very long','messy','quiet'],'Bright pinks, blues, and greens are the clue.'],
  ['Maya was <b>reluctant</b> to jump into the cold pool, so she dipped one toe in and waited. What does <b>reluctant</b> mean?','not eager; unwilling',['excited','in a hurry','cold'],'She only dipped one toe and waited, so she was not eager.'],
  ['The robot\'s arm was <b>sturdy</b> enough to lift a heavy box without bending. What does <b>sturdy</b> mean?','strong',['shiny','tiny','broken'],'Lifting a heavy box without bending means it is strong.'],
  ['After the storm, the town worked to <b>restore</b> the broken bridge so cars could cross again. What does <b>restore</b> mean?','fix; bring back',['break','paint','close'],'"So cars could cross again" means they fixed it.'],
  ['Leo <b>hesitated</b> at the edge of the diving board before he finally jumped. What does <b>hesitated</b> mean?','paused because he wasn\'t sure',['jumped right away','laughed','slipped'],'"Before he finally jumped" is the clue that he waited.'],
  ['The tiny <b>fragments</b> of the broken vase were scattered across the floor. What are <b>fragments</b>?','small broken pieces',['flowers','shoes','drops of water'],'A broken vase leaves small pieces.']
 ],
 [
  ['The elephant lifted the log with its <b>trunk</b>. In this sentence, <b>trunk</b> means...','a long nose',['the back of a car','a big box','the stem of a tree'],'Trunk has many meanings. An elephant\'s trunk is its long nose.'],
  ['Put the groceries in the car\'s <b>trunk</b>. In this sentence, <b>trunk</b> means...','the storage space in a car',['an elephant\'s nose','swimming shorts','a tree stem'],'In a car, the trunk is the space for storing things.'],
  ['The rocket stood on the launch <b>pad</b>. Here, <b>pad</b> means...','a flat place where rockets take off',['a stack of paper','a soft cushion','a frog\'s lily pad'],'A launch pad is the flat place a rocket launches from.'],
  ['The robot will <b>record</b> the temperature every hour. Here, <b>record</b> means...','write down or save',['the best ever score','a music disk','a sports race'],'"Record the temperature" means save the information.'],
  ['The box was so <b>light</b> that I carried it with one hand. Here, <b>light</b> means...','not heavy',['bright','a lamp','pale in color'],'Carrying it with one hand is the clue: it was not heavy.'],
  ['A huge <b>wave</b> crashed onto the beach. Here, <b>wave</b> means...','a moving ridge of water',['moving your hand to say hi','curly hair','a sound'],'Waves crash onto beaches.'],
  ['Which tool helps you find what a word means AND how to say it?','a dictionary',['a thesaurus','a map','a calendar'],'A dictionary gives meanings and pronunciation.'],
  ['Which tool helps you find a word that means almost the same thing?','a thesaurus',['a dictionary','an atlas','a glossary'],'A thesaurus lists synonyms.'],
  ['Where do you find a book\'s <b>glossary</b>?','at the back of the book',['on the cover','in the title','on the first page only'],'A glossary is a mini dictionary at the back of a book.']
 ],
 [
  ['The scientists <b>predicted</b> rain, and sure enough, it rained the next day. What does <b>predicted</b> mean?','said it would happen before it happened',['stopped it from happening','were surprised by it','painted a picture of it'],'"Sure enough, it rained" shows they said it ahead of time.'],
  ['The instructions were so <b>confusing</b> that nobody could tell which piece went where. What does <b>confusing</b> mean?','hard to understand',['very short','funny','colorful'],'Nobody could tell where pieces went, so they were hard to understand.'],
  ['The astronauts had to <b>conserve</b> water because the next supply rocket wouldn\'t arrive for weeks. What does <b>conserve</b> mean?','save; use carefully',['spill','freeze','sell'],'If more water won\'t come for weeks, you must use it carefully.'],
  ['The <b>enormous</b> rocket was taller than a 30-story building. What does <b>enormous</b> mean?','huge',['tiny','old','fast'],'Taller than a 30-story building is huge!'],
  ['Comet felt <b>anxious</b> before the big launch. She kept checking the clock and tapping her hoof. What does <b>anxious</b> mean?','worried; nervous',['sleepy','angry','proud'],'Checking the clock and tapping are signs of feeling nervous.'],
  ['Bolt <b>assembled</b> the robot, putting the wheels, arms, and head together. What does <b>assembled</b> mean?','built by putting parts together',['took apart','painted','sold'],'Putting parts together is assembling.'],
  ['The <b>ancient</b> fossil was millions of years old. What does <b>ancient</b> mean?','very old',['brand new','very large','shiny'],'Millions of years old means very old.'],
  ['After the long hike, the water tasted <b>refreshing</b>. What does <b>refreshing</b> mean?','making you feel cool and full of energy again',['salty','too hot','disgusting'],'After a long hike, water makes you feel better.']
 ]
],
figure:[
 [
  ['"Bolt\'s eyes were as bright as headlights." What does this simile mean?','His eyes were very bright.',['His eyes were car parts.','He was driving a car.','His eyes were closed.'],'A simile compares using "like" or "as." His eyes were very bright, like headlights.'],
  ['"The classroom was a zoo after recess." What does this metaphor mean?','The classroom was very noisy and wild.',['There were animals in the classroom.','The class went to the zoo.','The classroom was quiet.'],'A metaphor says one thing IS another. The class was wild like a zoo.'],
  ['"Comet ran like the wind." What does this mean?','Comet ran very fast.',['Comet was windy.','Comet ran in circles.','Comet was cold.'],'Wind moves fast, so she ran very fast.'],
  ['Which sentence has a <b>simile</b>?','Her voice was as soft as a feather.',['Her voice was soft.','Her voice was a whisper of wind.','She whispered.'],'Similes use "like" or "as" to compare.'],
  ['Which sentence has a <b>metaphor</b>?','The rocket was a dragon roaring into the sky.',['The rocket roared like a dragon.','The rocket was loud.','The rocket went up.'],'A metaphor says something IS something else, without "like" or "as."'],
  ['"The stars were diamonds in the sky." What does this mean?','The stars sparkled brightly.',['There were jewels in space.','The sky was hard.','The stars were for sale.'],'Diamonds sparkle, so the stars sparkled.'],
  ['"Bolt was as busy as a bee." What does this mean?','Bolt was working very hard.',['Bolt could fly.','Bolt was buzzing.','Bolt liked honey.'],'Bees are always busy working.']
 ],
 [
  ['"It\'s raining cats and dogs!" What does this idiom mean?','It\'s raining very hard.',['Pets are falling from the sky.','It\'s a little sprinkly.','It\'s sunny.'],'Idioms don\'t mean what the words say. This one means heavy rain.'],
  ['Before the play, Mom said, "Break a leg!" What did she mean?','Good luck!',['Be careful not to fall.','Go to the doctor.','Dance a lot.'],'Actors say "break a leg" to wish good luck.'],
  ['"That math problem was a piece of cake." What does this mean?','It was very easy.',['It was delicious.','It was a birthday problem.','It was very hard.'],'"A piece of cake" means very easy.'],
  ['"I have to hit the books tonight." What does this mean?','I have to study.',['I have to punch my books.','I have to clean my room.','I have to go to sleep.'],'"Hit the books" means study hard.'],
  ['"Leo is feeling under the weather." What does this mean?','Leo feels sick.',['Leo is standing in the rain.','Leo is outside.','Leo is happy.'],'"Under the weather" means not feeling well.'],
  ['"Don\'t spill the beans about the surprise party!" What does this mean?','Don\'t tell the secret.',['Don\'t make a mess.','Don\'t eat the beans.','Don\'t go to the party.'],'"Spill the beans" means tell a secret.'],
  ['"When Comet won, she was on cloud nine." What does this mean?','She was extremely happy.',['She was flying high.','She was confused.','She was tired.'],'"On cloud nine" means very, very happy.'],
  ['"I had butterflies in my stomach before the test." What does this mean?','I felt nervous.',['I ate butterflies.','I felt sick from lunch.','I felt excited to see bugs.'],'"Butterflies in my stomach" means feeling nervous.']
 ],
 [
  ['What does the proverb "Practice makes perfect" mean?','The more you practice, the better you get.',['You only need to try once.','Practice is boring.','Perfect people never practice.'],'Proverbs share life advice.'],
  ['What does "Look before you leap" mean?','Think carefully before you act.',['Always jump high.','Look at frogs.','Never jump.'],'It means slow down and think before doing something.'],
  ['What does "Don\'t count your chickens before they hatch" mean?','Don\'t be sure about something before it happens.',['Learn to count chickens.','Chickens are hard to count.','Eggs are better than chickens.'],'Not every egg hatches, so don\'t plan on things that haven\'t happened yet.'],
  ['What does "Two heads are better than one" mean?','Working together helps solve problems.',['Monsters are smart.','Hats are better in pairs.','Two people should never agree.'],'Two people sharing ideas often find a better answer.'],
  ['What does "Actions speak louder than words" mean?','What you do matters more than what you say.',['Be very loud.','Never talk.','Words are noisy.'],'Showing is stronger than telling.'],
  ['Which word shows the MOST happy?','thrilled',['glad','okay','content'],'Glad, happy, thrilled: thrilled is the strongest.'],
  ['Which word is the strongest way to say "big"?','enormous',['large','big','medium'],'Enormous means really, really big.'],
  ['Which word is the most precise way to say "walked slowly and tiredly"?','trudged',['walked','went','moved'],'"Trudged" paints a clear picture of slow, tired walking.'],
  ['Which verb is more precise than "said" for talking very quietly?','whispered',['yelled','said','asked'],'"Whispered" shows exactly how the words were said.'],
  ['What is an antonym (opposite) of "ancient"?','modern',['old','huge','broken'],'Ancient means very old. Modern means new.'],
  ['You are writing a letter to the principal. Which opening is best?','Dear Principal Lee,',['Hey dude!','Yo, what\'s up?','Sup Lee'],'A letter to a principal calls for formal English.'],
  ['You are texting your best friend. Which is fine to use?','Want to build robots later?',['To whom it may concern: Shall we construct robots?','Dear Sir or Madam,','I hereby request your presence.'],'With friends, informal language is fine.']
 ]
],
parts:[
 null,
 [
  ['What does <b>un</b>lock mean?','to open a lock',['to lock again','to lock before','a big lock'],'"Un-" means not or the opposite of.'],
  ['What does <b>re</b>build mean?','build again',['build badly','not build','build before'],'"Re-" means again.'],
  ['What does <b>dis</b>agree mean?','not agree',['agree again','agree a lot','agree first'],'"Dis-" means not or the opposite of.'],
  ['What does <b>pre</b>view mean?','see before',['see again','not see','see wrongly'],'"Pre-" means before.'],
  ['What does <b>mis</b>spell mean?','spell wrongly',['spell again','spell before','spell quickly'],'"Mis-" means wrongly or badly.'],
  ['What does <b>over</b>heat mean?','heat too much',['not heat','heat again','heat a little'],'"Over-" means too much.'],
  ['What does <b>sub</b>marine mean?','under the sea',['above the sea','across the sea','a sea animal'],'"Sub-" means under.'],
  ['What does care<b>less</b> mean?','without care',['full of care','care again','more care'],'"-less" means without.'],
  ['What does help<b>ful</b> mean?','full of help; helping a lot',['without help','help again','not helping'],'"-ful" means full of.'],
  ['What does break<b>able</b> mean?','able to be broken',['already broken','never breaks','breaks again'],'"-able" means able to be.'],
  ['What does build<b>er</b> mean?','a person who builds',['not building','built again','a building'],'"-er" can mean a person who does something.'],
  ['What does quick<b>ly</b> mean?','in a quick way',['not quick','very slow','a quick person'],'"-ly" turns a word into "in a ___ way."'],
  ['What does dark<b>ness</b> mean?','the state of being dark',['very bright','someone who is dark','to make light'],'"-ness" means the state of being.']
 ],
 [
  ['<b>Tele</b> means "far" and <b>scope</b> means "see." What is a telescope?','a tool to see things far away',['a tool to hear sounds','a tiny bug','a phone'],'Tele (far) + scope (see) = see far.'],
  ['<b>Micro</b> means "small." What does a microscope help you do?','see very small things',['see far away things','hear small sounds','measure heat'],'Micro (small) + scope (see).'],
  ['<b>Auto</b> means "self" and <b>graph</b> means "write." What is an autograph?','a person\'s own signature',['a car drawing','a graph about cars','a machine that writes'],'Auto (self) + graph (write) = writing your own name.'],
  ['<b>Port</b> means "carry." What does portable mean?','able to be carried',['very heavy','stuck in one place','a place for ships'],'Port (carry) + able.'],
  ['<b>Geo</b> means "earth." What does a geologist study?','rocks and the earth',['the stars','animals','music'],'Geo (earth) + ologist (person who studies).'],
  ['<b>Bio</b> means "life." What is biology?','the study of living things',['the study of rocks','the study of numbers','the study of weather'],'Bio (life) + logy (study of).'],
  ['<b>Aqua</b> means "water." What is an aquarium?','a tank for water animals',['a pool for people','a weather tool','a kind of boat'],'Aqua (water).'],
  ['<b>Astro</b> means "star" and <b>naut</b> means "sailor." What is an astronaut?','a person who travels in space',['a person who sails boats','a star','a rocket'],'Astro (star) + naut (sailor) = star sailor!'],
  ['<b>Phon</b> means "sound." What does a microphone do?','makes small sounds louder',['makes pictures','measures water','writes words'],'Micro (small) + phone (sound).'],
  ['<b>Struct</b> means "build." What does construct mean?','to build',['to break','to draw','to clean'],'Con + struct (build).'],
  ['<b>Rupt</b> means "break" or "burst." What does a volcano do when it erupts?','bursts out',['falls asleep','gets colder','grows trees'],'E (out) + rupt (burst).'],
  ['<b>Tract</b> means "pull." What does a tractor do?','pulls heavy loads',['flies','floats','cooks food'],'Tract (pull) + or (thing that does).']
 ]
]};
function bankMission(key,level,ctx){
  const pool=BANK[key][level];
  const it=uniq(ctx,()=>pick(pool),x=>x[0]);
  const [qq,right,wrong,why]=it;
  const blank=qq.includes('____');
  return Q({text:blank?qq.replace('____','<span class="numbox" style="min-width:4em">?</span>'):qq,
    steps:[mcStep({prompt:blank?'Which word or words fit in the blank?':'Pick the best answer.',right:esc(right),wrong:wrong.map(w=>[esc(w),blank?`Read the sentence again with "${esc(w)}" in the blank. Does it sound right and make sense?`:'Go back to the sentence and look for clue words.']),hints:[blank?'Try reading the sentence out loud with each choice. Which one sounds right AND makes sense?':'Look for clue words in the sentence.']})],
    summary:(blank?`<b>${esc(qq.replace('____',right))}</b> `:'')+why});
}

/* ---------------- syllable bricks ---------------- */
const SYLL=[
 ['rock|et','bas|ket','pen|cil','nap|kin','sun|set','rab|bit','hap|pen','prob|lem','mon|ster','con|test','hel|met','pump|kin','thun|der','num|ber','tun|nel','mag|net','win|ter'],
 ['fan|tas|tic','in|ven|tor','won|der|ful','but|ter|fly','un|der|stand','ad|ven|ture','as|tro|naut','gal|ax|y','car|pen|ter','im|por|tant','Sat|ur|day','al|pha|bet','hos|pi|tal'],
 ['re|build','un|lock','help|ful','care|less','dis|a|gree','re|paint|ing','un|der|stand|ing','in|vis|i|ble','mis|un|der|stand','won|der|ful|ly','cel|e|bra|tion','en|gi|neer|ing']
];
const BRICK_COLORS=['#ff9fd6','#9fd3ff','#8ff0d2','#ffe08a','#cdbbff'];
class SyllQ{
  constructor(w,level){this.parts=w.split('|');this.word=this.parts.join('');this.level=level;this.want=new Set();let n=0;this.parts.slice(0,-1).forEach(p=>{n+=p.length;this.want.add(n-1)});this.splits=new Set();this.done=false;this.hintLvl=0;this.marked=false}
  start(){app.clearInput();app.say(`Break <b>${this.word}</b> into syllables. Say it slowly and clap the parts, then tap between letters to split the brick.`,'happy');app.enter=()=>{this.check();renderWork()}}
  act(name,v){
    if(this.done)return false;
    if(name==='split'){const i=+v;this.splits.has(i)?this.splits.delete(i):this.splits.add(i);sound('pop');this.marked=false;return}
    if(name==='check')return this.check();
    return false;
  }
  check(){
    const ok=this.want.size===this.splits.size&&[...this.want].every(i=>this.splits.has(i));
    if(ok){this.done=true;app.enter=null;app.solved(`<b>${this.parts.join(' · ')}</b> has ${this.parts.length} syllables.`);return}
    this.marked=true;
    if(this.splits.size!==this.want.size)app.oops(`Clap it again: <b>${this.word}</b> has <b>${this.parts.length}</b> syllables. You have ${this.splits.size+1} bricks.`);
    else app.oops(`Right number of bricks! Now move a split. Every syllable needs a vowel sound.`);
  }
  hint(){
    const l=this.hintLvl++;
    if(l===0)return `Put your hand under your chin and say <b>${this.word}</b>. Each time your chin drops is one syllable. It has <b>${this.parts.length}</b>.`;
    if(l===1)return `Rules: split between two consonants in the middle (bas | ket). Prefixes and suffixes like re-, un-, -ful, and -ing are their own bricks.`;
    return `The first brick is <b>${this.parts[0]}</b>.`;
  }
  html(){
    const L=this.word.split('');let h='<div class="brickrow">',color=0;
    h+=`<span class="brick" style="--bc:${BRICK_COLORS[0]}">`;
    L.forEach((c,i)=>{
      h+=`<span class="lt">${esc(c)}</span>`;
      if(i<L.length-1){
        if(this.splits.has(i)){color++;h+=`</span><button type="button" class="brick-split" data-act="split" data-v="${i}" aria-label="join here"></button><span class="brick" style="--bc:${BRICK_COLORS[color%5]}">`}
        else h+=`<button type="button" class="sgap" data-act="split" data-v="${i}" aria-label="split after ${esc(c)}"></button>`;
      }
    });
    h+='</span></div>';
    h+=`<p class="legend">Tap between two letters to split the brick. Tap the gap again to join it back.</p>`;
    if(!this.done)h+=`<button type="button" class="btn btn-mint" data-act="check">Check my bricks</button>`;
    else h+=`<div class="after">Syllables: <b>${this.parts.join(' · ')}</b></div>`;
    return h;
  }
}

/* ---------------- spelling ---------------- */
const RULES={
  dropE:'The base word ends in a silent e, and the suffix starts with a vowel, so <b>drop the e</b>.',
  keepE:'The suffix starts with a consonant (like -ful or -ly), so <b>keep the e</b>.',
  yToI:'The base word ends in a consonant + y, so <b>change the y to i</b>.',
  keepY:'With -ing, <b>keep the y</b> (so you don\'t get two i\'s in a row).',
  double:'Short vowel + one consonant at the end: <b>double the last consonant</b> before a vowel suffix.',
  vowelY:'The base word ends in a vowel + y, so <b>keep the y</b>.',
  plain:'<b>No change needed</b>. Just add the suffix.',
  es:'Words ending in s, x, z, ch, or sh add <b>-es</b>.',
  ies:'Consonant + y: change the y to i and add <b>-es</b>.',
  ys:'Vowel + y: just add <b>-s</b>.',
  ves:'Many words ending in f or fe change to <b>-ves</b>.',
  oes:'Some words ending in o add <b>-es</b>.',
  irr:'This is an <b>irregular plural</b>. It doesn\'t follow a rule, so you just have to know it.',
  same:'Some animals stay <b>the same</b> when there are more than one.'
};
const SUFFIX=[['hope','ing','hoping','dropE'],['make','ing','making','dropE'],['smile','ed','smiled','dropE'],['bake','er','baker','dropE'],['shine','ing','shining','dropE'],['write','ing','writing','dropE'],
 ['use','ful','useful','keepE'],['care','ful','careful','keepE'],['hope','ful','hopeful','keepE'],['safe','ly','safely','keepE'],
 ['try','ed','tried','yToI'],['happy','ness','happiness','yToI'],['carry','ed','carried','yToI'],['easy','ly','easily','yToI'],['cry','ed','cried','yToI'],['study','ed','studied','yToI'],
 ['study','ing','studying','keepY'],['fly','ing','flying','keepY'],['carry','ing','carrying','keepY'],
 ['stop','ed','stopped','double'],['run','ing','running','double'],['plan','ed','planned','double'],['swim','ing','swimming','double'],['big','est','biggest','double'],['hit','ing','hitting','double'],
 ['play','ed','played','vowelY'],['enjoy','ing','enjoying','vowelY'],['jump','ed','jumped','plain'],['help','ing','helping','plain'],['teach','ing','teaching','plain'],['quick','ly','quickly','plain']];
const PLURALS=[['box','boxes','es'],['bench','benches','es'],['wish','wishes','es'],['class','classes','es'],['fox','foxes','es'],['lunch','lunches','es'],
 ['city','cities','ies'],['story','stories','ies'],['puppy','puppies','ies'],['party','parties','ies'],['key','keys','ys'],['toy','toys','ys'],['monkey','monkeys','ys'],
 ['leaf','leaves','ves'],['knife','knives','ves'],['wolf','wolves','ves'],['shelf','shelves','ves'],['half','halves','ves'],['hero','heroes','oes'],['potato','potatoes','oes'],
 ['child','children','irr'],['mouse','mice','irr'],['tooth','teeth','irr'],['foot','feet','irr'],['person','people','irr'],['woman','women','irr'],['goose','geese','irr'],['sheep','sheep','same'],['deer','deer','same']];
const TRICKY=[
 ['because','Bolt stopped because his battery was low.','Big Elephants Can Always Understand Small Elephants.'],
 ['friend','My friend helped me build a robot.','A friend is with you to the END: fri-END.'],
 ['believe','I believe unicorns can fly.','Never beLIEve a LIE.'],
 ['different','Every rocket is a different color.','Say all three parts: dif-fer-ent.'],
 ['thought','I thought the test would be hard.','The "ought" family: bought, brought, thought.'],
 ['through','The rover drove through the dust.','Through has "rough" in it: th-rough.'],
 ['enough','We have enough fuel to reach the Moon.','The "uff" sound is spelled ough here.'],
 ['favorite','Blue is my favorite color.','Say it slowly: fa-vor-ite.'],
 ['beautiful','The sunset on Mars is beautiful.','beau-ti-ful: b, e, a, u makes the "byoo" sound.'],
 ['probably','It will probably rain today.','prob-a-bly: three parts.'],
 ['surprise','The party was a big surprise.','There is an r after the u: sur-prise.'],
 ['finally','The rocket finally launched.','final + ly = finally (two l\'s).'],
 ['people','Many people watched the launch.','There\'s a silent o: pe-o-ple.'],
 ['Wednesday','We have robot club on Wednesday.','Say it like it\'s spelled: Wed-nes-day. Days start with a capital!'],
 ['February','My birthday is in February.','Feb-ru-ar-y: don\'t forget the first r. Months start with a capital!'],
 ['library','I found a space book at the library.','li-brar-y: there are two r\'s.'],
 ['answer','Raise your hand to answer.','There\'s a silent w: an-s-w-er.'],
 ['built','Leo built a tall tower.','The u comes before the i in built.'],
 ['caught','Comet caught the falling star.','c-augh-t, like taught and daughter.'],
 ['neighbor','My neighbor has a telescope.','The "eigh" is like in eight.'],
 ['science','We did a science experiment.','There\'s a silent c after the s: s-c-ience.'],
 ['straight','Draw a straight line.','str-aigh-t: the "aigh" makes the long a sound.'],
 ['until','Wait until the countdown ends.','Only one l at the end of until.'],
 ['usually','I usually read before bed.','usual + ly = usually (two l\'s).'],
 ['said','"Let\'s go," said Bolt.','s-ai-d: said rhymes with red, but it\'s spelled with ai.'],
 ['again','Let\'s try that again.','a + gain = again.'],
 ['whole','I ate the whole pizza.','The whole thing has a silent w (not "hole").'],
 ['minute','Wait one minute, please.','min-ute: the end is spelled u-t-e.'],
 ['quiet','Please be quiet in the library.','qui-et has two syllables. Don\'t mix it up with quite!'],
 ['separate','Separate the red bricks from the blue ones.','There\'s "a rat" in sep-a-rat-e!']
];
function alignDiff(got,want){
  const a=got,b=want,n=a.length,m=b.length,D=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=0;i<=n;i++)D[i][0]=i;for(let j=0;j<=m;j++)D[0][j]=j;
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)D[i][j]=Math.min(D[i-1][j]+1,D[i][j-1]+1,D[i-1][j-1]+(a[i-1].toLowerCase()===b[j-1].toLowerCase()?0:1));
  const ops=[];let i=n,j=m;
  while(i>0||j>0){
    if(i>0&&j>0&&D[i][j]===D[i-1][j-1]+(a[i-1].toLowerCase()===b[j-1].toLowerCase()?0:1)){ops.push([a[i-1].toLowerCase()===b[j-1].toLowerCase()?'g':'b',a[i-1]]);i--;j--}
    else if(i>0&&D[i][j]===D[i-1][j]+1){ops.push(['b',a[i-1]]);i--}
    else{ops.push(['m','']);j--}
  }
  return ops.reverse().map(([c,t])=>`<span class="${c}">${t?esc(t):'&nbsp;'}</span>`).join('');
}
class SpellQ{
  constructor(item,level){this.it=item;this.level=level;this.val='';this.tries=0;this.done=false;this.peek=0;this.last=null;this.hintLvl=0;this.focus='#spell'}
  get target(){return this.it.word}
  start(){
    const it=this.it;app.clearInput();
    if(it.kind==='eq')app.say(`Add the suffix and type the new word. Think about the spelling rule!`,'happy');
    else if(it.kind==='plural')app.say(`Type the plural: the word for <b>more than one</b>.`,'happy');
    else{
      if(TTS.ok){app.say(`Listen to the word, then type it. Press 🔊 to hear it again.`,'happy');setTimeout(()=>this.speak(),350)}
      else{app.say(`Look at the word carefully. It will hide in a few seconds. Then type it from memory!`,'happy');this.showPeek()}
    }
  }
  speak(){TTS.speak(`${this.it.word}. ${this.it.sent} ${this.it.word}.`)}
  showPeek(){this.peek=Date.now()+3500;setTimeout(()=>{if(mission&&mission.problem===this){this.peek=0;renderWork()}},3600)}
  onInput(el){if(el.id==='spell')this.val=el.value}
  onKey(e){if(e.key==='Enter'){e.preventDefault();this.check();renderWork()}}
  act(name){
    if(name==='say'){this.speak();return false}
    if(this.done)return false;
    if(name==='check')return this.check();
    return false;
  }
  check(){
    const v=this.val.trim();if(!v)return;
    const w=this.target;
    if(v===w){this.done=true;this.focus=null;app.solved(`<b>${esc(w)}</b> is spelled right!${this.it.rule?' '+RULES[this.it.rule]:''}`);return}
    this.tries++;this.last=v;
    if(v.toLowerCase()===w.toLowerCase()){app.oops(/[A-Z]/.test(w[0])?`Every letter is right! But <b>${esc(w)}</b> is a ${/day$/.test(w)?'day of the week':'month'}, so it starts with a <b>capital letter</b>.`:`Every letter is right! But <b>${esc(w)}</b> doesn't need a capital letter here.`);return}
    let msg=this.it.rule?RULES[this.it.rule]:(this.it.tip?'Memory trick: '+esc(this.it.tip):'');
    if(this.tries>=2){msg+=` <br>Here's the word. Look at it, then it will hide. Type it from memory!`;this.showPeek()}
    app.oops(`Letters in pink need fixing. ${msg}`);
    this.val='';
  }
  hint(){
    const l=this.hintLvl++,w=this.target;
    if(this.it.rule&&l===0)return RULES[this.it.rule];
    if(this.it.tip&&l===0)return 'Memory trick: '+esc(this.it.tip);
    if(l<=1)return `It starts with <b>${esc(w.slice(0,Math.min(3,w.length-1)))}</b> and has ${w.length} letters.`;
    this.showPeek();return 'Here it is! Look carefully before it hides.';
  }
  html(){
    const it=this.it;let h='<div class="q" style="align-items:center">';
    if(it.kind==='eq')h+=`<div class="eqn"><span>${esc(it.base)}</span><span>+</span><span class="suf">${esc(it.suf)}</span><span>=</span><span>?</span></div>`;
    else if(it.kind==='plural')h+=`<div class="eqn"><span>one ${esc(it.base)}</span><span>→</span><span>two</span><span class="suf">?</span></div>`;
    else{
      h+=`<p class="q-text" style="text-align:center">${esc(it.sent.replace(new RegExp(it.word,'i'),'_____'))}</p>`;
      if(TTS.ok)h+=`<button type="button" class="btn btn-gold" data-act="say">🔊 Hear the word</button>`;
    }
    if(this.peek&&Date.now()<this.peek)h+=`<div class="diff"><span class="g" style="font-size:2.4rem">${esc(this.target)}</span></div>`;
    if(this.last&&!this.done)h+=`<div><p class="legend">Your try:</p><div class="diff">${alignDiff(this.last,this.target)}</div></div>`;
    if(!this.done){
      h+=`<input id="spell" class="spell-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Type the word" value="${esc(this.val)}">`;
      h+=`<button type="button" class="btn btn-mint" data-act="check">Check spelling</button>`;
    }else h+=`<div class="diff"><span class="g" style="font-size:2.4rem">${esc(this.target)}</span></div>${it.rule?`<div class="rule-card">${RULES[it.rule]}</div>`:''}`;
    return h+'</div>';
  }
}

/* ---------------- capital letters ---------------- */
const CAP_WHY={F:'it is the first word of the sentence',I:'the word "I" is always a capital',N:'it is the name of a person or pet',D:'it is a day, month, or holiday',P:'it is the name of a specific place',L:'it is the name of a language',T:'it is an important word in a title',Q:'it is the first word of a quotation',G:'it is the name of a team or group'};
const CAPS=[
 ['On^F Tuesday^D, Maya^N and I^I built a robot named Sprocket^N.','My^F friend Leo^N and I^I go to space camp every July^D.','In^F March^D, my dog Biscuit^N learned to roll over.','Can^F I^I visit Aunt^N Jada^N on Saturday^D?','We^F celebrate Thanksgiving^D in November^D.','My^F cousin Sam^N said that I^I could ride his bike on Monday^D.','Ms.^N Lopez^N said our science fair is on Wednesday^D, May^D 6.','Last^F spring, my sister Ava^N and I^I planted a garden.'],
 ['We^F flew from Raleigh^P to Houston^P to visit the Johnson^P Space^P Center^P.','The^F Mississippi^P River^P is much longer than the river near our house.','My^F class at Oak^P Ridge^P Elementary^P is learning Spanish^L.','Mars^F and Jupiter^P are both planets in our solar system.','On^F the Fourth^D of July^D, we watched fireworks over Lake^P Norman^P.','My^F uncle lives on Maple^P Street^P in Charlotte^P, North^P Carolina^P.','Every^F summer, my family drives to the Blue^P Ridge^P Mountains^P.','The^F Statue^P of Liberty^P stands in New^P York^P Harbor^P.'],
 ['Our^F class read The^T Wild^T Robot^T last fall.','Have^F you seen the movie Space^T Pals^T and the Moon^T Machine^T?','Dad^N read me a story called The^T Unicorn^T in the Garden^T.','On^F Monday^D, I^I wrote a report called How^T Rockets^T Reach^T Space^T.','Mrs.^N Chen^N said, “We^Q will visit the library on Thursday^D.”','In^F the book Charlotte’s^T Web^T, a pig named Wilbur^N has a spider friend.','My^F team, the Rocket^G Racers^G, won the robot contest in October^D.','Bolt^F asked, “Can^Q I^I come to Mars^P with you?”']
];
function parseCaps(s){
  return s.split(' ').map(raw=>{
    if(raw.includes('^')){const [w,rest]=raw.split('^');return {target:w+rest.slice(1),code:rest[0],need:true}}
    return {target:raw,code:null,need:false};
  }).map(t=>{const m=t.target.match(/[A-Za-z]/);t.idx=m?m.index:-1;t.lower=t.idx<0?t.target:t.target.slice(0,t.idx)+t.target[t.idx].toLowerCase()+t.target.slice(t.idx+1);t.upper=t.idx<0?t.target:t.target.slice(0,t.idx)+t.target[t.idx].toUpperCase()+t.target.slice(t.idx+1);return t});
}
class CapsQ{
  constructor(s,level){this.toks=parseCaps(s);this.on=this.toks.map(()=>false);this.marks=null;this.done=false;this.level=level;this.hintLvl=0;this.rounds=0}
  start(){app.clearInput();app.say(`Capital Patrol! Some words need a <b>capital letter</b>. Tap each word that should start with a capital, then check.`,'happy');app.enter=()=>{this.check();renderWork()}}
  act(name,v){
    if(this.done)return false;
    if(name==='tok'){const i=+v;if(this.toks[i].idx<0)return false;this.on[i]=!this.on[i];this.marks=null;sound('pop');return}
    if(name==='check')return this.check();
    return false;
  }
  check(){
    this.rounds++;
    const bad=this.toks.map((t,i)=>t.need!==this.on[i]?i:-1).filter(i=>i>=0);
    if(!bad.length){this.done=true;app.enter=null;app.solved(`Every capital is in the right place!`);this.marks=this.toks.map(t=>t.need?'ok':'');return}
    this.marks=this.toks.map((t,i)=>bad.includes(i)?'err':'');
    const missed=bad.filter(i=>this.toks[i].need),extra=bad.filter(i=>!this.toks[i].need);
    let msg=`I marked ${bad.length} ${plural(bad.length,'word')} to fix.`;
    if(missed.length)msg+=` <b>${esc(this.toks[missed[0]].upper)}</b> needs a capital because ${CAP_WHY[this.toks[missed[0]].code]}.`;
    else if(extra.length){const t=this.toks[extra[0]],small=/^(a|an|the|and|of|in|on|to|for|with|at|by)$/i.test(t.target.replace(/[^A-Za-z]/g,''));msg+=` <b>${esc(t.lower)}</b> stays lowercase${small?': small words like this stay lowercase in the middle of a title or name':': it is a common word, not a specific name'}.`}
    app.oops(msg);
  }
  hint(){
    const l=this.hintLvl++;
    if(l===0)return 'Check: the first word, the word I, names of people and pets, days, months, holidays, places, and important words in titles.';
    const miss=this.toks.findIndex((t,i)=>t.need&&!this.on[i]);
    if(miss>=0){this.marks=this.toks.map((t,i)=>i===miss?'err':'');return `Look at the word <b>${esc(this.toks[miss].lower)}</b>. ${cap(CAP_WHY[this.toks[miss].code])}.`}
    const ex=this.toks.findIndex((t,i)=>!t.need&&this.on[i]);
    if(ex>=0){this.marks=this.toks.map((t,i)=>i===ex?'err':'');return `<b>${esc(this.toks[ex].target)}</b> doesn't need a capital.`}
    return 'Everything looks good. Press Check!';
  }
  html(){
    let h=`<div class="tokens">`;
    this.toks.forEach((t,i)=>{const shown=this.on[i]?t.upper:t.lower;const cls=(this.on[i]?' capd':'')+(this.marks&&this.marks[i]?' '+this.marks[i]:'');h+=t.idx<0?`<span class="word">${esc(shown)}</span>`:`<button type="button" class="tok${cls}" data-act="tok" data-v="${i}">${esc(shown)}</button>`});
    h+='</div><p class="legend">Tap a word to capitalize it. Tap again to undo.</p>';
    if(!this.done)h+=`<button type="button" class="btn btn-mint" data-act="check">Check my capitals</button>`;
    else{const reasons=[...new Set(this.toks.filter(t=>t.need).map(t=>t.code))];h+=`<div class="after"><b>${esc(this.toks.map(t=>t.target).join(' '))}</b><ul class="fixlist">${reasons.map(c=>`<li>${this.toks.filter(t=>t.code===c).map(t=>esc(t.target.replace(/[^A-Za-z’'.]/g,''))).join(', ')}: ${CAP_WHY[c]}</li>`).join('')}</ul></div>`}
    return h;
  }
}

/* ---------------- commas ---------------- */
const COMMA_WHY={series:'Use commas to separate three or more items in a list. (The comma before "and" is up to you!)',date:'Put a comma between the day and the year.',place:'Put commas between a street, a city, and a state.',compound:'Put a comma before and, but, or, or so when it joins two complete sentences.',intro:'Put a comma after an introduction at the start of a sentence.',yesno:'Put a comma after yes or no at the start of an answer.',direct:'Use commas to set off the name of the person you are talking to.',tag:'Put a comma before a tag question at the end, like "isn\'t it?"',dialogue:'Put a comma after said or asked, right before the quotation marks.'};
const COMMAS=[
 [['We packed snacks, water,? and a flashlight for the launch.','series'],['Bolt needs bolts, wires, gears,? and a battery.','series'],['The robots can roll, spin,? and jump.','series'],['Astronauts first walked on the Moon on July 20, 1969.','date'],['The space museum is in Huntsville, Alabama.','place'],['My pen pal lives at 42 Comet Lane, Raleigh, North Carolina.','place'],['Red, blue,? and green bricks filled the bin.','series'],['The launch is on Friday, October 23, 2026.','date']],
 [['The rocket was ready, but the weather was stormy.','compound'],['Comet wanted to fly, so she practiced every day.','compound'],['Bolt can build the frame, or Gizmo can do it.','compound'],['After the countdown, the engines roared.','intro'],['When the bell rang, everyone raced to the robot lab.','intro'],['Yes, I finished my spelling words.','yesno'],['No, the rover cannot fly.','yesno'],['First, attach the wheels to the base.','intro']],
 [['Leo, please hand me the screwdriver.','direct'],['Can you help me, Mom?','direct'],['Captain Ruiz, the rocket is ready.','direct'],['The rover is fast, isn’t it?','tag'],['You finished the robot, didn’t you?','tag'],['Bolt said, “Let’s build a tower.”','dialogue'],['Comet asked, “Are you ready to fly?”','dialogue'],['Thank you, Ms. Tinker, for the new gears.','direct']]
];
class CommaQ{
  constructor([s,kind],level){
    this.kind=kind;this.level=level;this.words=[];this.want=new Set();this.opt=new Set();
    s.split(' ').forEach((t,i)=>{if(t.endsWith(',?')){this.opt.add(i);t=t.slice(0,-2)}else if(t.endsWith(',')){this.want.add(i);t=t.slice(0,-1)}this.words.push(t)});
    this.full=s.replace(/,\?/g,',');this.on=new Set();this.marks=null;this.done=false;this.hintLvl=0;
  }
  start(){app.clearInput();app.say(`Comma Commander! This sentence is missing its commas. Tap the spaces where commas belong, then check.`,'happy');app.enter=()=>{this.check();renderWork()}}
  act(name,v){
    if(this.done)return false;
    if(name==='gap'){const i=+v;this.on.has(i)?this.on.delete(i):this.on.add(i);this.marks=null;sound('pop');return}
    if(name==='check')return this.check();
    return false;
  }
  check(){
    const missing=[...this.want].filter(i=>!this.on.has(i)),extra=[...this.on].filter(i=>!this.want.has(i)&&!this.opt.has(i));
    if(!missing.length&&!extra.length){this.done=true;app.enter=null;app.solved(COMMA_WHY[this.kind]);return}
    this.marks={missing:new Set(missing),extra:new Set(extra)};
    app.oops(`${missing.length?`You need ${missing.length} more ${plural(missing.length,'comma')}. `:''}${extra.length?`${extra.length} ${plural(extra.length,'comma')} ${extra.length===1?'doesn\'t':'don\'t'} belong (marked in pink). `:''}${this.hintLvl?'':'<small>Tip: '+COMMA_WHY[this.kind]+'</small>'}`);
  }
  hint(){
    const l=this.hintLvl++;
    if(l===0)return COMMA_WHY[this.kind];
    const miss=[...this.want].find(i=>!this.on.has(i));
    if(miss!==undefined){this.marks={missing:new Set([miss]),extra:new Set()};return `One comma goes right after <b>${esc(this.words[miss])}</b>.`}
    return 'Check for commas that don\'t belong.';
  }
  html(){
    let h=`<div class="tokens">`;
    this.words.forEach((w,i)=>{
      h+=`<span class="word">${esc(w)}</span>`;
      if(i<this.words.length-1){const on=this.on.has(i);let c=on?' on':'';if(this.marks){if(this.marks.missing.has(i))c+=' err';if(this.marks.extra.has(i))c+=' err'}if(this.done&&(this.want.has(i)||(this.opt.has(i)&&on)))c+=' ok';
        h+=`<button type="button" class="gap${c}" data-act="gap" data-v="${i}" aria-label="comma after ${esc(w)}"></button>`}
    });
    h+='</div><p class="legend">Tap the space after a word to add a comma. Tap again to remove it.</p>';
    if(!this.done)h+=`<button type="button" class="btn btn-mint" data-act="check">Check my commas</button>`;
    else h+=`<div class="after"><b>${esc(this.full)}</b></div>`;
    return h;
  }
}

/* ---------------- missions ---------------- */
const pickCtx=(ctx,list,key)=>uniq(ctx,()=>pick(list),key||(x=>JSON.stringify(x)));
defMission({id:'parts',zone:'words',sector:'wp',title:'Word Parts',sym:'re|',color:'#ffc843',std:['RF.4','L.4'],skill:'Syllables, prefixes, suffixes and Greek and Latin roots',guide:'bolt',
  levels:['Syllable bricks','Prefixes and suffixes','Word roots'],count:()=>6,
  make:(l,i,ctx)=>l===0?new SyllQ(pickCtx(ctx,SYLL[i<2?0:i<4?1:2]),l):bankMission('parts',l,ctx),
  manual:`<h3>Building words</h3><ul><li>Long words are built from parts, like bricks.</li><li>Split syllables between two consonants: bas | ket.</li><li>Prefixes go at the front: <b>re</b>build = build again.</li><li>Suffixes go at the end: help<b>ful</b> = full of help.</li><li>Roots carry the meaning: <b>tele</b> = far, <b>scope</b> = see.</li></ul>`});
defMission({id:'context',zone:'words',sector:'wp',title:'Context Clues',sym:'?!',color:'#73c2ff',std:['L.4','RI.4','L.6'],skill:'Figure out new words from the sentence around them',guide:'bolt',
  levels:['Clues in the sentence','Words with many meanings','Harder words'],count:()=>6,make:(l,i,ctx)=>bankMission('context',l,ctx),
  manual:`<h3>Be a word detective</h3><ol><li>Read the whole sentence, not just the word.</li><li>Look for clues: examples, opposites, or explanations nearby.</li><li>Try each answer in place of the word. Does the sentence still make sense?</li></ol>`});
defMission({id:'figure',zone:'words',sector:'wp',title:'Figurative Language',sym:'≈',color:'#ff6fc0',std:['L.5','L.3','L.6'],skill:'Similes, metaphors, idioms, proverbs and precise word choice',guide:'bolt',
  levels:['Similes and metaphors','Idioms','Proverbs and word choice'],count:()=>6,make:(l,i,ctx)=>bankMission('figure',l,ctx),
  manual:`<h3>Words that paint pictures</h3><ul><li><b>Simile:</b> compares with like or as (fast like the wind).</li><li><b>Metaphor:</b> says one thing IS another (the room was a zoo).</li><li><b>Idiom:</b> a saying that doesn't mean the exact words (piece of cake = easy).</li><li><b>Proverb:</b> a short saying with advice (look before you leap).</li></ul>`});
defMission({id:'spell',zone:'words',sector:'cv',title:'Spelling Bricks',sym:'abc',color:'#3fdcb4',std:['L.2','RF.4'],skill:'Suffix rules, plurals, and tricky words',guide:'bolt',
  levels:['Adding suffixes','Plurals','Tricky words'],count:()=>6,
  make:(l,i,ctx)=>{
    if(l===0){const [b,s,w,r]=pickCtx(ctx,SUFFIX);return new SpellQ({kind:'eq',base:b,suf:s,word:w,rule:r},l)}
    if(l===1){const [b,w,r]=pickCtx(ctx,PLURALS);return new SpellQ({kind:'plural',base:b,word:w,rule:r},l)}
    const [w,s,t]=pickCtx(ctx,TRICKY);return new SpellQ({kind:'dict',word:w,sent:s,tip:t},l)},
  manual:`<h3>Spelling rules</h3><ul><li>Silent e + vowel suffix: drop the e (hope → hoping).</li><li>Consonant + y: change y to i (try → tried), but keep y before -ing.</li><li>Short vowel + one consonant: double it (stop → stopped).</li><li>s, x, ch, sh: add -es (box → boxes).</li></ul><p>Tricky words: look, say, cover, write, check.</p>`});
defMission({id:'caps',zone:'words',sector:'cv',title:'Capital Patrol',sym:'Aa',color:'#ff6fc0',std:['L.2'],skill:'Capitalize names, places, dates, titles and sentence starts',guide:'bolt',
  levels:['Names, days, months','Places and languages','Titles and quotations'],count:()=>5,make:(l,i,ctx)=>new CapsQ(pickCtx(ctx,CAPS[l]),l),
  manual:`<h3>When to use a capital</h3><ul><li>The first word of a sentence</li><li>The word I</li><li>Names of people, pets, teams</li><li>Days, months, holidays (not seasons!)</li><li>Specific places: Raleigh, the Blue Ridge Mountains</li><li>Important words in titles (small words like "of" and "the" stay lowercase in the middle)</li></ul>`});
defMission({id:'comma',zone:'words',sector:'cv',title:'Comma Commander',sym:',',color:'#ffc843',std:['L.2'],skill:'Commas in lists, dates, compound sentences, dialogue and more',guide:'bolt',
  levels:['Lists, dates, places','Compound sentences and intros','Names, tag questions, dialogue'],count:()=>5,make:(l,i,ctx)=>new CommaQ(pickCtx(ctx,COMMAS[l]),l),
  manual:`<h3>Comma rules</h3><ul><li>Lists: robots, rockets, and rovers</li><li>Dates: July 20, 1969. Places: Raleigh, North Carolina</li><li>Before FANBOYS (for, and, nor, but, or, yet, so) joining two sentences</li><li>After intros: After lunch, we built.</li><li>Yes, no, names, and tag questions: Yes, Leo, it's ready, isn't it?</li></ul>`});
defMission({id:'grammar',zone:'words',sector:'cv',title:'Grammar Gears',sym:'⚙',color:'#b39bff',std:['L.1','L.2'],skill:'Verb agreement, tricky homophones, tenses, and complete sentences',guide:'bolt',
  levels:['Agreement and homophones','Verbs and describing words','Sentences and pronouns'],count:()=>6,make:(l,i,ctx)=>bankMission('grammar',l,ctx),
  manual:`<h3>Grammar gears</h3><ul><li>One robot rolls. Two robots roll.</li><li>to (go) · two (2) · too (also)</li><li>their (belongs) · there (place) · they're (they are)</li><li>A complete sentence has a WHO and a WHAT HAPPENED.</li><li>Read your sentence out loud. Does it sound right?</li></ul>`});
