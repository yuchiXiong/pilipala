import { Controller } from 'stimulus';

export default class extends Controller {
    toTop() {
        $('html, body').animate({scrollTop: 0}, 450);
    }

    toggleVisible() {
        const el = this.element;
        if ($(document).scrollTop() > 200) {
            $(el).fadeIn(450);
        } else {
            $(el).fadeOut(450);
        }
    }
}