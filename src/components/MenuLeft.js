import React from 'react';
import { NavLink } from 'react-router-dom'

const MenuLeft = (props) => {
  
  const usersButton = props.location.pathname === '/users' ? <NavLink to='/users/new'>New Employee</NavLink> : <NavLink to='/users'>Employees</NavLink>

  const evalItemsButton = props.location.pathname === '/eval_items' ? <NavLink to='/eval_items/new'>New Eval Item</NavLink> : <NavLink to='/eval_items'>Eval Items</NavLink>

  const addScoreButton = props.location.pathname === '/scores/new' ? null : <NavLink to='/scores/new'>Add Score</NavLink>

  if (localStorage.getItem('jwt')) {
    return (
      <div className='menu-left'>  
        {usersButton}<br/><br/>
        {evalItemsButton}<br/><br/>
        {addScoreButton}
      </div>
    )
  } else {
    return (
      <div> </div>
    )
  }
  
}

export default MenuLeft