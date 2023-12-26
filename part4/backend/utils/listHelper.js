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

const mostLikes = (blogs) => {
  const allWriters = [...new Set(blogs.map((blog) => blog.author))];
  const uniqueWriters = allWriters.map((writer) => {
    return { author: writer, likes: 0 };
  });

  uniqueWriters.forEach((writer) => {
    const totalLikes = blogs.reduce(
      (sum, blog) => (blog.author === writer.author ? sum + blog.likes : sum),
      0
    );
    writer.likes = totalLikes;
  });

  return uniqueWriters.reduce((max, writer) =>
    max.likes > writer.likes ? max : writer
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
