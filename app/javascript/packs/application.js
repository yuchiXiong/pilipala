/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascripts and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
const images = require.context('../assets/images', true)
// const imagePath = (name) => images(name, true)
import $ from 'jquery';
import 'bootstrap';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

require("@rails/ujs").start();
import Turbolinks from 'turbolinks';

require("@rails/activestorage").start();
require("channels");

import '../javascripts/users';
import '../javascripts/blogs';
import '../javascripts/devise';
import '../javascripts/common';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

global.$ = $;
global.dayjs = dayjs;
Turbolinks.start();