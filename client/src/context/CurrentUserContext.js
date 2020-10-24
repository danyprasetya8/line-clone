import React, { useState } from 'react'

export const CurrentUserContext = React.createContext({})

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setState] = useState({})

  const setCurrentUser = user => {
    setState(() => user)
  }
  
  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUserContext.Provider>
  )
}
