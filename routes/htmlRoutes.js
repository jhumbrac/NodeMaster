var db = require("../models");
var fs = require("fs");

module.exports = function(app) {
//route used to create db once.  will need to go to route once, and then will be good for app functionality.
  // app.get("/", function(req, res) {
  //   var rawData = fs.readFileSync("./models/char.json", "utf8");
  //   var convertedData = JSON.parse(rawData);
  //   console.log(convertedData);
  //   db.Characters.bulkCreate(convertedData).then(function() {
  //     res.end("Created");
  //   });
  // });

  // Load index page
  app.get("/", function(req, res) {
    var rawData = fs.readFileSync("./models/char.json", "utf8");
    var convertedData = JSON.parse(rawData);
    console.log(convertedData);
    db.Characters.bulkCreate(convertedData).then(function() {

      db.Characters.findAll({}).then(function(data) {
        res.render("index", {
          msg: "Node Master 2",
          characters: data
        });
        // console.log(data);
      });
    });
  });
  app.get("/game.html", (req, res)=>{
    let rawData = fs.readFileSync("selectedCharacter.json", "utf8");
    let Hero = JSON.parse(rawData);
    res.render('game', {Hero});
    return Hero;
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Characters.findOne({
      where: { id: req.params.id }
    }).then(function(data) {
      res.render("example", {
        characters: data
      });
    });
  });
  app.get("/monsters", function(req, res) {
    let monsterData = fs.readFileSync("./models/monsters.json", "utf8");
    let convertData = JSON.parse(monsterData);
    res.send(convertData)
  });

  app.get("/character/:id", function(req, res) {
    db.Characters.findOne({
      where: { id: req.params.id }
    }).then(function(data) {
      res.render("game", {
        characters: data
      });
      var neededData = {
        name: data.name,
        class: data.class,
        race: data.race,
        str: data.str,
        dex: data.dex,
        con: data.con,
        int: data.int,
        wis: data.wis,
        chs: data.chs,
        hp: data.hp,
        xp: data.xp,
        ac: data.ac,
        img: data.img,
        isCharacter: data.isCharacter
      };
      if (neededData.isCharacter === true) {
        fs.writeFile(
          "selectedCharacter.json",
          JSON.stringify(neededData),
          function(err) {
            if (err) {
              throw err;
            }
            console.log("complete");
          }
        );
      } else {
        fs.writeFile(
          "selectedMonster.json",
          JSON.stringify(neededData),
          function(err) {
            if (err) {
              throw err;
            }
            console.log("complete");
          }
        );
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
