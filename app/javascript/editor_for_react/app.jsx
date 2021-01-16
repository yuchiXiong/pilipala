import React, {Suspense} from 'react';
import Turbolinks from 'turbolinks';
import Cropper from 'react-cropper';
import {Layout, Modal, Upload, Button, Drawer, Typography, message} from 'antd';
import {UploadOutlined, MenuOutlined, InboxOutlined} from '@ant-design/icons';

const AppSider = React.lazy(() => import('./components/sider'));
const AppEditor = React.lazy(() => import('./components/editor'));

import 'cropperjs/dist/cropper.css';
import Loading from './components/loading';

import {User} from './utils/api';
import request from "./utils/request";

import './app.scss';
import styles from './app.module.scss';
// import './antd_reset.less.backup';

const {Sider, Content} = Layout;
const {Title} = Typography
const {Dragger} = Upload;

Turbolinks.start();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.userInfo = gon.currentUser;
        this.state = {
            currentId: -1,
            // * 当前用户的博客列表
            blogs: [],
            visible: false,
            fileList: [],
            image: null,
            showMenu: false,
            currentStep: 0
        };
        this.cropperRef = React.createRef();
        this.onToggle = this.onToggle.bind(this);
        this.createNewBlog = this.createNewBlog.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onChangeImgFile = this.onChangeImgFile.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onEditorUpload = this.onEditorUpload.bind(this);
        this.onChangeImgFileClose = this.onChangeImgFileClose.bind(this);
    }

    // * 组件挂载后拉取当前用户的博客列表
    componentDidMount() {
        if (this.userInfo) {
            User.userBlog(this.userInfo.id).then(res => {
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
        this.setState({currentId: id});
    }

    // * 添加一篇新的博客
    createNewBlog(blog) {
        this.setState({
            currentId: blog.id,
            blogs: [
                blog,
                ...this.state.blogs
            ]
        });
    }

    // * 请求服务器删除一篇博客并更新客户端博客列表
    onDelete(id) {
        const newBlogs = [...this.state.blogs.filter(item => item.id.toString() !== id.toString())];
        this.setState({
            currentId: newBlogs[0].id,
            blogs: newBlogs
        });
    }

    // * 弹出模态框
    openModal() {
        this.setState({visible: true});
    }

    // * 更新文件
    onChangeImgFile(e) {
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({image: reader.result})
        }
        reader.readAsDataURL(e.file.originFileObj);
    }

    // * 上传封面
    onFinish() {
        const imageElement = this.cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.getCroppedCanvas().toBlob(file => {
            const formData = new FormData();
            formData.append('_method', 'put');
            formData.append("blog[cover]", file, 'cover.png');
            request.post(`/api/blogs/${this.state.currentId}`, formData).then(res => {
                if (res.code === 8888) {
                    this.setState({
                        visible: false,
                        image: null
                    });
                    message.success('设置成功!');
                }
            });
        });
    };

    // * 关闭上传文件模态框
    onChangeImgFileClose() {
        this.setState({
            visible: false,
            image: null
        })
    }

    onEditorUpload(blog) {
        let index = -1;
        this.state.blogs.map((item, _index) => {
            if (item.id === blog.id) index = _index;
        });
        this.state.blogs[index] = blog;
        this.setState({
            blogs: [
                ...this.state.blogs
            ]
        })
    }

    returnHome() {
        Turbolinks.visit('/');
    }


    render() {
        return <Suspense fallback={<Loading/>}>
            <Layout>
                <Modal
                    title="为博文选择一张封面"
                    visible={this.state.visible}
                    footer={this.state.image ? <Button type="primary" onClick={this.onFinish}>完成</Button> : null}
                    destroyOnClose={true}
                    maskClosable={false}
                    onCancel={this.onChangeImgFileClose}
                >
                    {
                        this.state.image ?
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
                                ref={this.cropperRef}
                            /> :
                            <Dragger
                                name={'file'}
                                multiple={false}
                                customRequest={null}
                                onChange={this.onChangeImgFile}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">为博文选择一张封面</p>
                                <p className="ant-upload-hint">
                                    点击或拖拽文件到此处进行上传。
                                </p>
                            </Dragger>

                    }
                </Modal>
                <Drawer
                    title="我的文章列表"
                    width={360}
                    placement={'left'}
                    onClose={() => this.setState({showMenu: false})}
                    visible={this.state.showMenu}
                    // bodyStyle={{paddingBottom: 80}}
                    footer={
                        <Title className={styles['return_home_btn']}
                               level={4}
                               onClick={() => this.returnHome()}>
                            {/*<LeftOutlined/>*/}
                            <img src='/website.svg' alt='website logo' style={{height: '20px'}}/>
                            Burogu
                        </Title>
                    }
                >
                    <Sider
                        className={styles['sider']}
                        theme="light">
                        <AppSider
                            defaultSelect={this.state.currentId}
                            dataSource={this.state.blogs}
                            onDelete={this.onDelete}
                            onToggle={this.onToggle}
                            createNewBlog={this.createNewBlog}
                            onUpdateCover={this.openModal}
                        />
                    </Sider>
                </Drawer>
                <Button
                    type="primary"
                    onClick={() => this.setState({showMenu: !this.state.showMenu})}
                    className={styles['menu_btn']}
                    style={{left: this.state.showMenu ? 360 : 0}}
                >
                    <MenuOutlined style={{fontSize: '20px'}}/>
                </Button>
                <Content className={styles['content']}>
                    <AppEditor
                        currentId={this.state.currentId}
                        onUpdate={this.onEditorUpload}
                    />
                </Content>
            </Layout>
        </Suspense>;
    }
}

export default App;