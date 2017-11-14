import React from 'react';
import { connect } from 'react-redux'
import { logInToApi } from '../actions/users'

//Rendered in App
class LogInForm extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitLogin(this.state, this.props) 
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  errorMessage = () => {
    if (this.props.error) {
      return <div className='error-message fade-in'>User not found</div>
    }
  }

  render() {
    return (
      <div className='log-in-grid'>
      <div id='demo'>Demo Credentials: admin@flatiron.com (password: flatiron)</div>
      <form onSubmit={this.handleSubmit} className='form create-edit-form log-in-form fade-in'>
        {this.errorMessage()}
        <input id='email' type="text" placeholder='user@email.com' onChange={this.handleChange}/>
        <input id='password' placeholder='password' type="password" onChange={this.handleChange} /><br/>
        <input id='log-in-submit' type="submit" value='Log In'/>
      </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: (emailPassword, props) => {
      dispatch(logInToApi(emailPassword, props))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);