import React from 'react'

//Rendered on hover in NewScoreForm
const PossibleScoreModal = (props) => {

  let rows
  if (props.group) {
  let possPoints = props.group.possible_points.sort(function(a,b) {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0
    })
    rows = possPoints.map(point =>
      <div className='modal-info' key={point.id}>{point.score}: {point.description}</div>
      )
    return rows
  } else {
    rows = 'Choose an evaluation group to see the possible scores and descriptions'
  }

  return (
    <div>
      {rows}
    </div>
  )
}

export default PossibleScoreModal;