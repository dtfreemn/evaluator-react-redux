import React from 'react';
import { connect } from 'react-redux'
import { createNewScoresAndActionSteps, isReviewingScore, isNotReviewingScore } from '../actions/scores'
import { fetchAllEvaluationCategories } from '../actions/categoriesAndPossiblePoints'
import NewScoreReviewSubmit from './NewScoreReviewSubmit'
import PossibleScoreModal from './PossibleScoreModal'

class NewScoreForm extends React.Component {

  componentDidMount() {
    this.makeInitialState()
    this.props.fetchEvalCategories()
  }

  makeInitialState = () => {
    let ids = this.props.evalItems.map(item => item.id)
    let stateObj = { scores: {}, actionStepCount: 0 , actionSteps: {} , employeeId: '', evalCatFilter: '', showRubric: true}
    ids.forEach(id => stateObj.scores[id] = {score: '', note: ''})
    this.setState(stateObj)
  }
  
  makeInputs = () => {
    if (this.state && this.state.evalCatFilter === '') {
      return (
        <tr key='blank'>
          <td className='score-cell'>
            -
          </td>
          <td className='score-cell'>
            -
          </td>
          <td className='score-cell'>
            -
          </td>
          <td className='score-cell'>
            -
          </td>
        </tr>
        )
    } else if (this.state){
      return this.props.evalItems.filter(item => item.evaluation_category.id === parseInt(this.state.evalCatFilter,10)).map(item =>
        <tr key={item.id}>
          <td className='score-cell'>
            {item.name}<br/>({item.evaluation_category.name})
          </td>
          <td className='score-cell'>
            {item.description}
          </td>
          <td className='score-cell'>
            <select className='score-cell-input' type='text' id={item.id} name='score' onChange={this.handleScoreChange}>{makeOptions(item)}</select><span className='yellow-highlight'>{this.state.scores[item.id]['score']}</span>
          </td>
          <td className='score-cell'>
            <textarea id={item.id} type='text' name='note' value={this.state.scores[`${item.id}`]['note']} onChange={this.handleScoreChange}/>
          </td>
        </tr>)
    } else {
      return null
    }
    function makeOptions(item) {
      let options = item.evaluation_category.possible_points.map(point => <option key={point.id} value={point.score}>{point.score}</option>)
      options.unshift(<option key={'default-score-option'} value=''> </option>)
      return options
    }
  }

  handleScoreChange = (e) => {
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

  makeEvalCategoriesSelectOptions = () => {
    if (this.props.evalCategories) {
      let options = this.props.evalCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
      options.unshift(<option key='defaultCategory' value=''>Choose an evaluation group</option>)
      return options
    }
  }

  handleEvalCategorySelectChange = (e) => {
    this.setState({
      evalCatFilter: e.target.value
    })
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
      let newInput = <div key={i}><span className='table-header'>Action Step {i+1} </span><br/><textarea className='action-step-entry' id={i} onChange={this.handleActionStepInputChange} value={this.state.actionSteps[i]}/><br/><br/></div>
      inputs.push(newInput)
    }
    return inputs
  }
  
  employeeBeingReviewed = () => {
    if (this.state.employeeId && this.state.employeeId!== '') {
      let employee = this.props.employees.filter(employee => employee.id === parseInt(this.state.employeeId,10))[0]
      return `${employee.first_name} ${employee.last_name}`
    } else {
      return ''
    }
  }

  clearForm = (e) => {
    e.preventDefault()
    this.makeInitialState()
  }

  getCurrentGroup = () => {
    return this.props.evalCategories.filter(group => group.id === parseInt(this.state.evalCatFilter, 10))[0]
  }

  render() {
    if (this.state && !this.props.isReviewingScore) {
      return (
        <div className='container large new-score-form'>
          <PossibleScoreModal group={this.getCurrentGroup()}/>
          <form className='form fade-in'>
            <select id='eval-category-select' onChange={this.handleEvalCategorySelectChange}>{this.makeEvalCategoriesSelectOptions()}</select>
            <span><select id='employeeID' onChange={this.handleEmployeeSelectChange} required>{this.makeEvalEmpSelectOptions()}</select></span><span className='table-header'>{this.employeeBeingReviewed()}</span><br/>
            <span><button className='submit-score-button score-button float-right'onClick={this.handleSubmit}>Next</button></span><br/>
            <button className='green-white-button' onClick={this.clearForm}>Clear Form</button>
            <table className='top-margin'>
              <thead>
                <tr>
                  <td className='table-header'>Evaluation Item</td>
                  <td className='table-header'>Item Description</td>
                  <td className='table-header'>Your Score</td>
                  <td className='table-header'>Your Notes</td>
                </tr>
              </thead>
              <tbody>
                {this.makeInputs()}
              </tbody>
            </table>
            <br/>
            <button className='green-white-button grey-button' onClick={this.incrementActionSteps}>Add Action Step</button><br/><br/>
            {this.makeActionStepInputs()}
          </form>
        </div>
      )
    } else if (this.state && this.props.isReviewingScore){
      return (
        <NewScoreReviewSubmit showFormAgain={this.props.hideScoreReviewPage} submitNewScore={this.handleSubmit} scores={this.state.scores} actionSteps={this.state.actionSteps} evalItems={this.props.evalItems} employee={this.employeeBeingReviewed()}/>
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
    },
    fetchEvalCategories: () => {
      dispatch(fetchAllEvaluationCategories())
    }
  }
}

function mapStateToProps(state) {
  return {
    isReviewingScore: state.isReviewingScore,
    employees: state.users,
    evalCategories: state.currentEvalCategories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScoreForm);