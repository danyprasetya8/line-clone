import React, { Component } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import Submenu from '../UI/Submenu/Submenu'
import TitleExpander from '../UI/TitleExpander/TitleExpander'
import UserDisplay from '../UserDisplay/UserDisplay'
import Modal from '../UI/Modal/Modal'
import api from '../../api/users'

import '../../assets/styles/index.scss'
import './AddFriendPage.scss'

class AddFriendPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friendRecommendations: [],
      visibleSearchFriendsModal: false,
      visibleCreateGroupModal: false
    }
  }

  componentDidMount () {
    this.getAllUser()
      .then(res => this.setState({ friendRecommendations: res.data }))
  }

  getAllUser = async () => {
    return await api.getAllUsers()
  }

  toggleSearchFriendsModal = () => {
    this.setState({
      visibleSearchFriendsModal: !this.state.visibleSearchFriendsModal
    })
  }

  toggleCreateGroupModal = () => {
    this.setState({
      visibleCreateGroupModal: !this.state.visibleCreateGroupModal
    })
  }

  handleSearchFriends = e => {

  }
  
  render () {
    const {
      friendRecommendations,
      visibleSearchFriendsModal,
      visibleCreateGroupModal
    } = this.state

    const friendRecommendationsEl = friendRecommendations.map(i => (
      <UserDisplay
        key={i._id}
        name={i.name}
        status={i.status}
      />
    ))

    return (
      <div className="AddFriendPage">
        <SidebarMenu />
        <Submenu>
          <div
            className="menu-container p-16"
            onClick={this.toggleSearchFriendsModal}
          >
            <div className="circle p-20">
              <Icon icon={faUserPlus} color="#999" />
            </div>
            Search for friends
          </div>
          <div
            className="menu-container p-16"
            onClick={this.toggleCreateGroupModal}
          >
            <div className="circle p-20">
              <Icon icon={faUsers} color="#999" />
            </div>
            Create a group
          </div>

          <TitleExpander
            title="Friend recomendations"
            extraAttribute={friendRecommendations.length}
            content={friendRecommendationsEl}
            expandOnMount
          />
        </Submenu>

        {
          visibleSearchFriendsModal &&
          <Modal width="300">
            <div className="searchbar">
              <Icon icon={faSearch} color="#999" />
              <input
                type="text"
                placeholder="Search by id"
                onChange={this.handleSearchFriends}
              />
            </div>
          </Modal>
        }
      </div>
    )
  }
}

export default AddFriendPage
