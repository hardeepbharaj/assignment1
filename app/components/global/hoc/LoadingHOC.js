/* eslint-disable no-debugger */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import './style.css';


const LoadingHOC = WrappedComponent => class extends React.PureComponent {
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: '40px', width: '40px', height: '40px' }} spin />;
    return (
      <Fragment>
        {
          this.props.formData && this.props.formData.isLoading
          &&
          <div className="waiting" style={{ display: 'block' }}>
            <div className="waiting-loader">
              {/* <img src="/assets_b2b/img/rolling.gif" alt="Please wait..." className="rolling-img" /> */}
              <Spin indicator={antIcon} />
              <p className="rolling-msg">Please wait..</p>
            </div>
          </div>
        }
        <WrappedComponent {...this.props} />
      </Fragment>
    ); // eslint-disable-line
  }
};

LoadingHOC.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
export default LoadingHOC;
