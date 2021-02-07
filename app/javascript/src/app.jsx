import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import IsomorphicRouter from './routes';
import createStore from './stores';

import Header from "./components/header";
import Home from './pages/home';
import BlogShow from './pages/blog-show';
import UserShow from './pages/user-show';
import Footer from './components/footer';

import style from './app.module.scss';
import './App.scss';

const {Content} = Layout;

export default props => {
    let initState = null;
    if (typeof window === 'undefined') {
        initState = props.react_props;
    } else {
        initState = window.__REACT_RAILS_SSR__;
        window.__REACT_RAILS_SSR__ = null;
    }

    const store = createStore(initState);
    return <Provider store={store}>
        <IsomorphicRouter path={props.path}>
            <Layout>
                <Header/>
                <Content className={style.content}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/blogs/:id' component={BlogShow}/>
                        <Route exact path='/u/:spaceName' component={UserShow}/>
                    </Switch>
                </Content>
                <Footer/>
            </Layout>
        </IsomorphicRouter>
    </Provider>
}