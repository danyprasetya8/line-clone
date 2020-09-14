import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faComment, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import config from '../../config'

import './SidebarMenu.scss'

const page = config.page

const SidebarMenu = () => {
  return (
    <div className="SidebarMenu">
      <Link to={page.home}>
        <Icon icon={faUser} color="#999" />
      </Link>
      <Link to={page.messages}>
        <Icon icon={faComment} color="#999" />
      </Link>
      <Link to={page.add_friends}>
        <Icon icon={faUserPlus} color="#999" />
      </Link>
    </div>
  )
}

export default SidebarMenu
