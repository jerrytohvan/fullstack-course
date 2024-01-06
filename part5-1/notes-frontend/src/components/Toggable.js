import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      {visible ? (
        <>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </>
      ) : (
        <>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>{' '}
        </>
      )}
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Toggalable'

export default Togglable
