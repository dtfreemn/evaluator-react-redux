import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../actions/users'
import UsersList from './UsersList'

class UsersContainer extends React.Component {
  
  componentDidMount() {
    this.props.fetchUsers()
  }
  
  filterUsers = () => {
    if (this.props.location.pathname === '/users' || this.props.location.pathname === '/users/new') {
      return this.props.users
    } else if (this.props.match.params.id) {
      let id = this.props.match.params.id
      return this.props.users.filter(user => user.id === parseInt(id, 10))
    }
  }

  render() {
    return (
      <table id='users-container'>
        <tr>
          <th className='table-header'>First Name</th>
          <th className='table-header'>Last Name</th>
          <th className='table-header'>Email</th>
        </tr>
        <UsersList users={this.filterUsers()} windowProps={this.props}/>
      </table>
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