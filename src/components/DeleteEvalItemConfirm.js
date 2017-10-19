import React from 'react';

const DeleteEvalItemConfirm = (props) => {

  const handleCancel = () => {
    props.hideSelf()
  }

  const handleDelete = () => {
    props.handleDelete(props.item)
  }

  return (
    <div>
      <div className='review-warning'>Please make sure you are certain that you want to delete this item. Once deleted, the item and all of its associated scores will no longer be accessible to you and will be irretrievable.</div><br/><br/>
      <button className='edit-score-button score-button' onClick={handleCancel}>Never mind. I do not want to delete this item.</button><br/><br/>
      <button className='submit-score-button score-button' onClick={handleDelete}>Yes, I am sure. Please delete this item.</button>
    </div>
  )
}

export default DeleteEvalItemConfirm;