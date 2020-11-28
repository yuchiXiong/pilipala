import { Controller } from 'stimulus';

export default class extends Controller {

    connect() {
        $(this.element).find('.pagination').hide();
    }

    fetch() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            if (this.data.get('loading') === 'false') {
                // console.log($(this.element).find('#load_more'))
                document.querySelector('#load_more').click();
                this.data.set('loading', true);
            }
        }
    }
}
