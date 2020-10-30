$(document).on("turbolinks:load", () => {

    // * 关闭按钮
    $('.close').click(() => {
        $('.alert').css('top', '-200px');
    });

    // * 页面初始化时如果有错误信息，则动态加载警告框
    if ($('#error_alert .error_messages').text()) {
        // ! 页面初始化时似乎不能正常使用 CSS transition 属性正常加载动画效果
        $('#error_alert').animate({top: 0}, 450);
    }

    if ($("#sessions__new").length) {

        // * 请求失败（登陆失败）时向错误信息警告框添加内容并动态显示
        $('#sessions__new').on('ajax:error', event => {
            const responseText = event.detail.pop().responseText;
            $('.error_messages').text('').append(`<li>${responseText}</li>`);
            $('.alert').css('top', 0);
            $('.captcha').attr('src', '/rucaptcha/?t=' + Date.now());
        });
    }

});