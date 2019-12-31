//Also, potential >Leave option at any point in the game, again, this lets you exit at any point. -- 'You get bored and go home.' 

const storyArray =
{
    storyNodes: [
        {
            name: "startScreen",
            content: `You wake up on a hard stone floor. 
    Your head hurts, and you don't remember how you got here. 
    A smoldering torch is the only source of light. As you scan the room, you can see nothing but the outline of a large wooden door on the opposite side of the chamber.`
        },
        {
            name: "firstScreen",
            content: `The door is heavy. But you manage to push it open. You walk into the next room, and before you are 3 different pathways.
    There are no markings or signs to direct you. You begin to feel cold, and you could swear you hear the faint sound of footsteps coming 
    from one of the passages before you.`
        },
        {
            name: "secondScreen",
            content: `The path you've set out on is winding and long. Your mind begins to wander. You try to remember anything that's happened before right now,
    but you cannot. You need to stop drinking. You continue, and find a club on the ground. "This will be good for hitting," you think. You come to 
    another door at a dead end. You reach for the handle but hear noise on the other side. Faint rattling.`
        },
        {
            name: "thirdScreen",
            content: `This room is more well lit. You can see a dark figure in the corner. You approach and ask for help.
    The figure turns. It is not a man. It is a ${monster}. It is Angry..`,
            choices: [`>Fight`, `>Run`]
        },
        {
            name: "fourthScreen",
            content: `The body of your foe lies before you. Bloodied and bruised, you look down and see a small satchel. You open it to reveal a small scroll. The scroll reads as follows: "You are in grave danger. 
    Do not be quick to trust anything. Also, I would appreciate it if you could kill the nobleman who lives in the top tower of the castle you're in."
    "....Sounds fair", you think to yourself. 
    You pocket the scroll, and open the door before you.
    In the next room you see a staircase leading upwards. You hear the sounds of laughter and shouting from above you. You appear to be in the kitchen of a Greathall. A cook spots you.
    "Oi! What are you doing in 'ere!"`,
            choices: [`>Run up the stairs`, `>Fight the Cook`],
            deathText: `You run up the stairs hurriedly into the Greathall. Dozens of revelers immediately recognize you as the guy that just escaped the basement. They hit you forcefully. You are dead. GAME OVER.`
        },
        {
            name: "fifthScreen",
            content: `The cook doesn't look like much of a fighter. You whack him firmly with your beating stick and he falls to the floor. Dead. You put on his clothes, grab a tray of pasties, and ascend the stairs.
    The Greathall is filled with drunkards and veterans. Telling tales of battles won and lost, and adventures beyond imagining. You chuckle and hand out pasties. The patrons offer you drinks.`,
            choices: [`>Drink with them`, `>Say you're in recovery`],
            deathText: `You tell them you're flattered, but trying to stay on the straight and narrow. They call your neck narrow, and string you up by it. You Are Dead. GAME OVER.`
        },
        {
            name: "sixthScreen",
            content: `You drink considerably. Your constitution is surely tested. You don't know anything about what's going on but you're having fun. The patrons find it amusing that the cook is throwing up on the Greathall table.
    You excuse yourself to use the restroom. Once finished, you're accosted by one of the drinking men. "Did you wash your hands in there?"`,
            choices: [`>Of course I did!`, `>What am I? A woman?`],
            deathText: `The man stops smiling. "Are you accusing me of something?!" You try to explain, but he is already stabbing you. You are dead. GAME OVER.`
        },
        {
            name: "seventhScreen",
            content: `The man roars with laughter! "There's a good lad!" He saunters off. You run the other way, and find yourself in the barracks. You peruse the selection of armor and weapons until a guard stops you.
    "What's a lowly cook doing up here with real men? We don't fight with baguettes!" he laughs. He is a military man. So you're sure he isn't intelligent.`,
            choices: [`>I just want to be big and strong like you`, `>Just came up to see where the swine live`],
            deathText: `The guard is noticably upset for some reason. Perhaps he believes you meant to insult him. Regardless, he throws you from the barracks window.
    You are impaled on a lawn gnome. You are dead. GAME OVER.`
        },
        {
            name: "eighthScreen",
            content: `The guard is stunned by your answer. He is silent, and then tears begin to well in his eyes. He opens his mouth as if ready to sob.
    He instead tilts his head back and laughs loudly. "I guess you aren't all little girls in that kitchen after all!" He leaves the room laughing.
    You grab a sword and a set of armor. You exit the room and hear screams from down the hall.`,
            choices: [`>Investigate`, `>Investigate`]
        },
        {
            name: "ninthScreen",
            content: `You decide to investigate. Dozens of men in pointy hats and long robes are running from a room, presumably the Wizards' Quarters. "Dear God what have we done!" one of them shouts.
    "I've never seen a resonance cascade!" says another. You enter the room to see a giant glowing portal, in front of which stands a ${monster}.`,
            choices: [`>Fight`, `>Run`]
        },
        {
            name: "tenthScreen",
            content: `Again you've somehow managed to best your opponent, but the portal isn't shutting. You exit the room. "It'll sort itself out." And head toward the Noble's Tower.
    You push open the door and find yourself in a grand foyer. It's decorated in gold and ivory and rubies.... and blood.... and fire..... Apparently this keep you're in has seen better days.
    "HELP! HELP PLEASE!" Servants and innocents alike scream in unison. A ${monster} is not following party ettiquette very well. Must've come out of that portal too.`,
            choices: [`>Fight`, `>Run`]
        },
        {
            name: "eleventhScreen",
            content: `You seem to have a knack for this. The ${monster} falls before your martial prowess. The servants and innocents are thankful, but you have no time to waste. You need to reach the top
    of the tower, and kill the Nobleman like the tiny scroll told you to. You stumble up a seemingly endless amount of stairs. You run out of breath. "Damn nobles and their ivory towers."
    You reach a chamber at the top of the tower and kick in the door. A frail old man waits inside. "Are you the noble?" you ask. "Yes. Who are you?" he retorts. "I don't know." you reply.`,
            choices: [`>Kill the old man`, `>Kill the old man harder`]
        },
        {
            name: "endScreen",
            content: `You've done it!... sort of. The Nobleman is breathing his dying breath. "Why? Why have you come here to kill me?" --------- "Because I was told to." you respond. 
    "By whom?!" he retorts. You think for a moment, and consider your actions up to this point. You open your mouth to speak, and then think some more. You have no real answer.
    "BY WHOM?!" he asks again. ".......yes" is your only response. The Nobleman rolls his eyes. You stab him until he stops being judgmental.
    You drop your sword. Exhausted. You wander back down to the Greathall, castle still aflame from the portal mischief. You sit at the Greathall table,
    watching people scramble to contain the havoc while you down the remnants of unfinished drinks. Seemingly hours go by, and in a daze you manage to stagger out of the castle and into a grassy clearing.
    You lie down and murmer to yourself about sorting all of this nonsense out in the morning. You can no longer keep your eyes open and you drift off to sleep...
    
    You wake up on a hard stone floor.`
        }],

    runFromCombatOptions: [
        "You attempt to flee. You have died of dysentery.",
        "You scramble to get away, and in doing so trip and hit your head on the wall. Hard. You are dead.",
        "You try to leave, but it's dark and you're panicking. You accidentally run into the monster. Unfortunate. You have died.",
        "You try to get out, but from behind, you can begin to hear the monster weep. 'Why do they always leave?' he sobs. You sit down to comfort him. Thoughtful. You have died.",
        "You turn to run, but twist your ankle in the process. You cry for help, but alas, the monster is not a medical professional. You are dead."
    ]
};
