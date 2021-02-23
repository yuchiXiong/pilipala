import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Button, Col, Layout, Menu, Row} from 'antd';
import {PenIcon} from '../icon/index';

import styles from './index.module.scss';

const {Header: AntdHeader} = Layout;

@connect(state => state)
class Header extends React.Component {

    getCurrentUser() {
        return this.props.blogShowPage.currentUser ||
            this.props.blogPage.currentUser ||
            this.props.userPage.currentUser ||
            (typeof window !== 'undefined' && window.gon.currentUser) || null;
    }

    render() {
        return <AntdHeader className={styles.header}>
            <Row justify={'start'}>
                <Col span={16} offset={4} className={styles.header_container}>
                    <div className={styles.logo}>
                        <NavLink to='/'>Burogu</NavLink>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['home']}
                        className={styles.menu}>
                        <Menu.Item key="home">
                            <NavLink to='/'>主页</NavLink>
                        </Menu.Item>
                    </Menu>
                    {/*<Button>{this.getCurrentUser().nickName}</Button>*/}
                    <Button
                        type='primary'
                        className={styles.new_blog}
                    >
                        <PenIcon width={'18px'} height={'18px'}/>
                        &nbsp;
                        写文章
                    </Button>
                </Col>
            </Row>
        </AntdHeader>
    }
}

export default Header;