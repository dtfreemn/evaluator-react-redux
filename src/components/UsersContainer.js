import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../actions/users'
import UsersList from './UsersList'

class UsersContainer extends React.Component {
  
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchUsers()
    }
  }
  

  render() {
    return (
      <div id='users-container'>
        <UsersList users={this.props.users}/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => {
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);