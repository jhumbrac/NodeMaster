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
  return Characters.create({
    name: "torgar",
    class: "barbarian",
    race: "human",
    str: 16,
    dex:14,
    con: 15,
    int: 9,
    wis: 13,
    chs: 11,
    hp: 28,
    xp:0,
    ac:14 
  }
).then ( result => console.log(result) );
};


  
