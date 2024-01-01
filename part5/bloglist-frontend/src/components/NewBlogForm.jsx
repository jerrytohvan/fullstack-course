import { useState, useEffect } from "react";

const NewBlogForm = ({ handleNewBlog }) => {
  const [draftBlog, setDraftBlog] = useState({});
  
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

  const createNewBlog = (event) => {
    event.preventDefault()
    handleNewBlog(draftBlog);
    setDraftBlog({});
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
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
};

export default NewBlogForm;
