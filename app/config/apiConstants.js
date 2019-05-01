// Structure

/* eslint-disable no-unused-vars */
const MockApiConstants = {
  moduleName: {
    apiName: {
      apiConfig: {
        url: '',
        method: 'POST',
      },
      config: {
        pathVariables: {
          policyRefId: '', // Value to be set in the component
        },
        urlParams: {
          sampleParamKey: '', // Key value to be set in the component
        },
        headers: {
          sampleParamKey: '', // Key value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: true, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },
  },
};
/* eslint-enable no-unused-vars */

const ApiConstants = {

};


export default ApiConstants;
