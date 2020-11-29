import { Controller } from 'stimulus';

window.notice = function (options) {

    let content = '';
    if (options.content) {
        content = options.content instanceof Array ? options.content : [options.content];
        content = content.map(item => `<ul class="error_messages"><li>${item}</li></ul>`).join('');
    }

    $(`<div id="notice" class="alert alert-dismissible fixed-top" 
            data-controller="notice" 
            data-notice-auto-close="${options.autoClose || false}" 
            data-notice-type="${options.type || 'primary'}">
            <strong>${options.title}</strong>
            ${content}
            <button class="close" data-action="notice#close" type="button">
                <span aria-hidden="true">×</span>
            </button>
       </div>`).appendTo('body');
}

export default class extends Controller {

    get autoClose() {
        switch (this.data.get('autoClose')) {
            case 'false':
                return false;
            default:
                return parseInt(this.data.get('autoClose'));
        }
    }

    connect() {
        console.log(this.autoClose)
        $(this.element).addClass(`alert-${this.data.get('type')}`)
                       .animate({top: 0}, 450, () => {
                           if (this.autoClose) {
                               setTimeout(() => {
                                   this.close();
                               }, parseInt(this.autoClose) * 1000);
                           }
                       });
    }

    close() {
        $(this.element).animate({top: '-500px'}, 450, () => {
            $(this.element).remove();
        })
    }
}