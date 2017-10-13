import React from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../actions/users'
import { NavLink } from 'react-router-dom'

const UserItem = (props) => {
  
  const user = props.info  

  const handleDelete = (e) => {
    props.deleteUserItem(user)
      if (props.windowProps.location.pathname.includes(user.id)) {
      props.windowProps.history.push('/users')
    }
  }

  const profileOrDeleteButton = () => {
    return !props.windowProps.location.pathname.includes(user.id) ? <button><NavLink to={'/users/' + user.id}>See Profile</NavLink></button> : <button onClick={handleDelete}>Delete This User</button>
  }

  //DELETE LATER -- HERE SO THAT I CAN SEE THE HASH STRUCTURE
  // if (props.windowProps.location.pathname.includes(user.id)) {
  //   console.log(user.scores)
  // }

  return (
    <tr className='greydient' data-id={user.id}>
      <td className='rounded'>{user.first_name} {profileOrDeleteButton()}</td>
      <td className='rounded'>{user.last_name}</td>
      <td className='rounded'>{user.email}</td>
    </tr>
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