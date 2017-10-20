import React from 'react';
import { NavLink } from 'react-router-dom'


const EvalItem = (props) => {
  
  const item = props.info

  const handleDelete = (e) => {
    props.handleDelete(item)
  }
  
  const editButton = () => {
    return props.location.pathname !== '/eval_items/' + item.id + '/edit' ? <NavLink className='profile-delete-edit-button grey-button' to={'/eval_items/' + item.id + '/edit'}>Edit Item</NavLink> : null
  }

  const removeButton = () => {
    return props.location.pathname === '/eval_items/' + item.id + '/edit' ? <button className='profile-delete-edit-button remove-button' onClick={handleDelete}>Remove Item</button> : null
  }

  return (
    <tr className='bottom'>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{removeButton()}{editButton()}</td>
    </tr>
  )
}


export default EvalItem;