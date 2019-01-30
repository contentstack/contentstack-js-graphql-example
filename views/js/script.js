$( document ).ready(function () {
    
    $(".row li").slice(0, 3).show();
        

      $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".row li:hidden").slice(0, 3).show();
        if ($(".row li:hidden").length == 0) {
          $("#loadMore").fadeOut('slow');
        }
      });
    });