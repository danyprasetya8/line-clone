import React, { Component } from 'react'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import Submenu from '../UI/Submenu/Submenu'
import UserDisplay from '../UserDisplay/UserDisplay'
import TitleExpander from '../UI/TitleExpander/TitleExpander'
import friendsApi from '../../api/friend'

import '../../assets/styles/index.scss'
import './HomePage.scss'

const dummyGroup = [
  {
    id: 'G-001',
    name: 'Group A',
    memberCount: 20
  },
  {
    id: 'G-002',
    name: 'Group B',
    memberCount: 30
  }
]

class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      groupCount: 10,
      friendCount: 0,
      groupList: dummyGroup,
      friendList: []
    }
  }

  static contextType = CurrentUserContext

  componentDidMount () {
    this.getFriendList()
      .then(res => {
        this.setState(() => ({
          friendList: res.data,
          friendCount: res.data.length
        }))
      })
  }

  async getFriendList () {
    const [currentUser] = this.context
    return await friendsApi.getFriend(currentUser.username)
  }

  handleSearching = e => {

  }

  toggleExpander = key => {
    this.setState({ [key]: !this.state[key] })
  }

  render () {
    const {
      groupCount,
      friendCount,
      groupList,
      friendList
    } = this.state

    const groupListEl = groupList.map(i => (
      <UserDisplay
        key={i.id}
        name={i.name}
        memberCount={i.memberCount}
      />
    ))

    const friendListEl = friendList.map(i => (
      <UserDisplay
        key={i.username}
        name={i.name}
        status={i.status}
      />
    ))

    return (
      <CurrentUserContext.Consumer>
        {
          ([currentUser]) => (
            <div className="HomePage">
              <SidebarMenu />
              <Submenu
                handleSearching={this.handleSearching}
                searchPlaceholder="Search by display name"
                useSearchbar
              >
                <UserDisplay
                  name={currentUser.name}
                  status={currentUser.profileStatus}
                />

                <TitleExpander
                  title="Groups"
                  extraAttribute={groupCount}
                  content={groupListEl}
                />

                <TitleExpander
                  title="Friends"
                  extraAttribute={friendCount}
                  content={friendListEl}
                />
              </Submenu>
            </div>
          )
        }
      </CurrentUserContext.Consumer>
    )
  }
}

export default HomePage
