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
      return props.user[0].scores.map(score => <p key={score.id}>{score.eval_item.name} -- {score.administrator.first_name[0]}. {score.administrator.last_name} -- {score.score} -- {score.note}</p>)
    } else {
      let scores = props.user[0].scores.filter(score => score.eval_item.name === props.currentChartFilter)
      return scores.map(score => <p key={score.id}>{score.eval_item.name} -- {score.administrator.first_name[0]}. {score.administrator.last_name} -- {score.score} -- {score.note}</p>)
    }
  }

  const makeActionStepsList = () => {
    return props.user[0].action_steps.map(step => <p key={step.id}>{step.description} -- by: {step.administrator.first_name[0]}. {step.administrator.last_name} -- {step.completed ? 'Complete' : 'Incomplete'}</p>)
  }

  if (props.user.length > 0 && props.user[0].scores.length > 0) {
  return (
    <div className='container'>
      <ChartFilter items={getUniqueEvalItems()}/>
      <div className='chart'>
        {graphToRender()}
      </div>
      <div id='scores-list'>
        {makeScoreList()}
      </div>
      <div id='action-steps'>
        {makeActionStepsList()}
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

export default connect(mapStateToProps)(UserChartContainer);