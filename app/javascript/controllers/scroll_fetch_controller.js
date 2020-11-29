import { Controller } from 'stimulus';
import Rails from '@rails/ujs';

export default class extends Controller {

    connect() {
        $(this.element).find('.pagination').hide();
    }

    fetch() {
        if ( !this.isLoading && !this.none) {
            if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                this.isLoading = true;
                Rails.ajax({
                    url: `/blogs?page=${this.page}`,
                    type: 'GET',
                    dataType: 'script',
                    accept: 'text/javascript',
                    complete: e => {
                        const data = e.response;
                        if (data !== 'null') {
                            $(this.element).find('.blog-post:last').after(data)
                        } else {
                            $(this.element).find('.blog-post:last').after('<p class="text-center">已经没有更多内容了</p>');
                            this.none = true;
                        }
                        this.isLoading = false;
                        this.page++;
                    }
                });
            }
        }
    }

    get isLoading() {
        return this.data.get('loading') === 'true';
    }

    set isLoading(val) {
        this.data.set('loading', val.toString());
    }

    get page() {
        return parseInt(this.data.get('page'));
    }

    set page(val) {
        return this.data.set('page', val.toString());
    }

    get none() {
        return this.data.get('none') === 'true';
    }

    set none(val) {
        return this.data.set('none', val.toString());
    }
}
