$(function() {
  let enemy = {
    ac: 10,
    dex:12,
    attackPower: 25,
    hp: 7,
    name: 'Monster'
  };
  let player = {
    ac: 5,
    dex:15,
    attackPower: 15,
    hp: 7,
    name: 'Hero'
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
    let {groups: {num, sided}} = regexp.exec(dice);
    num = parseInt(num);
    sided = parseInt(sided);
    roll = 0;
    for (let i=0; i < num; i++){
      roll += Math.floor( (Math.random() * sided) + 1 );
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
  function endGame(){
    console.log('game has ended');
  };
  function endBattle(){
    console.log('monster has been defeated');
  }
  function isAlive(opponent){
    console.log(`opponent: ${opponent.name}, player: ${player.name}`);
    if (opponent.hp > 0) {
      console.log(`${opponent.name}'s hp: ${opponent.hp}`);
    }
    else {
      if ( opponent === player ) {
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
    if (roll === 20 ) {
      rollDice(tempDice);
      opponent.hp -= (roll * 2);
      isAlive(opponent);
      console.log(`${opponent.name} was critically hit for ${(roll * 2)}`);
    } else if ((roll - modifier) >= opponent.ac){
      rollDice(tempDice);
      opponent.hp -= roll;
      isAlive(opponent);
      console.log(`${opponent.name} was hit for ${roll}`);
    } else {
      console.log(`miss`)
    }
  };
  function initiative() {
    if (player.dex > enemy.dex ) {
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
}); 


  // function attack(player, enemy) {
  //   initiative();
  //   rollToHit(defender);
  //   if (critHit) {
  //     rollDice(tempDice);
  //     console.log(`${attacker.name} crit hit ${(roll * 2)}`);
  //     defender.hp -= (roll * 2);
  //   } else if (hit) {
  //     rollDice(tempDice);
  //     console.log(`${attacker.name} hit for ${roll}`);
  //     defender.hp -= roll;
  //   } else {
  //     console.log(`${attacker.name} miss`);
  //   }
  //   console.log(`new ${defender.name} hp: ${defender.hp}`);
  //   if (defender.hp > 0) {
  //     rollToHit(attacker);
  //     if (critHit) {
  //       rollDice(tempDice);
  //       console.log(`${defender.name} crit hit ${(roll * 2)}`);
  //       attacker.hp -= (roll * 2);
  //     } else if (hit) {
  //       rollDice(tempDice);
  //       console.log(`${defender.name} hit for ${roll}`);
  //       attacker.hp -= roll;
  //     } else {
  //       console.log(`${defender.name} miss`);
  //     }
  //     console.log(`new ${attacker.name} hp: ${attacker.hp}`);
  //   } else {
  //     console.log(`${player.name} has died! Game Over`)
  //   }
  // };
  // const attack = function(attacker, opponent) {
  //     if(rollDoesHit(opponent)) {
  //       let damageRoll = Math.floor(Math.random() * attacker.attackPower);
  //       opponent.health -= damageRoll;
  //       console.log(`${attacker.displayTitle} has hit for ${damageRoll}`);
  //       console.log('Health: ', opponent.health);
  //       if (opponent.health <= 0) {
  //         console.log(`${opponent.displayTitle} has been slain!`);
  //       }
  //     } else {
  //       console.log(`${attacker.displayTitle} has missed.`)
  //     }
  // };

  // let playerGoesFirst = determineInitiative();
  // let attacker = playerGoesFirst ? player : enemy;
  // let opponent = playerGoesFirst ? enemy : player;

  // function handleAttack () {
  //   attack(attacker, opponent);
  //   let temp = opponent;
  //   opponent = attacker;
  //   attacker = temp;
  // }

  // const timer = setInterval(function () {
  //   handleAttack();
  //   if(attacker.health < 0 || opponent.health < 0){
  //     clearInterval(timer);
  //   }
  // }, 1000);

