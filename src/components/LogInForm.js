import React from 'react';
import { connect } from 'react-redux'
import { logInToApi, clearCurrentUserAndOrg } from '../actions/users'

class LogInForm extends React.Component {

  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    if (!localStorage.getItem('jwt') && this.props.props) {
      this.props.logOutOfFrontEnd()
      this.props.props.history.push('/login')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitLogin(this.state, this.props.props)
    
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='greydient form'>
        <input id='email' type="text" placeholder='user@email.com' onChange={this.handleChange}/>
        <input id='password' type="password" onChange={this.handleChange} />
        <input type="submit" value='Submit'/>
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