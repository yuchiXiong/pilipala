import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Avatar, BackTop, Carousel, Col, List, Row, Skeleton} from 'antd';
import LinkList from '../../components/link-list';
import isomorphicProps from "../../containers/isomorphicProps";

import {Blog, User} from '../../utils/api';

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import style from './index.module.scss';
import BlogList from "../../components/blog-list";

@isomorphicProps(['blogs', 'hotBlogs', 'hotAuthors'])
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blogsLoading: false,
            blogs: this.props.blogs,
            hotAuthorsLoading: false,
            hotAuthors: this.props.hotAuthors,
            hotBlogsLoading: false,
            hotBlogs: this.props.hotBlogs
        };
    }

    componentDidMount() {
        if (window.__REACT_RAILS_SSR__ === null) {
            this.setState({
                blogsLoading: true,
                hotAuthorsLoading: true,
                hotBlogsLoading: true
            });
            Blog.index(1).then(res => {
                this.setState({
                    blogsLoading: false,
                    blogs: res.data.blogs
                });
            });
            Blog.hots().then(res => {
                this.setState({
                    hotBlogsLoading: false,
                    hotBlogs: res.data.blogs
                });
            });
            User.hots().then(res => {
                this.setState({
                    hotAuthorsLoading: false,
                    hotAuthors: res.data.users
                });
            });
        }
    }

    render() {
        return <Row>
            <Col span={16} offset={4}>
                <Row>
                    <Col span={18}>
                        <Carousel autoplay>
                            {
                                [default1, default2].map(item => <div className={style.carousel_item}
                                                                      key={default1.toString()}>
                                    <img src={item} alt='default1.png'/>
                                </div>)
                            }
                        </Carousel>

                        <Skeleton loading={this.state.blogsLoading} active avatar round={true}>
                            <BlogList dataSource={this.state.blogs}/>
                        </Skeleton>
                    </Col>
                    <Col span={5} offset={1}>
                        <LinkList
                            title={'热门作者'}
                            dataSource={this.state.hotAuthors}
                            loading={this.state.hotAuthorsLoading}
                            renderItem={item => <List.Item>
                                <List.Item.Meta
                                    className={style.hotsAuthor}
                                    avatar={<Avatar src={item.avatar}/>}
                                    title={<p className={style.nickName}>
                                        <Link
                                            to={`/u/${item.spaceName}`}>
                                            {item.nickName}
                                        </Link>
                                    </p>}
                                    description={<small>{item.description || '这个人很懒，什么都没有留下……'}</small>}
                                />
                            </List.Item>}
                        />

                        <LinkList
                            title={'大家都在看'}
                            dataSource={this.state.hotBlogs}
                            loading={this.state.hotBlogsLoading}
                            renderItem={item => <List.Item>
                                <NavLink
                                    to={`/blogs/${item.id}`}
                                    target={"_blank"}
                                >
                                    {item.title}
                                </NavLink>
                            </List.Item>}
                        />
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

Home.defaultProps = {
    loading: false,
    blogs: [],
    hotAuthors: [],
    hotBlogs: []
};

export default Home;