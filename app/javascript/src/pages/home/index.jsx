import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Avatar, BackTop, Carousel, Col, List, Row} from 'antd';
import LinkList from '../../components/link-list';

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import style from './index.module.scss';
import BlogList from "../../components/blog-list";
import {fetchBlogs} from "./store/actions";

@connect(state => state.blogPage,
    dispatch => {
        return {
            fetchBlogs: pageNo => dispatch(fetchBlogs(pageNo))
        }
    })
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        if (window.__REACT_RAILS_SSR__ === null) {
            //     this.setState({
            //         blogsLoading: true,
            //         hotAuthorsLoading: true,
            //         hotBlogsLoading: true
            //     });
            // Blog.index(1).then(res => {
            //     this.props.fetchBlogs(res.data.blogs);
            //     // this.setState({
            //     //     blogsLoading: false,
            //     //     blogs: res.data.blogs
            //     // });
            // });
            //     Blog.hots().then(res => {
            //         this.setState({
            //             hotBlogsLoading: false,
            //             hotBlogs: res.data.blogs
            //         });
            //     });
            //     User.hots().then(res => {
            //         this.setState({
            //             hotAuthorsLoading: false,
            //             hotAuthors: res.data.users
            //         });
            //     });
        }
    }

    loadMore(pageNo) {
        this.props.fetchBlogs(pageNo);
    }

    render() {
        const {
            pageNo,
            noMore,
            blogsLoading,
            blogs,
            hotAuthorsLoading,
            hotAuthors,
            hotBlogsLoading,
            hotBlogs
        } = this.props;
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

                        <BlogList
                            pageNo={pageNo}
                            dataSource={blogs}
                            noMore={noMore}
                            loading={blogsLoading}
                            onLoad={this.loadMore}
                        />
                    </Col>
                    <Col span={5} offset={1}>
                        <LinkList
                            title={'热门作者'}
                            dataSource={hotAuthors}
                            loading={hotAuthorsLoading}
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
                            dataSource={hotBlogs}
                            loading={hotBlogsLoading}
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