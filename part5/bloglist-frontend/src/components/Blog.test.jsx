import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { mockBlog } from '../mockData/mockBlog'

describe('<Blog />', () => {
  const handleBlogLike = jest.fn()
  const handleDeleteBlog = jest.fn()
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={mockBlog}
        handleLikeBlog={handleBlogLike}
        handleDeleteBlog={handleDeleteBlog}
      />
    ).container
  })

  test('blog is shown with toggle to view details', async () => {
    const divShow = screen.getByText('view')
    expect(divShow).toBeDefined()
    expect(container).not.toHaveTextContent(mockBlog.url)
  })

  test('blog details are shown upon toggling view', async () => {
    const divShow = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(divShow)

    expect(container).toHaveTextContent(mockBlog.url)
    expect(container).toHaveTextContent(`likes ${mockBlog.likes}`)

    const divhide = screen.getByText('hide')
    expect(divhide).toBeDefined()
  })

  test('when a like button is clicked twice, two likes were addded', async () => {
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
