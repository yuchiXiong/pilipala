import React from 'react';

function isomorphicProps(propsNames) {
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

            render() {
                return <Component {...{...this.props, ...this.constomProps}} />
            }
        }
    }

}

export default isomorphicProps;