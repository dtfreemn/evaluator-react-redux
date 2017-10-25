import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/users'
import UserForm from './UserForm'

//Rendered in App
const NewUserForm = (props) => {

  const handleSubmit = (user) => {
    props.submitNewUser(user, props)
  }
  
  //passes in blank first name, last name, and email because the form expects those props so that it can be compatible with both the new and edit parents
  return (
    <div className='create-edit-form'>
      <UserForm handleSubmit={handleSubmit} firstName={''} lastName={''} email={''} {...props}/>
    </div>
  )
  
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewUser: (user, props) => {
        dispatch(createUser(user, props))
      }
  }
}

export default connect(null, mapDispatchToProps)(NewUserForm);