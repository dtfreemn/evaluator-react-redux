import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

//Rendered in App
class MenuLeft extends React.Component {
  
  render() {
    if (localStorage.getItem('jwt') && !this.props.showButtons) {
      return (
        <div className='menu-left'>  
          <NavLink className='green-white-button' to='/users'>Employees</NavLink><br/><br/>
          <NavLink className='green-white-button' to='/users/new'>New Employee</NavLink><br/><br/>
          <hr/>
          <br/>
          <NavLink className='green-white-button' to='/eval_categories'>Eval Groups</NavLink><br/><br/>
          <NavLink className='green-white-button' to='/eval_categories/new'>New Eval Group</NavLink><br/><br/>
          <hr/>
          <br/>
          <NavLink className='green-white-button' to='/eval_items'>Eval Items</NavLink><br/><br/>
          <NavLink className='green-white-button' to='/eval_items/new'>New Eval Item</NavLink><br/><br/>
          <hr/>
          <br/>
          <NavLink className='green-white-button' to='/scores/new'>Add Score</NavLink><br/><br/>
        </div>
      )
    } else {
      return (
        <div className='menu-left'> </div>
      )
    }
  } 
}

//On delete of eval item, user gets kicked to a confirmation page. Buttons are hidden on that page to ensure that user finishes transaction or cancels
function mapStateToProps(state) {
  return {
    showButtons: state.attemptingItemDelete
  }
}


export default connect(mapStateToProps, null)(MenuLeft);