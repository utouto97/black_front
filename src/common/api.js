import axios from "axios";

export const useApi = (token) => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};


