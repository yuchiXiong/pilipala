import React from 'react';
import {connect} from 'react-redux';
import {Avatar, BackTop, Button, Col, Divider, List, Row, Skeleton, Space, Tabs, Typography} from "antd";
import blogShowStyle from "../blog-show/index.module.scss";
import {ReadOutlined} from "@ant-design/icons";
import BlogList from "../../components/blog-list";
import {fetchBeVisitedUser} from './store/actions';

const {TabPane} = Tabs;
const {Title, Paragraph} = Typography;

@connect(state => state.userPage,
    dispatch => {
        return {
            fetchBeVisitedUser: (spaceName, callback) => dispatch(fetchBeVisitedUser(spaceName, callback))
        }
    })
class UserShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchBeVisitedUserLoading: false
        };
    }

    componentDidMount() {
        if (window.__REACT_RAILS_SSR__ !== this.props.match.url) {
            this.setState({
                fetchBeVisitedUserLoading: true
            });
            this.props.fetchBeVisitedUser(this.props.match.params.spaceName, () => this.setState({
                fetchBeVisitedUserLoading: false
            }));
        }
    }

    render() {
        const {
            beVisitedUser,
            userBlogs
        } = this.props;
        const {
            fetchBeVisitedUserLoading
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
                                {/*<Skeleton loading={this.state.loading} active avatar round={true}>*/}
                                <BlogList
                                    dataSource={userBlogs}
                                    user={beVisitedUser.spaceName}/>
                                {/*</Skeleton>*/}
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