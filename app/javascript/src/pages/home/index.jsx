import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Row, Col, Carousel, BackTop, List, Avatar, Skeleton} from 'antd';
import LinkList from '../../components/link-list';
import isomorphicProps from "../../containers/isomorphicProps";

import {Blog} from '../../utils/api';

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import style from './index.module.scss';
import BlogList from "../../components/blog-list";

@isomorphicProps(['blogs', 'hot_blogs', 'hot_authors'])
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            blogs: this.props.blogs || [],
            hotAuthors: this.props.hot_authors || [],
            hotBlogs: this.props.hot_blogs || []
        }
    }

    componentDidMount() {
        if (this.state.blogs.length === 0) {
            this.setState({loading: true})
            Blog.index(1).then(res => {
                this.setState({
                    loading: false,
                    blogs: [...res.blogs],
                    hotAuthors: [...res.hot_authors],
                    hotBlogs: [...res.hot_blogs]
                })
            })
        }

    }

    render() {
        return <Row>
            <Col span={14} offset={5}>
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

                        <Skeleton loading={this.state.loading} active avatar round={true}>
                            <BlogList dataSource={this.state.blogs}/>
                        </Skeleton>
                    </Col>
                    <Col span={5} offset={1}>
                        <LinkList
                            title={'热门作者'}
                            dataSource={this.state.hotAuthors}
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

export default Home;