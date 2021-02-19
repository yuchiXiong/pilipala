import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Avatar, BackTop, Carousel, Col, List, Row} from 'antd';
import LinkList from '../../components/link-list';

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import style from './index.module.scss';
import BlogList from "../../components/blog-list";
import {fetchBlogs, fetchPopularAuthors} from "./store/actions";

@connect(state => state.blogPage,
    dispatch => {
        return {
            fetchBlogs: (pageNo, callback) => dispatch(fetchBlogs(pageNo, callback)),
            fetchPopularAuthors: callback => dispatch(fetchPopularAuthors(callback))
        }
    })
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchBlogsLoading: false,
            fetchPopularAuthorsLoading: false
        };

    }

    componentDidMount() {
        if (window.__REACT_RAILS_SSR__ !== this.props.match.url) {
            this.setState({
                fetchBlogsLoading: true
            });
            this.props.fetchBlogs(this.props.pageNo, () => this.setState({fetchBlogsLoading: false}));
            this.setState({fetchPopularAuthorsLoading: true});
            this.props.fetchPopularAuthors(() => this.setState({fetchPopularAuthorsLoading: false}));
        }
    }

    render() {
        const {
            pageNo,
            noMore,
            blogs,
            popularAuthors,
            hotBlogs,
            fetchBlogs
        } = this.props;
        const {
            fetchBlogsLoading
        } = this.state;
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
                            loading={fetchBlogsLoading}
                            onLoad={() => fetchBlogs(pageNo, () => {
                            })}
                        />
                    </Col>
                    <Col span={5} offset={1}>
                        <LinkList
                            title={'热门作者'}
                            dataSource={popularAuthors}
                            loading={false}
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
                            loading={false}
                            renderItem={item => <List.Item>
                                <NavLink
                                    to={`/blogs/${item.id}`}
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

export default Home;