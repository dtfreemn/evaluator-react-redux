import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

//Rendered in App
class MenuLeft extends React.Component {
  
  render() {
    if (localStorage.getItem('jwt') && !this.props.showButtons) {
      return (
        <div className='menu-left'>  
          <NavLink className='menu-button user-button' to='/users'>Employees List</NavLink><br/><br/>
          
          <hr/>
          <br/>
          <NavLink className='menu-button group-button' to='/eval_categories'>Teams List</NavLink><br/><br/>
          
          <hr/>
          <br/>
          <NavLink className='menu-button item-button' to='/eval_items'>Values List</NavLink><br/><br/>
          
          <hr/>
          <br/>
          <NavLink className='menu-button menu-score-button' to='/scores/new'>eVALUEate</NavLink><br/><br/>
        </div>
      )
    } else {
      return (
        <div className='menu-left-on-login'> </div>
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