import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import './style.css';


class ResultLoadingHOC extends Component {
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: '40px', width: '40px', height: '40px' }} spin />;
    return (this.props.formData.isLoadingComponent ? <Spin indicator={antIcon} /> : ''); // eslint-disable-line
  }
};

ResultLoadingHOC.propTypes = {
    //isLoadingComponent: PropTypes.bool.isRequired,
};
export default ResultLoadingHOC;
