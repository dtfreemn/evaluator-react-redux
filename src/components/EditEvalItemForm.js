import React from 'react';
import EvalItemForm from './EvalItemForm'
import { connect } from 'react-redux'
import { editEvalItem } from '../actions/evalItems'

class EditEvalItemForm extends React.Component {

  handleSubmit = (item) => {
    this.props.editEvalItem(item, this.props.id, this.props)
  }

  render() {
    return (
      <div className='create-edit-form'>
        <EvalItemForm handleSubmit={this.handleSubmit} name={this.props.name} description={this.props.description} {...this.props} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editEvalItem: (evalItem, evalItemId, props) => {
      dispatch(editEvalItem(evalItem, evalItemId, props))
    }
  }
}

export default connect(null, mapDispatchToProps)(EditEvalItemForm);