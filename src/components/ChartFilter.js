import React from 'react';
import { connect } from 'react-redux'
import { setChartFilter } from '../actions/chartFilter'

class ChartFilter extends React.Component {
  
  componentDidMount() {
    this.props.setFilter('default')
  }

  makeEvalItemOptions = () => {
    let options = this.props.items.map(name => <option key={name} value={name}>See Timeline Graph for "{name}"</option>)
    options.unshift(<option key='average' value='default'>See Average Scores Summary Graph</option>)
    options.unshift(<option key='default' value='default'>Select Different Graph</option>)
    return options
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.props.setFilter(e.target.value)
    }
  }

  render() {
    return (
      <select onChange={this.handleChange}>
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