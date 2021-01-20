import React from 'react';
import {Layout} from 'antd';

import styles from './index.module.scss';

const {Footer} = Layout;

export default () => <Footer className={styles.footer}>
    <p><a href='https://beian.miit.gov.cn' target='_blank'>鄂ICP备18022630号-2</a></p>
    <p>Design By <a href='https://github.com/yuchiXiong' target="_blank">@yuchiXiong</a>.</p>
</Footer>