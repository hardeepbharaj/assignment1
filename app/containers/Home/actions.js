import {
  SET_PRODUCTS,
  UPDATE_DIRECT_FIELD,
  UPDATE_FORMFIELD_VALUE,
  SET_EDIT_FORM_FIELDS,
  UPDATE_PRODUCTS,
} from './constants';

export const setProducts = payload => ({
  type: SET_PRODUCTS,
  payload,
});

export const updateDirectField = payload => ({
  type: UPDATE_DIRECT_FIELD,
  payload,
});

export const updateFieldValue = payload => ({
  type: UPDATE_FORMFIELD_VALUE,
  payload,
});

export const setEditFormFields = payload => ({
  type: SET_EDIT_FORM_FIELDS,
  payload,
});

export const updateProducts = (payload,callback) => ({
  type: UPDATE_PRODUCTS,
  payload,
  callback,
});
