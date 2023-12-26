// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-3-4-7

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
