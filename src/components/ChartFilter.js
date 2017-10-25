import React from 'react';
import { connect } from 'react-redux'
import { setChartFilter } from '../actions/chartFilter'

//Rendered by UserChartContainer. Saves current filter in the store to know which graph to render
class ChartFilter extends React.Component {
  
  componentDidMount() {
    this.props.setFilter('default')
  }

  makeEvalItemOptions = () => {
    let options = this.props.items.map(name => <option key={name} value={name}>See Timeline Graph for "{name}"</option>)
    options.unshift(<option key='average' value='default'>Average Scores Summary Graph</option>)
    return options
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.props.setFilter(e.target.value)
    }
  }

  render() {
    return (
      <select id='chart-filter' onChange={this.handleChange}>
        {this.makeEvalItemOptions()}
      </select>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (filter) => {
      dispatch(setChartFilter(filter))
    }
  }
}

export default connect(null, mapDispatchToProps)(ChartFilter);