import React from 'react';
import UserForm from './UserForm'
import { editUser } from '../actions/users'
import { connect } from 'react-redux'

class EditUserForm extends React.Component {

  handleSubmit = (user) => {
    this.props.editUser(user, this.props.id, this.props)
  }
  
  render() {
    return (
      <div className='create-edit-form'>
        <UserForm handleSubmit={this.handleSubmit} firstName={this.props.user.first_name} lastName={this.props.user.last_name} email={this.props.user.email}/>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    editUser: (user, id, props) => {
      dispatch(editUser(user, id, props))
    }
  }
}

export default connect(null, mapDispatchToProps)(EditUserForm);