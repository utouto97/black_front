import axios from "axios";
import { useAuth } from "@/common/auth";

const auth = useAuth();

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${auth.state.token}`,
  },
});

export default api;

