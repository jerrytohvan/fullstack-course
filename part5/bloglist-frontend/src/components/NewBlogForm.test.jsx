import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { mockBlog } from '../mockData/mockBlog'

describe('<NewBlogForm />', () => {
  const handleNewBlog = jest.fn()


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
