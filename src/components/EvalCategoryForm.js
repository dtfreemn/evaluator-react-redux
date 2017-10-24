import React from 'react';

class EvalCategoryForm extends React.Component {

  state = {
    name: this.props.name,
    possibleScoresCount: 0,
    possibleScores: {},
    currentScores: this.props.currentScores
  }

  handleNameInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.name === '') {
      alert('Your new group must have a name')
      return
    }
    let scores = this.state.possibleScores
    let finalPossibleScores = {}
    
    for (let key in scores) {
      if (isNaN(scores[key]['score'])) {
        alert('All scores must be numbers.')
        return
      }

      if ((scores[key]['score'] === '' && scores[key]['description'] !== '') ||  (scores[key]['score'] !== '' && scores[key]['description'] === '' )) {
        alert('Each new possible score must have a score AND a description.')
        return
      }  

      finalPossibleScores[key] = scores[key]
    }

    if ((Object.keys(finalPossibleScores).length < 2) && (Object.keys(this.state.currentScores).length < 2)) {
      alert('Your new evaluation group must have at least 2 possible scores.')
      return
    }

    
    this.props.handleSubmit(this.state.name, finalPossibleScores, this.props, this.state.currentScores)
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
      possibleScores: Object.assign({}, this.state.possibleScores, { [e.target.id]: newPossibleScore})
    })
  }

  makePossibleScoresInputs = () => {
      let inputs = []
      let num = this.state.possibleScoresCount
      for (let i = 0; i < num; i++) {
        let newInput = <div className='score-cell' key={i}><span className='table-header white-back'>New Possible Score {i+1}</span><input className='action-step-entry' id={i} name='score' onChange={this.handlePossibleScoresScoreInputChange} value={this.state.possibleScores[i]['score']}/><br/><span className='table-header white-back'>Description</span><br/><textarea className='action-step-entry' id={i} name='description' onChange={this.handlePossibleScoresScoreInputChange} value={this.state.possibleScores[i]['description']}/><hr/></div>
        inputs.push(newInput)
    }
    return inputs
  }

  handleCurrentScoresScoreInputChange = (e) => {
    let updatedScore = Object.assign({}, this.state.currentScores[e.target.id], {[e.target.name]: e.target.value})
    
    this.setState({
      currentScores: Object.assign({}, this.state.currentScores, { [e.target.id]: updatedScore})
    })
  }

  makeCurrentScoreEditInputs = () => {
    let currScores = this.state.currentScores
    let inputs = []
    for (let currKey in currScores) {
      let newInput = <div className='score-cell' key={currKey}><span className='table-header white-back'>Current Possible Score {parseInt(currKey,10) + 1}</span><input className='action-step-entry' id={currKey} name='score' onChange={this.handleCurrentScoresScoreInputChange} value={this.state.currentScores[currKey]['score']}/><br/><span className='table-header white-back'>Description</span><br/><textarea className='action-step-entry' id={currKey} name='description' onChange={this.handleCurrentScoresScoreInputChange} value={this.state.currentScores[currKey]['description']}/><hr/></div>
      inputs.push(newInput)
    }
    return inputs
  }
  
  render() {
    return (
      <form className='form fade-in' onSubmit={this.handleSubmit}>
        <span className='create-edit-form-label'>Name: </span><input type="text" placeholder='name of group' onChange={this.handleNameInputChange} value={this.state.name}/>
        {this.makeCurrentScoreEditInputs()}
        {this.makePossibleScoresInputs()}
        <input className='green-white-button' type='submit' value='Submit'/><span><button className='green-white-button grey-button' onClick={this.incrementPossibleScores}>Add Possible Score</button></span>
      </form>
    )
  }
}

export default EvalCategoryForm;