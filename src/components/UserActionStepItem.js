import React from 'react';

const UserActionStepItem = (props) => {
  let step = props.actionStep

  return (
    <tr key={step.id}>
      <td>{step.description}<br/>({step.administrator.first_name[0]}. {step.administrator.last_name})</td>
      <td>{step.completed ? 'Complete' : 'Incomplete'}</td>
      <td><button>Mark Complete</button></td>
    </tr>
  )
}

export default UserActionStepItem;