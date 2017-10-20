import React from 'react'

class EvalItemForm extends React.Component {
  
  state = {
    name: this.props.name,
    description: this.props.description
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState({
      name: '',
      description: ''
    })
  }

  render() {
    return (
      <div className='create-edit-form'>
        <form onSubmit={this.handleSubmit} className='form fade-in'>
          <span className='create-edit-form-label'>Item Title: </span><input type="text" id='name' value={this.state.name} onChange={this.handleChange} required/>
          <span className='create-edit-form-label'>Item Description: </span><input type="text" id='description' value={this.state.description} onChange={this.handleChange} required/>
          <input className='green-white-button' type="submit" value={this.props.location.pathname.includes('edit') ? 'Edit' : 'Create New Item' }/>
        </form>
      </div>
    )
  }
}


export default EvalItemForm;