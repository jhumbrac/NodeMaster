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