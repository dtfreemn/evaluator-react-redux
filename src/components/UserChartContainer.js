import React from 'react';
import BarChart from './BarChart'
import LineGraph from './LineGraph'
import ChartFilter from './ChartFilter'
import UserScoresList from './UserScoresList'
import UserActionStepsList from './UserActionStepsList'
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

  if (props.user.length > 0 && props.user[0].scores.length > 0) {
  return (
    <div className='container charts-container'>
      <ChartFilter items={getUniqueEvalItems()}/>
      <div className='chart'>
        {graphToRender()}
      </div>
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
        <UserActionStepsList actionSteps={props.user[0].action_steps}/>
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