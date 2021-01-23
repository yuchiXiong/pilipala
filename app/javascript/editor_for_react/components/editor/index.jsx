import React from 'react';
import {Input, Spin, Typography, Avatar, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';

import {Blog, BlogPhoto} from '../../utils/api';
import hljs from 'highlight.js';

import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark';

import styles from './index.module.scss';
import './editor.scss';

const {Title} = Typography;

const ALI_OSS_DOMAIN = 'https://assets.bubuyu.top';

// * 创建一个用户切换发布状态的按钮
function createToggleReleasedStateBtn(releasedState) {
    const button = document.createElement('button');
    button.className = 'last editor_toggle_released_state';
    button.innerHTML = `<p>${releasedState ? '取消发布' : '发布博客'}</p>`;
    return button;
}

class AppEditor extends React.Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.counter = 0;
        this.state = {
            loading: false,
            current: {}
        }
        this.editorRef = React.createRef();
        this.inputRef = React.createRef();
        this.fetchBlog = this.fetchBlog.bind(this);
        this.addImageBlobHook = this.addImageBlobHook.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleToggleReleasedState = this.handleToggleReleasedState.bind(this);
    }

    componentDidMount() {
        this.fetchBlog(this.props.currentId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentId !== this.props.currentId) {
            this.fetchBlog(this.props.currentId);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    // * 更新当前视图下的博客内容和标题
    updateBlogView() {
        this.editorRef.current.getInstance().setMarkdown(this.state.current.content);
        this.editorRef.current.getInstance().moveCursorToStart();
        this.inputRef.current.setValue(this.state.current.title);
    }

    addImageBlobHook(file, callback) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("blogId", this.props.currentId);

        BlogPhoto.create(formData).then(res => {
            callback(ALI_OSS_DOMAIN + res.data.photoURL, '图片');
        });
    }

    handleToggleReleasedState() {
        Blog.update(this.props.currentId, {
            title: this.inputRef.current.state.value,
            content: this.editorRef.current.getInstance().getMarkdown(),
            released: !this.state.current.released
        }).then(res => {
            if (res.code === 8888) {
                this.setState({
                    current: {
                        ...this.state.current,
                        released: res.data.blog.released
                    }
                })
            }
        });
    }

    handleEditorChange(e) {
        if (this.state.currentId !== -1 && this.counter > 0) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                document.title = '自动保存……';
                Blog.update(this.props.currentId, {
                    title: this.inputRef.current.state.value,
                    content: this.editorRef.current.getInstance().getMarkdown()
                }).then(res => {
                    if (res.code === 8888) {
                        this.props.onUpdate(res.data.blog);
                        document.title = `${dayjs().format('HH:mm:ss')} 已为您自动保存`;
                    }
                });
            }, 1000);
        }
        this.counter += 1;
    }

    fetchBlog(id) {
        if (id !== -1) {
            this.setState({loading: true})
            Blog.show(id).then(res => {
                this.setState({
                    current: res.data.blog,
                    loading: false
                });
                this.updateBlogView();
            });
        }
    }

    render() {
        return <>
            {
                this.props.currentId !== -1 ?
                    <Spin wrapperClassName={'editor_container'}
                          spinning={this.state.loading}
                          size={'large'}
                          tip={'精彩内容即将呈现'}>
                        <section className={styles['input_title']}>
                            <Input
                                ref={this.inputRef}
                                placeholder='为博客取个标题……'/>
                            <Button type={"link"}
                                    onClick={this.handleToggleReleasedState}>{this.state.current.released ? '取消发布' : '发布文章'}</Button>
                            <Avatar size={36} icon={<UserOutlined/>}
                                    src={ALI_OSS_DOMAIN + window.gon.currentUser.avatar.url}/>
                        </section>
                        <Editor
                            ref={this.editorRef}
                            onChange={this.handleEditorChange}
                            previewStyle="vertical"
                            height="100%"
                            initialEditType="markdown"
                            useCommandShortcut={true}
                            previewHighlight={true}
                            hooks={{addImageBlobHook: this.addImageBlobHook}}
                            toolbarItems={[]}
                            plugins={[[codeSyntaxHighlight, {hljs}]]}
                        />
                    </Spin> : <section className={styles['website_place_holder']}>
                        <Title level={2}>Burogu</Title>
                    </section>
            }

        </>;
    }
}

export default AppEditor;