import React from 'react';

//Rendered when user clicks remove button on eval item edit page. Serves as confirmation page because once item is deleted, it and all of its scores will be eliminated. Rendered in EvalItemsContainer on a state switch in the store at state.attemptingItemDelete 
const DeleteEvalItemConfirm = (props) => {
  
  console.log(props)
  
  //Dispatches to switch state.attemptingDelete back to false and hide this component
  const handleCancel = () => {
    props.hideSelf()
  }

  const handleDelete = () => {
    props.handleDelete(props.item)
  }
  
    return (
      <div className='container large fade-in'>
        <div className='review-warning'>Please make sure you are certain that you want to delete this item. Once deleted, the item and all of its associated scores will no longer be accessible to you and will be irretrievable.</div><br/><br/>
        <table className='eval-items-table'>
          <thead>      
            <tr>
              <td className='table-header'>Evaluation Item</td>
              <td className='table-header'>Item Description</td>
            </tr>
          </thead>
          <tbody>  
            <tr>
              <td>{props.item.name}</td>
              <td>{props.item.description}</td>
              <td><button className='submit-score-button score-button' onClick={handleDelete}>Yes, I am sure. Please delete this item.</button></td>
            </tr>
          </tbody>
        </table>
        <br/><br/>
      <button className='edit-score-button score-button' onClick={handleCancel}>Never mind. I do not want to delete this item.</button>
      </div>
    )
}

export default DeleteEvalItemConfirm;