const fs = require('fs');
module.exports = function(sequelize, DataTypes) {
    const Characters = sequelize.define("Character", {
        category: DataTypes.STRING,
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
    let data = fs.readFileSync(__dirname + '/char.json', 'utf8');
    let convertedData = JSON.parse(data);
    let a = convertedData.torgar;
    let b = convertedData.kratos;
    let c = convertedData.ganon;
    return Characters.bulkCreate([a,b,c]).then(result => console.log(result));
};