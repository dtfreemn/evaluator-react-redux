import React from 'react';
import UserActionStepItem from './UserActionStepItem'

const UserActionStepsList = (props) => {

  let actionSteps = props.actionSteps.map(actionStep => <UserActionStepItem key={actionStep.id} actionStep={actionStep}/>)

  return (
    <tbody>
      {actionSteps}
    </tbody>
  )
}

export default UserActionStepsList;