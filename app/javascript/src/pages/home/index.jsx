import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Carousel, BackTop, List, Typography, Avatar, Skeleton} from 'antd';
import isomorphicProps from "../../containers/isomorphicProps";

import {Blog} from '../../utils/api';

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import styles from './index.module.scss';
import BlogList from "../../components/blog-list";

const {Title} = Typography;

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
                                [default1, default2].map(item => <div className={styles.carousel_item}
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
                        <Title level={5} className={styles.tag}>大家都在看</Title>
                        <Skeleton loading={this.state.loading} active avatar paragraph={false} round={true}>
                            <List
                                size="large"
                                bordered={false}
                                // loading={this.state.loading}
                                itemLayout="horizontal"
                                dataSource={this.state.hotAuthors}
                                className={styles.hotsModule}
                                renderItem={item => <List.Item>
                                    <List.Item.Meta
                                        className={styles.hotsAuthor}
                                        avatar={<Avatar src={item.avatar}/>}
                                        title={<p className={styles.nickName}>
                                            <Link
                                                to={`/users/${item.id}`}>
                                                {item.nickName}
                                            </Link>
                                        </p>}
                                        description={<small>{item.description || '这个人很懒，什么都没有留下……'}</small>}
                                    />
                                </List.Item>}
                            />
                        </Skeleton>

                        <Title level={5} className={styles.tag}>大家都在看</Title>
                        <Skeleton loading={this.state.loading} active avatar paragraph={false} round={true}>
                            <List
                                size="large"
                                itemLayout="vertical"
                                bordered={false}
                                loading={this.state.loading}
                                dataSource={this.state.hotBlogs}
                                className={styles.hotsModule}
                                renderItem={item => <List.Item actions={[
                                    <p className={styles.action}>阅读 {item.readsCount}</p>,
                                    <p className={styles.action}>喜欢 {item.likesCount}</p>
                                ]}>
                                    <Link to={`/blogs/${item.id}`}>{item.title}</Link>
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

export default Home;