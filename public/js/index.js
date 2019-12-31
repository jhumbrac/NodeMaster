$(document).ready(function () {
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
  let msg;
  let options;
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
  let randomMonster = Math.floor(Math.random() * 325);
  function fightMsg(msg) {
    return $(`<p>${msg}</p>`);
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
  function endBattle() {
    console.log('monster has been defeated');
  }
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
  function emptyRoom() {
    msg = "You find yourself in an empty room. You can't remember how you got here, and you have no idea where 'here' is.";
    options = `<label>
    <input id="lookAround" type="radio" class="nes-radio" name="answer" checked />
    <span>Look Around</span>
    </label>
    <label>
    <input id="openDoor" type="radio" class="nes-radio" name="answer" checked />
    <span>Open Door</span>
    </label>`;
    $('#textBlock').html('');
    $('#textBlock').append(fightMsg(msg)).append(options);
  };
  emptyRoom();
  function startBattle() {
    // msg = `The ${enemy.name} is upon you, prepare for battle!`;
    msg = 'What do you want to do?'; // randomly have messages that describe the action - things like 'you circle the enemy looking for an opportunity' 
    $('#textBlock').html('');
    $('#textBlock').append(fightMsg(msg)).append(fight);
  };
  function endGame() {
    msg = `You flee the battle. You are a coward`;
    $('#textBlock').html(fightMsg(msg));
    $('#game').html('');
    $('#game').attr('class', 'dead').append($('<h1>You have died</h1>'));
  };
  function encounter() {
    $.ajax({
      url: "http://www.dnd5eapi.co/api/monsters/" + randomMonster,
      method: "GET"
    }).then(function (res) {
      enemy = {
        name: res.name,
        str: res.strength,
        dex: res.dexterity,
        con: res.constitution,
        int: res.intelligence,
        wis: res.wisdom,
        chs: res.charisma,
        hp: res.hit_points,
        maxHp: res.hit_points,
        ac: res.armor_class,
        //img: `../img/${res.type}.png`
        img: `../img/orc.png`
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
      $('#textBlock').append(fightMsg(msg)).append(fight);
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
  $(document).on('click', '.selectChar', function (event) {
    var id = $(this).data("id");
    console.log(id);
    $.ajax("/character/" + id, {
      type: "GET",
    }).then((res) => {
      window.location.replace('game.html');
    });
  });
  $(document).on('click', '#lookAround', event=>{
    msg = 'You find yourself in an empty room. Who lit these torches you wonder?';
    $('#textBlock').html('');
    $('#textBlock').append(fightMsg(msg));
    emptyRoom();
  });
  $(document).on('click', '#openDoor', event=>{
    roomScore[0].pause();
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
      img: "../img/jpeg"
    }
    console.log(player);
    return player;
  });
});

// functions to end battle

//saving throw
