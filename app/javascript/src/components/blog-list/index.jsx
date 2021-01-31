import React from 'react';
import {Link} from 'react-router-dom';
import insane from 'insane';
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';
import {List, Button, Typography} from 'antd';
import {MessageOutlined, LikeOutlined, ReadOutlined, UserOutlined} from '@ant-design/icons';

import IconText from '../icon-text';

import {Blog} from '../../utils/api';

import styles from './index.module.scss';

const {Paragraph} = Typography;
const renderer = new PlainTextRenderer();
class BlogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initLoading: false,
            loading: false,
            blogList: props.dataSource,
            page: 2
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dataSource.toString() !== prevState.blogList.toString()) {
            return {
                ...prevState,
                blogList: nextProps.dataSource
            }
        }
        return null;
    }

    onLoadMore = () => {
        this.setState({
            loading: true
        });
        Blog.index(this.state.page).then(res => {
            this.state.blogList = this.state.blogList.concat(res.blogs);
            console.log(this.state.blogList)
            this.setState({
                initLoading: res.blogs.length < 10,
                loading: false,
                blogList: [...this.state.blogList],
                page: this.state.page + 1
            }, () => window.dispatchEvent(new Event('resize')))
        });
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
                itemLayout="vertical"
                loadMore={loadMore}
                loading={this.state.loading}
                dataSource={this.state.blogList}
                className={styles.list}
                renderItem={item => (
                    <Link
                        to={`/blogs/${item.id}`}
                        target={'_blank'}>
                        <List.Item
                            key={item.id}
                            actions={
                                !loading && [
                                    <IconText icon={ReadOutlined} text={item.readsCount}
                                              key="list-vertical-read-o"/>,
                                    <IconText icon={LikeOutlined} text={item.likesCount}
                                              key="list-vertical-like-o"/>,
                                    <IconText icon={MessageOutlined} text={item.commentsCount}
                                              key="list-vertical-comment"/>,
                                    <IconText icon={UserOutlined} text={item.user.nickName}
                                              key="list-vertical-user-nick-name"/>,
                                ]}
                            extra={
                                !loading && item.cover && <img
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
                                {insane(marked(item.content, {
                                    renderer: renderer
                                }))}
                            </Paragraph>
                        </List.Item>
                    </Link>

                )}
            />
        );
    }
}

export default BlogList;