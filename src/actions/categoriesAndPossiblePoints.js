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

export function createEvaluationCategory(name, possiblePoints, props) {
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
      .then(category => createPossiblePoints(possiblePoints, category.id, props))
  }
}

export function createPossiblePoints(possiblePoints, categoryId, props) {
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
            .then(() => {
              props.history.push('/eval_categories')
            })
        }
}

export function editEvalCategory(name, id, possiblePoints, windowProps, currentPoints) {
  return function(dispatch) {
    const payload = JSON.stringify({name: name})
    fetch(baseURL + '/evaluation_categories/' + id, {
      method: 'PATCH',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(category => console.log("updated category", category))
      .then(() => {
        editCurrentPoints(currentPoints)
      })
      .then(() => {
        if (Object.keys(possiblePoints).length > 0) {
          createPossiblePoints(possiblePoints, id, windowProps)
        }
      })
      .then(() => windowProps.history.push('/eval_categories'))
  }
}

//USED BY EDIT EVAL CATEGORY
function editCurrentPoints(currentPoints) {
  for (let key in currentPoints) {
    let payload = JSON.stringify({score: currentPoints[key]['score'], description: currentPoints[key]['description'], evaluation_category_id: currentPoints[key]['evaluation_category_id']})
    fetch(baseURL + '/possible_points/' + currentPoints[key].id, {
      method: 'PATCH',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(possPoint => console.log('edited point', possPoint))
  }
}

export function setEvalCategories(payload) {
  return {
    type: 'SET_EVAL_CATEGORIES',
    payload
  }
}