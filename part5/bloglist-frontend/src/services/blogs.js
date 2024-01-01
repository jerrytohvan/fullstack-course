import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNewBlog = async (draftBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, draftBlog, config);
  return response.data;
};

const setToken = (newToken) => {
  if (!newToken) {
    token = null;
    return;
  }
  token = `Bearer ${newToken}`;
  console.log(token);
};

export default { getAll, createNewBlog, setToken };
