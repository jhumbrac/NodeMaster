$(document).on("keydown", event =>{
    if(event.which == 13) 
       $('body').addClass('charSelect');
    });

$('.selectChar').on('click', function(event) {
    var id = $(this).data("id");
    console.log(id);
    $.ajax("/character/" + id, {
        type: "GET",
    }).then(
        function() {
            console.log("To the game page");
        }
    );

});