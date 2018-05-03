(function($) {
  $(function() {
    //initialize all modals
    $(".modal").modal();

    $(".button-collapse").sideNav();

    $(".chips").material_chip();
    $(".chips").material_chip("data");

    // $(".chips").chips();

    //now you can open modal from code
    // $('#modal2').modal('open');
  }); // end of document ready
})(jQuery); // end of jQuery name space
