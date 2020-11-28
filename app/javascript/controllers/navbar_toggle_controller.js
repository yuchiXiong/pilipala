import { Controller } from 'stimulus';

export default class extends Controller {
    toggleNavbar() {
        if ($(document).scrollTop() > 118) {
            $('.website_nav').addClass('close_website_nav');
        } else {
            $('.website_nav').removeClass('close_website_nav');
        }
    }
}