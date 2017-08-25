$( document ).ready(function() {
    console.log( "ready!" );

$(".sendTitle").on("click", function(){
    var thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
      method: "GET",
      url: "/title/" + thisId,
    })
      .done(function(data) {
        console.log(data);
        $("#titleinput").html(thisId)

        // if (data.comments) {
        //     // Place the title of the note in the title input
        //     $("#titleinput").val(data.comments.title);
        //     // Place the body of the note in the body textarea
        //     $("#bodyinput").val(data.comments.body);
        //   }
      });
});

$("#submit-comment").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/comments/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .done(function(data) {
        console.log(data);
      });
  });


});