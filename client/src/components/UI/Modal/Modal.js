import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Modal = props => {
  const styles = {
    width: props.width + 'px'
  }
  
  return (
    <div className="Modal" style={styles}>
      <div className="Modal__header">
        <div>{props.title}</div>
        <Icon icon={faTimes} color="#999" />
      </div>
      {props.children}
    </div>
  )
}

export default Modal
