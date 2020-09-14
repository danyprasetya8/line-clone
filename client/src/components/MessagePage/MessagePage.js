import React, { Component } from 'react'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import Submenu from '../UI/Submenu/Submenu'

import '../../assets/styles/index.scss'
import './MessagePage.scss'

class MessagePage extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleSearching = e => {
    
  }
  
  render() {
    return (
      <div className="MessagePage">
        <SidebarMenu />
        <Submenu
          handleSearching={this.handleSearching}
          searchPlaceholder="Search for chats and messages"
          useSearchbar
        >
          Test
        </Submenu>
      </div>
    )
  }
}

export default MessagePage
