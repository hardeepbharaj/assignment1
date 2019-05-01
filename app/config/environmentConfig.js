
/* Environments */
const environments = {
  PROD: 'PROD',
  DEV: 'DEV',
};

// const currentEnvironment = environments.PROD;
// const currentEnvironment = environments.DEV;
const currentEnvironment = process.env.RUN_MODE && Object.keys(environments).includes(process.env.RUN_MODE) ? environments[process.env.RUN_MODE] : environments.DEFAULT;

/* URL Prefixes */
const apiUrlPrefixes = {
  [environments.PROD]: '',
  [environments.DEV]: '',
};

const currentApiUrlPrefix = apiUrlPrefixes[currentEnvironment];

/* Log configuration */
const logLevels = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  OFF: 'SILENT',
};

/* Environment Specific configs */
const environmentConfigs = {
  [environments.PROD]: {
    enableAuthorization: false,
    enableMock: false,
    logLevel: logLevels.WARN,
    gaTrackingId: '',
  },
  [environments.DEV]: {
    enableAuthorization: false,
    enableMock: false,
    logLevel: logLevels.DEBUG,
    gaTrackingId: '',
  },
};

const currentEnvironmentConfig = environmentConfigs[currentEnvironment];

/* Exports */
export { environments, currentEnvironment, apiUrlPrefixes, currentApiUrlPrefix, environmentConfigs, currentEnvironmentConfig, logLevels };
