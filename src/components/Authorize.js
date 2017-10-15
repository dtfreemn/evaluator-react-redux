import React from 'react';
import { Redirect } from 'react-router-dom'

function Authorize(GivenComponent, props) {
  return class extends React.Component {
  
    render() {
      if (localStorage.getItem('jwt') && this.props.location.pathname ==='/login') {
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