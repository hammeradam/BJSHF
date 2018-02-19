(function ($) {
    $(function () {

        //initialize all modals           
        $('.modal').modal();

        $(".button-collapse").sideNav();

        //now you can open modal from code
        $('#modal2').modal('open');

    }); // end of document ready
})(jQuery); // end of jQuery name space