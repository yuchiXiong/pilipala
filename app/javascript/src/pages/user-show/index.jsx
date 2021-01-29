import React from 'react';
import {BackTop, Col, Row, Avatar, Space, Divider, List, Button, Tabs, Skeleton, Typography, Card} from "antd";
import IsomorphicProps from '../../containers/isomorphicProps';
import style from "../blog-show/index.module.scss";
import {ReadOutlined} from "@ant-design/icons";
import BlogList from "../../components/blog-list";

const {TabPane} = Tabs;
const {Title, Paragraph} = Typography;

@IsomorphicProps(['be_visited_user', 'user_blogs'])
class UserShow extends React.Component {
    render() {
        return <Row>
            <Col span={14} offset={5}>
                <Row>
                    <Col span={18}>
                        <List
                            itemLayout="vertical"
                        >
                            <List.Item
                                key={this.props.be_visited_user.nickName}
                                extra={<Button type={'primary'}>关注</Button>}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar
                                        src={this.props.be_visited_user.avatar}/>}
                                    title={this.props.be_visited_user.nickName}
                                    description={<Space split={<Divider type={"vertical"}/>}>
                                        <Space>
                                            博客
                                            {this.props.be_visited_user.blogsCount}
                                        </Space>
                                        <Space>
                                            关注
                                            {this.props.be_visited_user.followersCount}
                                        </Space>
                                        <Space>
                                            粉丝
                                            {this.props.be_visited_user.followingCount}
                                        </Space>
                                    </Space>}
                                />
                            </List.Item>
                        </List>

                        <Tabs defaultActiveKey="blogs">
                            <TabPane tab={<span><ReadOutlined/>文章</span>} key="blogs">
                                {/*<Skeleton loading={this.state.loading} active avatar round={true}>*/}
                                <BlogList dataSource={this.props.user_blogs}/>
                                {/*</Skeleton>*/}
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={5} offset={1}>
                        <Title level={5} className={style.tag}>个人介绍</Title>
                        <Paragraph>{this.props.be_visited_user.description}</Paragraph>
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

export default UserShow;