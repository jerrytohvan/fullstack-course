import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  const handleNewBlog = jest.fn()

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

  test('create new blog form is sent correctly', async () => {
    const { container } = render(<NewBlogForm handleNewBlog={handleNewBlog} />)
    const actor = userEvent.setup()

    const { id, user, likes, ...createdFormFields } = mockBlog

    const divTitle = container.querySelector('#title')
    await actor.type(divTitle, createdFormFields.title)

    const divUrl = container.querySelector('#url')
    await actor.type(divUrl, createdFormFields.url)

    const divAuthor = container.querySelector('#author')
    await actor.type(divAuthor, createdFormFields.author)

    const divCreate = screen.getByText('create')
    await actor.click(divCreate)

    expect(handleNewBlog.mock.calls).toHaveLength(1)
    const sentObject = handleNewBlog.mock.calls[0][0]
    expect(sentObject).toEqual(createdFormFields)
  })
})
