import React from 'react';
import {BackTop, Col, Row, Avatar, Space, Divider, List, Button, Tabs, Skeleton, Typography, Card} from "antd";
import IsomorphicProps from '../../containers/isomorphicProps';
import style from "../blog-show/index.module.scss";
import {ReadOutlined} from "@ant-design/icons";
import BlogList from "../../components/blog-list";
import {User} from '../../utils/api';

const {TabPane} = Tabs;
const {Title, Paragraph} = Typography;

@IsomorphicProps(['be_visited_user', 'user_blogs'])
class UserShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            beVisitedUser: this.props.beVisitedUser,
            userBlogs: this.props.userBlogs
        };
    }

    componentDidMount() {
        if (window.__REACT_RAILS_SSR__ === null) {
            User.show(this.props.match.params.spaceName).then(res => {
                this.setState({
                    beVisitedUser: res.be_visited_user,
                    userBlogs: res.user_blogs
                })
            });
        }
    }

    render() {
        const {beVisitedUser, userBlogs} = this.state;
        return <Row>
            <Col span={14} offset={5}>
                <Row>
                    <Col span={18}>
                        <List
                            itemLayout="vertical"
                        >
                            <List.Item
                                key={beVisitedUser.nickName}
                                extra={<Button type={'primary'}>关注</Button>}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar
                                        src={beVisitedUser.avatar}/>}
                                    title={beVisitedUser.nickName}
                                    description={<Space split={<Divider type={"vertical"}/>}>
                                        <Space>
                                            博客
                                            {beVisitedUser.blogsCount}
                                        </Space>
                                        <Space>
                                            关注
                                            {beVisitedUser.followersCount}
                                        </Space>
                                        <Space>
                                            粉丝
                                            {beVisitedUser.followingCount}
                                        </Space>
                                    </Space>}
                                />
                            </List.Item>
                        </List>

                        <Tabs defaultActiveKey="blogs">
                            <TabPane tab={<span><ReadOutlined/>文章</span>} key="blogs">
                                {/*<Skeleton loading={this.state.loading} active avatar round={true}>*/}
                                <BlogList dataSource={userBlogs}/>
                                {/*</Skeleton>*/}
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={5} offset={1}>
                        <Title level={5} className={style.tag}>个人介绍</Title>
                        <Paragraph>{beVisitedUser.description}</Paragraph>
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

UserShow.defaultProps = {
    beVisitedUser: {
        nickName: '',
        avatar: '',
        blogsCount: 0,
        followersCount: 0,
        followingCount: 0,
        description: '',
    },
    userBlogs: []
}

export default UserShow;