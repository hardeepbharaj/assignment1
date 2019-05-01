/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectGlobal } from './selectors';


const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const path = this.props.location.pathname;
    const webView = !!(this.props.location.query && this.props.location.query.userId && this.props.location.query.source && this.props.location.query.source === 'B2BApp');

    return (
      <AppWrapper>
        <Helmet
          titleTemplate="Assignment"
          defaultTitle="Assignment"
        >
          <meta name="description" content="Assignment" />
        </Helmet>
        {React.cloneElement(this.props.children, {
          key: path,
          webView,
        })
        }
      </AppWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appStore: selectGlobal(),
});


export default connect(mapStateToProps, null)(App);
