$( document ).ready(function() {
    console.log( "ready!" );



$("#filter-search").on("click", function(){
    var size = $("#size-options").val();
    console.log(size);

        // $.ajax({
        //     method: "POST",
        //     url: "/",
        //     data: {
        //         size: size
        //       }
        //     // dataType: 'JSON'
        //     })
        //     .done(function(sizeFigure) {
        //         console.log(sizeFigure);
        //     });
});


});