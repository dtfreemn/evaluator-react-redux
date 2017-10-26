import React from 'react';
import { clearCurrentUserAndOrg } from '../actions/users'
import { clearAllEvalItems } from '../actions/evalItems'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

//Rendered on '/' in App
const NavBar = (props) => {
  
  const handleClick = () => {
    props.logOutUser()
    props.logOutEvalItems()
    localStorage.clear()
    props.history.push('/login')
  }

  // const logOutButton = localStorage.getItem('jwt') ? <button className='log-out-button' onClick={handleClick}><strong>Log Out</strong></button> : null
  if (localStorage.getItem('jwt')) {
    return (
      <div id='nav-bar'>
        <button className='nav-bar-link'><NavLink to='/users/new'>Add New Employee</NavLink></button>
        <button className='nav-bar-link'><NavLink to='/eval_categories/new'>Add New Team</NavLink></button>
        <button className='nav-bar-link'><NavLink to='/eval_items/new'>Add New Value</NavLink></button>
        <span className='logo'>eVALUEate</span>
        <button className='log-out-button' onClick={handleClick}><strong>Log Out</strong></button>
      </div>
    )
  } else {
    return (
      <div id='nav-bar'>
        <span className='logo-on-login'>eVALUEate</span>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logOutUser: () => {
      dispatch(clearCurrentUserAndOrg())
    },
    logOutEvalItems: () => {
      dispatch(clearAllEvalItems())
    }
  }
}

export default connect(null, mapDispatchToProps)(NavBar);