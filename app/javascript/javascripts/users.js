$(document).on("turbolinks:load", () => {

    // * 回到顶部
    $('.to_top_btn').click(() => {
        $('html, body').animate({scrollTop: 0}, 450)
    });

    // * 监听滚动条并隐藏/显示回到顶部按钮
    $(document).on("scroll", () => {
        if ($(document).scrollTop() > 200) {
            $('.to_top_btn').fadeIn(300);
        } else {
            $('.to_top_btn').fadeOut(300);
        }
    })
});