$(document).on("turbolinks:load", () => {

    // * 全局处理基于 remote => true 返回的 HTTP 401
    // $(document).on('ajax:error', e => {
    //     if (e.detail[e.detail.length - 1].status === 401) {
    //         Turbolinks.visit('/users/sign_in');
    //     }
    // });

    $("#alert").delegate(".close", "click", () => {
        $("#alert").animate({top: -200}, 450, null, function () {
            this.remove();
        });
    })

    // * 回到顶部
    $(document).delegate('.to_top_btn', 'click', e => {
        $('html, body').animate({scrollTop: 0}, 450);
    });

    // * 监听滚动条并隐藏/显示回到顶部按钮
    $(document).on("scroll", () => {
        if ($(document).scrollTop() > 200) {
            $('.to_top_btn').fadeIn(450);
        } else {
            $('.to_top_btn').fadeOut(450);
        }
    });

    if ($('#alert').length) {
        $("#alert").animate({top: 0}, 450);
    }

    // * .format_date为后端created_at格式时间，自动将其格式化
    const formatDateContainer = $('.format_date');
    for (let i = 0; i < formatDateContainer.length; i++) {
        const current = $(formatDateContainer[i]);
        const formatDate = dayjs(current.text());
        current.attr({title: formatDate.fromNow()})
               .text(formatDate.format('YYYY-MM-DD HH:mm:ss'));
    }
});

window.notice = function (title, messages, options = {type: 'primary'}) {
    const error_alert_dom = $("#alert");
    // * 如果当前页面上已经有alert，先将其删除
    if (error_alert_dom.length) {
        error_alert_dom.remove();
    }

    // * 添加DOM到页面
    $(`<div id="alert" class="alert alert-${options.type} alert-dismissible fade show fixed-top" role="alert">
        <strong>${title}</strong>
        <ul class="error_messages">
            ${messages.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`).appendTo("body");

    // * 添加事件进入和退出动效
    $("#alert").animate({top: 0}, 450).delegate(".close", "click", () => {
        $("#alert").animate({top: -200}, 450, null, function () {
            this.remove();
        });
    });
}