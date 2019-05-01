/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectRoute = () => state => state.get('route');

const makeSelectLocationState = (state) => {
  let prevRoutingState;
  let prevRoutingStateJS;
  // state
  return state => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

// const makeSelectGlobal = () => createSelector(
//   selectGlobal,
//   substate => substate.toJS(),
// );

export {
  makeSelectLocationState,
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  // makeSelectGlobal
};
