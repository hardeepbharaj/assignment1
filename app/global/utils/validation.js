/* eslint consistent-return:0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-class-assign */
/* eslint-disable no-unused-prop-types */
/* eslint-disable no-debugger */

// import moment from 'moment';
import React from 'react';
// import { message } from 'antd';
import { promiseWrapper } from '../../../app/utils/utilityFunctions';

export const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return 'Required';
  }
  return undefined;
};

export const isValueInRange = ({ minRange, maxRange } = {}) => (value) => {
  let validationText;
  const errors = {
    default: `Value should be${minRange ? ` greater than ${minRange}` : ''}${maxRange ? ` less than ${maxRange}` : ''}`,
  };

  const currentValue = parseInt(value, 10);
  if (currentValue === null || isNaN(currentValue) || (minRange && currentValue < minRange) || (maxRange && currentValue > maxRange)) {
    validationText = errors.default;
  }

  return validationText;
};

export const formSectionRequired = (datarelation, value, allValues, props, name) => {
  const values = allValues ? allValues.toJS() : '';
  const a = values[datarelation];
  const b = values[name];
  if (b) {
    return undefined;
  } else if (a === '' && b === '') {
    return undefined;
  } else if ((a === '' && b !== '') || (a !== '' && b === '')) {
    return 'This field is required';
  }
  return 'This field is required';
};

export const additionalCheckRequired = (dataRelation, value, allValues, props, name) => {
  const values = allValues ? allValues.toJS() : '';
  const a = values[dataRelation];
  const b = values[name];

  if (a && !b) {
    return 'Required';
  } else if (a && b && (b === '' || b === 0)) {
    return 'Required';
  } return undefined;
};

export const checkDependency = (value, allValues, props, name) => {
  const fieldValue = value || '';
  const values = allValues ? allValues.toJS() : '';
  const { division } = props.formData.formFieldValue;
  const SplitName = name.split('-');
  if (SplitName[0] === 'sumInsured') {
    const index = SplitName[1] ? SplitName[1] : 0;
    const subDivisionValue = division[`subDivision-${index}`] && division[`subDivision-${index}`][`noOfIndividuals-${index}`] ? division[`subDivision-${index}`][`noOfIndividuals-${index}`] : '';
    if (fieldValue === '' && subDivisionValue !== '') {
      return 'This field is required';
    } return undefined;
  } else if (SplitName[0] === 'noOfIndividuals') {
    const index = SplitName[1] ? SplitName[1] : 0;
    const subDivisionValue = division[`subDivision-${index}`] && division[`subDivision-${index}`][`sumInsured-${index}`] ? division[`subDivision-${index}`][`sumInsured-${index}`] : '';
    if (fieldValue === '' && subDivisionValue !== '') {
      return 'This field is required';
    } return undefined;
  }
};

export const email = (value) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // eslint-disable-line
  if (value !== '' && !re.test(value)) {
    return <span className="form-display-error">Please enter a valid email Id</span>;
  }
  return undefined;
};


export const lt10 = (value, allValue, props, fname, lnght = 10) => {
  if (value.toString().trim().length > lnght) {
    return <span className="form-display-error">The value exceeded {lnght} digits.</span>;
  }
  return undefined;
};

export const negativeCheck = (value, props) => {
  const num = Number(value);
  if (num < 0) {
    return <span className="form-display-error">The value should not be less than 0.</span>;
  }
};

export const validPhone = (value) => {
  if (!value.match(/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/)) {  // eslint-disable-line
    return 'Please enter a valid mobile number';
  }
  return undefined;
};


export const negativePhoneCheck = (value) => {
  const num = Number(value);
  if (num < 0) {
    return <span className="form-display-error">Please enter valid mobile no</span>;
  }
  return undefined;
};

export const isValidPercentage = (value) => {
  if (value && value > 100) {
    return 'Enter valid percentage';
  }
};

export const checkValidNumber = (value) => {
  /* if(value.match(/^[0-9]*$/) === null){
    return <span className="form-display-error">Please enter valid Employee number</span>
  } */
};

