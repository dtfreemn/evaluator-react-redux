import React from 'react';
import { connect } from 'react-redux'
import { logInToApi, clearCurrentUserAndOrg } from '../actions/users'

class LogInForm extends React.Component {

  state = {
    email: '',
    password: ''
  }

  // componentDidMount() {
  //   if (!localStorage.getItem('jwt') && this.props) {
  //     this.props.logOutOfFrontEnd()
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitLogin(this.state, this.props)
    
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='form create-edit-form log-in-form fade-in'>
        <input id='email' type="text" placeholder='user@email.com' onChange={this.handleChange}/>
        <input id='password' placeholder='password' type="password" onChange={this.handleChange} /><br/>
        <input id='log-in-submit' type="submit" value='Log In'/>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: (emailPassword, props) => {
      dispatch(logInToApi(emailPassword, props))
    },
    logOutOfFrontEnd: () => {
      dispatch(clearCurrentUserAndOrg())
    }
  }
}

export default connect(null, mapDispatchToProps)(LogInForm);