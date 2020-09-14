import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import RegistrationPage from './components/RegistrationPage/RegistrationPage'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import MessagePage from './components/MessagePage/MessagePage'
import AddFriendPage from './components/AddFriendPage/AddFriendPage'
import config from './config/index'

import './App.scss'

const page = config.page

const App = () => {
  return (
    <Router>
      <div className="App">
        <Redirect to="/login"/>

        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route path={page.login} component={LoginPage}></Route>
          <Route path={page.registration} component={RegistrationPage}></Route>
          <Route path={page.home} component={HomePage}></Route>
          <Route path={page.messages} component={MessagePage}></Route>
          <Route path={page.add_friends} component={AddFriendPage}></Route>
        </AnimatedSwitch>
      </div>
    </Router>
  )
}

export default App
