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
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes
};
