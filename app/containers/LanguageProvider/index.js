/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { DEFAULT_LOCALE } from '../../i18n';
import { IntlProvider } from 'react-intl';

import metaHOC from '../../components/global/hoc/MetaHoc';

import { makeSelectLocale } from './selectors';
import * as langActions from '../LanguageProvider/actions';

export class LanguageProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locale: DEFAULT_LOCALE,
      location: '',
    };
  }

  componentWillMount() {
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={DEFAULT_LOCALE}
        key={DEFAULT_LOCALE}
        messages={this.props.messages[this.props.locale]}
      >
        <Fragment>
          {React.Children.only(this.props.children)}
          {
          this.state.location && validLocation.indexOf(this.state.location.pathname) !== -1
          &&
          <Fragment>
            
          </Fragment>
        }

        </Fragment>
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ ...langActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(metaHOC(LanguageProvider));
