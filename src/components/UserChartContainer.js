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
  

  if (props.user.length > 0 && props.user[0].scores.length > 0) {
  return (
    <div>
      <ChartFilter items={getUniqueEvalItems()}/>
      <div className='chart'>
        {graphToRender()}
      </div>
    </div>
  )} else {
    return (
      <div className='no-evals-yet'>
        This user does not yet have any evaluations
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChartFilter: state.chartFilter
  }
}

export default connect(mapStateToProps)(UserChartContainer);