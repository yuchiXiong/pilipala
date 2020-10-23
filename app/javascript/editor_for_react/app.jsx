import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';

const UserBlogsSider = React.lazy(() => import('./components/sider'))
const BlogEditor = React.lazy(() => import('./components/editor'))

import { Users, Blogs } from './utils/api';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from './app.module.scss';

const {Sider, Content} = Layout;

const Loading = () => {
    return <div
        style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Spin/>
    </div>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.userInfo = gon.currentUser;
        this.state = {
            // * 当前编辑器里的博客对象
            currentBlog: {
                userId: -1,
                title: "",
                content: "",
                id: -1,
                released: false,
            },
            // * 当前用户的博客列表
            blogs: []
        };
        this.toggleBlog = this.toggleBlog.bind(this);
        this.handleBlogUpdate = this.handleBlogUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    // * 组件挂载后拉取当前用户的博客列表
    componentDidMount() {
        if (this.userInfo) {
            Users.userBlogs(this.userInfo.id).then(res => {
                this.setState({
                    blogs: res.data.blogs
                });
                this.setState({currentBlog: res.data.blogs[0]});
            });
        }
    }

    // * 点击左侧sider切换右侧显示的博客内容
    // ! 当点击的按钮是添加博客时传递过来的是博客对象
    toggleBlog(id) {
        if (typeof id !== 'object') {
            const selectedBlog = this.state.blogs.filter(item => item.id.toString() === id.toString())[0];
            this.setState({currentBlog: selectedBlog});
        } else {
            const blog = id;
            this.setState({
                currentBlog: blog,
                blogs: [
                    blog,
                    ...this.state.blogs
                ]
            });
        }
    }

    // * 将修改后的博客上传至服务器
    handleBlogUpdate(blog) {
        Blogs.update(blog.id, {
            blog
        }).then(res => {
            this.setState({
                blogs: [
                    res.data.blog,
                    ...this.state.blogs.filter(item => item.id.toString() !== blog.id.toString())
                ],
                currentBlog: {...res.data.blog}
            });
        });
    }

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
                    <UserBlogsSider
                        dataSource={this.state.blogs}
                        onDelete={this.onDelete}
                        onClick={this.toggleBlog}/>
                </Sider>
                <Content className={styles['content']}>
                    <BlogEditor
                        blog={this.state.currentBlog}
                        onBlogUpdate={this.handleBlogUpdate}
                        key={this.state.currentBlog.id + this.state.currentBlog.released.toString()}
                    />
                </Content>
            </Layout>
        </Suspense>;
    }
}

export default App;
