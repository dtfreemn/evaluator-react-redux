import React from 'react';
import BarChart from './BarChart'
import LineGraph from './LineGraph'
import ChartFilter from './ChartFilter'
import { connect } from 'react-redux'

const UserChartContainer = (props) => {

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

  const makeScoreList = () => {
    if (props.currentChartFilter === 'default') { 
      let scoresSortedByDate = props.user[0].scores.sort(function(a,b) {
        if (b.created_at < a.created_at) return -1;
        if (b.created_at > a.created_at) return 1;
        return 0
      })
      return scoresSortedByDate.map(score => {
        let date = new Date(score.created_at.split('T')[0])
        let dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
        return <tr key={score.id}>
          <td>{score.eval_item.name}<br/>({score.administrator.first_name[0]}. {score.administrator.last_name})</td>
          <td>{score.score}</td>
          <td>{score.note}</td>
          <td>{dateString}</td>
        </tr>
      })
    } else {
      let scores = props.user[0].scores.filter(score => score.eval_item.name === props.currentChartFilter)
      return scores.map(score => {
        let date = new Date(score.created_at.split('T')[0])
        let dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
        return <tr key={score.id}>
          <td>{score.eval_item.name}<br/>({score.administrator.first_name[0]}. {score.administrator.last_name})</td>
          <td>{score.score}</td>
          <td>{score.note}</td>
          <td>{dateString}</td>
        </tr>
      })
    }
  }

  const makeActionStepsList = () => {
    return props.user[0].action_steps.map(step => 
      <tr key={step.id}>
        <td>{step.description}<br/>({step.administrator.first_name[0]}. {step.administrator.last_name})</td>
        <td>{step.completed ? 'Complete' : 'Incomplete'}</td>
        <td><button>Mark Complete</button></td>
      </tr>
    )
  }

  if (props.user.length > 0 && props.user[0].scores.length > 0) {
  return (
    <div className='container charts-container'>
      <ChartFilter items={getUniqueEvalItems()}/>
      <div className='chart'>
        {graphToRender()}
      </div>
      <table id='scores-list'>
        <tbody>
          <tr>
            <td>Employee Scores</td>
          </tr>
          <tr>
            <th className='underline'>Item/Admin</th>
            <th className='underline'>Score</th>
            <th className='underline'>Notes</th>
            <th className='underline'>Date</th>
          </tr>
          {makeScoreList()}
        </tbody>
      </table>
      <table id='action-steps'>
        <tbody>
          <tr>
            <td>Employee Action Steps</td>
          </tr>
          <tr>
            <th className='underline'>Action Step</th>
            <th className='underline'>Status</th>
          </tr>
          {makeActionStepsList()}
        </tbody>
      </table>
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

export default connect(mapStateToProps)(UserChartContainer);