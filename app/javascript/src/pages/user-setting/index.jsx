import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Avatar, Button, Col, Form, Input, Row, Tabs, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const {TabPane} = Tabs;

const UserSetting = props => {

    const getCurrentUser = () => {
        return props.blogShowPage.currentUser ||
            props.blogPage.currentUser ||
            props.userPage.currentUser ||
            (typeof window !== 'undefined' && window.gon?.currentUser) || null;
    }

    return getCurrentUser() ? <Row>
        <Col span={16} offset={4}>
            <Tabs tabPosition='left'>
                <TabPane tab="基础设置" key="1">

                    <Form
                        name="time_related_controls"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        onFinish={(val) => {
                            console.log(val);
                        }}
                    >
                        <Form.Item
                            name="date-picker"
                            label={<Avatar
                                src={getCurrentUser().avatar}
                                // src={'https://assets.bubuyu.top/avatars/development/1/avatar.jpeg'}
                                alt={getCurrentUser().nickName}
                                size={48}
                            />}
                            colon={false}
                            labelAlign='right'
                        >
                            <Upload
                                name='file'
                                onChange={info => {
                                    if (info.file.status !== 'uploading') {
                                        console.log(info.file, info.fileList);
                                    }
                                    if (info.file.status === 'done') {
                                        message.success(`${info.file.name} file uploaded successfully`);
                                    } else if (info.file.status === 'error') {
                                        message.error(`${info.file.name} file upload failed.`);
                                    }
                                }}>
                                <Button icon={<UploadOutlined/>}>更改头像</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="nickName"
                            label="昵称"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                }
                            ]}
                            initialValue={getCurrentUser().nickName}
                        >
                            <Input placeholder="Please input your name"/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="邮箱"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                            initialValue={getCurrentUser().email}
                        >
                            <Input placeholder="Please input your email"/>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="个人简介"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                            initialValue={getCurrentUser().description}
                        >
                            <Input placeholder="Please input your description"/>
                        </Form.Item>
                        <Form.Item
                            name="spaceName"
                            label="个人空间地址"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                            initialValue={getCurrentUser().spaceName}
                        >
                            <Input placeholder="Please input your spaceName"/>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                xs: {span: 24, offset: 0},
                                sm: {span: 16, offset: 8},
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                修改
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="资产管理" key="2">
                    资产管理
                </TabPane>
                <TabPane tab="账号管理" key="3">
                    账号管理
                </TabPane>
            </Tabs>
        </Col>
    </Row> : <Redirect to='/users/sign_in'/>
}

export default connect(state => state)(UserSetting);