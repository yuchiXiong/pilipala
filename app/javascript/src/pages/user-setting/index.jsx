import React from 'react';
import {Redirect} from 'react-router-dom';
import {Avatar, Button, Col, Form, Input, Row, Tabs} from 'antd';

const {TabPane} = Tabs;

const UserSetting = props => {

    const currentUser = window.gon.currentUser;

    return currentUser ? <Row>
        <Col span={16} offset={4}>
            <Tabs tabPosition='left'>
                <TabPane tab="基础设置" key="1">

                    <Form name="time_related_controls" onFinish={() => {
                    }}>
                        <Form.Item name="date-picker" labelAlign='right'>
                            <Avatar
                                src={currentUser.avatar}
                                alt={currentUser.nickName}
                                size={96}
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="昵称"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input placeholder="Please input your name"/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="邮箱"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input placeholder="Please input your name"/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="个人简介"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input placeholder="Please input your name"/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="个人空间地址"
                            labelAlign='right'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input placeholder="Please input your name"/>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                xs: {span: 24, offset: 0},
                                sm: {span: 16, offset: 8},
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
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

export default UserSetting;