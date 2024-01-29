import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNewAnecdote = async (content) => { 
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}
