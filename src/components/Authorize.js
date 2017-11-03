import React from 'react';
import { Redirect } from 'react-router-dom'

//Higher order component to make sure that user is logged in or sends them to log in page
function Authorize(GivenComponent, props) {
  return class extends React.Component {
  
    render() {
      if (localStorage.getItem('jwt') && (this.props.location.pathname === '/login' || this.props.location.pathname === '/')) {
        return <Redirect to='/users' />
      } else if (!localStorage.getItem('jwt') && this.props.location.pathname !== '/login') {
        return <Redirect to='/login' />
      } else {
        return <GivenComponent {...this.props} {...props}/>
      }
    }
  }
}

export default Authorize;