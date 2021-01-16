import React from 'react';
import logo from '../../assets/logo.svg';

import homeStyle from './index.module.css';

class Home extends React.Component {

    render() {
        return <>
            <div className={homeStyle.App}>
                <img src={logo} className={homeStyle['App-logo']} alt="logo"/>

                <h1>立刻使用 React + Rails 构建您的同构应用。</h1>

                <p>
                    修改 <code>app/javascript/src/pages</code> 并保存以自动更新。
                </p>

                <h3>React 向导链接</h3>
                <ul>
                    <li><a href="https://reactjs.org/"
                           target="_blank" rel="noopener">react</a></li>
                    <li><a href="https://reactrouter.com/web/guides/quick-start"
                           target="_blank" rel="noopener">react-router-dom</a></li>
                    <li><a href="https://react-redux.js.org/" target="_blank"
                           rel="noopener">react-redux</a></li>
                </ul>
                <h3>Rails 向导链接</h3>
                <ul>
                    <li><a href="https://guides.rubyonrails.org/" target="_blank" rel="noopener">Ruby on Rails</a></li>
                    <li><a href="https://github.com/rails/webpacker" target="_blank" rel="noopener">webpacker</a></li>
                    <li><a href="https://github.com/reactjs/react-rails" target="_blank" rel="noopener">react-rails</a>
                    </li>
                </ul>
            </div>
        </>
    }
}

export default Home;