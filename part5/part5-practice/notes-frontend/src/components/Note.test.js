import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from './Note'
import userEvent from '@testing-library/user-event'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)
  // screen.debug() => Logs the HTML of the component to the console

  const element = await screen.findByText(
    /Component testing is done with react-testing-library/i
  )
  expect(element).toBeInTheDocument()

  //   OTHER CLASSNAME QUERY TEST METHOD
  //   const { container } = render(<Note note={note} />)
  //   const div = container.querySelector('.note')
  //   expect(div).toHaveTextContent(
  //     'Component testing is done with react-testing-library'
  //   )
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders content', async () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true,
  }

  render(<Note note={note} />)

  const element = await screen.findByText(/Does not work anymore :\(/i)
  expect(element).toBeInTheDocument()
})
