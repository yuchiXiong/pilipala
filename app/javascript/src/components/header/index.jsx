import React from 'react';
import {Layout, Menu} from 'antd';

import headerStyles from './index.scss';

const {Header: AntdHeader} = Layout;

class Header extends React.Component {
    render() {
        return <AntdHeader>
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </AntdHeader>
    }
}

export default Header;