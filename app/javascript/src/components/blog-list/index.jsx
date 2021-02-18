import React from 'react';
import {Link} from 'react-router-dom';
import insane from 'insane';
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';
import {Button, List, Typography} from 'antd';
import {LikeOutlined, MessageOutlined, ReadOutlined, UserOutlined} from '@ant-design/icons';

import IconText from '../icon-text';

import styles from './index.module.scss';

const {Paragraph} = Typography;
const renderer = new PlainTextRenderer();

class BlogList extends React.PureComponent {

    render() {
        const {
            dataSource,
            noMore,
            loading,
            onLoad,
            pageNo
        } = this.props;
        const enabled = noMore && !loading;
        const loadMore = <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button
                onClick={onLoad}
                className={styles.loadingMore}
                type={'primary'}
                disabled={!enabled}
                block>
                {enabled ? '加载更多' : '已无更多内容'}
            </Button>
        </div>;

        return (
            <List
                itemLayout="vertical"
                loadMore={loadMore}
                loading={loading}
                dataSource={dataSource}
                className={styles.list}
                renderItem={item => (
                    <Link
                        to={`/blogs/${item.id}`}
                    >
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

BlogList.defaultProps = {
    dataSource: [],
    pageNo: 1,
    user: null
};

export default BlogList;