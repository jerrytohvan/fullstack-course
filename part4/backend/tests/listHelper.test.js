const listHelper = require('../utils/listHelper');
const  { initialBlogs } = require('./test_helper');
const emptyBlog = [];


test('dummy returns one', () => {
  const result = listHelper.dummy(emptyBlog);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlog);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([initialBlogs[1]]);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(initialBlogs);
    const totalLikes = initialBlogs.reduce((sum, item) => sum + item.likes, 0);
    expect(result).toBe(totalLikes);
  });
});

describe('favorite blogs', () => {
  test('to return favourite blog by most likes', () => {
    const result = listHelper.favoriteBlog(initialBlogs);
    expect(result).toBe(initialBlogs[2]);
  });
});

describe('most blogs', () => {
  test('to return writter with most blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs);
    expect(result).toMatchObject({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('most likes', () => {
  test('to return writter with most likes', () => {
    const result = listHelper.mostLikes(initialBlogs);
    expect(result).toMatchObject({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});
