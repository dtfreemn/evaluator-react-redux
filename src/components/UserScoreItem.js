import React from 'react';

//Rendered by UserScoresList from UserChartContainer
const UserScoreItem = (props) => {
  let score = props.score
  
  let date = new Date(score.created_at.split('T')[0])
  let dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`

  return (
    <tr>
      <td>{score.eval_item.name}<br/>({score.administrator.first_name[0]}. {score.administrator.last_name})</td>
      <td>{score.score}</td>
      <td>{score.note}</td>
      <td>{dateString}</td>
    </tr>
  )
}

export default UserScoreItem;