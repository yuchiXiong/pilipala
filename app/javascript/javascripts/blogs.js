import hljs from 'highlight.js';

// * 事件太多了看的自己头痛 - -
// * 博客列表页[首页]
// * - 滚动至页面底部自动拉取新博客
// * 博客详情页
// * - 代码高亮
// * - 生成目录
// *

$(document).on("turbolinks:load", () => {

    $(document).unbind('scroll');

    // * 博客列表页[首页]
    if ($("#blogs__index").length) {
        // * 页面底部下拉加载
        $(document).scroll(() => {
            if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                const loadMoreBtn = $('#load_more');
                if (!loadMoreBtn.data('loading')) {
                    document.querySelector('#load_more').click();
                    loadMoreBtn.data('loading', true);
                }
            }
        })
    }

    // * 博客详情页
    if ($("#blogs__show").length) {
        // * 高亮
        const codeBlocks = $('.markdown-article pre>code');
        for (let i = 0; i < codeBlocks.length; i++) {
            hljs.highlightBlock(codeBlocks[i]);
        }

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

        // * 添加滚动跳转
        $("#toc").delegate('a', 'click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 80}, 450);
        });

        // // * 动态修改顶部标题栏
        $(document).scroll(() => {
            if ($(document).scrollTop() > 118) {
                $('#blogs_show_nav_container').addClass('close_website_nav');
            } else {
                $('#blogs_show_nav_container').removeClass('close_website_nav');
            }

        })

    }

});