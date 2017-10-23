import React from 'react';
import EvalCategoryItem from './EvalCategoryItem'

const EvalCategoriesList = (props) => {

  const createEvalCategories = () => {
    if (props.categories) {
      return props.categories.map(category => <EvalCategoryItem key={category.id} category={category} {...props}/>)
    }
    else {
      console.log('no categories')
    }
  }
  return (
    <tbody>
      {createEvalCategories()}
    </tbody>
  )
}

export default EvalCategoriesList;