import React from 'react';
import marked from 'marked';
// import DOMPurify from 'dompurify';
import {Avatar, BackTop, Col, Row, Typography} from "antd";
import IsomorphicProps from '../../containers/isomorphicProps';

// import {Link} from "react-router-dom";

import 'highlight.js/styles/atom-one-dark';

const {Title} = Typography;

@IsomorphicProps('blog')
class BlogShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {
                title: this.props.blog?.title || '',
                content: this.props.blog?.content || ''
            }
        }
    }

    render() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, language) {
                const hljs = require('highlight.js');
                const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                return hljs.highlight(validLanguage, code).value;
            }
        });
        return <Row>
            <Col span={14} offset={5}>
                <Row>
                    <Col span={18}>
                        {/*<article dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked('<script>alert("hhhh")</script>12321'))}}/>*/}

                        <Title level={2}>{this.state.blog.title}</Title>
                        {/*<BlogList dataSource={this.props.blogs}/>*/}
                        <article dangerouslySetInnerHTML={{__html: marked(this.state.blog.content)}}/>
                    </Col>
                    <BackTop/>
                </Row>
            </Col>
        </Row>
    }
}

export default BlogShow;