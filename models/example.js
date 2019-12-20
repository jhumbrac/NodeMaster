// const fs = require('fs');
module.exports = function(sequelize, DataTypes) {
    const Characters = sequelize.define("Character", {
        name: DataTypes.STRING,
        class: DataTypes.STRING,
        race: DataTypes.STRING,
        str: DataTypes.INTEGER,
        dex: DataTypes.INTEGER,
        con: DataTypes.INTEGER,
        int: DataTypes.INTEGER,
        wis: DataTypes.INTEGER,
        chs: DataTypes.INTEGER,
        hp: DataTypes.INTEGER,
        xp: DataTypes.INTEGER,
        ac: DataTypes.INTEGER
    });
    // var data = fs.readFileSync('/char.json', 'utf8');
    // var torgar = JSON.parse(data);
    let char = [{
        torgar: {
            name: "torgar",
            class: "barbarian",
            race: "human",
            str: 16,
            dex: 14,
            con: 15,
            int: 9,
            wis: 13,
            chs: 11,
            hp: 28,
            xp: 0,
            ac: 14
        },
        torgar2: {
            name: "torgar2",
            class: "barbarian2",
            race: "human2",
            str: 19,
            dex: 19,
            con: 19,
            int: 9,
            wis: 19,
            chs: 19,
            hp: 29,
            xp: 0,
            ac: 19
        }
    }]
    return Characters.bulkCreate([char[0].torgar, char[0].torgar2]).then(result => console.log(result));
};