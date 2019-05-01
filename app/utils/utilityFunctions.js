import React from 'react';

import cloneDeep from 'lodash/fp/cloneDeep';
import startCase from 'lodash/fp/startCase';
import toLower from 'lodash/fp/toLower';
import * as objectPath from 'object-path';

import { getLoggerForModule } from './appLogger';

export const localLogger = getLoggerForModule('utils/utilities');

export const validateFunction = (cb, logInCaseOfInvalid) => {
  if (typeof cb === 'function') {
    return cb;
  }
  return () => {
    if (logInCaseOfInvalid) {
      if (arguments.length) {
        localLogger.debug('Not a valid function; Arguments being: ', arguments);
      } else {
        localLogger.debug('Not a valid function');
      }
    }
  };
};


export const getStateModifier = context => function updateStateData(model, keyPath, value, callback) {
  let modelData = cloneDeep(this.state[model]);
  if (keyPath) {
    objectPath.set(modelData, keyPath, value);
  } else {
    modelData = value;
  }
  return new Promise((resolve) => {
    this.setState({ [model]: modelData }, () => {
      if (typeof callback === 'function') {
        callback();
      }
      resolve();
    });
  });
}.bind(context);

export const getValidator = (context, validationRules, validationInitConfig = { rulePathFn: key => key, validationStatusPathFn: key => key }) => function getValidatorInstance(model, keyPath, value, validationConfig = {}) {
  const result = {
    validationExists: false,
    keys: {
      statusKey: '',
      ruleKey: '',
      originalKey: '',
    },
    validationStatus: null,
  };
  const self = this;
  const stateClone = cloneDeep(this.state);
  const originalKey = keyPath ? `${model ? `${model}.` : ''}${keyPath}` : model;
  let key = originalKey;
  if (!validationConfig.statusIsNotFlatStructure) {
    key = originalKey.replace(/\./g, '_');
  }
  const ruleKey = typeof validationInitConfig.ruleKeyConvertorFn === 'function' ? validationInitConfig.ruleKeyConvertorFn(originalKey) : key;
  // localLogger.debug('getValidator--> Key for validation: ', ruleKey, '; Key for status:', key, '; originalKey:', originalKey);
  result.keys.statusKey = validationInitConfig.validationStatusPathFn(key, validationConfig.validationStatusPathModel);
  result.keys.ruleKey = ruleKey;
  result.keys.originalKey = key;
  const validationRuleSet = objectPath.get(validationRules, validationInitConfig.rulePathFn(ruleKey));
  const validationIsFunction = typeof validationRuleSet === 'function';
  const validationIsArray = Array.isArray(validationRuleSet);
  if (validationIsFunction || validationIsArray) {
    let validationStatus = objectPath.get(this.state.validations, validationInitConfig.validationStatusPathFn(key, validationConfig.validationStatusPathModel));
    if (validationIsFunction) {
      validationStatus = (validationRuleSet.call(self, value, stateClone, key, validationConfig.ruleConfig));
    } else {
      validationStatus = validationRuleSet.reduce((accumulator, rule) => {
        if (accumulator.status && typeof rule === 'function') {
          return (rule.call(self, value, stateClone, key, validationConfig.ruleConfig));
        }
        return accumulator;
      }, { status: true });
    }
    result.validationExists = true;
    result.validationStatus = validationStatus;
  }
  return result;
}.bind(context);


export const validateFieldToStateFn = (context, getValidationResultFn) => function validateFieldToStateFnInstance(model, keyPath, value, callback, validationConfig = {}) {
  const validationResult = getValidationResultFn(model, keyPath, value, validationConfig);

  if (validationResult.validationExists) {
    this.updateStateData('validations', validationResult.keys.statusKey, validationResult.validationStatus.errorText, callback);
  } else {
    validateFunction(callback)();
  }

  // const self = this;
  // const stateClone = cloneDeep(this.state);
  // if (!validationConfig.skipValidation) {
  //   const originalKey = keyPath ? `${model ? `${model}.` : ''}${keyPath}` : model;
  //   let key = originalKey;
  //   if (!validationConfig.statusIsNotFlatStructure) {
  //     key = originalKey.replace(/\./g, '_');
  //   }
  //   const ruleKey = typeof validationInitConfig.ruleKeyConvertorFn === 'function' ? validationInitConfig.ruleKeyConvertorFn(originalKey) : key;
  //   localLogger.debug('validateData--> Key for validation: ', ruleKey, '; Key for status:', key, '; originalKey:', originalKey);
  //   const validationRuleSet = objectPath.get(validationRules, validationInitConfig.rulePathFn(ruleKey));
  //   const validationIsFunction = typeof validationRuleSet === 'function';
  //   const validationIsArray = Array.isArray(validationRuleSet);
  //   if (validationIsFunction || validationIsArray) {
  //     let validationStatus = objectPath.get(this.state.validations, validationInitConfig.validationStatusPathFn(key));
  //     if (validationIsFunction) {
  //       validationStatus = (validationRuleSet.call(self, value, stateClone, key, validationConfig.ruleConfig)).errorText;
  //     } else {
  //       validationStatus = validationRuleSet.reduce((accumulator, rule) => {
  //         if (accumulator.length === 0 && typeof rule === 'function') {
  //           return (rule.call(self, value, stateClone, key, validationConfig.ruleConfig)).errorText;
  //         }
  //         return accumulator;
  //       }, '');
  //     }
  //     this.updateStateData('validations', validationInitConfig.validationStatusPathFn(key), validationStatus, callback);
  //     return;
  //   }
  // }
  // validateFunction(callback)();
}.bind(context);

export const checkIfObject = value => (value.constructor === {}.constructor);

export const promiseWrapper = (funcDef, argumentsObj, context) => new Promise((resolve, reject) => {
  if (typeof funcDef === 'function') {
    const argumentsObjPromise = checkIfObject(argumentsObj) ? { ...argumentsObj, promise: { resolve, reject } } : { promise: { resolve, reject } };
    funcDef.call(context, argumentsObjPromise);
  }
});

export const generateName = (firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return undefined;
};

export const UrlParamJsonUtil = {
  encode(inputJsonData, encodeToBase64 = false) {
    let data = JSON.stringify(inputJsonData);
    data = encodeToBase64 ? btoa(data) : data;
    return encodeURIComponent(data);
  },
  parse(inputUrlParam, encodeToBase64 = false) {
    let data = decodeURIComponent(inputUrlParam);
    data = encodeToBase64 ? atob(data) : data;
    return JSON.parse(data);
  },
};

export const convertToCamelCase = str => startCase(toLower(str));

/* eslint-disable no-confusing-arrow */
export const safelyAccessNestedObjectValue = (path, object) =>
  path.reduce((currentVal, nextProperty) => (currentVal && currentVal[nextProperty]) ? currentVal[nextProperty] : null, object);

export const isObject = o => o instanceof Object && o.constructor === Object;

export const convertToRupee = str => Number(str).toLocaleString('en-IN', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'INR',
});

export default {
  getStateModifier,
  getValidator,
  validateFunction,
  generateName,
  promiseWrapper,
  validateFieldToStateFn,
  UrlParamJsonUtil,
  safelyAccessNestedObjectValue,
  convertToCamelCase,
  isObject,
  convertToRupee,
};
