import React from 'react';
import { Input } from 'antd';
import { Editor } from '@toast-ui/react-editor';

import { BlogPhotos } from '../../utils/api';

import styles from './index.module.scss';

const ALI_OSS_DOMAIN = 'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com';

// * 创建一个用于更新文章的按钮
function createUpdateBlogBtn() {
    const button = document.createElement('button');
    button.className = 'last editor_save';
    button.innerHTML = '<p>保存</p>';
    return button;
}

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
        },
        {
            type: 'button',
            options: {
                el: createUpdateBlogBtn(),
                tooltip: '保存',
                className: 'last',
                event: 'onRelease',
                style: 'color: #333; width: auto;',
                // text: '保存',
            }
        }
    ]);
}


class AppEditor extends React.Component {

    constructor(props) {
        super(props);
        this.userInfo = gon.currentUser;
        this.editorRef = React.createRef(null);
        this.inputRef = React.createRef(null);
        this.addImageBlobHook = this.addImageBlobHook.bind(this);
    }

    componentDidMount() {
        if (this.userInfo) {
            this.updateBlogView();
            this.registReleaseEvent()
            this.registToggleReleasedSTateEvent();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateBlogView();
    }

    componentWillUnmount() {
        const mdInstance = this.editorRef.current.getInstance();
        mdInstance.eventManager.removeEventHandler('onRelease');
        mdInstance.eventManager.removeEventHandler('onToggleReleasedState');
    }

    // * 更新当前视图下的博客内容和标题
    updateBlogView() {
        this.editorRef.current.getInstance().setMarkdown(this.props.blog.content);
        this.editorRef.current.getInstance().moveCursorToStart();
        this.inputRef.current.setValue(this.props.blog.title);
        const toggle_released_state_tips = this.props.blog.released ? '取消发布' : '发布博客'
        document.querySelector(".editor_toggle_released_state p").textContent = toggle_released_state_tips;
    }

    addImageBlobHook(file, callback) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("blogId", this.props.blog.id);

        BlogPhotos.create(formData).then(res => {
            callback(ALI_OSS_DOMAIN + res.data.photoURL, '图片');
        });
    }

    // * 为md编辑器绑定自定义菜单事件
    // ! toast-ui/react-editor 未提供 removeEventType 方法
    registReleaseEvent() {
        const mdInstance = this.editorRef.current.getInstance();
        const mdInstanceEventManager = mdInstance.eventManager;
        if ( !mdInstanceEventManager._hasEventType('onRelease')) {
            mdInstanceEventManager.addEventType('onRelease');
            mdInstanceEventManager.listen('onRelease', () => {
                this.props.onUpdate({
                    ...this.props.blog,
                    title: this.inputRef.current.state.value,
                    content: mdInstance.getMarkdown()
                });
            });
        }
    }

    registToggleReleasedSTateEvent() {
        const mdInstanceEventManager = this.editorRef.current.getInstance().eventManager;
        if ( !mdInstanceEventManager._hasEventType('onToggleReleasedState')) {
            mdInstanceEventManager.addEventType('onToggleReleasedState');
            mdInstanceEventManager.listen('onToggleReleasedState', () => {
                this.props.onUpdate({
                    ...this.props.blog,
                    released: !this.props.blog.released
                });
            });
        }
    }

    render() {
        return <>
            <Input
                className={styles['input-title']}
                ref={this.inputRef}
                placeholder='博客标题'/>
            <Editor
                ref={this.editorRef}
                previewStyle="vertical"
                height="100%"
                initialEditType="markdown"
                useCommandShortcut={true}
                hooks={{addImageBlobHook: this.addImageBlobHook}}
                toolbarItems={toolbar(this.props.blog.released)}
            />
        </>;
    }
}

export default AppEditor;