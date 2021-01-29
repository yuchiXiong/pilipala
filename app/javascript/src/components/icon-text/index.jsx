import React from 'react';
import {Space} from "antd";
import style from './index.module.scss';

export default ({icon, text}) => (
    <Space className={style['icon-text']}>
        {React.createElement(icon)}
        {text}
    </Space>
);