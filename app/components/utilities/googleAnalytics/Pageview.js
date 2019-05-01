import React, { Component } from 'react';
import ReactGA from 'react-ga';

export default () => WrappedComponent => class extends Component {
  componentDidMount() {
    if (typeof window === 'object') {
      const path = window.location.href;
      ReactGA.set({ page: path });
      ReactGA.pageview(path);
    }
  }
  render() {
    return <WrappedComponent {...this.props} />;
  }
};
