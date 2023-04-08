import APIClient from './api-client.service';

export const getProperties = () => {
  const userId = localStorage.getItem('uid');
  return APIClient.getFromServer(`/property/?owner=${userId}&limit=50`);
};

export const addProperty = (payload: Record<string, any>) => {
  return APIClient.postToServer('/property/', payload);
};

export const updateProperty = (id: number, payload: Record<string, any>) => {
  return APIClient.postToServer(`/property/${id}/`, payload);
};

export const deleteProperty = (id: number) => {
  return APIClient.deleteFromServer(`/property/${id}/`);
};
