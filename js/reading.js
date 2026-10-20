'use strict';
/* ============================================================
   READING RADAR — passages, "prove it" questions, listening
   Every question: {tag, q, a (right answer), w (wrong answers), ev (exact phrases from the
   sentence(s) that prove it, or null), clue, why}
   ============================================================ */
const PASSAGES=[
/* ---------------- stories (literature) ---------------- */
{id:'gizmo',mission:'story',level:0,type:'story',title:'The Robot Who Built Too Fast',parts:[{paras:[
 'Gizmo was the fastest robot in the Bolt Street Workshop. He could snap together a brick tower in ten seconds flat. "Done!" he would beep, and he would zoom off to the next job.',
 'One morning, Ms. Tinker asked Gizmo to build a bridge for the toy train. Gizmo grabbed bricks with all four arms. Snap, snap, snap! In less than a minute, the bridge stretched across the table.',
 'Gizmo did not stop to check his work. He did not notice the wobbly brick in the middle.',
 'When the little train rolled onto the bridge, the wobbly brick slipped. The bridge sagged, and the train tumbled into a pile of blocks. Gizmo\'s lights blinked red.',
 'Ms. Tinker did not scold him. "Let\'s rebuild it together," she said. "This time, after every row, we stop and test it." Gizmo built one row and pushed on it gently. He built another row and checked it again. It took ten whole minutes.',
 'When the train rolled across, the bridge held strong. Gizmo\'s lights glowed a happy green. "Fast is fun," he beeped, "but checking makes it strong."']}],
 qs:[
 {tag:'RL.4.1 Details',q:'Why did the first bridge fall?',a:'A wobbly brick slipped because Gizmo did not check his work.',w:['The train was too heavy for any bridge.','Ms. Tinker used the wrong bricks.','Gizmo built it with only two arms.'],ev:['did not notice the wobbly brick','the wobbly brick slipped'],clue:'Look for the part about the wobbly brick.',why:'Gizmo rushed and did not notice the wobbly brick.'},
 {tag:'RL.4.3 Character',q:'How does Gizmo feel when the train tumbles?',a:'Upset',w:['Proud','Sleepy','Bored'],ev:['lights blinked red'],clue:'Gizmo shows feelings with his lights.',why:'His lights blink red, which shows he is upset.'},
 {tag:'RL.4.4 Word meaning',q:'"The bridge sagged." What does sagged mean?',a:'Sank down in the middle',w:['Got longer','Turned bright green','Went very fast'],ev:['The bridge sagged'],clue:'What happens to a bridge when a brick in the middle slips?',why:'Sagged means it sank or bent down.'},
 {tag:'RL.4.1 Inference',q:'How was building the second bridge different from the first?',a:'Gizmo built slowly and tested each row.',w:['Gizmo built it alone in ten seconds.','Ms. Tinker built it while Gizmo watched.','They used no bricks at all.'],ev:['after every row','pushed on it gently','checked it again','ten whole minutes'],clue:'Look for what Ms. Tinker tells Gizmo to do.',why:'They stopped after every row to test it.'},
 {tag:'RL.4.2 Theme',q:'What is the theme, or big lesson, of the story?',a:'Slowing down to check your work makes it better.',w:['Robots should never build bridges.','Trains are faster than robots.','The fastest builder always wins.'],ev:['checking makes it strong'],clue:'What does Gizmo say at the very end?',why:'Gizmo learns that "checking makes it strong."'},
 {tag:'RL.4.2 Summary',q:'Which is the best summary of the story?',a:'Gizmo builds a bridge too fast and it falls, so he rebuilds it slowly, checks each row, and it holds.',w:['Gizmo is a robot with four arms who lives on Bolt Street.','A toy train rolls across a bridge.','Ms. Tinker asks Gizmo to build a bridge, and he grabs bricks.'],ev:null,clue:'A good summary tells the beginning, middle, AND end in a few words.',why:'A summary covers the whole story: the problem, what changed, and how it ended.'}
 ]},
{id:'tortoise',mission:'story',level:0,type:'story',title:'The Tortoise and the Hare',by:'A fable from ancient Greece, retold',parts:[{paras:[
 'Hare liked to brag. "I am the fastest animal in the meadow," he said to anyone who would listen. "No one can beat me!"',
 'Tortoise was tired of the bragging. "I will race you," she said calmly.',
 'Hare laughed so hard that his ears flopped. But the race was set for the next morning.',
 'When the race began, Hare dashed ahead. Soon Tortoise was only a tiny speck behind him. "This is too easy," Hare yawned. "I\'ll take a nap under this tree and still win."',
 'Tortoise kept going, step by step. She did not stop, even when her legs grew tired. She passed the sleeping Hare and kept walking.',
 'When Hare finally woke up, he raced toward the finish line. But it was too late. Tortoise had already crossed it, and all the animals were cheering.',
 'Slow and steady wins the race.']}],
 qs:[
 {tag:'RL.4.3 Character',q:'Which word best describes Hare at the start of the story?',a:'Boastful',w:['Shy','Patient','Kind'],ev:['Hare liked to brag','No one can beat me'],clue:'What does Hare say about himself?',why:'Boastful means bragging, and Hare brags to everyone.'},
 {tag:'RL.4.1 Details',q:'Why did Hare lose the race?',a:'He took a nap because he was sure he would win.',w:['Tortoise tricked him.','He hurt his leg.','He ran the wrong way.'],ev:['take a nap'],clue:'What did Hare do under the tree?',why:'Hare napped, and Tortoise passed him.'},
 {tag:'RL.4.4 Word meaning',q:'Tortoise spoke "calmly." What does calmly mean?',a:'In a quiet, peaceful way',w:['In an angry way','Very quickly','With a loud laugh'],ev:['she said calmly'],clue:'Tortoise is not upset or excited.',why:'Calmly means in a quiet, peaceful way.'},
 {tag:'RL.4.3 Character',q:'What did Tortoise do when her legs grew tired?',a:'She kept going.',w:['She took a nap.','She gave up.','She asked Hare for help.'],ev:['She did not stop'],clue:'Find the sentence about her tired legs.',why:'She did not stop, even when her legs grew tired.'},
 {tag:'RL.4.2 Theme',q:'What is the theme of this fable?',a:'Steady effort can beat speed and bragging.',w:['Animals should not race.','Naps are important.','Fast animals always win.'],ev:['Slow and steady wins the race'],clue:'Fables often say their lesson at the end.',why:'"Slow and steady wins the race."'},
 {tag:'RL.4.6 Point of view',q:'Who is telling this story?',a:'A narrator who is not in the story (third person)',w:['Hare, using "I" (first person)','Tortoise, using "I" (first person)','The tree'],ev:null,clue:'Look at the words outside the quotation marks. Do they say "I" or "he" and "she"?',why:'The narrator uses "he" and "she." The "I" words are only inside the characters\' dialogue.'}
 ]},
{id:'starla',mission:'story',level:1,type:'story',title:'Unicorn on the Launch Pad',parts:[{paras:[
 'My name is Starla, and I am the only unicorn on the Moon Base launch crew. My job is to polish the rocket windows with my horn until they sparkle.',
 'Today was supposed to be an ordinary day. Then Captain Ruiz rushed into the hangar. "Our pilot is sick," she said, "and the supply rocket must leave in one hour. Starla, you have trained in the simulator for months. Will you fly it?"',
 'My hooves felt like they were glued to the floor. My stomach did flips. I had flown the simulator a hundred times, but never a real rocket.',
 'I thought about the people on the space station waiting for food and water. I took a deep breath. "I\'ll do it," I said, though my voice wobbled.',
 'In the cockpit, I followed the checklist one line at a time, just like in training. Engines on. Fuel full. Countdown started.',
 'The rocket roared and shook. My mane flew in every direction. Then the shaking stopped, and through the sparkling window I saw Earth glowing blue and white.',
 'I laughed out loud. I was still a little scared, but I was flying.']}],
 qs:[
 {tag:'RL.4.6 Point of view',q:'From what point of view is this story told?',a:'First person: Starla tells it using "I" and "my."',w:['Third person: a narrator tells it using "she."','Captain Ruiz tells it.','The rocket tells it.'],ev:['My name is Starla'],clue:'Who is talking in the very first sentence?',why:'Starla is the narrator and uses "I" and "my." That is first person.'},
 {tag:'RL.4.3 Character',q:'How does Starla feel when Captain Ruiz asks her to fly?',a:'Nervous',w:['Bored','Angry','Sleepy'],ev:['glued to the floor','stomach did flips','voice wobbled'],clue:'Look at how her body feels.',why:'Her hooves feel stuck and her stomach does flips. She is nervous.'},
 {tag:'RL.4.4 Figurative language',q:'"My hooves felt like they were glued to the floor." This means Starla...',a:'was too frightened to move.',w:['had stepped in glue.','was building something.','was tired of walking.'],ev:['glued to the floor'],clue:'Is there really glue? What feeling makes your feet stuck?',why:'It is a simile. She felt too scared to move.'},
 {tag:'RL.4.1 Inference',q:'Why does Starla decide to fly the rocket?',a:'She thinks about the people who need the supplies.',w:['She wants to see her friends.','She is bored with polishing windows.','The rocket can fly by itself.'],ev:['waiting for food and water'],clue:'What does she think about right before she says yes?',why:'She thinks about the people waiting for food and water.'},
 {tag:'RL.4.3 Events',q:'What helps Starla fly the real rocket?',a:'She follows the checklist one line at a time, like in training.',w:['She guesses which buttons to push.','Captain Ruiz flies with her.','She closes her eyes.'],ev:['followed the checklist'],clue:'What does she do in the cockpit?',why:'She follows the checklist, just like in training.'},
 {tag:'RL.4.2 Theme',q:'What is the theme of the story?',a:'Being brave means doing something even when you feel scared.',w:['Unicorns are the best pilots.','Never fly a rocket.','Simulators are just games.'],ev:['still a little scared, but I was flying'],clue:'Look at the last sentence.',why:'Starla is still scared, but she flies anyway. That is bravery.'}
 ]},
{id:'brick',mission:'story',level:1,type:'poem',title:'Brick by Brick',parts:[{paras:[
 'One small brick is not a tower,\nOne small brick is not a wall,\nBut stack them up, hour by hour,\nAnd watch your castle grow up tall.',
 'The first try leans, the second wobbles,\nThe third one tumbles to the floor.\nMy little brother laughs and hobbles\nThrough the pieces by the door.',
 'I pick them up. I start again.\nI press each brick until it clicks.\nA builder learns from now and then,\nFrom every crash, a few new tricks.',
 'So when a problem seems too tall,\nA mountain far too steep to climb,\nRemember towers, bridges, all\nWere built one brick at a time.']}],
 qs:[
 {tag:'RL.4.5 Poems',q:'How is this poem organized?',a:'In stanzas, which are groups of lines',w:['In chapters','In scenes with stage directions','In paragraphs'],ev:null,clue:'Look at how the lines are grouped with spaces between.',why:'Poems are written in lines, and groups of lines are called stanzas.'},
 {tag:'RL.4.5 Poems',q:'How many stanzas does the poem have?',a:'4',w:['1','16','2'],ev:null,clue:'Count the groups of lines, not the single lines.',why:'There are 4 stanzas with 4 lines each.'},
 {tag:'RL.4.5 Poems',q:'Which word rhymes with "tall" in the first stanza?',a:'wall',w:['tower','brick','hour'],ev:['not a wall'],clue:'Rhyming words have the same ending sound.',why:'"Wall" and "tall" rhyme.'},
 {tag:'RL.4.3 Events',q:'What does the speaker do after the tower tumbles?',a:'Picks up the bricks and starts again',w:['Gives up and goes outside','Asks the brother to build it','Throws the bricks away'],ev:['I start again'],clue:'Look at the third stanza.',why:'"I pick them up. I start again."'},
 {tag:'RL.4.4 Figurative language',q:'"A mountain far too steep to climb" describes...',a:'a problem that feels very hard',w:['a real mountain the speaker climbs','a pile of bricks on the floor','a trip to the park'],ev:['problem seems too tall'],clue:'Read the line right before it.',why:'The mountain stands for a problem that feels too hard.'},
 {tag:'RL.4.2 Theme',q:'What is the theme of the poem?',a:'Big things are built with small steps and by trying again.',w:['Little brothers are annoying.','Castles are better than towers.','Bricks are hard to find.'],ev:['one brick at a time'],clue:'What should you remember when a problem seems too tall?',why:'Big things are built one brick at a time.'}
 ]},
{id:'mixup',mission:'story',level:2,type:'drama',title:'Mission Control Mix-Up',by:'A play in one scene',parts:[{paras:[
 'CAST: BOLT, a helpful robot. COMET, a unicorn pilot. DR. OKAFOR, the mission director.',
 'SETTING: Mission Control on a busy morning. Screens blink everywhere.',
 'DR. OKAFOR: (looking at her clipboard) Five minutes until launch! Bolt, is the cargo loaded?',
 'BOLT: (saluting with a squeaky arm) Yes, Doctor! Three crates of seeds for the Moon garden.',
 'COMET: (over the radio) Mission Control, my cargo screen says three crates of SOCKS.',
 'DR. OKAFOR: (gasping) Socks? Bolt, please check the labels again.',
 'BOLT: (rolling to the cargo bay, then rolling back slowly) I may have read the labels too quickly. The crates by the door say SOCKS. The seeds are still in the corner.',
 'COMET: (laughing) Moon astronauts do get cold feet, but they need to grow food!',
 'DR. OKAFOR: We have four minutes. Bolt, swap the crates. This time, read every label twice.',
 'BOLT: (zooming away) Reading twice! Swapping crates!',
 '(BOLT returns, puffing steam.)',
 'BOLT: Seeds loaded. I read each label two times.',
 'DR. OKAFOR: (smiling) Then we are ready. Comet, you are clear for launch!',
 'COMET: Three, two, one... liftoff!']}],
 qs:[
 {tag:'RL.4.5 Drama',q:'How can you tell this is a drama (a play)?',a:'It has a cast list, a setting, character names before their lines, and stage directions.',w:['It has stanzas that rhyme.','It has chapters.','It has a table of facts.'],ev:null,clue:'Look at how the text is set up on the page.',why:'Plays have a cast, a setting, dialogue after names, and stage directions.'},
 {tag:'RL.4.5 Drama',q:'What are the words in parentheses, like (zooming away)?',a:'Stage directions that tell how characters move or act',w:['Lines the characters say out loud','The title of the play','Rhyming words'],ev:null,clue:'Do the actors say those words, or do they act them out?',why:'Stage directions tell actors what to do. They are not spoken.'},
 {tag:'RL.4.1 Details',q:'What was the problem?',a:'Bolt loaded crates of socks instead of seeds.',w:['Comet was sick.','The rocket ran out of fuel.','The Moon garden had too many seeds.'],ev:['three crates of SOCKS','The crates by the door say SOCKS'],clue:'What does Comet see on the cargo screen?',why:'The rocket was loaded with socks, not seeds.'},
 {tag:'RL.4.1 Inference',q:'Why did Bolt make the mistake?',a:'He read the labels too quickly.',w:['He cannot read.','Dr. Okafor told him to load socks.','The labels were blank.'],ev:['too quickly'],clue:'What does Bolt say when he rolls back?',why:'Bolt says he read the labels too quickly.'},
 {tag:'RL.4.3 Character',q:'What does Bolt do differently the second time?',a:'He reads every label twice.',w:['He loads the crates faster.','He asks Comet to do it.','He skips the labels.'],ev:['read each label two times','read every label twice'],clue:'What does Dr. Okafor tell him to do?',why:'He reads each label two times, so he gets it right.'},
 {tag:'L.4.5 Idioms',q:'Comet jokes that astronauts "get cold feet." The joke works because "cold feet" can also mean...',a:'feeling nervous about doing something',w:['having wet shoes','being very tall','being hungry'],ev:['cold feet'],clue:'It is an idiom. Think about a person who is scared to start something.',why:'"Cold feet" means feeling nervous, and socks also warm cold feet!'}
 ]},
{id:'zip',mission:'story',level:2,type:'story',title:'Two Races',by:'Compare two stories',parts:[
 {head:'Text A: The Tortoise and the Hare (a fable from ancient Greece)',paras:['A speedy hare brags that no one can beat him. A slow tortoise challenges him to a race. The hare runs far ahead, then naps because he is sure he will win. The tortoise keeps walking without stopping and crosses the finish line first.']},
 {head:'Text B: The Rover and the Rocket Car',paras:['Zip was a rocket-powered race car on Planet Kooba. "No rover can catch me," Zip bragged. Rumble, a slow six-wheeled rover, rolled up. "Let\'s race to the crater," Rumble said.',
 'Zip blasted off in a cloud of red dust. Halfway there, Zip stopped to film a video of itself. "Watch how far ahead I am!" Zip said to the camera. Then Zip filmed another video, and another.',
 'Rumble never stopped. Its wheels turned slowly over every rock. When Zip finally looked up, Rumble was parked at the crater\'s edge, waving its antenna.']}],
 qs:[
 {tag:'RL.4.9 Compare themes',q:'What theme do both stories share?',a:'Steady effort beats bragging and showing off.',w:['Rockets are faster than rovers.','Animals and machines cannot be friends.','Never race on another planet.'],ev:null,clue:'Who wins in each story, and why?',why:'In both stories, the slow, steady racer beats the bragger.'},
 {tag:'RL.4.9 Compare events',q:'How are the events in both stories alike?',a:'A fast character brags, gets distracted, and loses to a slow, steady character.',w:['Both racers tie.','A slow character brags and then wins easily.','Both stories happen in a meadow.'],ev:null,clue:'Line up what happens first, next, and last in each story.',why:'The pattern of events is the same: brag, get distracted, lose.'},
 {tag:'RL.4.9 Compare',q:'What is one big difference between the two stories?',a:'Text A is an old fable about animals. Text B is set on another planet with machines.',w:['Text A has a winner and Text B does not.','In Text B, the bragger wins.','Text A is a poem.'],ev:null,clue:'Look at the characters and setting.',why:'The characters and setting are different, even though the theme is the same.'},
 {tag:'RL.4.1 Details',q:'What distracted Zip?',a:'Filming videos of itself',w:['A nap under a tree','A flat tire','A big rock'],ev:['film a video'],clue:'Look in Text B, the second paragraph.',why:'Zip kept stopping to film videos.'},
 {tag:'RL.4.3 Character',q:'Which word best describes Rumble?',a:'Determined',w:['Lazy','Boastful','Confused'],ev:['Rumble never stopped'],clue:'What does Rumble do the whole race?',why:'Rumble never stops, which shows it is determined.'},
 {tag:'L.4.5 Synonyms',q:'Zip "bragged." Which word means almost the same thing?',a:'Boasted',w:['Whispered','Apologized','Asked'],ev:['Zip bragged'],clue:'What is Zip doing when it says no one can catch it?',why:'Bragged and boasted are synonyms.'}
 ]},
/* ---------------- informational texts ---------------- */
{id:'narwhal',mission:'facts',level:0,type:'info',title:'Narwhals: Unicorns of the Sea',parts:[{paras:[
 'Narwhals are sometimes called the unicorns of the sea. These whales live in the icy Arctic Ocean near Canada, Greenland, and Russia.',
 'A narwhal\'s famous tusk looks like a horn, but it is really a tooth. The tooth grows straight out through the narwhal\'s upper lip. It grows in a spiral shape, and it can be up to about 10 feet long. Most narwhals with tusks are males.',
 'Scientists are still learning what the tusk is for. The tusk has many tiny openings, and some scientists think it may help a narwhal sense changes in the water around it. Males may also use their tusks to show off to one another.',
 'Narwhals have no teeth for chewing. Instead, they swim deep under the ice and suck in fish, shrimp, and squid whole. A narwhal can dive nearly a mile deep to find food.',
 'Because they live in cold, remote waters, narwhals are hard to study. Scientists use underwater microphones and satellite tags to learn where narwhals travel.']}],
 qs:[
 {tag:'RI.4.2 Main idea',q:'What is the main idea of the whole text?',a:'Narwhals are Arctic whales with a special tusk that scientists are still studying.',w:['Narwhals can dive nearly a mile deep.','Unicorns live in the ocean.','Scientists use underwater microphones.'],ev:null,clue:'The main idea covers the WHOLE text, not just one paragraph.',why:'The other choices are details. The main idea is what the whole text is about.'},
 {tag:'RI.4.1 Details',q:'What is a narwhal\'s tusk, really?',a:'A long tooth',w:['A horn made of bone','A long nose','A fin'],ev:['it is really a tooth'],clue:'Look in the second paragraph.',why:'The tusk looks like a horn, but it is really a tooth.'},
 {tag:'RI.4.1 Details',q:'Where do narwhals live?',a:'In the icy Arctic Ocean',w:['In warm tropical seas','In rivers and lakes','Near the South Pole'],ev:['icy Arctic Ocean'],clue:'Look at the very beginning.',why:'They live in the icy Arctic Ocean.'},
 {tag:'RI.4.4 Vocabulary',q:'Narwhals live in "remote" waters. What does remote mean here?',a:'Far away from people and places',w:['Very warm','Full of boats','Shallow'],ev:['cold, remote waters'],clue:'Why would remote waters make narwhals hard to study?',why:'Remote means far away, which is why they are hard to study.'},
 {tag:'RI.4.3 Cause and effect',q:'Why are narwhals hard to study?',a:'They live in cold, remote waters.',w:['They are too small to see.','They only come out at night.','They are scared of scientists.'],ev:['hard to study'],clue:'Find the sentence with the word "because."',why:'"Because they live in cold, remote waters, narwhals are hard to study."'},
 {tag:'RI.4.1 Details',q:'How do narwhals eat?',a:'They suck in fish, shrimp, and squid whole.',w:['They chew with sharp teeth.','They stab fish with their tusks.','They eat plants on the ice.'],ev:['suck in fish'],clue:'Look in the fourth paragraph.',why:'Narwhals have no teeth for chewing, so they suck in their food whole.'}
 ]},
{id:'rocket',mission:'facts',level:0,type:'info',title:'How a Rocket Gets to Space',parts:[{paras:[
 'A rocket has to travel fast to reach space. To stay in orbit around Earth, a spacecraft needs to go about 17,500 miles per hour!',
 'First, the rocket\'s engines burn fuel. Burning fuel makes hot gas that blasts out of the bottom of the rocket. As the gas pushes down, the rocket pushes up. This follows a science rule: every push has an equal push in the opposite direction.',
 'Next, the rocket climbs higher and higher. Most big rockets are built in sections called stages. When the first stage runs out of fuel, it drops away. Without that heavy, empty stage, the rest of the rocket can go faster.',
 'Then the next stage\'s engines fire. The rocket tilts and speeds sideways around Earth instead of only straight up. This sideways speed is what keeps a spacecraft in orbit.',
 'Finally, the spacecraft reaches space. The engines turn off, and the spacecraft circles Earth again and again.',
 'Some modern rockets can even fly their first stage back to Earth and land it, so it can be used again.']}],
 qs:[
 {tag:'RI.4.5 Text structure',q:'How is most of this text organized?',a:'Sequence: the steps happen in order',w:['Compare and contrast','A list of opinions','Problem and solution only'],ev:null,clue:'Look at the first word of paragraphs 2 through 5.',why:'Signal words like First, Next, Then and Finally show a sequence.'},
 {tag:'RI.4.3 Cause and effect',q:'Why does the first stage drop away?',a:'It is out of fuel, and dropping it makes the rocket lighter so it can go faster.',w:['It breaks during launch.','Astronauts kick it off.','It is too hot.'],ev:['drops away','Without that heavy'],clue:'Look in the paragraph about stages.',why:'An empty stage is heavy. Dropping it lets the rocket go faster.'},
 {tag:'RI.4.1 Details',q:'What happens when the hot gas pushes down?',a:'The rocket pushes up.',w:['The rocket stops.','The fuel freezes.','The rocket turns around.'],ev:['the rocket pushes up'],clue:'Look in the second paragraph.',why:'Every push has an equal push in the opposite direction.'},
 {tag:'RI.4.4 Multiple meanings',q:'What does "stages" mean in this text?',a:'Sections of a rocket',w:['Places where plays happen','Steps of a dance','Kinds of fuel'],ev:['sections called stages'],clue:'The text tells you what stages are.',why:'In this text, stages are sections of a rocket.'},
 {tag:'RI.4.3 Science ideas',q:'What keeps a spacecraft in orbit?',a:'Its fast sideways speed around Earth',w:['Its heavy first stage','Going straight up forever','Turning the engines off early'],ev:['sideways speed'],clue:'Look in the paragraph that starts with "Then."',why:'The sideways speed keeps it circling Earth.'},
 {tag:'RI.4.1 Details',q:'Why do some rockets land their first stage?',a:'So it can be used again',w:['So astronauts can get out','Because it is lost','To pick up more fuel in space'],ev:['used again'],clue:'Look at the last paragraph.',why:'Landing the stage means it can be used again.'}
 ]},
{id:'rovers',mission:'facts',level:1,type:'info',title:'Rovers on Mars',parts:[{paras:[
 'A rover is a robot that drives across the surface of another world. Since 1997, NASA has sent several rovers to Mars.',
 'Driving on Mars is not like driving a remote-control car. Mars is so far away that radio messages take between about 3 and 22 minutes to travel from Earth. If a rover were about to hit a rock, a driver on Earth would not find out in time to stop it.',
 'So engineers build rovers that can think for themselves a little. A rover uses its cameras to take pictures of the ground ahead. Its computer studies the pictures, finds rocks and holes, and plans a safe path.',
 'Rovers are also scientists on wheels. The Perseverance rover, which landed in 2021, has a drill to collect rock samples and tools to search for signs of ancient life.',
 'Perseverance did not travel alone. It carried a small helicopter named Ingenuity. In April 2021, Ingenuity made the first powered, controlled flight on another planet.',
 'Each rover teaches engineers something new. The next robots they send will be even smarter.']}],
 qs:[
 {tag:'RI.4.2 Main idea',q:'What is the main idea of the text?',a:'Rovers are robots that explore Mars, and they are built to make some decisions on their own.',w:['Ingenuity is a helicopter.','Radio messages are slow.','Perseverance landed in 2021.'],ev:null,clue:'Which choice covers the whole text, not one detail?',why:'The other choices are details that support the main idea.'},
 {tag:'RI.4.3 Cause and effect',q:'Why can\'t people drive a Mars rover like a remote-control car?',a:'Radio messages take minutes to travel between Earth and Mars.',w:['Mars has no roads.','The rovers are too small.','Mars is too cold for remotes.'],ev:['between about 3 and 22 minutes','would not find out in time'],clue:'Look in the second paragraph.',why:'Messages are too slow to stop a rover in time.'},
 {tag:'RI.4.1 Details',q:'How does a rover find a safe path?',a:'Its computer studies camera pictures to find rocks and holes.',w:['A driver on Earth steers it.','It follows old tire tracks.','It asks Ingenuity.'],ev:['Its computer studies the pictures'],clue:'Look in the third paragraph.',why:'Its computer studies the pictures and plans a safe path.'},
 {tag:'RI.4.4 Figurative language',q:'"Rovers are also scientists on wheels." This means rovers...',a:'do science work while they drive around.',w:['are driven by scientists who sit inside.','have wheels made of science.','are people wearing lab coats.'],ev:['scientists on wheels','drill to collect rock samples'],clue:'Read the sentence after it. What tools does Perseverance have?',why:'Rovers collect samples and search for signs of life, which is science work.'},
 {tag:'RI.4.1 Details',q:'What was special about Ingenuity?',a:'It made the first powered, controlled flight on another planet.',w:['It was the first rover on Mars.','It drilled rock samples.','It carried Perseverance.'],ev:['first powered, controlled flight'],clue:'Look in the fifth paragraph.',why:'Ingenuity was the first to fly that way on another planet.'},
 {tag:'RI.4.5 Text structure',q:'How do paragraphs 2 and 3 work together?',a:'Paragraph 2 explains a problem, and paragraph 3 explains the solution.',w:['They compare two rovers.','They tell events in time order.','They give two opinions.'],ev:null,clue:'Paragraph 3 starts with "So."',why:'The slow messages are the problem. Rovers that can think a little are the solution.'}
 ]},
{id:'iss',mission:'facts',level:1,type:'info',title:'Life on the Space Station',parts:[{paras:[
 'The International Space Station is a home and science lab that circles about 250 miles above Earth. Astronauts from many countries have lived on board since the year 2000.',
 'The station zooms around Earth about once every 90 minutes. That means astronauts can see about 16 sunrises and 16 sunsets every day!',
 'Living without gravity changes everything. Water floats in wobbly balls, so astronauts drink from pouches with straws. They sleep in sleeping bags strapped to the wall so they do not drift around.',
 'Floating is fun, but it is hard on the body. Without gravity pulling on them, muscles and bones get weaker. That is why astronauts exercise about two hours every day on special machines.'],
 table:{caption:'One Day on the Station (an example schedule)',head:['Activity','Hours'],rows:[['Sleep','8½'],['Science and repairs','6½'],['Free time','3½'],['Exercise','2'],['Getting ready and planning','2'],['Meals','1½']]}}],
 qs:[
 {tag:'RI.4.7 Charts',q:'Look at the chart. How many hours does an astronaut spend exercising?',a:'2 hours',w:['8½ hours','6½ hours','1½ hours'],ev:null,clue:'Find the "Exercise" row in the chart.',why:'The chart shows 2 hours of exercise.'},
 {tag:'RI.4.7 Charts',q:'How does the chart help you understand the text?',a:'It shows how a whole day is split up, including the exercise the text talks about.',w:['It tells why water floats.','It shows a map of the station.','It lists the names of astronauts.'],ev:null,clue:'What kind of information is in the chart?',why:'The chart shows the day with numbers, and it matches the 2 hours of exercise in the text.'},
 {tag:'RI.4.3 Cause and effect',q:'Why do astronauts exercise every day?',a:'Without gravity, their muscles and bones get weaker.',w:['They are bored.','The station is too cold.','Exercise makes the station fly.'],ev:['muscles and bones get weaker'],clue:'Look in the last paragraph.',why:'Exercise keeps their muscles and bones strong.'},
 {tag:'RI.4.1 Details',q:'Why do astronauts see about 16 sunrises a day?',a:'The station circles Earth about every 90 minutes.',w:['The Sun moves faster in space.','They sleep only one hour.','There are 16 suns.'],ev:['once every 90 minutes'],clue:'Look in the second paragraph.',why:'Each trip around Earth brings a new sunrise.'},
 {tag:'RI.4.1 Details',q:'How do astronauts drink water?',a:'From pouches with straws',w:['From open cups','By catching floating balls in their mouths','They don\'t drink water'],ev:['pouches with straws'],clue:'Look in the third paragraph.',why:'Water floats, so they use pouches with straws.'},
 {tag:'RI.4.4 Vocabulary',q:'Astronauts strap in so they don\'t "drift." What does drift mean?',a:'Float slowly from place to place',w:['Fall asleep','Fall down hard','Wake up'],ev:['do not drift around'],clue:'What happens to things without gravity?',why:'Without gravity, a sleeping astronaut would float, or drift, around.'}
 ]},
{id:'contest',mission:'facts',level:2,type:'info',title:'The Robot Challenge',by:'Two accounts of the same event',parts:[
 {head:'Text A: My Robot Challenge Journal (by Leo, age 9)',paras:['Saturday, March 8. My hands were shaking when we set our robot, Clunk, on the table. Clunk had to pick up three blocks and stack them in under two minutes. During practice, Clunk had dropped the top block every single time.',
 'The buzzer sounded. Clunk grabbed the first block. Then the second. When it lifted the third block, I held my breath so long I thought I would pop. It stayed! The judges wrote down 1 minute, 48 seconds.',
 'We came in second place. I wanted first, but I learned that testing our robot a lot made the difference. My teammate Aisha hugged me so hard my glasses fell off.']},
 {head:'Text B: Local Students Shine at Robot Challenge (a news article)',paras:['MAPLE CITY — Forty teams of young engineers competed in the Maple City Robot Challenge on Saturday, March 8. Each team built a robot that had to stack three blocks in under two minutes.',
 'The Lincoln Elementary team, led by fourth graders Leo Park and Aisha Khan, took second place with a time of 1 minute, 48 seconds. First place went to a team from Riverside School, which finished in 1 minute, 31 seconds.',
 'Event organizer Dana Brooks said more teams entered this year than ever before. "Kids are discovering that engineering is a team sport," Brooks said. The challenge will return next spring.']}],
 qs:[
 {tag:'RI.4.6 Firsthand and secondhand',q:'Which text is a firsthand account?',a:'Text A, because Leo was there and tells it using "I" and "my"',w:['Text B, because it is in the news','Both texts','Neither text'],ev:null,clue:'Firsthand means the writer was there and saw it happen.',why:'Leo was there. The reporter is telling what other people did.'},
 {tag:'RI.4.6 Firsthand and secondhand',q:'What information is ONLY in Text B?',a:'Which team won first place, and its time',w:['Clunk\'s time','The day of the challenge','That the robot stacked three blocks'],ev:['First place went to'],clue:'Look for facts the news reporter added.',why:'Only the news article tells who won first place.'},
 {tag:'RI.4.6 Focus',q:'What does Text A focus on that Text B does not?',a:'Leo\'s feelings during the challenge',w:['How many teams competed','When the challenge will return','What the organizer said'],ev:['hands were shaking','held my breath'],clue:'How did Leo feel? Find a sentence that shows it.',why:'Leo describes his shaking hands and holding his breath.'},
 {tag:'RI.4.1 Details',q:'What was Clunk\'s time?',a:'1 minute, 48 seconds',w:['1 minute, 31 seconds','2 minutes','3 minutes'],ev:['1 minute, 48 seconds'],clue:'Both texts tell this.',why:'Clunk stacked the blocks in 1 minute, 48 seconds.'},
 {tag:'RI.4.9 Use both texts',q:'Using BOTH texts, which statement is true?',a:'Leo\'s team placed second out of forty teams after lots of testing.',w:['Leo\'s team won first place.','Clunk dropped the top block in the contest.','Aisha built the robot alone.'],ev:null,clue:'Text B tells how many teams. Text A tells about the testing.',why:'You need both texts: forty teams (Text B) and lots of testing (Text A).'},
 {tag:'RI.4.4 Vocabulary',q:'What is an "organizer"?',a:'A person who plans and runs an event',w:['A box for storing blocks','A robot judge','A team captain'],ev:['Event organizer'],clue:'What does an organizer do for an event?',why:'An organizer plans and runs an event.'}
 ]},
{id:'opinion',mission:'facts',level:2,type:'info',title:'Every Kid Should Build Robots',by:'An opinion article by Bolt',parts:[{paras:[
 'Every kid should get the chance to build a robot. Building robots teaches skills that last a lifetime.',
 'First, robots make math and science feel real. To make a robot arm turn exactly 90 degrees, builders have to measure angles and test their numbers. At the Bolt Street Robot Camp, 30 of the 40 campers said math felt more useful after building.',
 'Second, robots teach kids to keep trying. Robots almost never work the first time. Builders find the problem, fix it, and test again. Each fix is a small win.',
 'Finally, robot building is teamwork. One person writes the code, another builds the frame, and everyone tests. Many engineers say teamwork is one of the most important parts of their jobs.',
 'Some people say robot kits cost too much. But many libraries and schools now lend kits for free. With so many good reasons, every kid deserves a turn to build.']}],
 qs:[
 {tag:'RI.4.8 Author\'s point',q:'What is the author\'s main point?',a:'Every kid should get the chance to build a robot.',w:['Robot kits cost too much.','Engineers like teamwork.','Robots never work.'],ev:['Every kid should get the chance'],clue:'Look at the very first sentence.',why:'The author states the opinion right at the start, and again at the end.'},
 {tag:'RI.4.8 Reasons',q:'Which is one REASON the author gives?',a:'Robots teach kids to keep trying.',w:['Robots are shiny.','Robot kits cost too much.','Libraries are quiet.'],ev:['teach kids to keep trying'],clue:'Reasons start with First, Second and Finally.',why:'"Robots teach kids to keep trying" is the second reason.'},
 {tag:'RI.4.8 Evidence',q:'Which evidence supports the reason "robots make math and science feel real"?',a:'30 of the 40 campers said math felt more useful after building.',w:['Robots almost never work the first time.','One person writes the code.','Libraries lend kits for free.'],ev:['30 of the 40'],clue:'Evidence is often a fact or a number.',why:'The camp survey is evidence for the first reason.'},
 {tag:'RI.4.5 Text structure',q:'Which words does the author use to organize the reasons?',a:'First, Second, Finally',w:['Once upon a time','Before, during, after','Because, so, as a result'],ev:null,clue:'Look at the start of paragraphs 2, 3 and 4.',why:'First, Second and Finally signal each new reason.'},
 {tag:'RI.4.8 Counterargument',q:'How does the author answer people who say kits cost too much?',a:'Many libraries and schools lend kits for free.',w:['Kits are cheap at the store.','Kids can build robots from paper.','Money doesn\'t matter.'],ev:['lend kits for free'],clue:'Look in the last paragraph.',why:'The author points out that kits can be borrowed for free.'},
 {tag:'RI.4.1 Inference',q:'Why does the author mention engineers?',a:'To show that teamwork matters in real jobs',w:['To say engineers build all robots','To explain how to write code','To say engineers dislike kids'],ev:['Many engineers say'],clue:'What reason is that paragraph about?',why:'Engineers saying teamwork matters supports the teamwork reason.'}
 ]}
];

