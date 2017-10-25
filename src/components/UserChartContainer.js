import React from 'react';
import BarChart from './BarChart'
import LineGraph from './LineGraph'
import ChartFilter from './ChartFilter'
import UserScoresList from './UserScoresList'
import UserActionStepsList from './UserActionStepsList'
import { editActionStep } from '../actions/actionSteps'
import { connect } from 'react-redux'

//Rendered by UsersContainer
const UserChartContainer = (props) => {

  //gets all items that employee has been scored on to pass to the chart filter
  const getUniqueEvalItems = () => {
    if (props.user.length > 0) {
      let user = props.user[0]
      let finalItems = {}
      user.scores.map(score => score.eval_item.name).forEach(name => {
        if (!finalItems[name]) {
          finalItems[name] = ''
        }
      })
      return Object.keys(finalItems)
    }
  }

  const graphToRender = () => {
    if (props.currentChartFilter === 'default') {
      return <BarChart user={props.user[0]} />
    } else {
      return <LineGraph user={props.user[0]} filter={props.currentChartFilter}/>
    }
  }

  //extracts scores from user and sorts them by date in descending order. returns either all scores or just the scores that correspond with the line graph displayed that is determined by the filter selected by the user
  const filterScores = () => {
    if (props.currentChartFilter === 'default') { 
      return props.user[0].scores.sort(function(a,b) {
        if (b.created_at < a.created_at) return -1;
        if (b.created_at > a.created_at) return 1;
        return 0
      })
    } else {
      let scores = props.user[0].scores.filter(score => score.eval_item.name === props.currentChartFilter)
      return scores.sort(function(a,b) {
        if (b.created_at < a.created_at) return -1;
        if (b.created_at > a.created_at) return 1;
        return 0
      })
    }
  }

  //passed down to UserActionStepsList and then to UserActionStepItem to toggle itself to/from complete/incomplete
  const toggleActionStepStatus = (id, newStatus) => {
    props.toggleStatus(id, newStatus)
  }

  if (props.user.length > 0 && props.user[0].scores.length > 0) {
  return (
    <div className='container charts-container'>
      <ChartFilter items={getUniqueEvalItems()}/>
      <div className='chart'>
        {graphToRender()}
      </div>
      <div className='bottom-tables'>
      <table id='scores-list'>
        <thead>
          <tr>
            <td>Employee Scores</td>
          </tr>
          <tr>
            <th className='underline'>Item/Admin</th>
            <th className='underline'>Score</th>
            <th className='underline'>Notes</th>
            <th className='underline'>Date</th>
          </tr>
        </thead>
        <UserScoresList scores={filterScores()}/>
      </table>
      <table id='action-steps'>
        <thead>
          <tr>
            <td>Employee Action Steps</td>
          </tr>
          <tr>
            <th className='underline'>Action Step</th>
            <th className='underline'>Status</th>
          </tr>
        </thead>
        <UserActionStepsList actionStepStatusToggle={toggleActionStepStatus} actionSteps={props.user[0].action_steps}/>
      </table>
      </div>
    </div>
  )} else if (props.user.length > 0) {
    return (
      <div className='no-evals-yet'>
        {props.user[0].first_name} does not yet have any evaluations
      </div>
    )
  } else {
    return (
      <div> </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChartFilter: state.chartFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleStatus: (id, newStatus) => {
      dispatch(editActionStep(id, newStatus))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChartContainer);