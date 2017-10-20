import React from 'react'
import { connect } from 'react-redux'
import { createEvalItem } from '../actions/evalItems'
import EvalItemForm from './EvalItemForm'

const NewEvalItemForm = (props) => {

  const handleSubmit = (evalItem) => {
    props.submitNewEvalItem(evalItem)
  }

    if (!props.isDeletingItem) {
      return (
        <EvalItemForm name={''} description={''} handleSubmit={handleSubmit} {...props}/>
      )
    } else {
      return (
        <div></div>
      )
    }
}

function mapStateToProps(state) {
  return {
    isDeletingItem: state.attemptingItemDelete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewEvalItem: (state) => {
      dispatch(createEvalItem(state))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvalItemForm);