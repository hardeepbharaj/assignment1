
import { createSelector } from 'reselect';

const makeSelectGlobal = () => state => state.getIn(['global', 'home']);

const makeHomeForm = () => state => state.getIn(['global', 'home']);

const makeHomeFormSelector = () => createSelector(
  makeHomeForm(),
  substate => substate.toJS(),
);

export {
  makeSelectGlobal,
  makeHomeFormSelector,
};
