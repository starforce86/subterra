import APIClient from './api-client.service';

export const registerServiceCompany = (payload: Record<string, any>) => {
  return APIClient.postToServer('/service_company/', payload);
};

export const registerLandOwner = (payload: Record<string, any>) => {
  return APIClient.postToServer('/owner/', payload);
};
