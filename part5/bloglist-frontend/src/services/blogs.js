import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  if (!newToken) {
    token = null;
    return;
  }
  token = `Bearer ${newToken}`;
};

export default { getAll, setToken };
