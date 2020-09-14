import React from 'react'
import './Card.scss'

const Modal = ({ children, width }) => {
  const styles = {
    width: width + 'px'
  }
  return (
    <div className="Card" style={styles}>
      {children}
    </div>
  )
}

export default Modal
