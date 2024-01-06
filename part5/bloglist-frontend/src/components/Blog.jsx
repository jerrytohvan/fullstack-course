import { useRef, useState, useEffect } from "react";
// import Togglable from "./Toggable";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [blogExpanded, setBlogExpanded] = useState(false);

  const toggleVisibility = () => setBlogExpanded(!blogExpanded);

  const showBlogList = () => {
    if (!blogExpanded) {
      return <button onClick={toggleVisibility}>view</button>;
    } else {
      return (
        <>
          <button onClick={toggleVisibility}>hide</button>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button>like</button>
          </p>
          {blog.user.name}
        </>
      );
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {showBlogList()}
      <br />
    </div>
  );
};

export default Blog;
