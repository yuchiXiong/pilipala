import { Controller } from 'stimulus';

export default class extends Controller {
    connect() {
        // * 生成目录并添加锚点
        $("article h1," +
            "article h2," +
            "article h3").each(function (i, item) {

            const tag = $(item).get(0).localName;
            $(item).attr("id", "toc" + i);
            $("#toc").append('<a class="toc_' + tag + '" href="#toc' + i + '">' + $(this).text() + '</a></br>');

        });

        for (let i = 1; i < 3; i++) {
            $(`.toc_h${i}`).css("margin-left", (i - 1) * 20);
        }
    }

    scrollTo(event) {
        event.preventDefault();
        if (/^toc_h.*/.test(event.target.className)) {
            $('html, body').animate({scrollTop: $($(event.target).attr('href')).offset().top - 100}, 450);
        }
    }
}