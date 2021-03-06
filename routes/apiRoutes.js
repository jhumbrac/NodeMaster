const fs = require('fs');
var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/character", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      res.json(data);
    });
  });
  app.get("/api/selectedChar", (req, res) =>{
    let rawData = fs.readFileSync("selectedCharacter.json", "utf8");
    let player = JSON.parse(rawData);
    res.json(player)
    return player;
  });
  app.get("/api/character/:category", function(req, res) {
    db.Characters.findAll({ where: { category: req.params.category } }).then(
      function(data) {
        res.json(data);
      }
    );
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Characters.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Characters.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
