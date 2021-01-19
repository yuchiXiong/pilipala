import React from 'react';

function isomorphicProps(propsName) {
    return function (Component) {
        return class extends React.Component {

            constructor(props) {
                super(props);
                this.constomProps = {};
                if (typeof window === "undefined") {
                    this.constomProps[propsName] = props.staticContext[propsName];
                } else {
                    this.constomProps[propsName] = window.__REACT_RAILS_SSR__[propsName]
                }
            }

            render() {
                return <Component {...{...this.props, ...this.constomProps}} />
            }
        }
    }

}

export default isomorphicProps;