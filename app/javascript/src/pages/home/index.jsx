import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Carousel, Divider, List, Typography} from 'antd';
import isomorphicProps from "../../containers/isomorphicProps";

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import styles from './index.module.scss';
import BlogList from "../../components/blog-list";
import {LikeOutlined, MessageOutlined, ReadOutlined, UserOutlined} from "@ant-design/icons";

const {Title} = Typography;

@isomorphicProps(['blogs', 'hots'])
class Home extends React.PureComponent {
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

                        <BlogList dataSource={this.props.blogs}/>
                    </Col>
                    <Col span={5} offset={1}>
                        <Title level={5} className={styles.tag}>热门作者</Title>
                        <List
                            size="large"
                            itemLayout="vertical"
                            bordered={false}
                            dataSource={this.props.hots}
                            className={styles.hotsAuthor}
                            renderItem={item => <List.Item actions={[
                                <p className={styles.action}>阅读 {item.readsCount}</p>,
                                <p className={styles.action}>喜欢 {item.likesCount}</p>
                            ]}>
                                <Link to={`/blogs/${item.id}`}>{item.title}</Link>
                            </List.Item>}
                        />
                        {/*<Title level={5} className={styles.tag}>大家都在看</Title>*/}
                        {/*<List*/}
                        {/*    size="large"*/}
                        {/*    bordered={false}*/}
                        {/*    dataSource={this.props.hots}*/}
                        {/*    renderItem={item => <List.Item>*/}
                        {/*        <Link to={`/blogs/${item.id}`}>{item.title}</Link>*/}
                        {/*    </List.Item>}*/}
                        {/*/>*/}
                    </Col>
                </Row>
            </Col>
        </Row>
    }
}

export default Home;