import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

$(document).on("turbolinks:load", () => {

    // * .format_date为后端created_at格式时间，自动将其格式化
    const formatDateContainer = $('.format_date');
    for (let i = 0; i < formatDateContainer.length; i++) {
        const current = $(formatDateContainer[i]);
        current.text(dayjs(current.text()).fromNow());
    }

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