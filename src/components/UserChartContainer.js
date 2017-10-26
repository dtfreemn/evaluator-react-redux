import React from 'react';
import BarChart from './BarChart'
import LineGraph from './LineGraph'
import ChartFilter from './ChartFilter'
import UserScoresList from './UserScoresList'
import Loader from './Loader'
import UserActionStepsList from './UserActionStepsList'
import { editActionStep } from '../actions/actionSteps'
import { connect } from 'react-redux'

//Rendered by UsersContainer
class UserChartContainer extends React.Component {

  state = {
    isLoading: true
  }

  componentDidMount() {
    setTimeout(() => this.setState({isLoading: false}), 1000)
  }

  //gets all items that employee has been scored on to pass to the chart filter
  getUniqueEvalItems = () => {
    if (this.props.user.length > 0) {
      let user = this.props.user[0]
      let finalItems = {}
      user.scores.map(score => score.eval_item.name).forEach(name => {
        if (!finalItems[name]) {
          finalItems[name] = ''
        }
      })
      return Object.keys(finalItems)
    }
  }

  graphToRender = () => {
    if (this.props.currentChartFilter === 'default') {
      return <BarChart user={this.props.user[0]} />
    } else {
      return <LineGraph user={this.props.user[0]} filter={this.props.currentChartFilter}/>
    }
  }

  //extracts scores from user and sorts them by date in descending order. returns either all scores or just the scores that correspond with the line graph displayed that is determined by the filter selected by the user
  filterScores = () => {
    if (this.props.currentChartFilter === 'default') { 
      return this.props.user[0].scores.sort(function(a,b) {
        if (b.created_at < a.created_at) return -1;
        if (b.created_at > a.created_at) return 1;
        return 0
      })
    } else {
      let scores = this.props.user[0].scores.filter(score => score.eval_item.name === this.props.currentChartFilter)
      return scores.sort(function(a,b) {
        if (b.created_at < a.created_at) return -1;
        if (b.created_at > a.created_at) return 1;
        return 0
      })
    }
  }

  //passed down to UserActionStepsList and then to UserActionStepItem to toggle itself to/from complete/incomplete
  toggleActionStepStatus = (id, newStatus) => {
    this.props.toggleStatus(id, newStatus)
  }

  render() {
  if (this.state.isLoading) {
    return <Loader />
  }
  if (this.props.user.length > 0 && this.props.user[0].scores.length > 0) {
  return (
    <div className='container charts-container'>
      <ChartFilter items={this.getUniqueEvalItems()}/>
      <div className='chart'>
        {this.graphToRender()}
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
        <UserScoresList scores={this.filterScores()}/>
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
        <UserActionStepsList actionStepStatusToggle={this.toggleActionStepStatus} actionSteps={this.props.user[0].action_steps}/>
      </table>
      </div>
    </div>
  )} else if (this.props.user.length > 0) {
    return (
      <div className='no-evals-yet'>
        {this.props.user[0].first_name} does not yet have any evaluations
      </div>
    )
  } else {
    return (
      <div> </div>
    )
  }
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