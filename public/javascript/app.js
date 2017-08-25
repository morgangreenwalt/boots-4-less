// $( document ).ready(function() {
//     console.log( "ready!" );
//     $("#watch").on("click", function(){
//         var idName = $(this).attr("class");
//         console.log(idName);
    
//         $.ajax({
//             method: "GET",
//             url: "/",
//           })
//         .done(function(data) {
//             console.log(data);
//             console.log(data.idName);
            
//             // if (data.watch === true){
//             // $("#watch").html("<button type='submit' id='watch' name='watch'>Watching</button>");
//             // }
//             // else {
//             // console.log("no updates");
//             // }
//         })
//     });



// // function watchUpdate() {
// //     // event.preventDefault();

// //     $.ajax({
// //         method: "GET",
// //         url: "/watch/"
// //       })
// //     .done(function(data) {
// //         console.log(data);
// //         for (var i = 0; i <data.length; i++){
// //             if (data.watch === true){
// //                 $("#watch").html("<button type='submit' id='watch' name='watch'>Watching</button>");
// //                 }
// //                 else {
// //                 $("#watch").html("<button type='submit' id='watch' name='watch'>Watching</button>");
// //                 console.log("no updates");
// //                 }
// //         }
// //         console.log(data);
// //     });
// // }  

// // watchUpdate();

// // $(".sendTitle").on("click", function(){
// //     var thisId = $(this).attr("data-id");
// //     console.log(thisId);

// //     $.ajax({
// //       method: "GET",
// //       url: "/title/" + thisId,
// //     })
// //       .done(function(data) {
// //         console.log(data);
// //         $("#titleinput").html(thisId)

// //         // if (data.comments) {
// //         //     // Place the title of the note in the title input
// //         //     $("#titleinput").val(data.comments.title);
// //         //     // Place the body of the note in the body textarea
// //         //     $("#bodyinput").val(data.comments.body);
// //         //   }
// //       });
// // });

// // $("#submit-comment").on("click", function() {
// //     var thisId = $(this).attr("data-id");
// //     $.ajax({
// //       method: "POST",
// //       url: "/comments/" + thisId,
// //       data: {
// //         title: $("#titleinput").val(),
// //         body: $("#bodyinput").val()
// //       }
// //     })
// //       .done(function(data) {
// //         console.log(data);
// //       });
// //   });
// });