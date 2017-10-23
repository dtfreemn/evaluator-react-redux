import React from 'react';
import { connect } from 'react-redux'
import { fetchAllEvalItems } from '../actions/evalItems'
import { fetchAllUsers } from '../actions/users'
import NewScoreForm from './NewScoreForm'

class NewScoreFormContainer extends React.Component {
  
  componentDidMount() {
    if (this.props.evalItems.length === 0) {
      this.props.fetchEvalItems()
    }
    if (this.props.users.length === 0) {
      this.props.fetchAllUsers(this.props.currentUser)
    }

  }

  render() {
    if (this.props.evalItems.length > 0 && this.props.users.length > 0) {
      return (
        <NewScoreForm evalItems={this.props.evalItems} users={this.props.users} {...this.props}/>
      )
    } else {
      return (
        <div> </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    evalItems: state.evalItems,
    users: state.users,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvalItems: () => {
      dispatch(fetchAllEvalItems())
    },
    fetchAllUsers: (user) => {
      dispatch(fetchAllUsers(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScoreFormContainer);