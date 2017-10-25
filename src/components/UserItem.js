import React from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../actions/users'
import { NavLink } from 'react-router-dom'

//Rendered by UsersList
const UserItem = (props) => {
  
  const user = props.info  

  const handleDelete = (e) => {
    props.deleteUserItem(user)
      if (props.windowProps.location.pathname.includes(user.id)) {
      props.windowProps.history.push('/users')
    }
  }

  const profileButton = () => {
    return !props.windowProps.location.pathname.includes(user.id) ? <NavLink className='profile-delete-edit-button grey-button' to={'/users/' + user.id + '/s'}>Profile</NavLink> : null
  }

  const deleteButton = () => {
    return props.windowProps.location.pathname.includes('edit') ? <button className='profile-delete-edit-button hover-white' onClick={handleDelete} style={{backgroundColor: 'red'}}>Delete</button> : null
  }

  const editUserButton = () => {
    if (props.windowProps.location.pathname.includes(user.id) && !props.windowProps.location.pathname.includes('edit')) {
      return <NavLink className='profile-delete-edit-button' to={'/users/' + user.id + '/edit'}>Edit</NavLink>
    }
  }

  return (
    <tr className='bottom' data-id={user.id}>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td className='profile-button-col'>{profileButton()}{editUserButton()}{deleteButton()}</td>
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