import React from 'react';
import { connect } from 'react-redux'
import { fetchAllEvalItems } from '../actions/evalItems'
import EvalItemsList from './EvalItemsList'

class EvalItemsContainer extends React.Component {
  
  componentDidMount() {
    if (this.props.evalItems.length === 0) {
      this.props.fetchEvalItems()
    }
  }


  render() {
    return (
      <div className='container fade-in'>
        <EvalItemsList evalItems={this.props.evalItems}/>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    evalItems: state.evalItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvalItems: () => {
      dispatch(fetchAllEvalItems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvalItemsContainer);