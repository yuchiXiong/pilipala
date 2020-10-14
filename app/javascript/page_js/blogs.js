import hljs from 'highlight.js';

$(document).on("turbolinks:load", () => {
    const codeBlocks = $('.markdown-body pre>code');
    for (let i = 0; i < codeBlocks.length; i++) {
        hljs.highlightBlock(codeBlocks[i]);
    }
});