import React from 'react';
import EvalCategoryForm from './EvalCategoryForm'
import { createEvaluationCategory } from '../actions/categoriesAndPossiblePoints'
import { connect } from 'react-redux'

const NewEvalCategoryForm = (props) => {

  const handleSubmit = (name, possiblePoints, windowProps) => {
    props.createCategoryAndPossiblePoints(name, possiblePoints, windowProps)
  }


  return (
    <div className='create-edit-form'>
      <EvalCategoryForm name={''} possibleScores={{}} currentScores={{}} handleSubmit={handleSubmit} {...props}/>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    createCategoryAndPossiblePoints: (name, possibleScores, props) => {
      dispatch(createEvaluationCategory(name, possibleScores, props))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewEvalCategoryForm);