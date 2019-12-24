let enemy = {
  armorClass: 10,
  attackPower: 25,
  health: 200,
  displayTitle: 'Enemy'
};
let player = {
  armorClass: 5,
  attackPower: 15,
  health: 100,
  displayTitle: 'Player'
};
var hit;
var modifier = 0;

function rollDice(tempDice) {
  let tempDice = '2d6';
  let regexp = /(?<num>[0-9])(?:d)(?<sided>[0-9])/;
  let num;
  let sided;
  let roll = Math.floor(Math.random());
  
}

function determineInitiative() {
  let result = Math.floor(Math.random() * 100) > 50;
  result ? console.log('Holy shit that thing is big. You start with a disadvantage.') : 
  console.log(`Your enemy is smaller than you. You start with advantage.`);
  return result;
}

function rollDoesHit(opponent) {
    return opponent.armorClass < Math.floor(Math.random() * 21 - modifier);
}

function attack(attacker, opponent) {
    if(rollDoesHit(opponent)) {
      let damageRoll = Math.floor(Math.random() * attacker.attackPower);
      opponent.health -= damageRoll;
      console.log(`${attacker.displayTitle} has hit for ${damageRoll}`);
      console.log('Health: ', opponent.health);
      if (opponent.health <= 0) {
        console.log(`${opponent.displayTitle} has been slain!`);
      }
    } else {
      console.log(`${attacker.displayTitle} has missed.`)
    }
};

let playerGoesFirst = determineInitiative();
let attacker = playerGoesFirst ? player : enemy;
let opponent = playerGoesFirst ? enemy : player;

function handleAttack () {
  attack(attacker, opponent);
  let temp = opponent;
  opponent = attacker;
  attacker = temp;
}

const timer = setInterval(function () {
  handleAttack();
  if(attacker.health < 0 || opponent.health < 0){
    clearInterval(timer);
  }
}, 1000);





