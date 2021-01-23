import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import IsomorphicRouter from './routes';

import Header from "./components/header";
import Home from './pages/home';
import BlogShow from './pages/blog-show';
import Footer from './components/footer';

import styles from './app.module.scss';

const {Content} = Layout;

export default props => <IsomorphicRouter path={props.path} context={props.react_props}>
    <Layout>
        <Header/>
        <Content className={styles.content}>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/blogs/:id' component={BlogShow}/>
            </Switch>
        </Content>
        <Footer/>
    </Layout>
</IsomorphicRouter>