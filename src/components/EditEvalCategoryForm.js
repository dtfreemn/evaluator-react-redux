import React from 'react';
import EvalCategoryForm from './EvalCategoryForm'
import { editEvalCategory } from '../actions/categoriesAndPossiblePoints'
import { connect } from 'react-redux'

//Rendered by EvalCategoriesContainer
class EditEvalCategoryForm extends React.Component {

  //Extracts and sorts the current possible scores associated with the category and puts them into an object  
  makeCurrentScores = () => {
    let currentScores = {}
    let sortedScores = this.props.possibleScores.sort(function(a,b) {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0
    })
    sortedScores.forEach((score, index) => {
      currentScores[index] = score
    })
    return currentScores
  }

  //Handles the fetches that update the name of the category, any of its current possible points, and creates any new possible points for the category
  handleSubmit = (name, possiblePoints, windowProps, currentScores) => {
    this.props.editCategory(name, this.props.match.params.id, possiblePoints, windowProps, currentScores)
  }

  render() {
    return (
      <div className='create-edit-form'>
        <EvalCategoryForm name={this.props.name} currentScores={this.makeCurrentScores()} {...this.props} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editCategory: (name, id, possiblePoints, windowProps, currentScores) => {
      dispatch(editEvalCategory(name, id, possiblePoints, windowProps, currentScores))
    }
  }
}

export default connect(null, mapDispatchToProps)(EditEvalCategoryForm);