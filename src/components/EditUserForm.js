import React from 'react';
import UserForm from './UserForm'
import { editUser } from '../actions/users'
import { connect } from 'react-redux'

//Rendered by UsersContainer. Sends employee's information to the form
class EditUserForm extends React.Component {

  handleSubmit = (user) => {
    this.props.editUser(user, this.props.id, this.props)
  }
  
  render() {
    return (
      <div className='create-edit-form'>
        <UserForm handleSubmit={this.handleSubmit} firstName={this.props.user.first_name} lastName={this.props.user.last_name} email={this.props.user.email} {...this.props}/>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    editUser: (user, userId, props) => {
      dispatch(editUser(user, userId, props))
    }
  }
}

export default connect(null, mapDispatchToProps)(EditUserForm);