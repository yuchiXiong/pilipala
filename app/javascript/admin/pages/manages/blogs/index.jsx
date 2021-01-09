import React from 'react';
import {Table, Tooltip, Typography, Drawer, Button} from 'antd';
import {Blog} from '../../../utils/api';

const {Paragraph} = Typography;

class Blogs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            loading: false,
            showBlogContent: false,
            currentBlog: -1
        };
        this.columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                sorter: true
            },
            {
                title: '标题',
                dataIndex: 'title',
                render: text => <Tooltip title={text}>
                    <Paragraph ellipsis>{text}</Paragraph>
                </Tooltip>,
                width: '10%'
            },
            {
                title: '内容',
                dataIndex: 'content',
                render: (text, record) => <Button type='link'
                                                  onClick={() => this.showBlogContent(record.id)}>
                    预览
                </Button>
            },
            {
                title: '封面',
                dataIndex: 'cover',
            },
            {
                title: '作者',
                dataIndex: 'user_id',
            },
            {
                title: '发布状态',
                dataIndex: 'released',
            },
            {
                title: '删除状态',
                dataIndex: 'discarded_at',
            },
            {
                title: '审核结果',
                dataIndex: 'scan_result',
            },
            {
                title: '阅读数',
                dataIndex: 'reads_count',
            },
            {
                title: '点赞数',
                dataIndex: 'likes_count',
            },
            {
                title: '评论数',
                dataIndex: 'comments_count',
            },
        ];
        this.showBlogContent = this.showBlogContent.bind(this);
    }

    componentDidMount() {
        const {pagination} = this.state;
        this.fetch({pagination});
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        this.setState({loading: true});
        Blog.index(params).then(data => {
            this.setState({
                loading: false,
                blogs: data.blogs,
                pagination: data.pagination
            })
        });
    };

    showBlogContent(id) {
        this.setState({
            showBlogContent: true,
            currentBlog: id
        });
    }

    render() {
        const {blogs, pagination, loading, currentBlog, showBlogContent} = this.state;
        return (
            <>
                <Drawer
                    title={currentBlog !== -1 && blogs.filter(item => item.id === currentBlog)[0].title}
                    width={720}
                    closable={false}
                    onClose={() => this.setState({showBlogContent: false})}
                    visible={showBlogContent}
                >
                    {currentBlog.content}
                </Drawer>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={blogs}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </>
        );
    }
}

export default Blogs;