import React from 'react'
import ReactDOM from 'react-dom'
import App from "../admin";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>,
        document.querySelector("#admin")
    )
})
