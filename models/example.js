module.exports = function(sequelize, DataTypes) {
    const Characters = sequelize.define("Characters", {
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
        ac: DataTypes.INTEGER,
        img: DataTypes.STRING,
        isCharacter: DataTypes.BOOLEAN,
        lvl: DataTypes.INTEGER,

    });
    return Characters
};