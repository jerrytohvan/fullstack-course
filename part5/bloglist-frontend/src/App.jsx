import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successNotification, setSuccessNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [draftBlog, setDraftBlog] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [draftBlog]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedInUser) {
      const userSession = JSON.parse(loggedInUser);
      setUser(userSession);
      blogService.setToken(userSession.token);
    }
  }, []);

  // cleans up empty values in draftBlog
  useEffect(() => {
    const objectKeys = Object.keys(draftBlog);
    objectKeys.map((key) => {
      if (draftBlog[key] === "") {
        delete draftBlog[key];
        setDraftBlog({ ...draftBlog });
      }
    });
  }, [draftBlog]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedBlogUser", JSON.stringify(user));
    blogService.setToken(null);
    setUser(null);

    setUsername("");
    setPassword("");
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const user = await blogService.createNewBlog(draftBlog);
      if (user) {
        setDraftBlog({});
      }
      setSuccessNotification(
        `a new blog ${draftBlog.title} by ${draftBlog.author} added`
      );
      setTimeout(() => {
        setSuccessNotification(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const createBlogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            type="text"
            value={draftBlog.title || ""}
            name="title"
            onChange={({ target }) =>
              setDraftBlog({ ...draftBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={draftBlog.author || ""}
            name="author"
            onChange={({ target }) =>
              setDraftBlog({ ...draftBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={draftBlog.url || ""}
            name="url"
            onChange={({ target }) =>
              setDraftBlog({ ...draftBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );

  const logoutButton = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  );

  const blogContents = () => (
    <>
      <h2>blogs</h2>
      <>
        {`${user.name} logged in`}
        {logoutButton()}
      </>
      {createBlogForm()}{" "}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return (
    <>
      {" "}
      {successNotification && (
        <div className="success">{successNotification}</div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {!user ? loginForm() : blogContents()}
    </>
  );
};

export default App;
