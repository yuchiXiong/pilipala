import React from 'react';
import marked from 'marked';
import insane from 'insane';
import dayjs from 'dayjs';
import {Avatar, BackTop, Col, Row, Space, Typography} from "antd";
import {LikeOutlined, MessageOutlined, ReadOutlined, UserOutlined} from "@ant-design/icons";
import IsomorphicProps from '../../containers/isomorphicProps';

import 'highlight.js/styles/atom-one-dark';
import style from './index.module.scss';

const {Title} = Typography;

const IconText = ({icon, text}) => (
    <Space className={style.blogData}>
        {React.createElement(icon)}
        {text}
    </Space>
);

@IsomorphicProps('blog')
class BlogShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {
                title: this.props.blog?.title || '',
                content: this.props.blog?.content || '',
                commentsCount: this.props.blog?.commentsCount || 0,
                readsCount: this.props.blog?.readsCount || 0,
                likesCount: this.props.blog?.likesCount || 0,
                cover: this.props.blog?.cover || '',
                description: this.props.blog?.description || '',
                createdAt: this.props.blog?.createdAt || '',
                user: {
                    id: this.props.blog?.id || 0,
                    nickName: this.props.blog?.nickName || '',
                    email: this.props.blog?.email || '',
                    sex: this.props.blog?.sex || '',
                    description: this.props.blog?.description || '',
                    isAdmin: this.props.blog?.isAdmin || false,
                    blogsCount: this.props.blog?.blogsCount || 0,
                    followersCount: this.props.blog?.followersCount || 0,
                    followingCount: this.props.blog?.followingCount || 0,
                    avatar: this.props.blog?.avatar || '',
                }
            }
        }
    }

    render() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, language) {
                const hljs = require('highlight.js');
                const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                return hljs.highlight(validLanguage, code).value;
            }
        });
        const {blog} = this.state;

        return <Row>
            <Col span={14} offset={5}>
                <Row>
                    <Col span={18}>
                        <Title level={2}>{blog.title}</Title>
                        <span className={style.blogDesc}>
                            发布于 {dayjs(blog.createdAt).format('YYYY年MM月DD日 HH:mm:ss')}
                            <IconText icon={ReadOutlined}
                                      text={blog.readsCount}
                                      key="list-vertical-read-o"/>
                            <IconText icon={LikeOutlined}
                                      text={blog.likesCount}
                                      key="list-vertical-like-o"/>
                            <IconText icon={MessageOutlined}
                                      text={blog.commentsCount}
                                      key="list-vertical-comment"/>
                        </span>
                        <article dangerouslySetInnerHTML={{
                            __html: insane(marked(blog.content), {
                                allowedClasses: {code: '*'}
                            })
                        }}/>
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

export default BlogShow;