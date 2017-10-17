import React from 'react';
import { connect } from 'react-redux'
import { createNewScoresAndActionSteps } from '../actions/scores'

class NewScoreForm extends React.Component {

  componentDidMount() {
    this.makeInitialState()
  }

  makeInitialState = () => {
    let ids = this.props.evalItems.map(item => item.id)
    let stateObj = { scores: {}, actionStepCount: 0 , actionSteps: {} }
    ids.forEach(id => stateObj.scores[id] = {score: '', note: ''})
    this.setState(stateObj)
  }
  
  makeInputs = () => {
    if (this.state) {
      return this.props.evalItems.map(item => <p key={item.id}>{item.name} -- {item.description}: <input type='text' id={item.id} name='score' placeholder='score' value={this.state.scores[`${item.id}`]['score']} onChange={this.handleChange}/> <textarea id={item.id} type='text' name='note' placeholder='notes' value={this.state.scores[`${item.id}`]['note']} onChange={this.handleChange}/></p>)
    } else {
      return null
    }
  }

  handleChange = (e) => {
    let newScore = this.state.scores[e.target.id]
    newScore[e.target.name] = e.target.value

    this.setState({
      scores: Object.assign({}, this.state.scores, {[e.target.id]: newScore})
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const employeeId = {employeeID: document.getElementById('employeeID').value}
    let finalScoresObj = {}
    for (let key in this.state.scores) {
      if (this.state.scores[key]['score'] !== '' && this.state.scores[key]['note'] !== '') {
        finalScoresObj[key] = this.state.scores[key]
      } else if (this.state.scores[key]['score'] !== '' || this.state.scores[key]['note'] !== '') {
        alert('You must fill out both the score and the note for any item that you choose to evaluate. If you do not want to score an item, please leave both inputs blank.')
        return
      }
    }

    

    if (Object.keys(finalScoresObj).length === 0) {
      alert('You cannot submit an evaluation without scoring at least one item')
      return
    }
    this.props.submitNewScore(finalScoresObj, this.state.actionSteps, employeeId)
    this.makeInitialState()
  }

  makeEvalEmpSelectOptions = () => {
    const options = this.props.users.map(user => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)
    options.unshift(<option key='default' value=''>Choose Evaluee</option>)
    return options
  }

  incrementActionSteps = (e) => {
    e.preventDefault()
    this.setState({
      actionStepCount: this.state.actionStepCount + 1,
    })
  }

  handleActionStepInputChange = (e) => {
    this.setState({
      actionSteps: Object.assign({}, this.state.actionSteps, { [e.target.id]: e.target.value})
    })
  }

  makeActionStepInputs = () => {
    let num = this.state.actionStepCount
    let inputs = []
    for (let i = 0; i < num; i++) {
      let newInput = <div key={i}>New Action Step: <br/><textarea id={i} onChange={this.handleActionStepInputChange} value={this.state.actionSteps[i]}/><br/><br/></div>
      inputs.push(newInput)
    }
    return inputs
  }
  

  render() {
    if (this.state) {
      return (
        <form id='new-score-form' className='form fade-in' onSubmit={this.handleSubmit}>
         Employee: <select id='employeeID'required>{this.makeEvalEmpSelectOptions()}</select>
         {this.makeInputs()}
         <button onClick={this.incrementActionSteps}>Add Action Step</button><br/><br/>
         {this.makeActionStepInputs()}
         <button type="submit">Submit Evaluation</button>
        </form>
      )
    } else {
      return (
        <div> </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewScore: (scores, actionSteps, employeeID) => {
      dispatch(createNewScoresAndActionSteps(scores, actionSteps, employeeID))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewScoreForm);