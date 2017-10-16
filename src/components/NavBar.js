import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  
  const logInLogOutButton = localStorage.getItem('jwt') ? <NavLink to='/logout'><button>Log Out</button></NavLink> : <NavLink to='/login'><button>Log In</button></NavLink>

  return (
    <div id='nav-bar'>
      {logInLogOutButton}
      <span className='logo'>Evaluator</span>
    </div>
  )
}

export default NavBar;