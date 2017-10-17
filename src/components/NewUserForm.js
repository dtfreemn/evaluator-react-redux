import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/users'
import UserForm from './UserForm'

const NewUserForm = (props) => {

  const handleSubmit = (user) => {
    props.submitNewUser(user, props)
  }

  return (
    <UserForm handleSubmit={handleSubmit} firstName={''} lastName={''} email={''}/>
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