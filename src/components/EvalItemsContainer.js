import React from 'react';
import { connect } from 'react-redux'
import { fetchAllEvalItems } from '../actions/evalItems'
import EvalItemsList from './EvalItemsList'
import DeleteEvalItemConfirm from './DeleteEvalItemConfirm'
import EditEvalItemForm from './EditEvalItemForm'
import { deleteEvalItem, startEvalItemDelete, endEvalItemDelete } from '../actions/evalItems'

class EvalItemsContainer extends React.Component {
  
  state = {
    itemToDelete: null
  }
  
  componentDidMount() {
    this.props.hideDeleteReview()
    this.props.fetchEvalItems()
  }


  handleDeleteItem = (item) => {
    if (!this.props.isDeletingItem) {
      this.setState({
        itemToDelete: item
      }, () => {this.props.showDeleteReview()})
      return
    } else {
      this.props.deleteEvalItem(item)
      this.props.hideDeleteReview()
    }
  }

  editEvalItemForm = () => {
    if (this.props.location.pathname.split('/').includes('edit') && this.props.evalItems.length > 0) {
      if (this.props.evalItems.length > 0) {
        let evalItem = this.props.evalItems.filter(item => item.id === parseInt(this.props.match.params.id, 10))[0]
        return <EditEvalItemForm name={evalItem.name} description={evalItem.description} id={this.props.match.params.id} {...this.props}/>
      }
    }
  }


  render() {
    if (!this.props.isDeletingItem) {
      return (
        <div className='container large fade-in'>
          {this.editEvalItemForm()}
          <table className='eval-items-table'>
            <thead>
              <tr>
                <td className='table-header'>Evaluation Category</td>
                <td className='table-header'>Evaluation Item</td>
                <td className='table-header'>Item Description</td>
              </tr>
            </thead>
            <EvalItemsList evalItems={this.props.evalItems} deleteItem={this.handleDeleteItem} {...this.props}/>
          </table>
        </div>
      )
    } else {
      return (
        <DeleteEvalItemConfirm handleDelete={this.handleDeleteItem} item={this.state.itemToDelete} hideSelf={this.props.hideDeleteReview} {...this.props}/>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    evalItems: state.evalItems,
    isDeletingItem: state.attemptingItemDelete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvalItems: () => {
      dispatch(fetchAllEvalItems())
    },
    deleteEvalItem: (item) => {
      dispatch(deleteEvalItem(item))
    },
    showDeleteReview: () => {
      dispatch(startEvalItemDelete())
    },
    hideDeleteReview: () => {
      dispatch(endEvalItemDelete())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvalItemsContainer);