import React, { Component } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import Submenu from '../UI/Submenu/Submenu'
import TitleExpander from '../UI/TitleExpander/TitleExpander'
import UserDisplay from '../UserDisplay/UserDisplay'
import Modal from '../UI/Modal/Modal'
import userApi from '../../api/users'
import friendApi from '../../api/friend'
import userPlaceholder from '../../assets/images/user-placeholder.png'

import '../../assets/styles/index.scss'
import './AddFriendPage.scss'

class AddFriendPage extends Component {
  constructor () {
    super()
    this.state = {
      friendRecommendations: [],
      visibleSearchFriendsModal: false,
      visibleCreateGroupModal: false,
      usernameKeyword: '',
      usernameSearchResult: {},
      isSearching: false,
      isUserNotFound: false
    }
  }

  static contextType = CurrentUserContext

  componentDidMount () {
    this.getAllUser()
      .then(res => this.setState({ friendRecommendations: res.data }))
  }

  getAllUser = async () => {
    return await userApi.getAllUsers()
  }

  getOneUser = async username => {
    return await userApi.getUserByUsername(username)
  }

  addFriend = async (username, friendUsername) => {
    return await friendApi.addFriend(username, friendUsername)
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
    this.setState({
      usernameKeyword: e.target.value
    })
  }

  handleKeydown = async e => {
    if (e.key === 'Enter' && this.state.usernameKeyword) {
      this.getOneUser(this.state.usernameKeyword)
        .then(res => {
          this.setState({
            usernameSearchResult: res.data,
            isSearching: true,
            isUserNotFound: false
          })
        })
        .catch(() => {
          this.setState({
            isUserNotFound: true
          })
        })
    }
  }

  handleAddFriend = () => {
    const { usernameSearchResult } = this.state
    const [currentUser] = this.context
    this.addFriend(currentUser.username, usernameSearchResult.username)
      .then(this.toggleSearchFriendsModal)
  }

  handleCancelSearch = () => {
    this.setState({
      usernameKeyword: '',
      usernameSearchResult: {},
      isSearching: false
    })
  }
  
  render () {
    const {
      friendRecommendations,
      visibleSearchFriendsModal,
      visibleCreateGroupModal,
      usernameSearchResult,
      isSearching,
      usernameKeyword,
      isUserNotFound
    } = this.state

    const [currentUser] = this.context
    const isMyself = currentUser.username === usernameSearchResult.username

    const friendRecommendationsEl = friendRecommendations.map(i => (
      <UserDisplay
        key={i._id}
        name={i.name}
        status={i.status}
      />
    ))

    const userFoundEl = (
      <>
        <img src={userPlaceholder} alt="" />
        <p>{usernameSearchResult.name}</p>
        {isMyself && <small>You can't add yourself as a friend</small>}
        <div>
          <button className="btn-add"
            disabled={isMyself}
            onClick={this.handleAddFriend}>
            Add
          </button>
          <button className="btn-cancel"
            onClick={this.handleCancelSearch}>
            Cancel
          </button>
        </div>
      </>
    )

    const userNotFoundEl = (
      <>
        <div>User not found</div>
        <button className="btn-ok"
          onClick={this.handleCancelSearch}>
          OK
        </button>
      </>
    )

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
          <Modal
            width="300"
            height="400"
            title="Search for friends"
            toggleModal={this.toggleSearchFriendsModal}
          >
            <div className="searchbar">
              <Icon icon={faSearch} color="#999" />
              <input
                type="text"
                placeholder="Search by id"
                onChange={this.handleSearchFriends}
                onKeyDown={this.handleKeydown}
                value={usernameKeyword}
              />
            </div>
            {
              isSearching &&
              <div className="search-result">
                { isUserNotFound ? userNotFoundEl : userFoundEl }
              </div>
            }
          </Modal>
        }
      </div>
    )
  }
}

export default AddFriendPage
