import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: () => true,
});

export default {
  getFromServer: async (path: string) => {
    const token = localStorage.getItem('token');
    return await client
      .get(path, {
        headers: {
          Authorization: token ? `Token ${token}` : '',
        },
      })
      .then((res) => res);
  },

  postToServer: async (path: string, data: Record<string, any>) => {
    const token = localStorage.getItem('token');
    return await client
      .post(path, data, {
        headers: {
          Authorization: token ? `Token ${token}` : '',
        },
      })
      .then((res) => res);
  },

  putToServer: async (path: string, data: Record<string, any>) => {
    const token = localStorage.getItem('token');
    return await client
      .put(path, data, {
        headers: {
          Authorization: token ? `Token ${token}` : '',
        },
      })
      .then((res) => res);
  },

  patchToServer: async (path: string, data: Record<string, any>) => {
    const token = localStorage.getItem('token');
    return await client
      .patch(path, data, {
        headers: {
          Authorization: token ? `Token ${token}` : '',
        },
      })
      .then((res) => res);
  },

  deleteFromServer: async (path: string) => {
    const token = localStorage.getItem('token');
    return await client
      .delete(path, {
        headers: {
          Authorization: token ? `Token ${token}` : '',
        },
      })
      .then((res) => res);
  },
};
