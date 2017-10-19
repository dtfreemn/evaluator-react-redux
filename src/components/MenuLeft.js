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
         {this.usersButton()}<br/><br/>
         {this.evalItemsButton()}<br/><br/>
         {this.addScoreButton()}
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