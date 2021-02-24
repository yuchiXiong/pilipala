import React from 'react';
import {connect} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {Avatar, Button, Col, Dropdown, Layout, Menu, Row, Space} from 'antd';
import {CaretDownOutlined} from '@ant-design/icons';
import {PenIcon} from '../icon/index';

import styles from './index.module.scss';

const {Header: AntdHeader} = Layout;

const Header = props => {

    const history = useHistory();

    const getCurrentUser = () => {
        return props.blogShowPage.currentUser ||
            props.blogPage.currentUser ||
            props.userPage.currentUser ||
            (typeof window !== 'undefined' && window.gon?.currentUser) || null;
    }

    const onMenuClick = (e) => {
        switch (e.key) {
            case 'navProfile':
                history.push(`/u/${getCurrentUser().spaceName}`);
                return;
            case 'navSetting':
                history.push('/u/setting');
                return;
            default:
                return;
        }
    }

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
                {
                    getCurrentUser() && <Dropdown
                        overlay={<Menu
                            onClick={onMenuClick}
                            className={styles.navDropdown}
                        >
                            <Menu.Item key="navProfile"> 我的主页 </Menu.Item>
                            <Menu.Item key="navSetting"> 设置 </Menu.Item>
                            <Menu.Item key="signOut"> 注销 </Menu.Item>
                        </Menu>}
                        placement="bottomCenter"
                        icon={null}
                        trigger={['click']}
                        className={styles.avatar}>
                        <Space size={4}>
                            <Avatar
                                src={getCurrentUser().avatar}
                                alt={getCurrentUser().nickName}
                            />
                            <CaretDownOutlined/>
                        </Space>
                    </Dropdown>
                }
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
};

export default connect(state => state)(Header);