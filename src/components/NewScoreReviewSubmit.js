import React from 'react';

//Rendered by NewScoreForm -- displays entered scores, notes, and action steps pre-submit so user has chance to review and edit
const NewScoreReviewSubmit = (props) => {

  const handleSubmit = (e) => {
    props.submitNewScore(e)
  }

  //switches internal state on parent so that it hides this review page
  const handleBack = (e) => {
    props.showFormAgain()
  }

  //creates display rows for all scores that have been entered by the user...passed here by NewScoreForm
  const makeScoresRows = () => {
    const scores = props.scores
    const scoresRows = []
    for (let key in scores) {
      if (scores[key]['score'] && scores[key]['score'] !== '') {
        let evalItem = props.evalItems.filter(item => item.id === parseInt(key, 10))[0]
        scoresRows.push(<tr className='bottom' key={key}><td>{evalItem['name']}</td><td>{scores[key]['score']}</td><td>{scores[key]['note']}</td></tr>)  
      }
    }
    return scoresRows
  }

  //creates display rows for all action steps that have been entered by the user...passed here by NewScoreForm
  const makeActionStepsRows = () => {
    const actionSteps = props.actionSteps
    const actionStepsRows = []
    for (let key in actionSteps) {
      if (actionSteps[key] !== '') {
        actionStepsRows.push(<tr className='bottom' key={key}><td>{actionSteps[key]}</td></tr>)
      }
    }
    if (actionStepsRows.length === 0) {
      return <tr><td>No Action Steps</td></tr>
    } else {
      return actionStepsRows
    }
  }

  return (
    <div className='container fade-in'>
    <div className='align-left review-warning'>Please review your scores and action steps before submitting. Once you click submit, you will be unable to edit any part of your submission.</div><br/><br/>
    <div><span className='table-header highlight'>{props.employee}</span><br/><button className='edit-score-button score-button' onClick={handleBack}>I Want To Edit My Submission</button></div><br/><br/>
    <table className='score-review-table'>
      <thead>
        <tr>
          <th className='align-left'>Evaluation Item</th>
          <th className='align-left'>Your Score</th>
          <th className='align-left'>Your Notes</th>
        </tr>
      </thead>
      <tbody>
        {makeScoresRows()}
      </tbody>
    </table>
    <br/>
    <table className='score-review-table'>
      <thead>
        <tr>
          <th className='align-left'>Action Steps</th>
        </tr>
      </thead>
      <tbody>
        {makeActionStepsRows()}
      </tbody>
    </table>
    <br/><br/>
    <br/><br/>
    <button className='submit-score-button score-button' onClick={handleSubmit}>Submit My Scores and Action Steps</button>
    </div>
    )
}

export default NewScoreReviewSubmit;