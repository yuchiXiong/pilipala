import React from 'react';
import Turbolinks from 'turbolinks';
import {Menu, Typography, Button, Dropdown} from 'antd';
import {SettingOutlined, MinusCircleOutlined, CheckCircleOutlined, LeftOutlined} from '@ant-design/icons';
import {Blog} from '../../utils/api';
import dayjs from "dayjs";

import styles from './index.module.scss';

const {Title, Text} = Typography;

Turbolinks.start();

class AppSider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: -1
        };
        this.createNewBlog = this.createNewBlog.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.toggleBlog = this.toggleBlog.bind(this);
    }

    createNewBlog() {
        Blog.create({
            blog: {
                title: dayjs().format('YYYY/MM/DD HH:mm:ss'),
                content: '',
                released: false
            }
        }).then(res => {
            this.props.createNewBlog(res.data.blog);
            let index = -1;
            this.props.dataSource.map((item, _index) => {
                (item.id === res.data.blog.id) && (index = _index);
            })
            this.setState({
                selected: index
            })
        })
    }

    onDelete(id) {
        Blog.destroy(id).then(() => {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        // * 删除文章时更新选中项为0
        if ((prevState.selected === this.state.selected) &&
            (prevProps.defaultSelect !== this.props.defaultSelect)) {
            this.setState({
                selected: 0
            });
        }
    }

    render() {
        return (
            <aside className={styles['sider']}>
                <ul className={styles['blogs_set']}>
                    {
                        this.props.dataSource.map((item, index) => {
                            return <li
                                onClick={() => this.toggleBlog(item.id, index)}
                                className={`${styles['sider_item']} ${index === this.state.selected && styles['active']}`}
                                key={item.id}>
                                <section className={styles['sider_item_container']}>
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
                                            }
                                            trigger={'click'}
                                        >
                                            <SettingOutlined
                                                style={{
                                                    fontSize: '18px',
                                                    opacity: this.state.selected === index ? 1 : 0
                                                }}/>
                                        </Dropdown>
                                    }
                                </section>
                            </li>;
                        })
                    }
                </ul>
                <Button
                    className={styles['new_blog_btn']}
                    onClick={this.createNewBlog}
                    type="primary" ghost block>
                    添加新博客
                </Button>
            </aside>
        );
    }
}

export default AppSider;