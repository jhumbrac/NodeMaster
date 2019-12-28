const fs = require('fs');

module.exports = function selectedHero() {
    let rawData = fs.readFileSync("selectedCharacter.json", "utf8");
    let Hero = JSON.parse(rawData);
    return Hero;
}