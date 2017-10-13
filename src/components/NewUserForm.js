import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/users'

class NewUserForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitNewUser(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      email: ''
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <form className='form greydient fade-in' onSubmit={this.handleSubmit}>
        First Name: <input type="text" id='firstName' value={this.state.firstName} onChange={this.handleChange} required/>
        Last Name: <input type="text" id='lastName' value={this.state.lastName} onChange={this.handleChange} required/>
        Email: <input type="email" id='email' value={this.state.email} onChange={this.handleChange} required/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewUser: (state) => {
        dispatch(createUser(state))
      }
  }
}

export default connect(null, mapDispatchToProps)(NewUserForm);