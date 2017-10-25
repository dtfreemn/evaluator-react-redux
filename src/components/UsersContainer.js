import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../actions/users'
import UsersList from './UsersList'
import UserChartContainer from './UserChartContainer'
import EditUserForm from './EditUserForm'

//Rendered in App
class UsersContainer extends React.Component {
  
  state = {
    searchFilter: ''
  }

  componentDidMount() {
    this.props.fetchUsers()
  }
  
  filterUsers = () => {
    let filter = this.state.searchFilter.toLowerCase()
    if (this.props.location.pathname === '/users' || this.props.location.pathname === '/users/new') {
      return this.props.users.filter(user => user.first_name.toLowerCase().includes(filter) || user.last_name.toLowerCase().includes(filter) || user.email.toLowerCase().includes(filter))
    } else if (this.props.match.params.id && !isNaN(this.props.match.params.id)) {
      let id = this.props.match.params.id
      return this.props.users.filter(user => user.id === parseInt(id, 10))
    }
  }

  //only renders chart container if you're on the individual employee's page
  chartContainer = () => {
    if (this.props.match.params.id && this.props.match.params.id !== 'new' && this.props.users.length > 0) {
      return <UserChartContainer user={this.filterUsers()} />
    }
  }

  //since UsersContainer is rendered in a few different situations, need to dynamically create the search bar only if user is on users index
  userSearch = () => {
    if (this.props.location.pathname === '/users') {
      return <div className='create-edit-form users-search'><input type='text' placeholder='search for employee' value={this.state.searchFilter} onChange={this.handleSearchChange} /></div>
    } else {
      return null
    }
  }

  handleSearchChange = (e) => {
    this.setState({
      searchFilter: e.target.value
    })
  }
  
  //renders edit user form above users container only if on edit path
  editUserForm = () => {
    if (this.props.location.pathname.split('/').includes('edit') && this.props.users.length > 0) {
      if (this.filterUsers().length > 0) {
        let user = this.filterUsers()[0]
        return <EditUserForm user={user} id={this.props.match.params.id} {...this.props}/>
      }
    }
  }

  render() {
    return (
      <div id='users-container' className='container large'>
        {this.userSearch()}
        {this.editUserForm()}
        <table className='fade-in'>
          <thead>
            <tr>
              <td className='table-header'>First Name</td>
              <td className='table-header'>Last Name</td>
              <td className='table-header'>Email</td>
              <td className='table-header profile-button-col'></td>
            </tr>
          </thead>
          <UsersList users={this.filterUsers()} windowProps={this.props}/>
        </table>
        {this.chartContainer()}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    users: state.users,
    currentUser: state.currentUser
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