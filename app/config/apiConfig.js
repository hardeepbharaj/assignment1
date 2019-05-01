/* eslint-disable no-debugger */

import { currentApiUrlPrefix, currentEnvironmentConfig } from './environmentConfig';
import ApiConstants from './apiConstants';
import { getFromLocalStorage } from '../utils/localStorageUtils';

// Helper functions

const getJWTHeader = (config, useRefreshToken = false) => {
  const enhancedConfig = config;
  const oats = getFromLocalStorage('OATS');
  enhancedConfig.headers = {
    ...config.headers,
    Authorization: `Bearer ${useRefreshToken ? oats.refresh_token : oats.access_token}`,
  };
  return enhancedConfig;
};

// Spinner Default Configuration

const spinLoaderConfigDefault = {
  isEnabled: true,
  actionFunction: () => {},
  spinLoaderKey: 'appLevelLoader',
};

const setManageSpinLoaderAction = (actionFunction) => {
  spinLoaderConfigDefault.actionFunction = actionFunction;
};

// Pure Config to be used by AXIOS

const getAxiosApiConfig = (apiKey) => {
  if (apiKey && ~apiKey.indexOf('.')) {
    const apiKeyParams = apiKey.split('.');
    if (apiKey && ApiConstants[apiKeyParams[0]] && ApiConstants[apiKeyParams[0]][apiKeyParams[1]]) {
      const currentApi = ApiConstants[apiKeyParams[0]][apiKeyParams[1]];
      const apiConfig = { ...currentApi.apiConfig };
      if (currentApi.attachPrefix) {
        apiConfig.url = currentApiUrlPrefix + apiConfig.url;
        // for development mode
        // const url = apiConfig.url.replace('/api', '');
        // apiConfig.url = currentApiUrlPrefix + url;
      }
      return {
        ...apiConfig,
      };
    }
  }
  return null;
};


// Get Config Function for creating custom config object


const getConfig = (apiKey) => {
  let config = {};
  if (apiKey && ~apiKey.indexOf('.')) {
    const apiKeyParams = apiKey.split('.');
    if (apiKeyParams.length && ApiConstants[apiKeyParams[0]] && ApiConstants[apiKeyParams[0]][apiKeyParams[1]]) {
      const currentApi = ApiConstants[apiKeyParams[0]][apiKeyParams[1]];
      config = { ...currentApi.config };
      config = config || {};
      if (currentEnvironmentConfig.enableAuthorization && !currentApi.skipAuth) {
        config = getJWTHeader(config, currentApi.useRefreshToken);
      }
      config.apiKey = apiKey;
    }
  }
  return config;
};

export {
  getAxiosApiConfig,
  getConfig,
  setManageSpinLoaderAction,
  spinLoaderConfigDefault,
};
