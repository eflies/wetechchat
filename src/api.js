import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const sendAuthData = async ({ username, password }) => {
  const body = {
    username,
    password,
  };
  const response = await api.post("/auth", body);
  return response;
};

export default api;
