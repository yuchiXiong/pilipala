import React from 'react';
import {Input} from 'antd';
import {Editor} from '@toast-ui/react-editor';
import dayjs from 'dayjs';

import Loading from '../loading';

import {Blogs, BlogPhotos} from '../../utils/api';
import hljs from 'highlight.js';

import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import styles from './index.module.scss';
import './editor.scss';

const ALI_OSS_DOMAIN = 'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com';

// * 创建一个用户切换发布状态的按钮
function createToggleReleasedStateBtn(releasedState) {
    const button = document.createElement('button');
    button.className = 'last editor_toggle_released_state';
    button.innerHTML = `<p>${releasedState ? '取消发布' : '发布博客'}</p>`;
    return button;
}

// * 自定义编辑器工具栏
const toolbar = released => {
    return ([
        'heading',
        'bold',
        'italic',
        'strike',
        'divider',
        'hr',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        'image',
        'link',
        'divider',
        'code',
        'codeblock',
        'divider',
        {
            type: 'button',
            options: {
                el: createToggleReleasedStateBtn(released),
                tooltip: '发布更新',
                className: 'last',
                event: 'onToggleReleasedState',
                style: 'color: #333; width: auto; margin-left: auto;',
                // text: '保存',
            }
        }
    ]);
}

class AppEditor extends React.Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            loading: false,
            current: {}
        }
        this.editorRef = React.createRef();
        this.inputRef = React.createRef();
        this.fetchBlog = this.fetchBlog.bind(this);
        this.addImageBlobHook = this.addImageBlobHook.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
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
        const mdInstance = this.editorRef.current.getInstance();
        mdInstance.eventManager.removeEventHandler('onRelease');
        mdInstance.eventManager.removeEventHandler('onToggleReleasedState');
    }

    // * 更新当前视图下的博客内容和标题
    updateBlogView() {
        this.editorRef.current.getInstance().setMarkdown(this.state.current.content);
        this.editorRef.current.getInstance().moveCursorToStart();
        this.inputRef.current.setValue(this.state.current.title);
        const toggle_released_state_tips = this.state.current.released ? '取消发布' : '发布博客'
        document.querySelector(".editor_toggle_released_state p").textContent = toggle_released_state_tips;
    }

    addImageBlobHook(file, callback) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("blogId", this.props.currentId);

        BlogPhotos.create(formData).then(res => {
            callback(ALI_OSS_DOMAIN + res.data.photoURL, '图片');
        });
    }

    // * 为md编辑器绑定自定义菜单事件
    // ! toast-ui/react-editor 未提供 removeEventType 方法
    registToggleReleasedSTateEvent() {
        const mdInstanceEventManager = this.editorRef.current.getInstance().eventManager;
        if (!mdInstanceEventManager._hasEventType('onToggleReleasedState')) {
            mdInstanceEventManager.addEventType('onToggleReleasedState');
            mdInstanceEventManager.listen('onToggleReleasedState', () => {
                this.props.onUpdate({
                    ...this.props.blog,
                    released: !this.props.blog.released
                });
            });
        }
    }

    handleEditorChange() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            document.title = '自动保存……';
            Blogs.update(this.props.currentId, {
                title: this.inputRef.current.state.value,
                content: this.editorRef.current.getInstance().getMarkdown()
            }).then(res => {
                if (res.code === 8888) {
                    document.title = `${dayjs().format('HH:mm:ss')} 已为您自动保存`;
                }
            });
        }, 1000);
    }

    fetchBlog(id) {
        this.setState({loading: true})
        Blogs.show(id).then(res => {
            this.setState({
                current: res.data.blog,
                loading: false
            });
            this.updateBlogView();
            this.registToggleReleasedSTateEvent();
        });
    }

    render() {
        return <>
            {this.state.loading ? <Loading/>
                : <>
                    <Input
                        className={styles['input_title']}
                        ref={this.inputRef}
                        placeholder='博客标题'/>
                    <Editor
                        ref={this.editorRef}
                        onChange={this.handleEditorChange}
                        previewStyle="vertical"
                        height="100%"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        previewHighlight={true}
                        hooks={{addImageBlobHook: this.addImageBlobHook}}
                        toolbarItems={toolbar(this.state.current.released)}
                        plugins={[[codeSyntaxHighlight, {hljs}]]}
                    />
                </>
            }
        </>;
    }
}

export default AppEditor;