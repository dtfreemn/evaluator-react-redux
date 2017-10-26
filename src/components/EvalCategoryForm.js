import React from 'react';

//Rendered by either NewEvalCategoryForm or EditEvalCategoryForm
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
    let finalPossibleScores = {} //to be final object to pass to the fetch
    
    for (let key in scores) {
      
      //checks if the score is a number
      if (isNaN(scores[key]['score'])) {
        alert('All scores must be numbers.')
        return
      }

      //checks if both the score AND the notes have been filled out for any item that has one or the other
      if ((scores[key]['score'] === '' && scores[key]['description'] !== '') ||  (scores[key]['score'] !== '' && scores[key]['description'] === '' )) {
        alert('Each new possible score must have a score AND a description.')
        return
      }  

      finalPossibleScores[key] = scores[key]
    }

    this.props.handleSubmit(this.state.name, finalPossibleScores, this.props, this.state.currentScores)
    this.props.history.push('/eval_categories')
  }

  //keeps count of the number of possible score inputs that need to be rendered. incremented by user button click
  incrementPossibleScores = (e) => {
    e.preventDefault()
    this.setState({
      possibleScoresCount: this.state.possibleScoresCount + 1,
      possibleScores: Object.assign({}, this.state.possibleScores, {[this.state.possibleScoresCount]: {score: '', description: ''}})
    })
  }

  //dynamically finds the corresponding score object in state and updates either its score or its notes, depending on the input that is edited
  handlePossibleScoresScoreInputChange = (e) => {
    let newPossibleScore = this.state.possibleScores[e.target.id]
    newPossibleScore[e.target.name] = e.target.value
    this.setState({
      possibleScores: Object.assign({}, this.state.possibleScores, { [e.target.id]: newPossibleScore})
    })
  }

  //creates inputs based on the count incremented on user button click. creates controlled inputs
  makePossibleScoresInputs = () => {
      let inputs = []
      let num = this.state.possibleScoresCount
      for (let i = 0; i < num; i++) {
        let newInput = <div className='score-cell fade-in' key={i}><span className='table-header white-back'>New Rubric Item {i+1}</span><input className='action-step-entry' id={i} name='score' onChange={this.handlePossibleScoresScoreInputChange} value={this.state.possibleScores[i]['score']}/><br/><span className='table-header white-back'>Description</span><br/><textarea className='action-step-entry' id={i} name='description' onChange={this.handlePossibleScoresScoreInputChange} value={this.state.possibleScores[i]['description']}/><hr/></div>
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

  //uses currentScores object created in EditEvalCategoryForm component to create already-filled-in inputs of the categories saved possible points
  makeCurrentScoreEditInputs = () => {
    let currScores = this.state.currentScores
    let inputs = []
    for (let currKey in currScores) {
      let newInput = <div className='score-cell' key={currKey}><span className='table-header white-back'>Current Rubric Item {parseInt(currKey,10) + 1}</span><input className='action-step-entry' id={currKey} name='score' onChange={this.handleCurrentScoresScoreInputChange} value={this.state.currentScores[currKey]['score']}/><br/><span className='table-header white-back'>Description</span><br/><textarea className='action-step-entry' id={currKey} name='description' onChange={this.handleCurrentScoresScoreInputChange} value={this.state.currentScores[currKey]['description']}/><hr/></div>
      inputs.push(newInput)
    }
    return inputs
  }
  
  render() {
    return (
      <form className='form fade-in' onSubmit={this.handleSubmit}>
        <span className='create-edit-form-label'>Name: </span><input type="text" placeholder='name of team' onChange={this.handleNameInputChange} value={this.state.name}/>
        {this.makeCurrentScoreEditInputs()}
        {this.makePossibleScoresInputs()} {/* renders new possible point inputs at the bottom */}
        <input className='green-white-button' type='submit' value={this.props.location.pathname.includes('edit') ? 'Edit Team' : 'Create New Team'}/><span><button className='green-white-button grey-button' onClick={this.incrementPossibleScores}>Add Rubric Item</button></span>
      </form>
    )
  }
}

export default EvalCategoryForm;