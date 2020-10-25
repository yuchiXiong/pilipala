// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from "../editor_for_react/app";

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>,
        document.body.appendChild(document.createElement('div'))
    )
})
