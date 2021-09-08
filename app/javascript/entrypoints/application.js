console.log('Vite ⚡️ Rails');

import Turbolinks from 'turbolinks';
import TurbolinksPerfetch from 'turbolinks-prefetch';
import Alpine from 'alpinejs';
import '@rails/ujs';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

// import ActiveStorage from '@rails/activestorage';

import.meta.globEager('./**/*_channel.js');

Turbolinks.start();
TurbolinksPerfetch.start();
window.Alpine = Alpine;
Alpine.start();
// ActiveStorage.start();

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

// global.dayjs = dayjs;