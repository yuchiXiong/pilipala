import React from 'react';

/**
 * @param propsNames    String|Array    将要预加载的props属性
 // * @param clear         Boolean         是否在客户端渲染完成后清除注水数据
 * @returns WrappedComponent
 */
function isomorphicProps(propsNames, /*clear = true*/) {
    return function (Component) {
        return class extends React.Component {

            constructor(props) {
                super(props);
                this.constomProps = {};
                if (!Array.isArray(propsNames)) {
                    propsNames = [propsNames];
                }
                if (typeof window === "undefined") {
                    propsNames.map(propsName => this.constomProps[propsName] = props.staticContext[propsName])
                } else {
                    propsNames.map(propsName => this.constomProps[propsName] = window.__REACT_RAILS_SSR__[propsName])
                }
            }

            // componentDidMount() {
            //     if (clear) window.__REACT_RAILS_SSR__ = {}
            // }

            render() {
                return <Component {...{...this.props, ...this.constomProps}} />
            }
        }
    }

}

export default isomorphicProps;