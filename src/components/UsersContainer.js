import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../actions/users'
import UsersList from './UsersList'
import UserChartContainer from './UserChartContainer'

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

  chartComponent = () => {
    if (this.props.match.params.id && this.props.match.params.id !== 'new') {
      return <UserChartContainer user={this.filterUsers()} />
    }
  }

  render() {
    return (
      <div id='users-container'>
        <table>
          <thead>
            <tr className='greydient'>
              <td className='rounded table-header'>First Name</td>
              <td className='rounded table-header'>Last Name</td>
              <td className='rounded table-header'>Email</td>
            </tr>
          </thead>
          <UsersList users={this.filterUsers()} windowProps={this.props}/>
        </table>
        {this.chartComponent()}
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