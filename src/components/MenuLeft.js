import React from 'react';
import { NavLink } from 'react-router-dom'

const MenuLeft = (props) => {
  
  const usersButton = props.location.pathname === '/users' ? <NavLink className='green-white-button' to='/users/new'>New Employee</NavLink> : <NavLink className='green-white-button' to='/users'>Employees</NavLink>

  const evalItemsButton = props.location.pathname === '/eval_items' ? <NavLink className='green-white-button' to='/eval_items/new'>New Eval Item</NavLink> : <NavLink className='green-white-button' to='/eval_items'>Eval Items</NavLink>

  const addScoreButton = props.location.pathname === '/scores/new' ? null : <NavLink className='green-white-button' to='/scores/new'>Add Score</NavLink>

  if (localStorage.getItem('jwt')) {
    return (
      <div className='menu-left'>  
        {usersButton}<br/><br/><br/>
        {evalItemsButton}<br/><br/><br/>
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