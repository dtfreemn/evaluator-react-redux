import React from 'react';

class EvalCategoryForm extends React.Component {

  state = {
    name: '',
    possibleScoresCount: 0,
    possibleScores: {}
  }

  handleNameInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createCategoryAndPossiblePoints(this.state.name, this.state.possibleScores)
    this.setState({
      name: '',
      possibleScoresCount: 0,
      possibleScores: {}
    })
  }

  incrementPossibleScores = (e) => {
    e.preventDefault()
    this.setState({
      possibleScoresCount: this.state.possibleScoresCount + 1,
      possibleScores: Object.assign({}, this.state.possibleScores, {[this.state.possibleScoresCount]: {score: '', description: ''}})
    })
  }

  handlePossibleScoresScoreInputChange = (e) => {
    let newPossibleScore = this.state.possibleScores[e.target.id]
    newPossibleScore[e.target.name] = e.target.value
    this.setState({
      actionSteps: Object.assign({}, this.state.possibleScores, { [e.target.id]: newPossibleScore})
    })
  }

  makePossibleScoresInputs = () => {
    let num = this.state.possibleScoresCount
    let inputs = []
    for (let i = 0; i < num; i++) {
      let newInput = <div className='score-cell' key={i}><span className='table-header'>Possible Score {i+1}</span><br/><input className='action-step-entry' id={i} name='score' onChange={this.handlePossibleScoresScoreInputChange} value={this.state.possibleScores[i]['name']}/><br/><span className='table-header'>Description</span><br/><textarea className='action-step-entry' id={i} name='description' onChange={this.handlePossibleScoresScoreInputChange} value={this.state.possibleScores[i]['description']}/></div>
      inputs.push(newInput)
    }
    return inputs
  }
  
  render() {
    return (
      <form className='form fade-in' onSubmit={this.handleSubmit}>
        <span className='create-edit-form-label'>Name: </span><input type="text" placeholder='name of group' onChange={this.handleNameInputChange} value={this.state.name}/>
        <button className='green-white-button grey-button' onClick={this.incrementPossibleScores}>Add Possible Score</button>
        {this.makePossibleScoresInputs()}
        <input type='submit' value='Submit'/>
      </form>
    )
  }
}

export default EvalCategoryForm;