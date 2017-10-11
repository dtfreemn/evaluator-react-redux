import React from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../actions/users'

const UserItem = (props) => {
  
  const user = props.info  

  const handleDelete = (e) => {
    props.deleteUserItem(user)
  }

  return (
    <p data-id={user.id}>{user.first_name} {user.last_name} -- {user.email} <button onClick={handleDelete}>X</button></p>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUserItem: (user) => {
      dispatch(deleteUser(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(UserItem);