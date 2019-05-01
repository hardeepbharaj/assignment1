import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import{
  sendCustDataServices,
} from './serviceCalls';

import {
  sendCustDataRequest,
} from './helperFunctions';

import {
  updateDirectField,
} from './actions';

import {
  SEND_CUST_DATA,
} from './constants';

import Notifications from '../../utils/notifications';

// Create Landing Page Lead
export function* sendCustDataGenrtr(action) {
  try {
    const request = sendCustDataRequest(action.payload);
    const response = yield call(sendCustDataServices, request);
    if (response) {
      yield put(updateDirectField({ fieldKey: 'isLoading', fieldValue: false }));
      typeof (action.callback) === 'function' && action.callback();
    }
  } catch (error) {
    yield put(updateDirectField({ fieldKey: 'isLoading', fieldValue: false }));
    Notifications.show(error.response.data.message, error.response.data.errorType, Notifications.type.ERROR);
  }
}

export function* sendCustDataWatcher() {
  const watcher = yield takeLatest(SEND_CUST_DATA, sendCustDataGenrtr);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export default [
  sendCustDataWatcher,
];
