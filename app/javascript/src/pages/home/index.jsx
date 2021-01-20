import React from 'react';
import {Row, Col, Carousel} from 'antd';
import isomorphicProps from "../../containers/isomorphicProps";

import default1 from '../../assets/images/default1.png';
import default2 from '../../assets/images/default2.png';

import styles from './index.module.scss';
import BlogList from "../../components/blog-list";

const {Title} = Typography;

@isomorphicProps(['blogs', 'hots'])
class Home extends React.PureComponent {
    render() {
        return <Row>
            <Col span={14} offset={5}>
                <Row>
                    <Col span={18}>
                        <Carousel autoplay>
                            {
                                [default1, default2].map(item => <div className={styles.carousel_item}
                                                                      key={default1.toString()}>
                                    <img src={item} alt='default1.png'/>
                                </div>)
                            }
                        </Carousel>

                        <BlogList dataSource={this.props.blogs}/>
                    </Col>
                    <Col span={5} offset={1}>
                        right
                    </Col>
                </Row>
            </Col>
        </Row>
    }
}

export default Home;