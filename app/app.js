/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import 'url-polyfill';
import 'url-search-params-polyfill';
import 'whatwg-fetch';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FontFaceObserver from 'fontfaceobserver';
// import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
import { useScroll } from 'react-router-scroll';
// Import root app
import App from './containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from './containers/App/selectors';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico'; // eslint-disable-line
import 'file-loader?name=[name].[ext]!./.htaccess';  // eslint-disable-line

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Import routes
import createRoutes from './routes';

// Import environmentConfig
// import { currentEnvironmentConfig } from './config/environmentConfig';

// Import app saga
// import sagas from './sagas';

// Import environmentConfig
import { initializeReactGA } from './components/utilities/googleAnalytics/Ga';

// Import Language Provider
import LanguageProviders from './containers/LanguageProvider';

// Initializae ReactGA (Google Analytics
initializeReactGA();

// if (currentEnvironmentConfig.enableMock) {
//   const mockData = require('./mockData'); // eslint-disable-line global-require
//   mockData.default();
// }

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});


// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});


const bHistory = useRouterHistory(createHistory)({
  basename: '',
});

// Create redux store with history
const initialState = {};
// const history = createHistory();
const store = configureStore(initialState, bHistory);

const history = syncHistoryWithStore(bHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// const MOUNT_NODE = document.getElementById('app');

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

require('es6-promise').polyfill();

// Inject default app sagas
// sagas.map(store.runSaga);

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProviders messages={messages} routes={rootRoute} history={history}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </LanguageProviders>
    </Provider>,
    document.getElementById('app'),
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line 
}
