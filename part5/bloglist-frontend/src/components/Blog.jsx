import { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const confirmDeleteBlog = (handleDeleteBlog, blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    handleDeleteBlog(blog)
  }
}

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const [blogExpanded, setBlogExpanded] = useState(false)

  const toggleVisibility = () => setBlogExpanded(!blogExpanded)

  const showBlogList = () => {
    if (!blogExpanded) {
      return <button onClick={toggleVisibility}>view</button>
    } else {
      return (
        <>
          <button onClick={toggleVisibility}>hide</button>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button id='like-button' onClick={() => handleLikeBlog(blog)}>like</button>
          </p>
          {blog.user.name}
          <br/>
          <button onClick={() => confirmDeleteBlog(handleDeleteBlog, blog)}>
            remove
          </button>
        </>
      )
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {showBlogList()}
      <br />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}


export default Blog
