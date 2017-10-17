import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../actions/users'
import UsersList from './UsersList'
import UserChartContainer from './UserChartContainer'
import EditUserForm from './EditUserForm'


class UsersContainer extends React.Component {
  
  state = {
    searchFilter: ''
  }

  componentDidMount() {
    this.props.fetchUsers()
  }
  
  filterUsers = () => {
    if (this.props.location.pathname === '/users' || this.props.location.pathname === '/users/new') {
      return this.props.users.filter(user => user.first_name.toLowerCase().includes(this.state.searchFilter.toLowerCase()) || user.last_name.toLowerCase().includes(this.state.searchFilter.toLowerCase()) || user.email.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
    } else if (this.props.match.params.id && !isNaN(this.props.match.params.id)) {
      let id = this.props.match.params.id
      return this.props.users.filter(user => user.id === parseInt(id, 10))
    }
  }

  chartComponent = () => {
    if (this.props.match.params.id && this.props.match.params.id !== 'new') {
      return <UserChartContainer user={this.filterUsers()} />
    }
  }

  userSearch = () => {
    if (this.props.location.pathname === '/users') {
      return <input type='text' placeholder='search users' value={this.state.searchFilter} onChange={this.handleSearchChange} />
    } else {
      return null
    }
  }

  handleSearchChange = (e) => {
    this.setState({
      searchFilter: e.target.value
    })
  }
  

  editUserForm = () => {
    if (this.props.location.pathname.split('/').includes('edit') && this.props.users.length > 0) {
      let user = this.filterUsers()[0]
      return <EditUserForm user={user} id={this.props.match.params.id} {...this.props}/>
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