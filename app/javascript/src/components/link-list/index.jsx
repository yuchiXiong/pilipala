import React from 'react';
import PropTypes from 'prop-types';
import style from './index.module.scss';
import {List, Skeleton, Typography} from "antd";

const {Title} = Typography;

class LinkList extends React.Component {
    render() {
        const {title, loading, dataSource, renderItem} = this.props;
        return <>
            <Title level={5} className={style.tag}>{title}</Title>
            <Skeleton loading={loading} active avatar paragraph={false} round={true}>
                <List
                    size="large"
                    itemLayout="vertical"
                    bordered={false}
                    loading={loading || false}
                    dataSource={dataSource}
                    className={style.list}
                    renderItem={item => renderItem(item)}
                />
            </Skeleton>
        </>
    }
}

LinkList.propTypes = {
    loading: PropTypes.bool,
    dataSource: PropTypes.array.isRequired
}

export default LinkList;