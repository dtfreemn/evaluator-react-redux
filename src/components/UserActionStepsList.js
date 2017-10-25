import React from 'react';
import UserActionStepItem from './UserActionStepItem'

//Rendered by UserChartContainer
const UserActionStepsList = (props) => {

  let actionSteps = props.actionSteps.map(actionStep => <UserActionStepItem toggleStatus={props.actionStepStatusToggle} key={actionStep.id} actionStep={actionStep}/>)

  return (
    <tbody>
      {actionSteps}
    </tbody>
  )
}

export default UserActionStepsList;