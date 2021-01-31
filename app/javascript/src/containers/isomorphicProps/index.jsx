import React from 'react';
import camelCase from 'camelcase';

/**
 * @param propsNames    String|Array    将要预加载的props属性
 * @param clear         Boolean         是否在客户端渲染完成后清除注水数据
 * @returns WrappedComponent
 */
function isomorphicProps(propsNames, clear = true) {
    return function (Component) {
        return class extends React.Component {

            constructor(props) {
                super(props);
                this.constomProps = {};
                if (!Array.isArray(propsNames)) {
                    propsNames = [propsNames];
                }
                // * 仅在服务端渲染或客户端首次渲染时注入
                if (typeof window === "undefined" || window.__REACT_RAILS_SSR__) {
                    propsNames.map(propsName => {
                        this.constomProps[camelCase(propsName)] = typeof window === "undefined" ?
                            props.staticContext[propsName] :
                            window.__REACT_RAILS_SSR__[propsName]
                    })
                }
            }

            componentDidMount() {
                if (clear) window.__REACT_RAILS_SSR__ = null;
            }

            render() {
                return <Component {...{...this.props, ...this.constomProps}} />
            }
        }
    }

}

export default isomorphicProps;