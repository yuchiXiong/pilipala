$(document).on("turbolinks:load", () => {

    if ($('#sessions__new, #registrations__new').length) {
        $(document).on('ajax:error', () => {
            $("img.captcha").attr('src', '/rucaptcha/?t=' + Date.now());
        });
    }

});