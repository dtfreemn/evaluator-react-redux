import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div id='nav-bar'>
      <NavLink to='/login'>Log In</NavLink>
      <NavLink to='/logout'><button>Log Out</button></NavLink>
      <NavLink to='/users'>All Employees</NavLink>
      <NavLink to='/users/new'>Add Employee</NavLink>
      <NavLink to='/eval_items'>All Eval Items</NavLink>
      <NavLink to='/eval_items/new'>Add Eval Item</NavLink>
      <NavLink to='/scores/new'>Add Score</NavLink>
      <span className='logo'>Evaluator</span>
    </div>
  )
}

export default NavBar;