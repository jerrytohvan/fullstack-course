import React from 'react'

import Toggleable from './Toggleable'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Toggleable>
    ).container
  })

  // Test cases looks a bit differently due to different ways to structure toggable component

  test('at start the children are not displayed', async () => {
    const divShow = container.querySelector('.closeToggle')
    const divChild = container.querySelector('.togglableContent')

    expect(divShow).toBeDefined()
    expect(divChild).toBeNull()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).toBeDefined()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const divOpen = container.querySelector('.togglableContent')
    expect(divOpen).toBeDefined()

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const divClose = container.querySelector('.togglableContent')
    expect(divClose).toBeNull()
  })
})
