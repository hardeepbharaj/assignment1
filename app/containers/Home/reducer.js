/* eslint-disable no-case-declarations */

import { fromJS } from 'immutable';

import {
  SET_PRODUCTS,
  UPDATE_DIRECT_FIELD,
  UPDATE_FORMFIELD_VALUE,
  SET_EDIT_FORM_FIELDS,
  UPDATE_PRODUCTS,
} from './constants';

const homeStoreInitialsInitial = {
  products: [],
  formFieldValue: {
    name: '',
    weight: '',
    availability: '',
    productUrl: '',
    priceTier: '',
    priceRange: '',
    isEditable: '',
  },
};

const homeStoreInitials = fromJS(homeStoreInitialsInitial);


const homeStoreReducer = (state = homeStoreInitials, { type, payload, ...result }) => {
  switch (type) {

    case SET_PRODUCTS:
      return state.set('products', payload.data);

    case UPDATE_DIRECT_FIELD:
      return state.set(payload.fieldKey, payload.fieldValue);
    
    case UPDATE_FORMFIELD_VALUE:
      return state.set('formFieldValue', { ...state.toJS().formFieldValue, [payload.fieldKey]: payload.fieldValue });
    
    case SET_EDIT_FORM_FIELDS:
      const formfieldValue = { ...state.toJS().formFieldValue };
      const products = { ...state.toJS().products };
      formfieldValue['name'] = products[payload.data]['name'];
      formfieldValue['weight'] = products[payload.data]['weight'];
      formfieldValue['availability'] = products[payload.data]['availability'];
      formfieldValue['productUrl'] = products[payload.data]['productUrl'];
      formfieldValue['priceTier'] = products[payload.data]['pricingTier'];
      formfieldValue['priceRange'] = products[payload.data]['priceRange'];
      formfieldValue['isEditable'] = products[payload.data]['isEditable'];
      return state.set('formFieldValue', { ...state.toJS().formFieldValue, ...formfieldValue });

    case UPDATE_PRODUCTS:
      const formfieldValue1 = { ...state.toJS().formFieldValue };
      const products1 = { ...state.toJS().products };
      products1[payload.index]['name'] = formfieldValue1['name'];
      products1[payload.index]['weight'] = formfieldValue1['weight'];
      products1[payload.index]['availability'] = formfieldValue1['availability'];
      products1[payload.index]['productUrl'] = formfieldValue1['productUrl'];
      products1[payload.index]['pricingTier'] = formfieldValue1['priceTier'];
      products1[payload.index]['priceRange'] = formfieldValue1['priceRange'];
      products1[payload.index]['isEditable'] = formfieldValue1['isEditable'];
      const products2 = Object.keys(products1).reduce((acc, curVal, index) => {
          acc.push(products1[index]);
          return acc;
      }, []);
      const modifiedState = state.set('products', products2 );
      result.callback;
      return modifiedState;

    default:
      return state;
  }
};

export default homeStoreReducer;
