import React from 'react';
import { connect } from 'react-redux'
import { createNewScoresAndActionSteps, isReviewingScore, isNotReviewingScore } from '../actions/scores'
import NewScoreReviewSubmit from './NewScoreReviewSubmit'

class NewScoreForm extends React.Component {

  componentDidMount() {
    this.makeInitialState()
  }

  makeInitialState = () => {
    let ids = this.props.evalItems.map(item => item.id)
    let stateObj = { scores: {}, actionStepCount: 0 , actionSteps: {} , employeeId: ''}
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

  handleEmployeeSelectChange = (e) => {
    this.setState({
      employeeId: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const employeeId = this.state.employeeId
    
    if (employeeId === '') {
      alert('You must choose an employee to evaluate')
      return
    }

    let finalScoresObj = {}
    let finalActionStepsObj = {}

    for (let key in this.state.scores) {
      if (isNaN(this.state.scores[key]['score'])) {
        alert('All scores must be a number')
        return
      } else if ((this.state.scores[key]['score'] === '' && this.state.scores[key]['note'] !== '') || (this.state.scores[key]['score'] !== '' && this.state.scores[key]['note'] === '')) {
        alert('You must fill out both the score and the note for any item that you choose to evaluate. If you do not want to score an item, please leave both inputs blank.')
        return
      } else if (this.state.scores[key]['score'] !== '' && this.state.scores[key]['note'] !== '') {
        finalScoresObj[key] = this.state.scores[key]
      }
    }

    if (Object.keys(finalScoresObj).length === 0) {
      alert('You cannot submit an evaluation without scoring at least one item')
      return
    }

    for (let key in this.state.actionSteps) {
      if (this.state.actionSteps[key] !== '') {
        finalActionStepsObj[key] = this.state.actionSteps[key]
      }
    }
    
    if (!this.props.isReviewingScore) {
      this.props.showScoreReviewPage()
    } else {
      this.props.submitNewScore(finalScoresObj, finalActionStepsObj, employeeId)
      this.props.hideScoreReviewPage()
      this.makeInitialState()
    }

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
  
  employeeBeingReviewed = () => {
    if (this.state.employeeId && this.state.employeeId!== '') {
      let employee = this.props.employees.filter(employee => employee.id === parseInt(this.state.employeeId,10))[0]
      return `You have chosen to evaluate ${employee.first_name} ${employee.last_name}`
    } else {
      return ''
    }
  }

  render() {
    if (this.state && !this.props.isReviewingScore) {
      return (
        <form id='new-score-form' className='form fade-in'>
         Employee: <select id='employeeID' onChange={this.handleEmployeeSelectChange} required>{this.makeEvalEmpSelectOptions()}</select> <span>{this.employeeBeingReviewed()}</span>
         {this.makeInputs()}
         <button onClick={this.incrementActionSteps}>Add Action Step</button><br/><br/>
         {this.makeActionStepInputs()}
         <button onClick={this.handleSubmit}>Review Evaluation For Submit</button>
        </form>
      )
    } else if (this.state && this.props.isReviewingScore){
      return (
        <NewScoreReviewSubmit showFormAgain={this.props.hideScoreReviewPage} submitNewScore={this.handleSubmit} scores={this.state.scores} actionSteps={this.state.actionSteps} evalItems={this.props.evalItems}/>
      )
    } else {
      return (
      <div></div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewScore: (scores, actionSteps, employeeID) => {
      dispatch(createNewScoresAndActionSteps(scores, actionSteps, employeeID))
    },
    showScoreReviewPage: () => {
      dispatch(isReviewingScore())
    },
    hideScoreReviewPage: () => {
      dispatch(isNotReviewingScore())
    }
  }
}

function mapStateToProps(state) {
  return {
    isReviewingScore: state.isReviewingScore,
    employees: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScoreForm);