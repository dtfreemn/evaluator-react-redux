import React from 'react';
import { connect } from 'react-redux';
import { deleteEvalItem } from '../actions/evalItems'

const EvalItem = (props) => {
  
  const item = props.info

  const handleDelete = (e) => {
    alert('If you delete item, all association scores will also be deleted and will not be recoverable. Are you sure you want to delete this item?')
    props.deleteEvalItem(item)
  }

  return (
    <tr className='bottom'>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td><button onClick={handleDelete}>Delete This Evaluation Item</button></td>
    </tr>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEvalItem: (item) => {
      dispatch(deleteEvalItem(item))
    }
  }
}

export default connect(null, mapDispatchToProps)(EvalItem);