import React from 'react';
import Turbolinks from 'turbolinks';
import { Menu, Typography, Button, Dropdown } from 'antd';
import { SettingOutlined, MinusCircleOutlined, CheckCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { Blogs } from '../../utils/api';
import dayjs from 'dayjs';

import styles from './index.module.scss';

const {SubMenu} = Menu;
const {Title, Text} = Typography;

Turbolinks.start();

class AppSider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: -1
        };
        this.onDelete = this.onDelete.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(e) {
        switch (e.key) {
            case 'return-home':
                Turbolinks.visit('/');
                break;
            case 'add-blog-set':
                break;
            case 'new-blog-btn':
                Blogs.create({
                    title: dayjs(new Date()).format('YYYY年MM月DD日'),
                    content: ''
                }).then(res => {
                    this.props.onCreate(res.data.blog);
                });
                break;
            default:
                this.props.onToggle(e.key);
                break;
        }
    };

    onDelete(id) {
        Blogs.destroy(id).then(() => {
            this.props.onDelete(id);
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleMenuClick}
                defaultSelectedKeys={[]}
                defaultOpenKeys={['default-blog-set']}
                mode="inline"
                theme="light"
            >
                <Menu.Item key="return-home" className={styles['return-home-btn']}>
                    <LeftOutlined/> <Title level={4}>回到首页</Title>
                </Menu.Item>
                {/*<Menu.Item key="add-blog-set" className={styles['add-blog-set']}>*/}
                {/*    <PlusOutlined/> <Text>创建文集</Text>*/}
                {/*</Menu.Item>*/}
                <SubMenu
                    key="default-blog-set"
                    title={<span>默认(暂不支持文集)</span>}
                >
                    {
                        this.props.dataSource.map((item, index) => {
                            return <Menu.Item
                                onClick={() => this.setState({selected: index})}
                                className={styles['sider-item']}
                                key={item.id}>
                                {
                                    item.released ?
                                        <CheckCircleOutlined style={{fontSize: '20px'}}/> :
                                        <MinusCircleOutlined style={{fontSize: '20px', color: '#ccc'}}/>
                                }
                                <Text level={4} ellipsis className={styles['sider-item-title']}>{item.title}</Text>
                                {
                                    // this.state.selected === index &&
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item onClick={() => this.props.onUpdateCover()}>
                                                    设置封面
                                                </Menu.Item>
                                                <Menu.Item onClick={() => this.onDelete(item.id)}>
                                                    删除博客
                                                </Menu.Item>
                                            </Menu>
                                        }>
                                        <SettingOutlined
                                            // onClick={() => console.log(item.id)}
                                            style={{
                                                fontSize: '18px',
                                                opacity: this.state.selected === index ? 1 : 0
                                            }}/>
                                    </Dropdown>
                                }

                                {/* <Text >{item.content}</Text> */}
                                {/* <Text>字数：{item.content.length}</Text> */}
                            </Menu.Item>;
                        })
                    }

                </SubMenu>
                <Menu.Item key="new-blog-btn" className={styles['new-blog-btn']}>
                    <Button type="primary" ghost block>添加新博客</Button>
                </Menu.Item>
            </Menu>
        );
    }
}

export default AppSider;

// import React from 'react';

// dataSource={this.state.blogs}
// onDelete={this.onDelete}
// onToggle={this.onToggle}
// onCreate={this.onCreate}
// onUpdateCover={this.openModal}

// import styles from './index.module.scss';
//
// class AppSider extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             selected: -1
//         }
//         this.onSelected = this.onSelected.bind(this);
//     }
//
//     onSelected(index, id) {
//         this.setState({
//             selected: index
//         });
//         this.props.onToggle(id);
//     }
//
//     render() {
//         return <ul className={styles['app-sider']}>
//             {
//                 this.props.dataSource.map((item, index) => {
//                     return <li
//                         onClick={() => this.onSelected(index, item.id)}
//                         key={item.id}
//                         className={this.state.selected === index ? styles.active : null}>
//                         {item.title}
//                     </li>
//                 })
//             }
//         </ul>
//     }
// };
//
// export default AppSider;