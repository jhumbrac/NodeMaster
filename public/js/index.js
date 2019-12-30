$(document).on("keydown", event =>{
    if(event.which == 13) 
       $('body').addClass('charSelect');
    });
 $(document).on('click', '.selectChar', function(event) {
    var id = $(this).data("id");
    console.log(id);    
    $.ajax("/character/" + id, {
       type: "GET",
    }).then( (res) => {
       window.location.replace('game.html');
    });
 });
 
 let random = Math.floor(Math.random() * 200); 
 $.ajax({
   url: "http://www.dnd5eapi.co/api/monsters/" + random,
   method: "GET"
 }).then(function(res) {
   const selectedMonster = {
         name: res.name,
         str: res.strength,
         dex: res.dexterity,
         con: res.constitution,
         int: res.intelligence,
         wis: res.wisdom,
         chs: res.charisma,
         hp: res.hit_points,
         ac: res.armor_class,
         img: "../img/jpeg"
      };
   console.log("The Monster is " + JSON.stringify(selectedMonster));
 });