import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

$(document).on("turbolinks:load", () => {

    const formatDateContainer = $('.format_date');
    for (let i = 0; i < formatDateContainer.length; i++) {
        const current = $(formatDateContainer[i]);
        current.text(dayjs(current.text()).fromNow());
    }

    $('.to_top_btn').click(() => {
        $('html, body').animate({scrollTop: 0}, 450)
    });

    $(document).on("scroll", () => {
        if ($(document).scrollTop() > 200) {
            $('.to_top_btn').fadeIn(300);
        } else {
            $('.to_top_btn').fadeOut(300);
        }
    })
});