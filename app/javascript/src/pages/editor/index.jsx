import React, {useEffect, useState} from 'react';
import Vditor from 'vditor';
import {Button, Drawer, Input} from 'antd';
import {User} from '../../utils/api';

import 'vditor/src/assets/scss/index';
// import styles from "../../../editor_for_react/app.module.scss";
import styles from './index.module.scss'
import {MenuOutlined} from "@ant-design/icons";

// const {} = Layout;
const test = `
# 1. 问题描述
最近和朋友做一个个人项目，期间希望使用非对称加密来实现前端加密用户名和密码，后端解密验证的功能。

在第一版设计的时候前后端技术栈是 \`React + Express\`，我们很快找到了 [node-rsa](https://www.npmjs.com/package/node-rsa) 这个包，由于前后端都是 \`JavaScript\`，使用同一个包之后这个问题很快解决了。

但是后来因为一些事情导致了项目停滞了很久，之后再启动时我提出使用 \`Ruby on Rails\` 来快速完成后端，迁移的过程在其他方面都还算比较顺利，唯独在重写非对称加密的时候卡壳了，使用统一签发的证书，前端加密后后端怎么都解不开。

前端参考代码：
~~~ JavaScript
const NodeRSA = require('node-rsa');
const obj = {
  public_key: "-----BEGIN PUBLIC KEY-----太长省略-----END PUBLIC KEY-----"
};

let key = new NodeRSA(obj.public_key);

const encode = key.encrypt({
  account: '...',
  password: '...'
}, 'base64');
~~~
后端参考代码：
~~~ ruby
key = params[:key]

rsa_client = OpenSSL::PKey::RSA.new Rails.application.credentials[:private_key]

account_obj = JSON.parse(rsa_client.private_decrypt(key))
account = account_obj['account']
password = account_obj['password']
~~~

使用上述代码无法完成解密。

# 2. 解决方案
无法完成解密主要原因有2个：
1. 前端 \`node-rsa\` 库与后端 \`OpenSSL::PKey::RSA\` 库默认填充方式不一致。
2. 前端加密后对密文进行了 \`Base64\` 再加密（可能是考虑到字节编码对传输的影响）。

修改代码为如下，**前端指定了填充方式而后端对密文先进行了Base64解密**。
前端参考代码：
~~~ JavaScript
const NodeRSA = require('node-rsa');
const obj = {
  public_key: "-----BEGIN PUBLIC KEY-----太长省略-----END PUBLIC KEY-----"
};

let key = new NodeRSA(obj.public_key);

key.setOptions({ encryptionScheme: 'pkcs1' });

const encode = key.encrypt({
  account: '...',
  password: '...'
}, 'base64');
~~~
后端参考代码：
~~~ ruby

def index
  key = params[:key]

  rsa_client = OpenSSL::PKey::RSA.new Rails.application.credentials[:private_key]

  account_obj = JSON.parse(rsa_client.private_decrypt(Base64.decode64(key)))
  account = account_obj['account']
  password = account_obj['password']
end
~~~

`;


const Editor = () => {

    const userInfo = window.gon.currentUser;

    // * UI State
    const [drawerVisible, setDrawerVisible] = useState(false);

    const [blogs, setBlogs] = useState([]);
    // const [current, setCurrent] = useState({
    //
    // });

    useEffect(() => {
        const vditor = new Vditor('vditor', {
            height: document.documentElement.clientHeight - 40,
            value: test,
            icon: 'ant',
            toolbarConfig: {
                pin: true,
            },
            counter: {
                enable: true
            },
            cache: {
                enable: false,
            },
            input(md) {
                saveBlog({
                    title: '',
                    content: md
                })
                console.log(md)
            },
            after() {
                // vditor.setValue('Hello, Vditor + React!')
            },
            outline: {
                enable: true,
                position: "right"
            },
            preview: {
                hljs: {
                    lineNumber: true,
                },
                markdown: {
                    autoSpace: true,
                    fixTermTypo: true,
                    toc: true
                },
            }
        })
    }, []);

    useEffect(() => {
        User.userBlogs(userInfo.spaceName).then(res => {
            console.log(res)
        });
        // if (userInfo) {
        //     User.userBlog(userInfo.spaceName, current.id).then(res => {
        //         if (res.data.blogs.length > 0) {
        //             console.log(res.data.blogs)
        //             // this.setState({
        //             //     blogs: res.data.blogs,
        //             //     current: res.data.blogs[0]
        //             // });
        //         }
        //     });
        // }
    }, []);

    const saveBlog = function (blog) {

    };

    return <>
        <Drawer
            title="我的博客"
            placement='left'
            closable={true}
            onClose={() => {
                setDrawerVisible(false)
            }}
            afterVisibleChange={() => {
            }}
            visible={drawerVisible}
        >
            {/*<Tree*/}
            {/*    checkable*/}
            {/*    defaultExpandedKeys={['0-0-0', '0-0-1']}*/}
            {/*    defaultSelectedKeys={['0-0-0', '0-0-1']}*/}
            {/*    defaultCheckedKeys={['0-0-0', '0-0-1']}*/}
            {/*    onSelect={onSelect}*/}
            {/*    onCheck={onCheck}*/}
            {/*    treeData={treeData}*/}
            {/*/>*/}
        </Drawer>

        <Button
            type="primary"
            onClick={() => setDrawerVisible(!drawerVisible)}
            className={styles.drawerToggleBtn}
            style={{left: drawerVisible ? 256 : 0}}
        >
            <MenuOutlined style={{fontSize: '20px'}}/>
        </Button>

        <header>
            <Input size="large" placeholder="请输入文章标题"/>
        </header>
        <div id="vditor"/>
    </>
}

export default Editor;