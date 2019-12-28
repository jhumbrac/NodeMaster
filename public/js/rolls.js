let enemy = {
  ac: 10,
  dex:12,
  attackPower: 25,
  hp: 200,
  displayTitle: 'Enemy'
};
let player = {
  ac: 5,
  dex:15,
  attackPower: 15,
  hp: 100,
  displayTitle: 'Player'
};

let attacker = player;
let defender = enemy;
let hit = false;
let opponent; // don't remember what I was thinking here?
let modifier = 0;
let tempDice = '3d8';
let roll = 0;

function rollDice(dice) {
  const regexp = /(?<num>[0-9])(?:d)(?<sided>[0-9]*)/;
  let {groups: {num, sided}} = regexp.exec(dice);
  num = parseInt(num);
  sided = parseInt(sided);
  for (let i=0; i < num; i++){
    roll += Math.floor( (Math.random() * sided) + 1 );
  }
  return roll;
}
function rollToHit(opponent) {
  rollDice('1d20');
  if (roll === 20 ) {
    console.log('critical hit');
  }
  else if ((roll - modifier) >= opponent.ac){
    console.log(roll, 'hit');
  } else {
    console.log(roll, 'miss')
  }
}
rollToHit(enemy);

function initiative() {
  if (player.dex > enemy.dex ) {
    attacker = player;
    defender = enemy;
  } else {
    attacker = enemy;
    defender = player;
  }
  console.log('attacker: ', attacker);
  console.log('defender: ', defender);
}

function attack(attacker, defender) {
  console.log(attacker, defender);
}

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





