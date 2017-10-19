import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/users'
import UserForm from './UserForm'

const NewUserForm = (props) => {

  const handleSubmit = (user) => {
    props.submitNewUser(user, props)
  }

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