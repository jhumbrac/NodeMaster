/*function initDiceRoll() {
  const result = Math.floor(Math.random() * 7);
  if (result >= 4) {
    console.log('Holy shit that thing is big. You start with a disadvantage.')
  } else if (result < 4) {
    console.log(`${monster} is smaller than you. You start with advantage.`)
  }
  return result
};*/

let enemy = {
  armorClass: 5,
  health: 200
}

let player = {
  armorClass: 5,
  health: 100
}

var hit;
var modifier = 0;

function rollToHit(opponent) {
  let hitRoll = Math.floor(Math.random() * 21 - modifier);
  if (hitRoll > opponent.armorClass) {
    hit = true;
  } else {
    hit = false;
  }
  return hit;
}

function attack(opponent) {
  var newVar = rollToHit();
  if (newVar) {
    var successfulHit = Math.floor(Math.random() * 21);
    opponent.health -= successfulHit;
    console.log(`You have hit for ${successfulHit}`);
    console.log('Health: ', opponent.health)
    if (opponent.health <= 0) {
      console.log("Your enemy has been slain!")
    }
  } else {
    console.log('You have missed!');
  } 
}
attack(enemy);



