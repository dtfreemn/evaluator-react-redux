import React from 'react'

//Rendered by either NewEvalItemForm or EditEvalItemForm
class EvalItemForm extends React.Component {
  
  state = {
    name: this.props.name,
    description: this.props.description,
    evaluationCategoryId: null
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
      description: '',
      evalCategoryId: null
    })
  }

  handleSelectChange = (e) => {
    this.setState({
      evaluationCategoryId: e.target.value
    })
  }

  //uses eval categories passed down from either NewEvalItemForm or EditEvalItemForm
  makeEvalCategoriesSelectOptions = () => {
    if (this.props.evalCategories) {
      let options = this.props.evalCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
      options.unshift(<option key='defaultCategory' value=''>Assign Value to a team</option>)
      return options
    }
  }

  render() {
    return (
      <div className='create-edit-form'>
        <form onSubmit={this.handleSubmit} className='form fade-in'>
          <select id='eval-category-select' onChange={this.handleSelectChange} required>
              {this.makeEvalCategoriesSelectOptions()}
          </select><br/>
          <span className='create-edit-form-label'>Value Title: </span><input type="text" id='name' value={this.state.name} onChange={this.handleChange} required/>
          <span className='create-edit-form-label'>Value Description: </span><input type="text" id='description' value={this.state.description} onChange={this.handleChange} required/>
          <input className='green-white-button' type="submit" value={this.props.location.pathname.includes('edit') ? 'Edit Value' : 'Create New Value' }/>
        </form>
      </div>
    )
  }
}


export default EvalItemForm;