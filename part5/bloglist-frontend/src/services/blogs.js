import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewBlog = async (draftBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, draftBlog, config)
  return response.data
}

const setToken = (newToken) => {
  if (!newToken) {
    token = null
    return
  }
  token = `Bearer ${newToken}`
}

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    },
    config
  )
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, createNewBlog, setToken, addLike, deleteBlog }
