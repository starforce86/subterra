import APIClient from './api-client.service';

export const getMineralTypes = () => {
  return APIClient.getFromServer('/mineral_type/');
};

export const getCertificationTypes = () => {
  return APIClient.getFromServer('/certification_type/');
};

export const getState = () => {
  return APIClient.getFromServer('/location/region/?country=234');
};

export const getCounty = (stateId: string) => {
  return APIClient.getFromServer(`/location/subregion/?region=${stateId}`);
};

export const getCities = (countyId: string) => {
  return APIClient.getFromServer(`/location/city/?subregion=${countyId}`);
};

export const getServicesOffered = () => {
  return APIClient.getFromServer('/service/');
};
