var db = require("../models");
const fs = require('fs');
module.exports = function(app) {
  let rawData = fs.readFileSync('./models/char.json', 'utf8');
  let convertedData = JSON.parse(rawData);
  db.Characters.bulkCreate(convertedData);
  // Load index page
  app.get("/", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      res.render("index", {
        msg: "Welcome!",
        characters: data
      });
    });
  });

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

  app.get("/character/:category", function(req, res) {
    db.Characters.findAll({
      where: { category: req.params.category }
    }).then(function(data) {
      res.render("category", {
        characters: data
      });
      console.log("Monsters are: "+data);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
