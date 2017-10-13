import React from 'react';
import { connect } from 'react-redux'
import { createNewScore } from '../actions/scores'

class NewScoreForm extends React.Component {

  
  componentDidMount() {
    let ids = this.props.evalItems.map(item => item.id)
    let stateObj = {}
    ids.forEach(id => stateObj[id] = '')
    this.setState(stateObj)
  }
  
  makeInputs = () => {
    if (this.state) {
      return this.props.evalItems.map(item => <p key={item.id}>{item.name}: <input type='text' id={item.id} value={this.state[`${item.id}`]} onChange={this.handleChange} required/></p>)
    } else {
      return null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const evalEmpIds = {evaluatorID: document.getElementById('evaluatorID').value, employeeID: document.getElementById('employeeID').value}
    this.props.submitNewScore(this.state, evalEmpIds)
  }

  makeEvalEmpSelectOptions = () => {
    const options = this.props.users.map(user => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)
    options.unshift(<option key='default' value=''>Make Selection</option>)
    return options

  }
  

  render() {
    if (this.state) {
      return (
        <form id='new-score-form' className='form fade-in' onSubmit={this.handleSubmit}>
         Evaluator: <select id='evaluatorID' required>{this.makeEvalEmpSelectOptions()}</select><br/><br/> 
         Employee: <select id='employeeID'required>{this.makeEvalEmpSelectOptions()}</select>
         {this.makeInputs()}
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
    submitNewScore: (score, evalEmpids) => {
      dispatch(createNewScore(score, evalEmpids))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewScoreForm);