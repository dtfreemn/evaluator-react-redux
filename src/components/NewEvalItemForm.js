import React from 'react'
import { connect } from 'react-redux'
import { createEvalItem } from '../actions/evalItems'
import { fetchAllEvaluationCategories } from '../actions/categoriesAndPossiblePoints'
import EvalItemForm from './EvalItemForm'

class NewEvalItemForm extends React.Component {

  componentDidMount() {
    this.props.fetchEvalCategories()
  }
  
  handleSubmit = (evalItem) => {
    this.props.submitNewEvalItem(evalItem)
  }



    render() {
    if (!this.props.isDeletingItem) {
      return (
        <EvalItemForm name={''} description={''} handleSubmit={this.handleSubmit} evalCategories={this.props.currentEvalCategories} {...this.props}/>
      )
    } else {
      return (
        <div></div>
      )
    }
    }
}

function mapStateToProps(state) {
  return {
    isDeletingItem: state.attemptingItemDelete,
    currentEvalCategories: state.currentEvalCategories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewEvalItem: (state) => {
      dispatch(createEvalItem(state))
    },
    fetchEvalCategories: () => {
      dispatch(fetchAllEvaluationCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvalItemForm);