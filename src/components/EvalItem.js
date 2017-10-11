import React from 'react';
import { connect } from 'react-redux';
import { deleteEvalItem } from '../actions/evalItems'

const EvalItem = (props) => {
  
  const item = props.info

  const handleDelete = (e) => {
    props.deleteEvalItem(item)
  }

  return (
    <p>{item.name} -- {item.description} <button onClick={handleDelete}>X</button></p>
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