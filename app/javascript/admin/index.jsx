import React from 'react';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

import 'antd/dist/antd.css';
import './index.scss';

class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <BrowserRouter>
                <Layout id='admin_layout'>
                    <Sider trigger={null} theme='light' collapsible collapsed={this.state.collapsed}>
                        <div className="logo"/>
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="dashboard" icon={<UserOutlined/>}>
                                <NavLink to={'/admin'}>仪表盘</NavLink>
                            </Menu.Item>
                            <SubMenu key="table_manager" icon={<UserOutlined/>} title="表管理">
                                <Menu.Item key="blogs_manager">
                                    <NavLink to={'/admin/manager/blogs'}>博客管理</NavLink>
                                </Menu.Item>
                                <Menu.Item key="comments_manager">
                                    <NavLink to={'/admin/manager/comments'}>评论管理</NavLink>
                                </Menu.Item>
                                <Menu.Item key="users_manager">
                                    <NavLink to={'/admin/manager/users'}>用户管理</NavLink>
                                </Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{padding: 0}}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path='/admin'>
                                    <Route path='/admin' exact>
                                        <h1>dashboard</h1>
                                    </Route>
                                    <Route path='/admin/manager'>
                                        <Route path='/admin/manager/users' exact>
                                            <h1>users manager</h1>
                                        </Route>
                                        <Route path='/admin/manager/blogs'>
                                            <h1>blogs manager</h1>
                                        </Route>
                                        <Route path='/admin/manager/comments'>
                                            <h1>comments manager</h1>
                                        </Route>
                                    </Route>
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;