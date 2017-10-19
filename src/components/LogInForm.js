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

  errorMessage = () => {
    if (this.props.error) {
      return <div className='error-message'>User not found</div>
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='form create-edit-form log-in-form fade-in'>
        {this.errorMessage()}
        <input id='email' type="text" placeholder='user@email.com' onChange={this.handleChange}/>
        <input id='password' placeholder='password' type="password" onChange={this.handleChange} /><br/>
        <input id='log-in-submit' type="submit" value='Log In'/>
      </form>
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
    },
    logOutOfFrontEnd: () => {
      dispatch(clearCurrentUserAndOrg())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);