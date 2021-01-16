import React from 'react';
import {Route, Switch, Link} from "react-router-dom";
import IsomorphicRouter from './routes';

import Header from "./components/header";
import Home from './pages/home';
import About from './pages/about';
import Mine from './pages/mine';

import 'antd/dist/antd.css';
import './app.scss';

export default props => <IsomorphicRouter path={props.path} context={props.react_props}>
    <div id={'app'}>
        <Header/>
        <div id={'nav'}>
            <Link to='/'>首页</Link>
            &nbsp;|&nbsp;
            <Link to='/about'>关于</Link>
            &nbsp;|&nbsp;
            <Link to='/mine'>我的</Link>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/mine' component={Mine}/>
            </Switch>
        </div>
    </div>
</IsomorphicRouter>