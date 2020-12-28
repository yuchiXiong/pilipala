import {Controller} from 'stimulus';
import hljs from "highlight.js";

export default class extends Controller {
    connect() {
        const codeBlocks = $(this.element).find('pre>code');
        for (let i = 0; i < codeBlocks.length; i++) {
            hljs.highlightBlock(codeBlocks[i]);
        }
    }
}