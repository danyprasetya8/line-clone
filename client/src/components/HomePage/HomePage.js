import React, { Component } from 'react'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import Submenu from '../UI/Submenu/Submenu'
import UserDisplay from '../UserDisplay/UserDisplay'
import TitleExpander from '../UI/TitleExpander/TitleExpander'

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

const dummyFriend = [
  {
    id: 'F-001',
    name: 'Budi A',
    status: 'My name is Budi A'
  },
  {
    id: 'F-002',
    name: 'Budi B',
    status: 'My name is Budi B'
  }
]

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupCount: 10,
      friendCount: 50,
      groupList: dummyGroup,
      friendList: dummyFriend
    }
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
        key={i.id}
        name={i.name}
        status={i.status}
      />
    ))

    return (
      <div className="HomePage">
        <SidebarMenu />
        <Submenu
          handleSearching={this.handleSearching}
          searchPlaceholder="Search by display name"
          useSearchbar
        >
          <UserDisplay
            name="Dany Prasetya"
            status="Hello world!"
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
}

export default HomePage
