import React from 'react';
import {Table, Tooltip, Typography} from 'antd';
import {Blog} from '../../../utils/api';

const {Paragraph} = Typography;

const columns = [
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
        // render: (text) => <a target="_blank" href={`/blogs/${record.id}`}>原文</a>
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

class Blogs extends React.Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    };

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
                data: data.blogs,
                pagination: data.pagination
            })
        });
    };

    render() {
        const {data, pagination, loading} = this.state;
        return (
            <>
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </>
        );
    }
}

export default Blogs;