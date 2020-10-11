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
});