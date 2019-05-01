
import React from 'react';
import './style.css';


const MetaHoc = WrappedComponent => class extends React.PureComponent {
  getMeta=() => {
    const prop = this.props;
    const URLparams = (new URL(window.location.href)).searchParams;
    const paramJSON = this.getParams(window.location.href);
    const currentUrl = window.location.href;
    return {
      ...prop,
      URLparams,
      paramJSON,
      currentUrl,
    };
  }

  getParams = (url) => {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i += 1) {
      const pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  };

  render() {
    return (<WrappedComponent {...this.getMeta()} />); // eslint-disable-line
  }
};

export default MetaHoc;

