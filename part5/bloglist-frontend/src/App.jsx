import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successNotification, setSuccessNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogRef = useRef()

  useEffect(() => {
    console.log('refreshing blog posts')
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((curr, next) => {
        const currentLikes = curr.likes
        const nextLikes = next.likes
        if (currentLikes < nextLikes) {
          return 1
        }
        if (currentLikes > nextLikes) {
          return -1
        }

        return 0
      })
      setBlogs(sortedBlogs)
    })
  }, [successNotification])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUser) {
      const userSession = JSON.parse(loggedInUser)
      setUser(userSession)
      blogService.setToken(userSession.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(null)
    setUser(null)

    setUsername('')
    setPassword('')
  }

  const handleNewBlog = async (blog) => {
    try {
      const newBlog = await blogService.createNewBlog(blog)
      newBlogRef.current.toggleVisibility()
      setSuccessNotification(
        `a new blog ${blog.title} by ${blog.author} added`
      )
      setBlogs(blogs.concat(newBlog))
      setTimeout(() => {
        setSuccessNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikeBlog = async (blog) => {
    const updatedBlog = await blogService.addLike(blog)
    setSuccessNotification(`Like added to blog ${updatedBlog.title}`)
    setTimeout(() => {
      setSuccessNotification(null)
    }, 5000)
  }

  const handleDeleteBlog = async (blog) => {
    await blogService.deleteBlog(blog)
    setSuccessNotification(`Blog ${blog.title} removed!`)
    setTimeout(() => {
      setSuccessNotification(null)
    }, 5000)
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">login</button>
      </form>
    </>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={newBlogRef}>
      <NewBlogForm handleNewBlog={handleNewBlog} />
    </Togglable>
  )

  const logoutButton = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const blogContents = () => (
    <>
      <h2>blogs</h2>
      <>
        {`${user.name} logged in`}
        {logoutButton()}
      </>
      {createBlogForm()}
      <br />
      <>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeBlog={handleLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
      </>
    </>
  )

  return (
    <>
      {' '}
      {successNotification && (
        <div className="success">{successNotification}</div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {!user ? loginForm() : blogContents()}
    </>
  )
}

export default App
