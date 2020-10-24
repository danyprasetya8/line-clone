import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import '../../../assets/styles/index.scss'
import './Modal.scss'

const Modal = props => {
  const styles = {
    width: props.width + 'px',
    height: props.height + 'px'
  }
  
  return (
    <div className="Modal">
      <div className="mask"
        onClick={props.toggleModal}/>
      <div className="Modal__container" style={styles}>
        <div className="Modal__header fs-12">
          <div>{props.title}</div>
          <Icon icon={faTimes}
            color="#999"
            onClick={props.toggleModal}/>
        </div>
        <div className="Modal__slot">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal
