import $ from 'jquery';

$(document).on("turbolinks:load", () => {

    if ($('#sessions__new, #registrations__new').length) {
        $(document).on('ajax:error', () => {
            $("img.captcha").attr('src', '/rucaptcha/?t=' + Date.now());
        });
    }

});

// $(document).on("turbolinks:load", () => {
//
//     $("#alert").delegate(".close", "click", () => {
//         $("#alert").animate({top: -200}, 450, null, function () {
//             this.remove();
//         });
//     })
//
//     if ($('#alert').length) {
//         $("#alert").animate({top: 0}, 450);
//     }
//
// });

// window.notice = function (title, messages, options = {type: 'primary'}) {
//     const error_alert_dom = $("#alert");
//     // * 如果当前页面上已经有alert，先将其删除
//     if (error_alert_dom.length) {
//         error_alert_dom.remove();
//     }
//
//     // * 添加DOM到页面
//     $(`<div id="alert" class="alert alert-${options.type} alert-dismissible fade show fixed-top" role="alert">
//         <strong>${title}</strong>
//         <ul class="error_messages">
//             ${messages.map(item => `<li>${item}</li>`).join('')}
//         </ul>
//         <button type="button" class="close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>`).appendTo("body");
//
//     // * 添加事件进入和退出动效
//     $("#alert").animate({top: 0}, 450).delegate(".close", "click", () => {
//         $("#alert").animate({top: -200}, 450, null, function () {
//             this.remove();
//         });
//     });
// }