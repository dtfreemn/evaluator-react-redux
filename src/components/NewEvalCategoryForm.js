import React from 'react';
import EvalCategoryForm from './EvalCategoryForm'
import { createEvaluationCategory } from '../actions/categoriesAndPossiblePoints'
import { connect } from 'react-redux'

const NewEvalCategoryForm = (props) => {

  const handleSubmit = (name, possiblePoints) => {
    props.createCategoryAndPossiblePoints(name, possiblePoints)
  }


  return (
    <div className='create-edit-form'>
      <EvalCategoryForm createCategoryAndPossiblePoints={handleSubmit}/>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    createCategoryAndPossiblePoints: (name, possibleScores) => {
      dispatch(createEvaluationCategory(name, possibleScores))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewEvalCategoryForm);