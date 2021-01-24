import React from 'react';
import marked from 'marked';
import insane from 'insane';
import dayjs from 'dayjs';
import {Avatar, BackTop, Col, Row, Space, Typography, Card, Divider, List, Skeleton} from "antd";
import {
    LikeOutlined,
    MessageOutlined,
    ReadOutlined
} from "@ant-design/icons";
import IsomorphicProps from '../../containers/isomorphicProps';

import 'highlight.js/styles/atom-one-dark';
import style from './index.module.scss';
import markdownStyle from './markdown.module.scss';
import styles from "../home/index.module.scss";
import {Link} from "react-router-dom";

const {Title} = Typography;
const {Meta} = Card;

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
                    id: this.props.blog?.user.id || 0,
                    nickName: this.props.blog?.user.nickName || '',
                    email: this.props.blog?.user.email || '',
                    sex: this.props.blog?.user.sex || '',
                    description: this.props.blog?.user.description || '',
                    isAdmin: this.props.blog?.user.isAdmin || false,
                    blogsCount: this.props.blog?.user.blogsCount || 0,
                    followersCount: this.props.blog?.user.followersCount || 0,
                    followingCount: this.props.blog?.user.followingCount || 0,
                    avatar: this.props.blog?.user.avatar || '',
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

                        <Divider className={style.divider}/>

                        <Card
                            bordered={false}
                            style={{maxWidth: 300}}
                        >
                            <Meta
                                avatar={
                                    <Avatar size={'large'} src={blog.user.avatar}/>
                                }
                                title={<Title level={4}>{blog.user.nickName}</Title>}
                                description={<Space split={<Divider type={"vertical"}/>}>
                                    <Space>
                                        博客
                                        {blog.user.blogsCount}
                                    </Space>
                                    <Space>
                                        关注
                                        {blog.user.followersCount}
                                    </Space>
                                    <Space>
                                        粉丝
                                        {blog.user.followingCount}
                                    </Space>
                                </Space>}
                            />
                        </Card>

                        <Divider className={style.divider}/>

                        <article
                            className={markdownStyle.markdown}
                            dangerouslySetInnerHTML={{
                                __html: insane(marked(blog.content))
                            }}/>
                    </Col>
                    <Col span={5} offset={1}>
                        {/*<Skeleton loading={this.state.loading} active avatar paragraph={false} round={true}>*/}
                        {/*    <List*/}
                        {/*        size="large"*/}
                        {/*        itemLayout="vertical"*/}
                        {/*        bordered={false}*/}
                        {/*        loading={this.state.loading}*/}
                        {/*        dataSource={this.state.hotBlogs}*/}
                        {/*        className={styles.hotsModule}*/}
                        {/*        renderItem={item => <List.Item actions={[*/}
                        {/*            <p className={styles.action}>阅读 {item.readsCount}</p>,*/}
                        {/*            <p className={styles.action}>喜欢 {item.likesCount}</p>*/}
                        {/*        ]}>*/}
                        {/*            <Link to={`/blogs/${item.id}`}>{item.title}</Link>*/}
                        {/*        </List.Item>}*/}
                        {/*    />*/}
                        {/*</Skeleton>*/}
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

export default BlogShow;