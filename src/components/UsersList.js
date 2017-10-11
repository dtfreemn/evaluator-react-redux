import React from 'react'
import UserItem from './UserItem'

const UsersList = (props) => {

  const createUsers = () => {
    return props.users.map((user, index) => <UserItem key={index} info={user}/>)
  }

  return (
    <div>
      {createUsers()}
    </div>
  )
}

export default UsersList;