import { Controller } from 'stimulus';

export default class extends Controller {
    connect() {
        const current = this.element;
        const formatDate = dayjs($(current).text());
        $(current).attr({title: formatDate.fromNow()})
                  .text(formatDate.format('YYYY-MM-DD HH:mm:ss'));
    }
}