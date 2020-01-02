$(document).ready(function () {
  const look = [
    "As you scan the room, you can barely makeout the outline of a large wooden door on the opposite side of the chamber.",

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


  let enemy = {};
  let player = {};
  let attacker = player;
  let defender = enemy;
  let save = false;
  let opponent; // don't remember what I was thinking here?
  let modifier = 0;
  let tempDice = '1d8';
  let roll = 0;


  // battle command variables
  let m = 0;
  let msg = rooms[m];
  let lookAround = look[m];
  let options = `<label>
  <input id="lookAround" type="radio" class="nes-radio" name="answer" checked />
  <span>Look Around</span>
  </label>
  <label>
  <input id="openDoor" type="radio" class="nes-radio" name="answer" checked />
  <span>Open Door</span>
  </label>`;
  let fight = `<label>
    <input id="fight" type="radio" class="nes-radio" name="answer" checked />
    <span>Fight</span>
    </label>
    <label>
    <input id="run" type="radio" class="nes-radio" name="answer" checked />
    <span>Run</span>
    </label>`;
  let roomScore = $('#roomScore');
  let battleScore = $('#battleScore');
  // let randomMonster = Math.floor(Math.random() * 325);
  function text(msg) {
    return $(`<p>${msg}</p>`);
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
      console.log(`${opponent.name}'s hp: ${opponent.hp}`);
    } else {
      if (opponent === player) {
        console.log(`${player.name} has been slain`);
        endGame();
      }
      else {
        console.log(`${enemy.name} has been slain`);
        endBattle();
      }
    }
  };
  function rollToHit(opponent) {
    rollDice('1d20');
    if (roll === 20) {
      rollDice(tempDice);
      opponent.hp -= (roll * 2);
      isAlive(opponent);
      console.log(`${opponent.name} was critically hit for ${(roll * 2)}`);
    } else if ((roll - modifier) >= opponent.ac) {
      rollDice(tempDice);
      opponent.hp -= roll;
      isAlive(opponent);
      console.log(`${opponent.name} was hit for ${roll}`);
    } else {
      console.log(`miss`)
    }
    if (opponent.name === player.name) {
      $('#heroHp').attr('value', opponent.hp);
      if ((parseInt($('#heroHp').attr('value')) / parseInt($('#heroHp').attr('max'))) < .25) {
        $('#heroHp').attr('class', "nes-progress is-error");
      }
    } else {
      $('#monsterHp').attr('value', opponent.hp).attr('max', opponent.maxHp);
      if ((parseInt($('#monsterHp').attr('value')) / parseInt($('#monsterHp').attr('max'))) < .25) {
        $('#monsterHp').attr('class', "nes-progress is-error");
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
  function attack(player, enemy) {
    initiative();
    rollToHit(defender);
    rollToHit(attacker);
  };
  function newRoom(msg) {
    $('#textBlock').html('');
    $('#textBlock').append(text(msg)).append(options);
    return m++;
  };
  function startBattle() {
    // msg = `The ${enemy.name} is upon you, prepare for battle!`;
    msg = 'What do you want to do?'; // randomly have messages that describe the action - things like 'you circle the enemy looking for an opportunity' 
    $('#textBlock').html('');
    $('#textBlock').append(text(msg)).append(fight);
  };
  function endBattle() {
    battleScore[0].pause();
    roomScore[0].play();
    let monster = $('.monster');
    monster.fadeOut('slow');
    $('#roomDisplay').html('');
    newRoom(msg);
  }
  function endGame() {
    $('#game').html('');
    $('#game').attr('class', 'dead').append($('<h1>You have died</h1>'));
  };
  function encounter() {
    let randomMonster = rollDice('1d322');
    console.log(randomMonster);
    $.ajax("/monsters", {
      type: "GET",
    }).then(function (res) {
      // console.log(res[1]);
      let selectedOne = res[randomMonster]
      console.log(selectedOne)
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
        img: `../img/monsters/orc.png`
      };
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
      $('#textBlock').append(text(msg)).append(fight);
      battleScore[0].play();
      return enemy;
    });
  };
  $(document).on('click', '#fight', event => {
    event.preventDefault();
    attack(player, enemy);
    // $('#textBlock').append(`<p>${player.name}</p><p>${enemy.name} was hit for</p>`); need to display results of battle
    startBattle();
  });
  $(document).on('click', '#run', event => {
    event.preventDefault();
    endGame();
  })
  $(document).on("keydown", event => {
    if (event.which == 13) // enter key
      $('body').addClass('charSelect');
  });
  $(document).on('click', '.selectChar', event => {
    var id = $(this).data("id");
    console.log(id);
    $.ajax("/character/" + id, {
      type: "GET",
    }).then((res) => {
      window.location.replace('game.html');
    });
  });
  $(document).on('click', '#lookAround', event => {
    $('#textBlock').html('');
    $('#textBlock').append(text(lookAround)).append(options);
  });
  $(document).on('click', '#openDoor', event => {
    roomScore[0].pause();
    randomBg();
    encounter();
  });
  $.ajax("/api/selectedChar", {
    type: "GET"
  }).then(res => {
    console.log(res)
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
      img: "../img/jpeg"
    }
    console.log(player);
    return player;
  });

  newRoom(msg);
});


//saving throw
