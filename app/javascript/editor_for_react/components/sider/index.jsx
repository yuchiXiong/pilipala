import React from 'react';
import Turbolinks from 'turbolinks';
import {Menu, Typography, Button, Dropdown} from 'antd';
import {SettingOutlined, MinusCircleOutlined, CheckCircleOutlined, LeftOutlined} from '@ant-design/icons';
import {Blogs} from '../../utils/api';
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
        this.toggleBlog = this.toggleBlog.bind(this);
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

    returnHome() {
        Turbolinks.visit('/');
    }

    toggleBlog(id, index) {
        this.setState({
            selected: index,
        });
        this.props.onToggle(id);
    }

    render() {
        return (
            <aside className={styles['sider']}>
                <Title className={styles['return_home_btn']} level={4} onClick={() => this.returnHome()}><LeftOutlined/>回到首页</Title>
                <ul className={styles['blogs_set']}>
                    {
                        this.props.dataSource.map((item, index) => {
                            return <li
                                onClick={() => this.toggleBlog(item.id, index)}
                                className={`${styles['sider_item']} ${index === this.state.selected && styles['active']}`}
                                key={item.id}>
                                {
                                    item.released ?
                                        <CheckCircleOutlined style={{fontSize: '20px'}}/> :
                                        <MinusCircleOutlined style={{fontSize: '20px', color: '#ccc'}}/>
                                }
                                <Text level={4} ellipsis className={styles['sider-item-title']}>{item.title}</Text>
                                {
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
                                            style={{
                                                fontSize: '18px',
                                                marginRight: '16px',
                                                opacity: this.state.selected === index ? 1 : 0
                                            }}/>
                                    </Dropdown>
                                }

                                {/* <Text >{item.content}</Text> */}
                                {/* <Text>字数：{item.content.length}</Text> */}
                            </li>;
                        })
                    }

                </ul>
                <Button className={styles['new_blog_btn']} type="primary" ghost block>添加新博客</Button>
            </aside>
        );
    }
}

export default AppSider;