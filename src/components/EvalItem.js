import React from 'react';


const EvalItem = (props) => {
  
  const item = props.info

  const handleDelete = (e) => {
    props.handleDelete(item)
  }

  return (
    <tr className='bottom'>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td><button className='green-white-button' onClick={handleDelete}>Remove Item</button></td>
    </tr>
  )
}

// function mapDispatchToProps(dispatch) {
//   return {
//     deleteEvalItem: (item) => {
//       dispatch(deleteEvalItem(item))
//     }
//   }
// }

export default EvalItem;