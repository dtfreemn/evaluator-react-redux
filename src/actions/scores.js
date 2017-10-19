import { baseURL } from '../urls'

export function createNewScoresAndActionSteps(scores, actionSteps, employeeId) {
  return function(dispatch) {
    for (let key in scores) {
      const payload = JSON.stringify({eval_item_id: key, score: scores[key]['score'], note: scores[key]['note'], user_id: employeeId})
      // const payload = JSON.stringify({eval_item_id: key, score: score[key], user_id: evalEmpIds['employeeID'], admin_id: evalEmpIds['evaluatorID']})
      fetch(baseURL + '/scores', {
        method: 'post',
        body: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        }
      })
        .then(resp => resp.json())
        .then((json) => console.log('created new score', json))
    }
    for (let key in actionSteps) {
      const payload = JSON.stringify({ user_id: employeeId, description: actionSteps[key]})
      fetch(baseURL + '/action_steps', {
        method: 'post',
        body: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        }
      })
        .then(resp => resp.json())
        .then((json) => console.log('created new action step', json))
    }
  }
}

export function isReviewingScore() {
  return {
    type: 'IS_REVIEWING_SCORE'
  }
}

export function isNotReviewingScore() {
  return {
    type: 'IS_NOT_REVIEWING_SCORE'
  }
}