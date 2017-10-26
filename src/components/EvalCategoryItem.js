import React from 'react';
import { NavLink } from 'react-router-dom'

//Rendered by EvalCategoriesList
const EvalCategoryItem = (props) => {
  
  let category = props.category

  return (
  <tr className='bottom'>
    <td>{category.name}</td>
    <td><NavLink className='profile-delete-edit-button grey-button' to={'/eval_categories/' + category.id + '/edit'}>Edit Team</NavLink></td>
  </tr>
  )
}

export default EvalCategoryItem;