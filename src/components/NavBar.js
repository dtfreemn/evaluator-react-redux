import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div id='nav-bar'>
      <NavLink to='/users'><button>All Users</button></NavLink>
      <NavLink to='/users/new'><button>Add User</button></NavLink>
      <NavLink to='/eval_items'><button>All Eval Items</button></NavLink>
      <NavLink to='/eval_items/new'><button>Add Eval Item</button></NavLink>
      <NavLink to='/scores/new'><button>Add Score</button></NavLink>
      <span className='logo'>Evaluator</span>
    </div>
  )
}

export default NavBar;