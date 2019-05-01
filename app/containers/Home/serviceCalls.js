import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export async function sendCustDataServices(request) {
  const fetchQuotesConfig = getConfig('Lead.leads');
  fetchQuotesConfig.data = request;
  const apiInstance = new ApiService(fetchQuotesConfig);
  return apiInstance.call();
}

export default [
  sendCustDataServices,
];
