import React, { Suspense } from 'react';
import { Layout } from 'antd';

const AppSider = React.lazy(() => import('./components/sider'));
const AppEditor = React.lazy(() => import('./components/editor'));
import Loading from './components/loading';

import { Users, Blogs } from './utils/api';

import styles from './app.module.scss';

const {Sider, Content} = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.userInfo = gon.currentUser;
        this.state = {
            // * 当前编辑器里的博客对象
            current: {
                userId: -1,
                title: "",
                content: "",
                id: -1,
                released: false,
            },
            // * 当前用户的博客列表
            blogs: []
        };
        this.onToggle = this.onToggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    // * 组件挂载后拉取当前用户的博客列表
    componentDidMount() {
        if (this.userInfo) {
            Users.userBlogs(this.userInfo.id).then(res => {
                if (res.data.blogs.length > 0) {
                    this.setState({
                        blogs: res.data.blogs,
                        current: res.data.blogs[0]
                    });
                }
            });
        }
    }

    // * 点击左侧sider切换右侧显示的博客内容
    onToggle(id) {
        const selectedBlog = this.state.blogs.filter(item => item.id.toString() === id.toString())[0];
        this.setState({current: selectedBlog});
    }

    // * 添加一篇新的博客
    onCreate(blog) {
        this.setState({
            current: blog,
            blogs: [
                blog,
                ...this.state.blogs
            ]
        });
    }

    // * 将修改后的博客上传至服务器
    onUpdate(blog) {
        Blogs.update(blog.id, {
            blog
        }).then(res => {
            this.setState({
                blogs: [
                    res.data.blog,
                    ...this.state.blogs.filter(item => item.id.toString() !== blog.id.toString())
                ],
                current: {...res.data.blog}
            });
        });
    }

    // * 请求服务器删除一篇博客并更新客户端博客列表
    onDelete(id) {
        this.setState({
            blogs: [...this.state.blogs.filter(item => item.id.toString() !== id.toString())]
        });
    }

    render() {
        return <Suspense fallback={<Loading/>}>
            <Layout>
                <Sider
                    className={styles['sider']}
                    theme="light">
                    <AppSider
                        dataSource={this.state.blogs}
                        onDelete={this.onDelete}
                        onToggle={this.onToggle}
                        onCreate={this.onCreate}
                    />
                </Sider>
                <Content className={styles['content']}>
                    <AppEditor
                        blog={this.state.current}
                        onUpdate={this.onUpdate}/>
                </Content>
            </Layout>
        </Suspense>;
    }
}

export default App;
