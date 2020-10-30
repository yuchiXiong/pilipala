$(document).on("turbolinks:load", () => {
    if ($("#sessions__new")) {
        $('.close').click(() => {
            $('.alert').css('top', '-200px');
        });
        if ($('#error_alert .error_messages').text()) {
            $('#error_alert').css('top', 0).removeClass('fade');
        }
        $('#sessions__new').on('ajax:error', event => {
            console.log('error')
            const responseText = event.detail.pop().responseText;
            $('.error_messages').text('').append(`<li>${responseText}</li>`);
            $('.alert').addClass('show').css('top', 0);
            $('.captcha').attr('src', '/rucaptcha/?t=' + Date.now());
        });
    }

});