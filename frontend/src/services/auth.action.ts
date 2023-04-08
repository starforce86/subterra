import APIClient from './api-client.service';

export const login = (email: string, password: string) => {
  return APIClient.postToServer('/auth/login/', { email, password });
};

export const logout = () => {
  return APIClient.postToServer('/auth/logout/', {});
};
