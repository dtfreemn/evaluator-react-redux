import React from 'react'

const PossibleScoreModal = (props) => {

  let rows
  if (props.group) {
    let possPoint = props.group.possible_points
    rows = possPoint.map(point =>
      <div key={point.id} className='score-rubric-modal'>
        <span>{point.score}</span>
        <span>{point.description}</span>
      </div>
      )
    return rows
  }

  return (
    <div>
      {rows}
    </div>
  )
}

export default PossibleScoreModal;