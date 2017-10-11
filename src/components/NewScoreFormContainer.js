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
      this.props.fetchAllUsers()
    }

  }

  render() {
    if (this.props.evalItems.length > 0 && this.props.users.length > 0) {
      return (
        <NewScoreForm evalItems={this.props.evalItems} users={this.props.users} />
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
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvalItems: () => {
      dispatch(fetchAllEvalItems())
    },
    fetchAllUsers: () => {
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScoreFormContainer);