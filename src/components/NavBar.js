import React from 'react';
import { clearCurrentUserAndOrg } from '../actions/users'
import { clearAllEvalItems } from '../actions/evalItems'
import { connect } from 'react-redux'

//Rendered on '/' in App
const NavBar = (props) => {
  
  const handleClick = () => {
    props.logOutUser()
    props.logOutEvalItems()
    localStorage.clear()
    props.history.push('/login')
  }

  const logOutButton = localStorage.getItem('jwt') ? <button onClick={handleClick}><strong>Log Out</strong></button> : null

  return (
    <div id='nav-bar'>
      {logOutButton}
      <span className='logo'>E-Valuator</span>
    </div>
  )
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