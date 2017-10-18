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
      <div className='container large fade-in'>
        <table className='eval-items-table'>
          <thead>
            <tr>
              <td className='table-header'>Evaluation Item</td>
              <td className='table-header'>Item Description</td>
            </tr>
          </thead>
          <EvalItemsList evalItems={this.props.evalItems}/>
        </table>
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