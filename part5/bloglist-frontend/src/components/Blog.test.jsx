import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const handleBlogLike = jest.fn()
  const handleDeleteBlog = jest.fn()

  const mockBlog = {
    title: 'new admin blog',
    author: 'jerry tohvan',
    url: 'https://www.google.com',
    likes: 22,
    user: {
      username: 'jerry',
      name: 'Admin',
      id: '658d2edc638aaf242542e423',
    },
    id: '658d32894697d2ed83917fa1',
  }

  test('blog is shown with toggle to view details', async () => {
    const { container } = render(
      <Blog
        blog={mockBlog}
        handleLikeBlog={handleBlogLike}
        handleDeleteBlog={handleDeleteBlog}
      />
    )
    const divShow = screen.getByText('view')
    expect(divShow).toBeDefined()
    expect(container).not.toHaveTextContent(mockBlog.url)
  })

  test('blog details are shown upon toggling view', async () => {
    const { container } = render(
      <Blog
        blog={mockBlog}
        handleLikeBlog={handleBlogLike}
        handleDeleteBlog={handleDeleteBlog}
      />
    )
    const divShow = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(divShow)

    expect(container).toHaveTextContent(mockBlog.url)
    expect(container).toHaveTextContent(`likes ${mockBlog.likes}`)

    const divhide = screen.getByText('hide')
    expect(divhide).toBeDefined()
  })

  test('when a like button is clicked twice, two likes were addded', async () => {
    render(
      <Blog
        blog={mockBlog}
        handleLikeBlog={handleBlogLike}
        handleDeleteBlog={handleDeleteBlog}
      />
    )
    const divShow = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(divShow)

    const divLike = screen.getByText('like')
    await user.click(divLike)
    await user.click(divLike)

    expect(handleBlogLike.mock.calls).toHaveLength(2)
    expect(handleBlogLike.mock.calls[0][0].id).toBe(mockBlog.id)
  })
})
