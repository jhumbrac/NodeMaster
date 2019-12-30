$(document).ready(function () {
  let enemy = {};
  let player = {
    // ac: 5,
    // dex: 15,
    // attackPower: 15,
    // hp: 7,
    // name: 'Hero'
  }; // need to set player = Hero;

  let attacker = player;
  let defender = enemy;
  let hit = false;  // should these be done using a singular object? destructuring? https://2ality.com/2014/06/es6-multiple-return-values.html
  let critHit = false;
  let save = false;
  let opponent; // don't remember what I was thinking here?
  let modifier = 0;
  let tempDice = '1d8';
  let roll = 0;

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

  // function rollToHit(opponent) {
  //   rollDice('1d20');
  //   if (roll === 20 ) {
  //     critHit = true;
  //     hit = true;
  //     opponent.hp -= (roll * 2);
  //   } else if ((roll - modifier) >= opponent.ac){
  //     hit = true;
  //     critHit = false;
  //   } else {
  //     hit = false;
  //     critHit = false;
  //   }
  // };
  function endGame() {
    console.log('game has ended');
  };
  function endBattle() {
    console.log('monster has been defeated');
  }
  function isAlive(opponent) {
    console.log(`opponent: ${opponent.name}, player: ${player.name}`);
    if (opponent.hp > 0) {
      console.log(`${opponent.name}'s hp: ${opponent.hp}`);
    }
    else {
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
    console.log(opponent, player);
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
    if (opponent.name === player.name ){ 
      console.log('torgar was hit', opponent.hp)
      $('#heroHp').attr('value', opponent.hp);
      if ( (parseInt($('#heroHp').attr('value')) / parseInt($('#heroHp').attr('max'))) < .25 ) {
        $('#heroHp').attr('class', "nes-progress is-error");
      }
    } else {
      //$('#monsterHP').attr('value', opponent.hp);
      console.log('monster was hit but we dont have a bar')
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

  // function startBattle(){
  //   //fight

  //   attack(player, enemy);

  //   //run
  //   endGame();
  // }
  $(document).on('click', '#fight', event => {
    event.preventDefault();
    attack(player, enemy);
  })
  $(document).on("keydown", event => {
    if (event.which == 13)
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
  let random = Math.floor(Math.random() * 200);
  $.ajax("/api/selectedChar", {
    type: "GET"    
  }).then(res=>{
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
    console.log(player)
  });
  $.ajax({
    url: "http://www.dnd5eapi.co/api/monsters/" + random,
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
      ac: res.armor_class,
      img: "../img/jpeg"
    };
    console.log("The Monster is " + JSON.stringify(enemy));
  });
});


// create monster display

// functions to start new battle
// functions to end battle