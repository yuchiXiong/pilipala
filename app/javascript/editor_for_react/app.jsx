import React, { Suspense } from 'react';
import Cropper from 'react-cropper';
import { Layout, Modal, Upload, Button } from 'antd';

import 'cropperjs/dist/cropper.css';

const AppSider = React.lazy(() => import('./components/sider'));
const AppEditor = React.lazy(() => import('./components/editor'));
import Loading from './components/loading';

import { Users, Blogs, BlogPhotos } from './utils/api';

import styles from './app.module.scss';
import request from "./utils/request";

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
            blogs: [],
            visible: false,
            fileList: [],
            image: null
        };
        this.cropperRef = React.createRef();
        this.onToggle = this.onToggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onChangeImgFile = this.onChangeImgFile.bind(this);
        this.onFinish = this.onFinish.bind(this);
        // this.onPreview = this.onPreview.bind(this);
        // this.updateCover = this.updateCover.bind(this);
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

    // * 弹出模态框
    openModal() {
        this.setState({visible: true});
    }

    // * 更新文件
    onChangeImgFile(e) {
        const files = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({image: reader.result})
        }
        reader.readAsDataURL(files[0]);
    }

    // * 上传封面
    onFinish() {
        const imageElement = this.cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.getCroppedCanvas().toBlob(file => {
            const formData = new FormData();
            formData.append('_method', 'put');
            formData.append("blog[cover]", file, 'cover.png');
            request.post(`/api/blogs/${this.state.current.id}`, formData).then(res => {
                if (res.code === 8888) {
                    this.setState({visible: false});
                }
            });
        });
    };

    render() {
        return <Suspense fallback={<Loading/>}>
            <Layout>
                <Modal
                    title="选择博客封面"
                    visible={this.state.visible}
                    footer={null}
                    destroyOnClose={true}
                    maskClosable={false}
                    onCancel={() => this.setState({visible: false})}
                >
                    <input type="file" onChange={this.onChangeImgFile}/>
                    <Button type="primary" onClick={this.onFinish}>确认</Button>
                    <Cropper
                        style={{height: 400, width: "100%"}}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={this.state.image}
                        viewMode={1}
                        guides={true}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        // onInitialized={(instance) => {
                        //     setCropper(instance);
                        // }}
                        ref={this.cropperRef}
                    />
                </Modal>
                <Sider
                    className={styles['sider']}
                    theme="light">
                    <AppSider
                        dataSource={this.state.blogs}
                        onDelete={this.onDelete}
                        onToggle={this.onToggle}
                        onCreate={this.onCreate}
                        onUpdateCover={this.openModal}
                    />
                </Sider>
                <Content className={styles['content']}>
                    <AppEditor
                        currentId={this.state.current.id}
                        onUpdate={this.onUpdate}/>
                </Content>
            </Layout>
        </Suspense>;
    }
}

export default App;