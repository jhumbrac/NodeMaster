$(document).ready(function () {
  let barbarians =[
    {
    attack_name:"Controlled Swing",
    attack_bonus: 4,
    damage_dice:"2d6",
    damage_bonus: 0
  },
  {
    attack_name:"Wild Swing",
    attack_bonus: 0,
    damage_dice:"2d8",
    damage_bonus: 6
  }];
let rogues = [
  {
    attack_name:"Imbrocatta",
    attack_bonus: 8,
    damage_dice:"1d8",
    damage_bonus: 0
  },
  {
    attack_name:"Back Stab",
    attack_bonus: -4,
    damage_dice:"4d8",
    damage_bonus: 10
  }
];
let wizards = [
  {
    attack_name:"Magic Missle",
    attack_bonus: 2,
    damage_dice:"3d4",
    damage_bonus: 3

  },
  {
    attack_name:"Fireball",
    attack_bonus: 0,
    damage_dice:"4d6",
    damage_bonus: 0
  }
];
   const look = [
    "placeholder",
    "As you scan the room, you can barely make out the outline of a large wooden door on the opposite side of the chamber.",

    "The body of your foe lies before you. Bloodied and bruised, you look down and reflect on your own mortality.",

    "There is blood everywhere. The fresh blood on the floor belongs to your vanquished foe, but there is dried blood on the wall. Who or what bled here before you?",
 
    "As you look around in the new room your mind begins to wander. You try to remember anything that's happened before right now, but you cannot. You need to stop drinking.",

    "You see another door before you. Of course...",

    "You look around but cannot see the source of the voice. Maybe you imagined it."
  ];
  const rooms = [
    "You wake up on a hard stone floor. Your head hurts, and you don't remember how you got here. A smoldering torch is the only source of light.",

    "Where the hell did that come from? You need to be more careful.",

    "Another room, another monster. What is this place?",

    "You come to another door at a dead end. As you approach you hear faint rustling on the other side. Here we go again you think to yourself.",

    "'Where am I?' you wonder. Why is there always a door, and why is there always a monster on the other side?",

    "You hear a soft voice whisper in your ear - 'Win and you will be rewarded with riches beyond your wildest dreams. Lose and die."
  ];
  const credits = `<h2>CREDITS</h2>
  
  <h3 class="credit-titles">GAME DIRECTOR</h3>
  <p class="credit-names">Zack White</p>

  <h3 class="credit-titles">PROJECT MANAGER</h3>
  <p class="credit-names">Zack White</p>

  <h3 class="credit-titles">SCRIPT DIRECTOR</h3>
  <p class="credit-names">Zack White</p>

  <h3 class="credit-titles">TALENT DIRECTOR</h3>
  <p class="credit-names">Zack White</p>

  <h3 class="credit-titles">ADDITIONAL HELP FROM</h3>
  <p class="credit-names">Michael Robil</p>
  <p class="credit-names">John Humbracht</p>
  <p class="credit-names">Austin Williams</p>

  <h3 class="credit-titles">LEAD ARTIST</h3>
  <p class="credit-names">Alek</p>

  <h3 class="credit-titles">JUNIOR ARTIST</h3>
  <p class="credit-names">Alek</p>

  <h3 class="credit-titles">LEAD LIGHTING ARTIST</h3>
  <p class="credit-names">Devin Mccracken</p>

  <h3 class="credit-titles">RECORDING ENGINEER</h3>
  <p class="credit-names">Bill Olberson</p>

  <h3 class="credit-titles">HUMAN RESOURCES ADMINISTRATOR</h3>
  <p class="credit-names">Sierra Cunnigham</p>

  <h3 class="credit-titles">FINANCE COORDINATOR</h3>
  <p class="credit-names">Howard Phillips</p>

  <h3 class="credit-titles">INTERNATION TRANSLATION DIRECTOR</h3>
  <p class="credit-names">Todd Davis</p>

  <h3 class="credit-titles">IT MANAGER</h3>
  <p class="credit-names">Randy Mitchell</p>

  <h3 class="credit-titles">ANIMAL HANDLER</h3>
  <p class="credit-names">Anne Belton</p>

  <h3 class="credit-titles">CATERING COORDINATOR</h3>
  <p class="credit-names">Rick Meyers</p>

  <h3 class="credit-titles">NIGHT FILMING COORDINATOR</h3>
  <p class="credit-names">Mike Henson</p>

  <h3 class="credit-titles">着 期 勝 開 階</h3>
  <p class="credit-names">Takeo Watanabe</p>

  <h3 class="credit-titles">QA MANAGER</h3>
  <p class="credit-names">Wataru Takahashi</p>

  <h3 class="credit-titles">PLAYTESTERS</h3>
  <p class="credit-names">Stephen Pulk</p>
  <p class="credit-names">Rick Gamble</p>
  <p class="credit-names">Michael Black</p>

  <h3 class="credit-titles">DOMESTIC DISPUTE HANDLER</h3>
  <p class="credit-names">Christine Harmon</p>

  <h3 class="credit-titles">ON SCENE MEDIC</h3>
  <p class="credit-names">Hank Miller</p>

  <h3 class="credit-titles">LOCATION SCOUTING</h3>
  <p class="credit-names">Kevin Hooper</p>

  <h3 class="credit-titles">RESIDENT PSYCHOLOGIST</h3>
  <p class="credit-names">Charles Winston</p>

  <h3 class="credit-titles">ARMCHAIR HISTORIAN</h3>
  <p class="credit-names">Adam Goldberg</p>

  <h3 class="credit-titles">REAL HISTORIAN</h3>
  <p class="credit-names">Katie Greene</p>

  <h3 class="credit-titles">KEG STAND OPERATOR</h3>
  <p class="credit-names">Martin Rich</p>

  <h3 class="credit-titles">CREDITS</h3>
  <p class="credit-names">Zack White</p>

  <h3 class="credit-titles">MADE WITH AN UNREAL ENGINE</h3>

  <h3 class="credit-titles">BUS RENTAL PROVIDED BY</h3>

  <h3 class="credit-titles">SPECIAL THANKS</h3>
  <p class="credit-names">Stephen Johnson School for the Blind</p>
  <p class="credit-names">Connor Stone Foundation</p>
  <p class="credit-names">Mark Hamilton</p>
  <p class="credit-names">Eric Chunn</p>
  <p class="credit-names">Chris Scott</p>
  <p class="credit-names">Viewers Like You</p>




  <h3 class="credit-titles">Produced By Nakamura Gaming International LLC.</h3>
  <p class="credit-names">©1997-2019</p>

<p id="newGame">New Game</p>`;

  let enemy = {};
  let player = {};
  let attacker = player;
  let defender = enemy;
  let save = false;
  let opponent; // don't remember what I was thinking here?
  let modifier = 0;
  let tempDice = '1d8';
  let roll = 0;
  let attack_type;

  // battle command variables
  let m = 0;
  let msg = rooms[m];
  let lookAround = look[m];
  let options = `<label>
  <input id="lookAround" type="radio" class="nes-radio" name="answer" checked />
  <span>Look Around</span>
  </label>
  <label>
  <input id="openDoor" type="radio" class="nes-radio" name="answer"/>
  <span>Open Door</span>
  </label>`;
  let fight = `<label>
    <input id="fight" type="radio" class="nes-radio" name="answer" checked />
    <span>Fight</span>
    </label>
    <label>
    <input id="run" type="radio" class="nes-radio" name="answer"/>
    <span>Run</span>
    </label>`;
  let titleScore = $('#titleScore');
  let roomScore = $('#roomScore');
  let battleScore = $('#battleScore');

  let critSound = $('#critSound');
  let hitSound = $('#hitSound');
  let missSound = $('#missSound');
  // let randomMonster = Math.floor(Math.random() * 325);
  function text(msg) {
    let textMsg = $(`<p>${msg}</p>`);
    return textMsg;
  }
  function randomBg() {
    let k = rollDice('1d5');
    $('#roomDisplay').attr('class', `room${k}`);
  }
  function rollDice(dice) {
    const regexp = /(?<num>[0-9])(?:d)(?<sided>[0-9]*)/;
    let { groups: { num, sided } } = regexp.exec(dice);
    num = parseInt(num);
    sided = parseInt(sided);
    roll = 0;
    for (let i = 0; i < num; i++) {
      roll += Math.floor((Math.random() * sided) + 1);
    }
    return roll;
  };
  function savingThrow(dice, save) {  //need to test this
    rollDice(dice);
    if (roll >= save) {
      return save = true;
    } else {
      return save = false;
    }
  };
  function isAlive(opponent) {
    if (opponent.hp > 0) {
      //console.log(`${opponent.name}'s hp: ${opponent.hp}`);
    } else {
      if (opponent === player) {
        //console.log(`${player.name} has been slain`);
        endGameDeath();
      }
      else {
        // console.log(`${enemy.name} has been slain`);
        let heroXp = $('#heroXp').attr('value');
        player.xp += enemy.maxHp;
        $('#heroXp').attr('value', player.xp);
        endBattle();
      }
    }
  };
  function rollToHit(opponent, attack_type) {  // DAMAGE IS HAPPENING BACKWARDS?
    let attack_name;
    let attack_bonus;
    let damage_dice;
    let damage_bonus;
    if (opponent.name === player.name) {
      attack_name = opponent[attack_type].attack_name;
      attack_bonus = opponent[attack_type].attack_bonus;
      damage_dice = opponent[attack_type].damage_dice;
      damage_bonus = opponent[attack_type].damage_bonus;
    } else {
      attack_name = opponent.attack_name;
      attack_bonus = opponent.attack_bonus;
      damage_dice = opponent.damage_dice;
      damage_bonus = opponent.damage_bonus;
    }
    console.log(`opp is ${opponent.name}. Att_name: ${attack_name}, Bonus: ${attack_bonus}, Dice: ${damage_dice}, Dmg Bonus: ${damage_bonus}`);
    rollDice('1d20');
    if (roll === 20) {
      rollDice(damage_dice);
      opponent.hp -= ((roll + damage_bonus) * 2);
      console.log(`opp is ${opponent.name}. Att_name: ${attack_name}, Bonus: ${attack_bonus}, Dice: ${damage_dice}, Dmg Bonus: ${damage_bonus}, Roll: ${roll}, ${((roll + damage_bonus) * 2)}`);

      critSound[0].play();
      if (opponent.name === player.name) {
        $('.charInfo').prepend($(`<p class="damage"><span>${(roll * 2)}</span></p>`).fadeOut(2000, function() {
          $(this).remove();
        }));
      } else {
        $('.monster').prepend($(`<p class="damage"><span>${(roll * 2)}</span></p>`).fadeOut(2000, function() {
          $(this).remove();
        }));
      }
      isAlive(opponent);
      console.log(`${opponent.name} was critically hit for ${(roll * 2)}`);
    } else if ((roll + attack_bonus) >= opponent.ac) {
      console.log(`${opponent.name} ToHit: ${roll + attack_bonus}, roll: ${roll}, bonus: ${attack_bonus}`);
      rollDice(damage_dice);
      opponent.hp -= (roll + damage_bonus);
      console.log(`opp is ${opponent.name}. Att_name: ${attack_name}, Bonus: ${attack_bonus}, Dice: ${damage_dice}, Dmg Bonus: ${damage_bonus}, Roll: ${roll}, ${(roll + damage_bonus)}`);

      hitSound[0].play();
      if (opponent.name === player.name) {
        $('.charInfo').prepend($(`<p class="damage"><span>${roll}</span></p>`).fadeOut(2000, function() {
          $(this).remove();
        }));
      } else {
        $('.monster').prepend($(`<p class="damage"><span>${roll}</span></p>`).fadeOut(2000, function() { 
          $(this).remove();
        }));
      }
      isAlive(opponent);
      console.log(`${opponent.name} was hit for ${roll}`);
    } else {
      console.log(`${opponent.name} ToHit: ${roll + attack_bonus}, roll: ${roll}, bonus: ${attack_bonus}`);
      missSound[0].play();
      if (opponent.name === player.name) {
        $('.charInfo').prepend($(`<p class="damage"><span>MISS</span></p>`).fadeOut(2000, function() {
          $(this).remove();
        }));
      } else {
        $('.monster').prepend($(`<p class="damage"><span>MISS</span></p>`).fadeOut(2000, function() {
          $(this).remove();
        }));
      }
      console.log(`miss`)
    }
    if (opponent.name === player.name) {
      //console.log('player hp ', opponent.hp);
      $('#heroHp').attr('value', opponent.hp);
      if ((parseInt($('#heroHp').attr('value')) / parseInt($('#heroHp').attr('max'))) < .33) {
        $('#heroHp').attr('class', "nes-progress is-error");
      } else if ((parseInt($('#heroHp').attr('value')) / parseInt($('#heroHp').attr('max'))) < .66) {
        $('#heroHp').attr('class', "nes-progress is-warning");
      }
    } else {
      //console.log('monster hp ', opponent.hp);
      $('#monsterHp').attr('value', opponent.hp).attr('max', opponent.maxHp);
      if ((parseInt($('#monsterHp').attr('value')) / parseInt($('#monsterHp').attr('max'))) < .33) {
        $('#monsterHp').attr('class', "nes-progress is-error");
      } else if ((parseInt($('#monsterHp').attr('value')) / parseInt($('#monsterHp').attr('max'))) < .66) {
        $('#monsterHp').attr('class', "nes-progress is-warning");
      }
    }

  };
  function initiative() {
    if (player.dex > enemy.dex) {
      attacker = player;
      defender = enemy;
    } else {
      attacker = enemy;
      defender = player;
    }
  };
  function attack(player, enemy, attack_type) {
    initiative();
    setTimeout(() => {
      rollToHit(defender, attack_type);
    }, 300);
    setTimeout(() => {
      rollToHit(attacker, attack_type);
    }, 850);
    
  };
  function newRoom(msg) {
    $('#textBlock').html('');
    $('#textBlock').append($(`<p>${msg}</p>`));
    $('#textBlock').append(options);
    return m++;
  };
  function startBattle() {
    let fightMsg = 'You circle your opponent looking for any weaknesses.'; // randomly have messages that describe the action - things like 'you circle the enemy looking for an opportunity'
    let battle = `<label>
  <input id="att1" type="radio" class="nes-radio" name="answer" checked />
  <span>${player.att1.attack_name}</span>
  </label>
  <label>
  <input id="att2" type="radio" class="nes-radio" name="answer" />
  <span>${player.att2.attack_name}</span>
  </label>`;
    $('#textBlock').html('');
    // $('#textBlock').append(text(fightMsg)).append(fight);
    $('#textBlock').append(text(fightMsg)).append(battle);
  };
  function endBattle() {
    battleScore[0].pause();
    roomScore[0].play();
    let monster = $('.monster');
    monster.fadeOut(2000, () => {
      newRoom(rooms[m]);
    });

  };
  function endGameWin() {
    battleScore[0].pause();
    titleScore[0].play();
    $('#game').html('');
    $('#game').attr('class', 'escape').append($(`<div class="credits">
    <h1>You are victorious!</h1>
    <p class="ending">You walk out of the arena covered in the blood of your foes and tormented by their dying screams. What was the point of this?</p>
    ${credits}
    </div>`));
    setTimeout(() => {
      $('.credits').addClass('scroll');
    }, 6000);
  };
  function endGameEscape() {
    battleScore[0].pause();
    titleScore[0].play();
    $('#game').html('');
    $('#game').attr('class', 'escape').append($(`<div class="credits">
    <h1>You run away</h1>
    <p class="ending">Some people will call you a coward, but at least you were able to walk away... Coward</p>
    ${credits}
    </div>`));
    setTimeout(() => {
      $('.credits').addClass('scroll');
    }, 6000);
  };
  function endGameDeath() {
    battleScore[0].pause();
    titleScore[0].play();
    $('#game').html('');
    $('#game').attr('class', 'dead').append($(`<div class="credits">
    <h1>You have died</h1>
    <p class="ending">People will say you died valliantly, but what do you care? You're dead.</p>
    ${credits}
    </div>`));
    setTimeout(() => {
      $('.credits').addClass('scroll');
    }, 7000);
  };
  function encounter() {
    let randomMonster = rollDice('1d80');
    $.ajax("/monsters", {
      type: "GET",
    }).then(function (monsters) {
      // For future development
      var tinyMonsters = monsters.filter(o => o.size === "Tiny");
      var smallMonsters = monsters.filter(o => o.size === "Small");
      var mediumMonsters = monsters.filter(o => o.size === "Medium");
      var largeMonsters = monsters.filter(o => o.size === "Large");
      var hugeMonsters = monsters.filter(o => o.size === "Huge");

      let selectedOne = monsters[randomMonster]
      //console.log("Monster size:  " + selectedOne.size);
      let actionName = selectedOne.actions[0].name;
      let attackBonus = selectedOne.actions[0].attack_bonus;
      let damageDice = selectedOne.actions[0].damage[0].damage_dice;
      let damageBonus = selectedOne.actions[0].damage[0].damage_bonus; 
      //console.log("Monster Attack: "+actionName,attackBonus,damageDice,damageBonus);
      enemy = {
        name: selectedOne.name,
        str: selectedOne.strength,
        dex: selectedOne.dexterity,
        con: selectedOne.constitution,
        int: selectedOne.intelligence,
        wis: selectedOne.wisdom,
        chs: selectedOne.charisma,
        hp: selectedOne.hit_points,
        maxHp: selectedOne.hit_points,
        ac: selectedOne.armor_class,
        //img: `../img/${res.type}.png`
        img: `../img/monsters/${selectedOne.name}.png`,
        attack_name:actionName,
        attack_bonus: attackBonus,
        damage_dice:damageDice,
        damage_bonus:damageBonus
      };
      //console.log("Monster Attack: "+enemy.attack_name,enemy.attack_bonus,enemy.damage_dice,enemy.damage_bonus);

      console.log("The Monster is " + JSON.stringify(enemy));
      msg = `The ${enemy.name} is upon you, prepare for battle!`;
      let $monster = `<div class="monster">
      <img src="${enemy.img}" alt="${enemy.name} image">
      <div class="monsterStats">
        <h2>${enemy.name}</h2>
        <p>HP: <progress id="monsterHp" value="${enemy.hp}" max="${enemy.hp}" class="nes-progress is-success"></p>
      </div>`;
      $('#textBlock').html('');
      $('#roomDisplay').append($monster);
      $('#textBlock').append(text(msg));
      $('#textBlock').append(fight);
      battleScore[0].play();
      return enemy;
    });
  };
  $(document).on('click', '#fight', event => {
    event.preventDefault();
    startBattle();
  });
  $(document).on('click', '#run', event => {
    event.preventDefault();
    endGameEscape();
  });
  $(document).on('click', '#att1', event => {
    attack_type = 'att1';
    event.preventDefault();
    attack(player, enemy, attack_type);
  });
  $(document).on('click', '#att2', event => {
    attack_type = 'att2';
    event.preventDefault();
    attack(player, enemy, attack_type);
  });
  $(document).on('click', '#newGame', event => {
    event.preventDefault();
    window.location.replace('/');
  });
  $(document).on("keydown", event => {
    if (event.which == 13) // enter key
      $('body').addClass('charSelect');
  });
  $(document).on('click', '.selectChar', function(event) {
    var id = $(this).data("id");
    $.ajax("/character/" + id, {
      type: "GET",
    }).then((res) => {
      window.location.replace('game');
    });
  });
  $(document).on('click', '#lookAround', event => {
    $('#textBlock').html('');
    $('#textBlock').append(text(look[m])).append(options);
  });
  $(document).on('click', '#openDoor', event => {
    roomScore[0].pause();
    randomBg();
    encounter();
  });
  $.ajax("/api/selectedChar", {
    type: "GET"
  }).then(res => {
    player = {
      name: res.name,
      str: res.str,
      dex: res.dex,
      con: res.con,
      int: res.int,
      wis: res.wis,
      chs: res.chs,
      hp: res.hp,
      ac: res.ac,
      img: "../img/jpeg",
      lvl: res.lvl,
      xp: 10,
    }
    switch ( res.class ){
      case 'barbarian':
        player.att1 = barbarians[0];
        player.att2 = barbarians[1];
        break;
      case 'rogue':
          player.att1 = rogues[0];
          player.att2 = rogues[1];
         break;
      case 'wizard':
          player.att1 = wizards[0];
          player.att2 = wizards[1];
        break;
  
      default:
        console.log('failed');
        break;
    }
    return player;
  });

  newRoom(msg);
});


//saving throw
