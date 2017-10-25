import React from 'react';
import { fetchAllEvaluationCategories } from '../actions/categoriesAndPossiblePoints'
import EvalCategoriesList from './EvalCategoriesList'
import EditEvalCategoryForm from './EditEvalCategoryForm'
import { connect } from 'react-redux'

//Rendered in App
class EvalCategoriesContainer extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  editEvalCategoryForm = () => {
    if (this.props.location.pathname.split('/').includes('edit') && this.props.evalCategories.length > 0) {
      if (this.props.evalCategories.length > 0) {
        let evalCategory = this.props.evalCategories.filter(category => category.id === parseInt(this.props.match.params.id, 10))[0]
        return <EditEvalCategoryForm name={evalCategory.name} possibleScores={evalCategory.possible_points} id={this.props.match.params.id} {...this.props}/>
      }
    }
  }

  render() {
    if (!this.props.location.pathname.split('/').includes('edit')) {
      return (
      <div className='container large fade-in'>
        <table className='eval-categories-container'>
          <thead>
            <tr>
              <td className='table-header'>Evaluation Group</td>
              <td className='table-header'></td>
            </tr>
          </thead>
          <EvalCategoriesList categories={this.props.evalCategories}/>
          </table>
      </div>
    )
    } else {
      return (
        <div className='container large fade-in'>
          {this.editEvalCategoryForm()} {/* renders by itself because of how big the form is. other edit forms render with their container below them, but this one is too large. */}
        </div>
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    evalCategories: state.currentEvalCategories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => {
      dispatch(fetchAllEvaluationCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvalCategoriesContainer);