import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import '../../../assets/styles/index.scss'
import './TitleExpander.scss'

const TitleExpander = props => {
  const [isExpanded, toggleExpander] = useState(false)

  useEffect(() => {
    if (props.expandOnMount) {
      toggleExpander(prevState => !prevState)
    }
  }, [props.expandOnMount])

  return (
    <div className="TitleExpander">
      <div
        className="TitleExpander__header fs-14 p-12"
        onClick={() => toggleExpander(!isExpanded)}
      >
        {props.title} {props.extraAttribute}
        <Icon icon={isExpanded ? faChevronDown : faChevronUp}/>
      </div>
      <div>{isExpanded && props.content}</div>
    </div>
  )
}

export default TitleExpander
