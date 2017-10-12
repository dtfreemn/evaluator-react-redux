import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div id='nav-bar'>
      <NavLink to='/users'>All Users</NavLink>
      <NavLink to='/users/new'>Add User</NavLink>
      <NavLink to='/eval_items'>All Eval Items</NavLink>
      <NavLink to='/eval_items/new'>Add Eval Item</NavLink>
      <NavLink to='/scores/new'>Add Score</NavLink>
      <span className='logo'>Evaluator</span>
    </div>
  )
}

export default NavBar;