$(document).ready(function() {
    var ongoingRequest = null;
    $("#ordersforssane").submit(function(event) {
        $("#btntsttst").html('<img style="max-height:16px;" src="img/loading.gif" /> المرجو الإنتظار');
        var first_name = $("#firstName").val();
        var last_name = $("#lastName").val();
        var phone_number = $("#phoneNumber").val();
        if (first_name !== "" && last_name !== "" && phone_number !== "") {
            // Abort any pending request
            if (ongoingRequest) {
                ongoingRequest.abort();
            }
            // setup some local variables
            var $form = $(event.target);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            ongoingRequest = $.ajax({
                url: "https://script.google.com/macros/s/AKfycbwD2NMxXg_nMBALJiGUAKabK93faSSdE53KWBLrEMvNAVkL1oKE0NcGMdb9lr66u0WRtQ/exec",
                type: "post",
                data: serializedData
            });

            //   Callback handler that will be called on success
            ongoingRequest.done(function(response, textStatus, jqXHR) {
                // Log a message to the console
                console.log("Hooray, it worked!");
                console.log(response);
                console.log(textStatus);
                console.log(jqXHR);
            });

            // Callback handler that will be called on failure
            ongoingRequest.fail(function(jqXHR, textStatus, errorThrown) {
                // Log the error to the console
                console.error(
                    "The following error occurred: " +
                    textStatus, errorThrown
                );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            ongoingRequest.always(function() {
                // Reenable the inputs
                $inputs.prop("disabled", false);
                console.log("It's running");
                window.location.href = 'https://www.bio.fuelrtm.com/thanks/';
            });

            // uPrevent default posting of form
            event.preventDefault();
        }
    });

});