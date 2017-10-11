import { baseURL } from '../urls'

export function createNewScore(score, evalEmpIds) {
  return function(dispatch) {
    for (let key in score) {
      const payload = JSON.stringify({eval_item_id: key, score: score[key], user_id: evalEmpIds['employeeID'], admin_id: evalEmpIds['evaluatorID']})
      fetch(baseURL + '/scores', {
        method: 'post',
        body: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then((json) => console.log('created new score', json))
    }
  }
}