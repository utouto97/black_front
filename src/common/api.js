import axios from "axios";

export default (token) => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};
