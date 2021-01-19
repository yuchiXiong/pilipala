import React from 'react';
import {Link} from 'react-router-dom';
import {List, Button, Space, Typography} from 'antd';
import {MessageOutlined, LikeOutlined, ReadOutlined, UserOutlined} from '@ant-design/icons';

import {Blog} from '../../utils/api';

import styles from './index.module.scss';
import IsomorphicRouter from "../../routes";

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const {Paragraph} = Typography;

class BlogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initLoading: false,
            loading: false,
            blogList: props.dataSource,
            page: 1
        };


    }

    componentDidMount() {
        console.log('client render')
    }

    onLoadMore = () => {
        // this.setState({
        //     loading: true
        // });
        // Blog.index(this.state.page).then(res => {
        //     this.setState({
        //         initLoading: res.blogs.length === 0,
        //         loading: false,
        //         blogList: [...this.state.blogList, ...res.blogs],
        //         page: this.state.page + 1
        //     }, () => window.dispatchEvent(new Event('resize')))
        // })
    };

    render() {
        const {initLoading, loading} = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button
                        onClick={this.onLoadMore}
                        className={styles.loadingMore}
                        type={'primary'}
                        block>
                        加载更多
                    </Button>
                </div>
            ) : <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button
                    onClick={this.onLoadMore}
                    className={styles.loadingMore}
                    type={'primary'}
                    disabled
                    block>
                    已无更多内容
                </Button>
            </div>;

        return (
            <List
                loading={loading}
                itemLayout="vertical"
                loadMore={loadMore}
                dataSource={this.state.blogList}
                className={styles.list}
                renderItem={item => (
                    <Link to={`/blogs/${item.id}`}>
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={ReadOutlined} text={item.readsCount} key="list-vertical-read-o"/>,
                                <IconText icon={LikeOutlined} text={item.likesCount} key="list-vertical-like-o"/>,
                                <IconText icon={MessageOutlined} text={item.commentsCount}
                                          key="list-vertical-comment"/>,
                                <IconText icon={UserOutlined} text={item.user.nickName}
                                          key="list-vertical-user-nick-name"/>,
                            ]}
                            extra={
                                item.cover && <img
                                    width={'200px'}
                                    alt="logo"
                                    src={item.cover}
                                    className={styles.cover}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={item.title}
                            />
                            <Paragraph ellipsis={{rows: 4}} className={styles.content}>
                                {item.content}
                            </Paragraph>
                        </List.Item>
                    </Link>
                )}
            />
        );
    }
}

export default BlogList;