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
    return (
      <form onSubmit={this.handleSubmit} className='form fade-in greydient'>
        Name of new evaluation item: <input type="text" id='name' value={this.state.name} onChange={this.handleChange} required/>
        Description of new evaluation item: <input type="text" id='description' value={this.state.description} onChange={this.handleChange} required/>
        <input type="submit" value='Submit'/>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewEvalItem: (state) => {
      dispatch(createEvalItem(state))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewEvalItemForm);