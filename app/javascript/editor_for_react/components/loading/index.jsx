import React from 'react';
import {Spin} from "antd";

import styles from './index.module.scss';

export default () => (
    <div className={styles['loading_container']}>
        <Spin size={'large'} tip='正在加载编辑器……'/>
    </div>
);