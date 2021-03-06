import React from 'react';
import UserScoreItem from './UserScoreItem'

//Rendered by UserChartContainer
const UserScoresList = (props) => {

  let scores = props.scores.map(score => <UserScoreItem key={score.id}score={score}/>)

  return (
    <tbody>
      {scores}
    </tbody>
  )
}

export default UserScoresList;