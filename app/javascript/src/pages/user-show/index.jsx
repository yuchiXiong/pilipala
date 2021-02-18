import React from 'react';
import {connect} from 'react-redux';
import {Avatar, BackTop, Button, Col, Divider, List, Row, Skeleton, Space, Tabs, Typography} from "antd";
import blogShowStyle from "../blog-show/index.module.scss";
import {ReadOutlined} from "@ant-design/icons";
import BlogList from "../../components/blog-list";
import {fetchBeVisitedUser, fetchBeVisitedUserBlogs} from './store/actions';

const {TabPane} = Tabs;
const {Title, Paragraph} = Typography;

@connect(state => state.userPage,
    dispatch => {
        return {
            fetchBeVisitedUser: (spaceName, callback) => dispatch(fetchBeVisitedUser(spaceName, callback)),
            fetchBeVisitedUserBlogs: (spaceName, pageNo, callback) => dispatch(fetchBeVisitedUserBlogs(spaceName, pageNo, callback))
        }
    })
class UserShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchBeVisitedUserLoading: false,
            fetchBeVisitedUserBlogsLoading: false
        };
    }

    componentDidMount() {
        if (window.__REACT_RAILS_SSR__ !== this.props.match.url) {
            const spaceName = this.props.match.params.spaceName;
            this.setState({
                fetchBeVisitedUserLoading: true
            });
            this.props.fetchBeVisitedUser(spaceName, () => this.setState({
                fetchBeVisitedUserLoading: false
            }));

            this.setState({
                fetchBeVisitedUserBlogsLoading: true
            });
            this.props.fetchBeVisitedUserBlogs(spaceName, this.props.userBlogsPageNo, () => this.setState({
                fetchBeVisitedUserBlogsLoading: false
            }));
        }
    }

    render() {
        const {
            beVisitedUser,
            userBlogs,
            userBlogsPageNo,
            userBlogsNoMore,
            fetchBeVisitedUserBlogs
        } = this.props;
        const {
            fetchBeVisitedUserLoading,
            fetchBeVisitedUserBlogsLoading
        } = this.state;
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
                                <Skeleton loading={fetchBeVisitedUserLoading} active avatar>
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
                                </Skeleton>

                            </List.Item>
                        </List>

                        <Tabs defaultActiveKey="blogs">
                            <TabPane tab={<span><ReadOutlined/>文章</span>} key="blogs">
                                <Skeleton loading={fetchBeVisitedUserBlogsLoading} active avatar round={true}>
                                    <BlogList
                                        pageNo={userBlogsPageNo}
                                        loading={fetchBeVisitedUserBlogsLoading}
                                        noMore={userBlogsNoMore}
                                        onLoad={() => fetchBeVisitedUserBlogs(beVisitedUser.spaceName, userBlogsPageNo, () => {

                                        })}
                                        dataSource={userBlogs}
                                        user={beVisitedUser.spaceName}/>
                                </Skeleton>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={5} offset={1}>
                        <Title level={5} className={blogShowStyle.tag}>个人介绍</Title>
                        <Paragraph>{beVisitedUser.description}</Paragraph>
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

export default UserShow;