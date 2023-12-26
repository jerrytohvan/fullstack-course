// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-3-4-7
// const _ = require('lodash');

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs && blogs.length === 0) {
    return 0;
  }
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog
  );
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  //   Define the function mostBlogs , which receives an array of blogs as a parameter. The function determines the author with the most blogs. The return value of the function also tells the number of blogs of the record blogger:

  // {
  //   author: "Robert C. Martin",
  //   blogs: 3
  // }

  // If there are many record bloggers, it is enough for the function to return one of them.
  const allWriters = [...new Set(blogs.map((blog) => blog.author))];
  const uniqueWriters = allWriters.map((writer) => {
    return { author: writer, blogs: 0 };
  });

  uniqueWriters.forEach((writer) => {
    const totalBlogs = blogs.filter((blog) => blog.author === writer.author);
    writer.blogs = totalBlogs.length;
  });

  return uniqueWriters.reduce((max, writer) =>
    max.blogs > writer.blogs ? max : writer
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
