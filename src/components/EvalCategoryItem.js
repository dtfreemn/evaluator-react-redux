import React from 'react';
import { NavLink } from 'react-router-dom'

const EvalCategoryItem = (props) => {
  
  let category = props.category

  return (
  <tr>
    <td>{category.name}</td>
    <td><NavLink className='profile-delete-edit-button grey-button' to={'/eval_categories/' + category.id + '/edit'}>Edit</NavLink></td>
  </tr>
  )
}

export default EvalCategoryItem;