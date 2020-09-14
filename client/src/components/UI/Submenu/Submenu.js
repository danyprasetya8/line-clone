import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import '../../../assets/styles/index.scss'
import './Submenu.scss'

const Submenu = props => {
  const searchbar = (
    <div className="searchbar">
      <Icon icon={faSearch} color="#999" />
      <input
        type="text"
        placeholder={props.searchPlaceholder}
        onChange={props.handleSearching}
      />
    </div>
  )

  return (
    <div className="Submenu">
      {props.useSearchbar && searchbar}
      {props.children}
    </div>
  )
}

export default Submenu
