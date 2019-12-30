var db = require("../models");
var fs = require("fs");

module.exports = function(app) {
//route used to create db once.  will need to go to route once, and then will be good for app functionality.
  app.get("/bulk/create", function(req, res) {
    var rawData = fs.readFileSync("./models/char.json", "utf8");
    var convertedData = JSON.parse(rawData);
    db.Characters.bulkCreate(convertedData).then(function() {
      res.end("Created");
    });
    
  });

  // Load index page
  app.get("/", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      res.render("index", {
        msg: "Node Master 2",
        characters: data
      });
      console.log("Data: " + data);
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
  // app.get('/game.html', (req, res)=>{
  //   res.render('game');
  //   let rawChar = fs.readFileSync('selectedCharacter.json', 'utf8');
  //   let char = JSON.parse(rawChar);
  //   console.log(char);
  // });


  // app.get("/character/:category", function(req, res) {
  //   db.Characters.findAll({
  //     where: { category: req.params.category }
  //   }).then(function(data) {
  //     res.render("category", {
  //       characters: data
  //     });
  //     console.log("Monsters are: " + data);
  //   });
  // });

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
