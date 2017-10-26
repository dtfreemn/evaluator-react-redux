import React from 'react';
import { connect } from 'react-redux'
import { fetchAllEvalItems } from '../actions/evalItems'
import EvalItemsList from './EvalItemsList'
import DeleteEvalItemConfirm from './DeleteEvalItemConfirm'
import EditEvalItemForm from './EditEvalItemForm'
import Loader from './Loader'
import { deleteEvalItem, startEvalItemDelete, endEvalItemDelete } from '../actions/evalItems'
import { fetchAllEvaluationCategories } from '../actions/categoriesAndPossiblePoints'


//Rendered in App
class EvalItemsContainer extends React.Component {
  
  state = {
    itemToDelete: {},
    currFilter: 'All'
  }
  
  componentDidMount() {
    //Makes sure base component is shown and not the review page
    this.props.hideDeleteReview()
    this.props.fetchEvalItems()
    this.props.fetchCategories()
  }

  //First dispatches to show review page. If review page is already displaying and this function is called, deletes item
  handleDeleteItem = (item) => {
    if (!this.props.isDeletingItem) {
      this.setState({
        itemToDelete: item
      }, () => {this.props.showDeleteReview()})
      return
    } else {
      this.props.deleteEvalItem(item)
      this.props.hideDeleteReview()
      this.props.history.push('/eval_items')
    }
  }

  makeEvalCategoriesSelectOptions = () => {
    if (this.props.evalCategories) {
      let options = this.props.evalCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
      options.unshift(<option key='defaultCategory' value='All'>All Teams</option>)
      return options
    }
  }

  handleFilterChange = (e) => {
    this.setState({
      currFilter: e.target.value
    })
  }

  //Shows edit item form at top of page if path is edit
  editEvalItemForm = () => {
    if (this.props.location.pathname.split('/').includes('edit') && this.props.evalItems.length > 0) {
      if (this.props.evalItems.length > 0) {
        let evalItem = this.props.evalItems.filter(item => item.id === parseInt(this.props.match.params.id, 10))[0]
        if (evalItem) {
          return <EditEvalItemForm name={evalItem.name} description={evalItem.description} id={this.props.match.params.id} {...this.props}/>
        } else {
          this.props.history.push('/eval_items')
        }
      }
    }
  }

  //Shows items based on select filter or shows only the item being edited
  filterEvalItems = () => {
    let items
    if (this.props.evalItems.length > 0) {  
      if (this.state.currFilter === 'All') {
        items = this.props.evalItems
      } else {
        items = this.props.evalItems.filter(item => item.evaluation_category.id === parseInt(this.state.currFilter, 10))
      }
    } else {
      return []
    }
    if (this.props.location.pathname.includes('edit')) {
      items = items.filter(item => item.id === parseInt(this.props.match.params.id, 10))
    }
    return items
  }


  render() {
    if (!this.props.evalItems || this.props.evalItems.length === 0) {
      return <Loader />
    }

    if (!this.props.isDeletingItem) {
      return (
        <div className='container large fade-in'>
          {this.editEvalItemForm()} {/*only renders on edit path*/}
          {this.props.location.pathname.includes('edit') ? null : <select id='eval-category-select' onChange={this.handleFilterChange}>{this.makeEvalCategoriesSelectOptions()}</select>} {/*doesn't render on edit page*/}
          <table className='eval-items-table'>
            <thead>
              <tr>
                <td className='table-header'>Team</td>
                <td className='table-header'>Value</td>
                <td className='table-header'>Value Description</td>
                <td className='table-header'></td>
              </tr>
            </thead>
            <EvalItemsList evalItemsToRender={this.filterEvalItems()} deleteItem={this.handleDeleteItem} {...this.props}/>
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
    isDeletingItem: state.attemptingItemDelete,
    evalCategories: state.currentEvalCategories
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
    },
    fetchCategories: () => {
      dispatch(fetchAllEvaluationCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvalItemsContainer);