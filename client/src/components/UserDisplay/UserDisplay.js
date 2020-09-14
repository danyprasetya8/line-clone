import React from 'react'
import userPlaceholder from '../../assets/images/user-placeholder.png'

import '../../assets/styles/index.scss'
import './UserDisplay.scss'

const UserDisplay = props => {
  return (
    <div className="UserDisplay p-16">
      <img src={userPlaceholder} alt="" />
      <div className="user-information">
        <div className="user-information__name fs-16">
          {props.name} {props.memberCount ? `(${props.memberCount})` : ''}
        </div>
        <div className="user-information__status fs-14">{props.status}</div>
      </div>
    </div>
  )
}

export default UserDisplay