export const amountExceed = (datarelation, value, allValues, props, name) => {
  /* const num = value ? parseFloat(value.split(',').join('')) : '';
  const numberOfStaff = inputFields[props['data-relation']] && inputFields[props['data-relation']].length ? inputFields[props['data-relation']][0].value: '';
  const numberOfStaffInt = parseInt(numberOfStaff,10);

  if (numberOfStaffInt > 0 && num < 8000) {
    return <span className="form-display-error">The value should not be less than 8000.</span>
  } */
  const values = allValues ? allValues.toJS() : '';
  const a = values[datarelation];
  const b = values[name];

  if (value > 0 && value < 8000) {
    return 'The value should not be less than 8000.';
  } else if (value === '' && a !== '') {
    return 'This field is required';
  } else if (a === '' && b === '') {
    return undefined;
  } else if (value === '' && b !== '') {
    return 'This field is required';
  }
  return undefined;
};

export const sumInsuredAmount = (value, props) => {
  const stringVal = (typeof value === 'number') ? value.toString() : value;
  const num = parseFloat(stringVal.split(',').join(''));
  if (num < 50000 || num > 20000000) {
    return <span className="form-display-error">The value should be between 50 thousand and 2 crores.</span>;
  }
};

export const checkValidName = (value) => {
  if (value.match(/^[A-Za-z ]+$/) === null) {
    return <span className="form-display-error">Please enter name</span>;
  }
};

export const checkValidStringCity = (value) => {
  if (value.match(/^[A-Za-z ]+$/) === null) {
    return <span className="form-display-error">Please enter valid City</span>;
  }
};

export const checkValidSumNumber = (value) => {
  if (value.match(/^[0-9.,]+$/) === null) {
    return <span className="form-display-error">Please enter valid number</span>;
  }
};

export const isValidPincode = (value) => {
  const v = value.match(/^[0-9.,]+$/);
  if (value.length !== 6) {
    return <span className="form-display-error">Please enter valid Pincode</span>;
  }
};

export const validatePinCode = (values, dispatch, getPinCodeData) => {
  const formattedValue = values.toJS();
  return promiseWrapper(getPinCodeData, formattedValue).catch(() => {
    const errorMsg = { zipcode: 'Please enter a valid pincode' };
    throw errorMsg;
  });
};

export const isValidPan = (value) => {
  const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

  if (!value.match(regex)) {
    return <span className="form-display-error">Please enter valid Pan number</span>;
  }
  return undefined;
};

export const isValidAadhaar = (value) => {
  if (!value.match(/^\d{4}\d{4}\d{4}$/g)) {
    return <span className="form-display-error">Please enter valid Aadhaar number</span>;
  }
  return undefined;
};

export const isValidGstin = (value) => {
  if (value !== '') {
    if (!value.match(/^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)) {
      return <span className="form-display-error">Please enter valid GSTIN</span>;
    }
    return undefined;
  }
};

export const gstinMatchesPan = (value, allValues, props, name) => {
  if (value !== '') {
    if (props.formData && props.formData.pan && !isValidPan(props.formData.pan)) {
      if (value.substr(2, 10) !== props.formData.pan) {
        return <span className="form-display-error">GSTIN does not match PAN Number</span>;
      }
    }
  }
};

export const panMatchesGstin = (value, allValues, props, name) => {
  if (props.formData && props.formData.gstId && !isValidGstin(props.formData.gstId)) {
    if (props.formData.gstId.substr(2, 10) !== value) {
      return <span className="form-display-error">PAN Number does not match GSTIN</span>;
    }
  }
};

export const pinCode = (value) => {
  if (value && !/^\d{6}$/i.test(value)) {
    return <span className="form-display-error">Please enter valid 6 digit pincode</span>;
  }
  return undefined;
};

export const validateUploadDropZone = (value) => {
  let validationText;
  const errors = {
    default: 'Required',
  };

  if (!value || (Array.isArray(value) && value.length === 0)) {
    validationText = errors.default;
  }

  return validationText;
};

export const gmcAge = (value, props) => {
  const stringVal = (typeof value === 'number') ? value.toString() : value;
  const num = parseFloat(stringVal.split(',').join(''));
  if (num > 50) {
    return <span className="form-display-error">Average age should not be more than 50 years</span>;
  }
};
