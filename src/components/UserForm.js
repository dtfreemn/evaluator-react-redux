import React from 'react'

class Form extends React.Component {
  
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      email: ''
    })
  }

  render() {
    return (
      <form className='form fade-in' onSubmit={this.handleSubmit}>
          <span className='create-edit-form-label'>First Name: </span><input type="text" id='firstName' value={this.state.firstName} onChange={this.handleChange} required/>
         <span className='create-edit-form-label'>Last Name: </span><input type="text" id='lastName' value={this.state.lastName} onChange={this.handleChange} required/>
          <span className='create-edit-form-label'>Email: </span><input type="email" id='email' value={this.state.email} onChange={this.handleChange} required/>
          <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export default Form;