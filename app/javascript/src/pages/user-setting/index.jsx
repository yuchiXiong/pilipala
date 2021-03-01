import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Avatar, Button, Col, Form, Input, message, Modal, Row, Tabs, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import Cropper from "react-cropper";
import {User} from '../../utils/api';
import ReturnCode from '../../utils/return-code';
import {updateAvatar} from '../store/actions';

import 'cropperjs/dist/cropper.css';

const {TabPane} = Tabs;

const UserSetting = props => {

    const [cropperVisible, setCropperVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const cropperRef = useRef(null);

    const getCurrentUser = () => {
        return props.currentUser ||
            (typeof window !== 'undefined' && window.gon?.currentUser) || null;
    }

    const handleAvatarUpload = e => {
        setCropperVisible(true);
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result);
        }
        reader.readAsDataURL(e.file);
    }

    const onFinish = e => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.getCroppedCanvas().toBlob(file => {
            const formData = new FormData();
            formData.append('_method', 'put');
            formData.append("user[avatar]", file, 'avatar.png');

            User.updateAvatar(getCurrentUser().spaceName, formData).then(res => {
                if (res.code === ReturnCode.Success) {
                    props.updateAvatar(res.data.user.avatar);
                    setAvatar(null);
                    setCropperVisible(false);
                    message.success('头像更新成功！');
                }
            });

        });
    }

    return getCurrentUser() ? <>
        <Modal
            title="裁剪您的头像"
            cancelText='取消'
            okText='确认'
            visible={cropperVisible}
            onOk={() => onFinish()}
            onCancel={() => setCropperVisible(false)}
        >
            <Cropper
                style={{height: 400, width: "100%"}}
                initialAspectRatio={1}
                preview=".img-preview"
                src={avatar}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                ref={cropperRef}
            />
        </Modal>

        <Row>
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
                                name="avatar"
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
                                    name='avatar'
                                    showUploadList={false}
                                    customRequest={handleAvatarUpload}
                                    progress={null}
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
        </Row>
    </> : <Redirect to='/users/sign_in'/>
}

export default connect(
    state => state,
    dispatch => {
        return {
            updateAvatar: url => dispatch(updateAvatar(url))
        }
    })(UserSetting);