import api from "../utils/api";

export const sendAuthData = async ({ username, password }) => {
  const body = {
    username,
    password
  };
  const response = await api.post("/auth", body);
  return response;
};