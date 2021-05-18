import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

export default function User() {
  const state = useContext(GlobalState)
  const [ isLoggedIn ] = state.userAPI.isLogged
  const [ isAdmin ] = state.userAPI.isAdmin
  const [ userDetails ] = state.userAPI.userDetails
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}
