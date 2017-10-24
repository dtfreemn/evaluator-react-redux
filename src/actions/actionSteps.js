import { baseURL } from '../urls'

export function editActionStep(actionStepId, newStatus) {
    return function (dispatch) {
      let payload = JSON.stringify( { completed: newStatus } )
      fetch(baseURL + '/action_steps/' + actionStepId, {
        method: 'PATCH',
        body: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        }
      })
        .then(resp => resp.json())
        .then(actionStep => console.log('edited action step', actionStep))
    }
}