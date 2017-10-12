import React from 'react'
import UserItem from './UserItem'

const UsersList = (props) => {

  const createUsers = () => {
    if (props.users) {
      return props.users.map((user, index) => <UserItem key={index} info={user} windowProps={props.windowProps}/>)
    }
  }

  return (
    <tbody>
      {createUsers()}
    </tbody>
  )
}

export default UsersList;