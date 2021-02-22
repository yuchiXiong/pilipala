import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import marked from 'marked';
import insane from 'insane';
import dayjs from 'dayjs';
import hljs from 'highlight.js';
import {
    Avatar,
    BackTop,
    Button,
    Card,
    Col,
    Comment,
    Divider,
    Form,
    Input,
    List,
    Row,
    Skeleton,
    Space,
    Typography
} from "antd";
import {LikeOutlined, MessageOutlined, ReadOutlined} from "@ant-design/icons";
import {fetchAuthorsOtherBlogs, fetchBlog, replyComments} from './store/actions';

import IconText from '../../components/icon-text';
import 'highlight.js/styles/atom-one-dark';
import style from './index.module.scss';
import markdownStyle from './markdown.module.scss';

const {Title, Text} = Typography;
const {Meta} = Card;
const {TextArea} = Input;

const BlogComment = props => <Comment
    actions={[props.canReply && <span key="comment-nested-reply-to" onClick={props.onReply}>回复</span>,
        <span>发布于 {props.createdAt}</span>]}
    author={<a>{props.author}</a>}
    avatar={
        <Avatar
            src={props.avatar}
            alt={props.author}
        />
    }
    content={
        <p>{props.content}</p>
    }
>
    {props.children}
</Comment>

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <Comment
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <>
                <Form.Item>
                    <TextArea rows={4} onChange={onChange} value={value}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={submitting} onClick={onSubmit}
                            type="primary">
                        发布评论
                    </Button>
                </Form.Item>
            </>
        }
    />
);

@connect(state => state.blogShowPage,
    dispatch => {
        return {
            fetchBlog: (id, callback) => dispatch(fetchBlog(id, callback)),
            fetchAuthorsOtherBlogs: (spaceName, callback) => dispatch(fetchAuthorsOtherBlogs(spaceName, callback)),
            replyComments: (id, comment, callback) => dispatch(replyComments(id, comment, callback))
        }
    })
class BlogShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchBlogLoading: false,
            fetchBlogCommentsLoading: false,
            fetchAuthorsOtherBlogs: false,
            replyToBlogText: '',
            replyToCommentText: '',
            replyTo: -1
        };
        this.reply = this.reply.bind(this);
    }

    componentDidMount() {
        document.querySelectorAll('article pre>code').forEach(item => hljs.highlightBlock(item));
        if (window.__REACT_RAILS_SSR__ !== this.props.match.url) {
            this.setState({
                fetchBlogLoading: true,
                fetchAuthorsOtherBlogs: true
            });
            this.props.fetchBlog(this.props.match.params.id, () => {
                this.setState({fetchBlogLoading: false});
                this.props.fetchAuthorsOtherBlogs(this.props.blog.user.spaceName, () => this.setState({fetchAuthorsOtherBlogs: false}));
            });

        }
    }

    subComments(comments, id) {
        return comments.filter(item => item.commentId === id)
    }

    reply(comment) {
        if (comment.trim().length > 0) {
            this.props.replyComments(this.props.blog.id,
                {
                    content: comment,
                    comment_id: this.state.replyTo === -1 ? null : this.state.replyTo
                }, () => {
                    this.setState({replyToCommentText: '', replyToBlogText: ''});
                });
        }
    }

    render() {
        const {blog, otherBlogs, comments} = this.props;

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
                                title={<Title level={4}>
                                    <NavLink
                                        to={`/u/${blog.user.spaceName}`}>{blog.user.nickName}</NavLink>
                                </Title>}
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

                        <Card title={<Title level={4}>评论</Title>} bordered={false}>
                            <Text>共有 {comments.length} 条评论</Text>

                            <Editor
                                value={this.state.replyToBlogText}
                                onChange={e => this.setState({replyToBlogText: e.target.value})}
                                onSubmit={e => this.reply(this.state.replyToBlogText)}
                            />

                            {
                                comments.map(comment => {
                                    return comment.commentId === null && <BlogComment
                                        author={comment.user.nickName}
                                        avatar={comment.user.avatar}
                                        content={comment.content}
                                        key={comment.id}
                                        onReply={() => this.setState({replyTo: comment.id})}
                                        createdAt={comment.createdAt}
                                    >
                                        {this.subComments(comments, comment.id).map(subComment => {
                                            return <BlogComment
                                                author={subComment.user.nickName}
                                                avatar={subComment.user.avatar}
                                                content={subComment.content}
                                                key={subComment.id}
                                                onReply={() => this.setState({replyTo: subComment.id})}
                                                canReply={false}
                                                createdAt={subComment.createdAt}
                                            />
                                        })}
                                        {
                                            (this.state.replyTo === comment.id ||
                                                this.subComments(comments, comment.id).map(item => item.id).includes(this.state.replyTo)) &&
                                            <Editor
                                                key={'replyTo'}
                                                value={this.state.replyToCommentText}
                                                onChange={e => this.setState({replyToCommentText: e.target.value})}
                                                onSubmit={e => this.reply(this.state.replyToCommentText)}
                                            />
                                        }
                                    </BlogComment>
                                })
                            }
                        </Card>

                    </Col>
                    <Col span={5} offset={1}>
                        <Skeleton loading={false} active avatar paragraph={false} round={true}>
                            <Title level={5} className={style.tag}>该作者的其它文章</Title>
                            <List
                                size="large"
                                itemLayout="vertical"
                                bordered={false}
                                loading={false}
                                dataSource={otherBlogs}
                                className={style.hotsModule}
                                renderItem={item => <List.Item actions={[
                                    <p className={style.action}>阅读 {item.readsCount}</p>,
                                    <p className={style.action}>喜欢 {item.likesCount}</p>
                                ]}>
                                    <NavLink to={`/blogs/${item.id}`}>{item.title}</NavLink>
                                </List.Item>}
                            />
                        </Skeleton>
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

BlogShow.defaultProp = {
    blog: {
        title: '',
        content: '',
        commentsCount: 0,
        readsCount: 0,
        likesCount: 0,
        cover: '',
        description: '',
        createdAt: '',
        user: {
            id: 0,
            spaceName: '',
            nickName: '',
            email: '',
            sex: '',
            description: '',
            isAdmin: false,
            blogsCount: 0,
            followersCount: 0,
            followingCount: 0,
            avatar: '',
        }
    },
    otherBlogs: []
};

export default BlogShow;