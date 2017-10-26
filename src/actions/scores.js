import api from '../api'

export function createNewScoresAndActionSteps(scores, actionSteps, employeeId) {
  return function(dispatch) {
    for (let key in scores) {
      api.createScore(key, scores[key], employeeId)
        .then((json) => console.log('created new score', json))
    }
    for (let key in actionSteps) {
      api.createActionStep(actionSteps[key], employeeId)
        .then((json) => console.log('created new action step', json))
    }
  }
}