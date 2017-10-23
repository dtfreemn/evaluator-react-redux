import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class MenuLeft extends React.Component {
  

  usersButton = () => {
    return this.props.location.pathname === '/users' ? <NavLink className='green-white-button menu-button' to='/users/new'>New Employee</NavLink> : <NavLink className='green-white-button' to='/users'>Employees</NavLink>
  }

  evalItemsButton = () => {
    return this.props.location.pathname === '/eval_items' ? <NavLink className='green-white-button menu-button' to='/eval_items/new'>New Eval Item</NavLink> : <NavLink className='green-white-button' to='/eval_items'>Eval Items</NavLink>
  }

  addScoreButton = () => {
    return this.props.location.pathname === '/scores/new' ? null : <NavLink className='green-white-button menu-button' to='/scores/new'>Add Score</NavLink>
  }


  render() {
    if (localStorage.getItem('jwt') && !this.props.showButtons) {
      return (
        <div className='menu-left'>  
         <NavLink className='green-white-button menu-button' to='/users/new'>New Employee</NavLink><br/><br/>
         <NavLink className='green-white-button' to='/users'>Employees</NavLink><br/><br/>
         <hr/>
         <br/>
         <NavLink className='green-white-button' to='/eval_categories'>Your Groups</NavLink><br/><br/>
         <NavLink className='green-white-button' to='/eval_categories/new'>New Group</NavLink><br/><br/>
         <hr/>
         <br/>
         <NavLink className='green-white-button' to='/eval_items'>Eval Items</NavLink><br/><br/>
         <NavLink className='green-white-button menu-button' to='/eval_items/new'>New Eval Item</NavLink><br/><br/>
         <hr/>
         <br/>
         <NavLink className='green-white-button menu-button' to='/scores/new'>Add Score</NavLink><br/><br/>

        </div>
      )
    } else {
      return (
        <div> </div>
      )
    }
  }
  
}

function mapStateToProps(state) {
  return {
    showButtons: state.attemptingItemDelete
  }
}


export default connect(mapStateToProps, null)(MenuLeft);