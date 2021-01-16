import React from "react";
import {BrowserRouter, StaticRouter} from "react-router-dom";

const IsomorphicRouter = props => {

    if (typeof window !== 'undefined') {
        return <BrowserRouter>{props.children}</BrowserRouter>;
    } else {
        return (
            <StaticRouter location={props.path} context={props.context}>
                {props.children}
            </StaticRouter>
        );
    }

}

export default IsomorphicRouter;