import React from 'react'
import { connect } from 'react-redux'
import { createEvalItem } from '../actions/evalItems'

class NewEvalItemForm extends React.Component {
  state = {
    name: '',
    description: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitNewEvalItem(this.state)
    this.setState({
      name: '',
      description: ''
    })
  }

  render() {
    if (!this.props.isDeletingItem) {
      return (
        <div className='create-edit-form'>
          <form onSubmit={this.handleSubmit} className='form fade-in'>
            <span className='create-edit-form-label'>Item Title: </span><input type="text" id='name' value={this.state.name} onChange={this.handleChange} required/>
            <span className='create-edit-form-label'>Item Description: </span><input type="text" id='description' value={this.state.description} onChange={this.handleChange} required/>
            <input className='green-white-button' type="submit" value='Submit'/>
          </form>
        </div>
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