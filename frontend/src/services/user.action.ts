import APIClient from './api-client.service';

export const getProfile = () => {
  const userType = localStorage.getItem('utype');
  const userId = localStorage.getItem('uid');
  const endpoint = userType === 'land_owner' ? '/owner' : '/service_company';

  return APIClient.getFromServer(`${endpoint}/${userId}/`);
};

export const resetPassword = (email: string) => {
  return APIClient.postToServer('/auth/password/reset/', { email });
};
