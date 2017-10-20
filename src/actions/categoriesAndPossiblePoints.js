import { baseURL } from '../urls'

export function fetchAllEvaluationCategories() {
  return function(dispatch) {
    fetch(baseURL + '/evaluation_categories', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(evalCategories => dispatch(setEvalCategories(evalCategories)))
  }
}

export function createEvaluationCategory(name, possiblePoints) {
  return function(dispatch) {
    const payload = JSON.stringify({name: name})
    fetch(baseURL + '/evaluation_categories', {
      method: 'post',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(category => createPossiblePoints(possiblePoints, category.id))
  }
}

export function createPossiblePoints(possiblePoints, categoryId) {
  for (let key in possiblePoints) {
          let payload = JSON.stringify({score: possiblePoints[key]['score'], description: possiblePoints[key]['description'], evaluation_category_id: categoryId})
          fetch(baseURL + '/possible_points', {
            method: 'post',
            body: payload,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('jwt')
            }
          })
            .then(resp => resp.json())
            .then(possScore => console.log(possScore))
        }
}

export function setEvalCategories(payload) {
  return {
    type: 'SET_EVAL_CATEGORIES',
    payload
  }
}