/* ---------------- sentence handling ---------------- */
const ABBR=/(?:^|\s)(Ms|Mr|Mrs|Dr|St)\.$/;
function splitSentences(p){
  const out=[];let start=0;
  for(let i=0;i<p.length;i++){
    const c=p[i];if(c!=='.'&&c!=='!'&&c!=='?')continue;
    let j=i+1;while(j<p.length&&/["”'’)]/.test(p[j]))j++;
    if(j>=p.length)break;
    if(p[j]!==' ')continue;
    let k=j;while(p[k]===' ')k++;
    if(!/[A-Z"“(]/.test(p[k]||''))continue;
    if(c==='.'&&ABBR.test(p.slice(start,i+1)))continue;
    out.push(p.slice(start,j).trim());start=k;i=k-1;
  }
  const rest=p.slice(start).trim();if(rest)out.push(rest);
  return out;
}
function prepPassage(P){
  if(P._sents)return P;
  const sents=[];
  P._parts=P.parts.map(part=>({head:part.head,table:part.table,paras:part.paras.map(para=>{
    const pieces=P.type==='poem'?para.split('\n'):P.type==='drama'?[para]:splitSentences(para);
    return pieces.map(t=>{sents.push(t);return sents.length-1});
  })}));
  P._sents=sents;
  P._words=sents.join(' ').split(/\s+/).length;
  P.qs.forEach(q=>{q._ev=q.ev?new Set(sents.map((s,i)=>q.ev.some(e=>s.includes(e))?i:-1).filter(i=>i>=0)):null});
  return P;
}
function sentHtml(P,i,cls){
  let t=esc(P._sents[i]);
  if(P.type==='drama'){
    t=t.replace(/\(([^)]*)\)/g,'<em>($1)</em>');
    const m=t.match(/^([A-Z][A-Z .]+):\s*(.*)$/);
    if(m)t=/^(CAST|SETTING)$/.test(m[1])?`<span class="cast"><b>${m[1]}:</b> ${m[2]}</span>`:`<span class="who">${m[1]}:</span> ${m[2]}`;
  }
  return `<span class="s${cls}" data-act="sent" data-v="${i}">${t}</span>`;
}

/* ---------------- question engine ---------------- */
class ReadQ{
  constructor(P,qi,ctx){
    this.P=P;this.q=P.qs[qi];this.qi=qi;this.ctx=ctx;this.listen=ctx.listen;
    const ch=shuffle([{t:this.q.a,ok:true},...this.q.w.map(t=>({t}))]);this.choices=ch.map(c=>c.t);this.ans=ch.findIndex(c=>c.ok);
    this.tried=new Set();this.phase='answer';this.proof=null;this.wrongPick=null;this.glowEv=false;this.done=false;this.hintLvl=0;this.reading=null;this.lock=false;
    this.useEv=!!this.q._ev&&this.q._ev.size>0;
  }
  start(){
    if(!this.ctx.readDone){
      this.phase='gate';
      if(this.listen&&TTS.ok){app.say(`Bolt will read <b>${esc(this.P.title)}</b> out loud. You won't see the words, so listen like a detective! Press <b>Play</b>.`,'happy')}
      else{
        const secs=Math.max(12,Math.min(55,Math.round(this.P._words*.22)));
        if(!this.ctx.gateEnd)this.ctx.gateEnd=Date.now()+secs*1000;
        this.ctx.gateSecs=secs;
        app.say(this.listen?`I can't read out loud on this device, so read it yourself one time. It will hide when the questions start!`:`Read the whole text carefully first. Detectives don't skip clues! Your questions unlock when the <b>reading fuel</b> is full.`,'think');
        setTimeout(()=>{if(mission&&mission.problem===this&&this.phase==='gate')renderWork()},Math.max(0,this.ctx.gateEnd-Date.now())+50);
      }
    }else this.ask();
  }
  ask(pre=''){this.phase='answer';app.say(pre+`<b>Question ${this.qi+1}:</b> ${esc(this.q.q)}`,pre?'cheer':'happy')}
  ready(){return this.listen&&TTS.ok?!!this.ctx.heard:Date.now()>=this.ctx.gateEnd}
  act(name,v){
    if(name==='ready'){if(!this.ready())return;this.ctx.readDone=true;TTS.stop();this.reading=null;this.ask('Great reading! ');return}
    if(name==='tts'){this.readAloud();return}
    if(name==='stop'){TTS.stop();this.reading=null;return}
    if(name==='play'){this.playAll();return}
    if(name==='replay'){this.replayEv();return}
    if(this.done)return false;
    if(name==='choose')return this.choose(+v);
    if(name==='sent')return this.sent(+v);
    return false;
  }
  readAloud(){
    const ids=this.P._sents.map((_,i)=>i),texts=this.P._sents.map(s=>s.replace(/^[A-Z][A-Z .]+:\s*/,m=>m.replace(':',' says,')));
    TTS.queue(texts,i=>{this.reading=ids[i];if(mission.problem===this)renderWork()},()=>{this.reading=null;if(mission.problem===this)renderWork()});
  }
  playAll(){
    this.playing=true;
    TTS.queue(this.P._sents.map(s=>s.replace(/\(([^)]*)\)/g,'').replace(/^([A-Z][A-Z .]+):\s*/,'$1 says, ')),null,()=>{this.playing=false;this.ctx.heard=true;if(mission.problem===this)renderWork()});
  }
  replayEv(){
    const ids=this.useEv?[...this.q._ev]:null;
    if(!ids||!TTS.ok){this.playAll();return}
    TTS.queue(ids.map(i=>this.P._sents[i]),null,null);
  }
  choose(k){
    if(this.lock||this.tried.has(k)||!['answer','answer2'].includes(this.phase))return false;
    if(k===this.ans){
      this.chosen=k;
      if(this.useEv&&!this.listen&&this.proof===null){this.phase='prove';app.say(app.praise()+`Now <b>prove it</b>: tap the sentence in the text that shows this is right.`,'cheer')}
      else this.finish();
      return;
    }
    this.tried.add(k);
    if(this.useEv&&!this.listen&&this.proof===null){
      this.phase='find';
      app.oops(`Detectives check the clues! Go back to the text and tap a sentence that helps answer the question.${this.q.clue?' <small>Clue: '+esc(this.q.clue)+'</small>':''}`);
    }else{
      app.oops(esc(this.q.clue||'Read the question again carefully, and think about the whole text.'));
      if(this.listen&&this.useEv&&TTS.ok){setTimeout(()=>this.replayEv(),700)}
      this.lock=true;setTimeout(()=>{this.lock=false;if(mission&&mission.problem===this)renderWork()},900);
    }
  }
  sent(id){
    if(this.listen||this.phase==='gate')return false;
    const isEv=this.useEv&&this.q._ev.has(id);
    if(this.phase==='prove'){
      if(isEv){this.proof=id;this.finish()}
      else{this.wrongPick=id;app.oops(`That sentence doesn't prove it. ${esc(this.q.clue||'Look for the words that match your answer.')}`)}
    }else if(this.phase==='find'){
      if(isEv){this.proof=id;this.wrongPick=null;this.phase='answer2';app.say(`Yes, that's the important part! Read it carefully, then pick a new answer.`,'cheer')}
      else{this.wrongPick=id;app.say(`Hmm, that sentence is about something else. ${esc(this.q.clue||'Keep looking.')}`,'think')}
    }
  }
  finish(){
    this.done=true;
    const proved=this.proof!==null?' You proved it with the text!':'';
    if(this.qi===this.P.qs.length-1)this.reveal=true;
    app.solved(esc(this.q.why||'')+proved);
  }
  hint(){
    if(this.phase==='gate')return this.listen?'Press Play and listen to the whole thing.':'Read every sentence, one at a time. If a word is tricky, read the sentence again.';
    const l=this.hintLvl++;
    if(l===0)return esc(this.q.clue||'Think about the whole text.');
    if(l===1&&this.useEv){if(this.listen){this.replayEv();return 'Listen to the important part again.'}this.glowEv=true;return 'Look at the glowing sentence. It has the answer.'}
    const wrong=this.choices.map((_,k)=>k).filter(k=>k!==this.ans&&!this.tried.has(k));
    if(wrong.length>1&&['answer','answer2'].includes(this.phase)){this.tried.add(pick(wrong));return 'I crossed out one choice that is not right.'}
    return esc(this.q.why?'Think about this: '+this.q.clue:'Read carefully.');
  }
  passageHtml(){
    const P=this.P,proving=['prove','find'].includes(this.phase);
    let h=`<div class="passage${proving?' prove':''}">`;
    if(TTS.ok&&!this.listen)h+=`<div class="read-tools"><button type="button" class="mini" data-act="${this.reading!==null?'stop':'tts'}">${this.reading!==null?'■ Stop reading':'🔊 Read it to me'}</button></div>`;
    h+=`<p class="kind">${{story:'Story',poem:'Poem',drama:'Play',info:'Nonfiction'}[P.type]}${P.by?' · '+esc(P.by):''}</p><h4>${esc(P.title)}</h4>`;
    P._parts.forEach(part=>{
      if(part.head)h+=`<p class="part-head">${esc(part.head)}</p>`;
      h+=`<div class="${P.type==='poem'?'poem':''}">`;
      part.paras.forEach(ids=>{
        h+='<p>'+ids.map(i=>{let c='';if(i===this.proof)c+=' proof';if(i===this.wrongPick)c+=' picked';if(this.glowEv&&this.useEv&&this.q._ev.has(i)&&this.proof===null)c+=' glowev';if(i===this.reading)c+=' reading';return sentHtml(P,i,c)}).join(P.type==='poem'?'<br>':' ')+'</p>';
      });
      h+='</div>';
      if(part.table){const t=part.table;h+=`<table class="tbl" style="margin:.4em 0 1em"><caption style="font-weight:700;padding:.3em;color:var(--paper-ink)">${esc(t.caption)}</caption><tr>${t.head.map(x=>`<th>${esc(x)}</th>`).join('')}</tr>${t.rows.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table>`}
    });
    return h+'</div>';
  }
  html(){
    const P=this.P;let left;
    const hideText=this.listen&&!this.reveal&&!(this.phase==='gate'&&!TTS.ok);
    if(hideText){
      left=`<div class="listen-card"><svg viewBox="0 0 60 70" width="70" height="80" aria-hidden="true"><use href="#bolt"/></svg><h4>${esc(P.title)}</h4><p>Listen closely. The words are hidden!</p><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button type="button" class="btn btn-hot" data-act="play">${this.playing?'Playing…':'▶ Play the whole thing'}</button>${this.ctx.heard&&this.useEv&&this.phase!=='gate'?'<button type="button" class="btn" data-act="replay">🔁 Replay the important part</button>':''}</div></div>`;
      // tables still need to be seen
      P._parts.forEach(pt=>{if(pt.table){const t=pt.table;left+=`<table class="tbl" style="margin-top:12px"><caption style="font-weight:700;padding:.3em;color:var(--paper-ink)">${esc(t.caption)}</caption><tr>${t.head.map(x=>`<th>${esc(x)}</th>`).join('')}</tr>${t.rows.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table>`}});
    }else left=this.passageHtml();
    let right='<div class="qcard">';
    if(this.phase==='gate'){
      const ok=this.ready();
      if(this.listen&&TTS.ok)right+=`<div class="gate"><b>Listen first</b><p style="margin:0">Press Play. Your questions unlock when Bolt finishes reading.</p><button type="button" class="btn btn-mint" data-act="ready"${ok?'':' disabled'}>${ok?'Show me the questions':'Listening…'}</button></div>`;
      else{
        const left_=Math.max(0,this.ctx.gateEnd-Date.now()),done=this.ctx.gateSecs*1000-left_;const pct=Math.min(100,100*done/(this.ctx.gateSecs*1000));
        right+=`<div class="gate"><b>Reading fuel</b><div class="fuelbar"><i style="width:${pct}%;${ok||reduceMotion?'':`animation:fill ${left_}ms linear forwards`}"></i></div><style>@keyframes fill{to{width:100%}}</style><p style="margin:0;font-size:.95rem">${ok?'Fuel full! Ready when you are.':'Read every sentence. Tricky word? Read that sentence again.'}</p><button type="button" class="btn btn-mint" data-act="ready"${ok?'':' disabled'}>${ok?'I read it. Show the questions!':'Reading…'}</button></div>`;
      }
    }else{
      right+=`<span class="qnum">Question ${this.qi+1} of ${P.qs.length}</span><span class="skill-chip">${esc(this.q.tag)}</span><div class="qq">${esc(this.q.q)}</div>`;
      if(this.phase==='prove')right+=`<div class="prove-box">Prove it! Tap the sentence in the text that shows your answer is right.</div>`;
      if(this.phase==='find')right+=`<div class="prove-box">Find the clue: tap a sentence in the text that helps answer the question.</div>`;
      const lockAll=this.lock||this.done||['prove','find'].includes(this.phase);
      right+=`<div class="choices${lockAll?' locked':''}" style="grid-template-columns:1fr">${this.choices.map((c,k)=>`<button type="button" class="choice${this.tried.has(k)?' no':''}${(this.done||this.phase==='prove')&&k===this.ans?' yes':''}" data-act="choose" data-v="${k}"${this.tried.has(k)?' disabled':''}><span class="ck">${k+1}</span><span>${esc(c)}</span></button>`).join('')}</div>`;
      if(this.done)right+=`<div class="after">${esc(this.q.why||'')}</div>`;
    }
    right+='</div>';
    return `<div class="reader">${left}${right}</div>`;
  }
  onDigit(d){if(['answer','answer2'].includes(this.phase)&&d>=1&&d<=this.choices.length){this.choose(d-1);return true}return false}
}

/* ---------------- missions ---------------- */
function readSetup(kind,listen){
  return (level,ctx)=>{
    const pool=PASSAGES.filter(p=>(kind==='any'||p.mission===kind)&&p.level===level&&!(listen&&p.parts.length>1));
    const lastKey='last_'+(listen?'listen':kind)+level;const last=progress[lastKey];
    const choices=pool.filter(p=>p.id!==last);const P=prepPassage(pick(choices.length?choices:pool));
    progress[lastKey]=P.id;save();
    ctx.P=P;ctx.listen=listen;ctx.readDone=false;
  };
}
const readManual=`<h3>Read like a detective</h3><ol><li>Read the WHOLE text first. Don't skip!</li><li>Read the question twice.</li><li>Go back to the text to find the answer.</li><li><b>Prove it:</b> tap the sentence that shows you're right.</li></ol><p>Rushing is how detectives miss clues. Slow is smooth, and smooth is fast.</p>`;
defMission({id:'story',zone:'words',sector:'rd',title:'Story Missions',sym:'📖',color:'#ff6fc0',std:['RL.1','RL.2','RL.3','RL.4','RL.5','RL.6','RL.9'],skill:'Stories, poems and plays: details, theme, characters, point of view',guide:'bolt',
  levels:['Stories and fables','First-person story or poem','Plays and comparing stories'],setup:readSetup('story',false),count:(l,ctx)=>ctx.P.qs.length,make:(l,i,ctx)=>new ReadQ(ctx.P,i,ctx),manual:readManual});
defMission({id:'facts',zone:'words',sector:'rd',title:'Fact Files',sym:'🔎',color:'#73c2ff',std:['RI.1','RI.2','RI.3','RI.4','RI.5','RI.6','RI.7','RI.8','RI.9'],skill:'Nonfiction: main idea, text structure, charts, reasons and evidence',guide:'bolt',
  levels:['Main idea and details','Cause, effect and charts','Comparing accounts and opinions'],setup:readSetup('facts',false),count:(l,ctx)=>ctx.P.qs.length,make:(l,i,ctx)=>new ReadQ(ctx.P,i,ctx),manual:readManual});
defMission({id:'listen',zone:'words',sector:'rd',title:'Listening Lab',sym:'🎧',color:'#3fdcb4',std:['SL.2','SL.3','RL.7'],skill:'Listen to a text read aloud, then answer without seeing it',guide:'bolt',
  levels:['Short texts','Longer texts','Plays and opinions'],setup:readSetup('any',true),count:(l,ctx)=>ctx.P.qs.length,make:(l,i,ctx)=>new ReadQ(ctx.P,i,ctx),
  manual:`<h3>Listening like a pro</h3><ol><li>Get comfy and look at Bolt, not around the room.</li><li>Make a picture in your mind as you listen.</li><li>Listen for who, what, where, and why.</li><li>Missed something? Use the Replay button.</li></ol><p>At the end of the mission, you'll get to see the words.</p>`});
