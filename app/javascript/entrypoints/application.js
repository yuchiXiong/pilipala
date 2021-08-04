console.log('Vite ⚡️ Rails')

import Turbolinks from 'turbolinks';
import '@rails/ujs';
import $ from 'jquery';
import 'bootstrap';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

import '../javascripts/devise';
// import ActiveStorage from '@rails/activestorage';

import.meta.globEager('./**/*_channel.js');

Turbolinks.start();
// ActiveStorage.start();

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

// global.$ = $;
// global.dayjs = dayjs;

$(document).on('ajax:error', e => {
    if (e.detail[e.detail.length - 1].status === 401) {
        Turbolinks.visit('/users/sign_in');
    }
});