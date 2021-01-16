import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import IsomorphicRouter from './routes';

import Header from "./components/header";
import Home from './pages/home';

import styles from './app.module.scss';

const {Content} = Layout;

export default props => <IsomorphicRouter path={props.path} context={props.react_props}>
    <Layout>
        <Header/>
        <Content className={styles.content}>
            <Switch>
                <Route exact path='/' component={Home}/>
            </Switch>
        </Content>
    </Layout>
</IsomorphicRouter>