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
        <div className="togglableContent">
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      ) : (
        <div className="closeToggle">
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>{' '}
        </div>
      )}
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Toggalable'

export default Togglable
