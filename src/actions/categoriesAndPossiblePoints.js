import api from '../api'

export function fetchAllEvaluationCategories() {
  return function(dispatch) {
    api.getAllEvaluationCategories()
      .then(evalCategories => dispatch(setEvalCategories(evalCategories)))
  }
}

export function createEvaluationCategory(name, possiblePoints, props) {
  return function(dispatch) {
    api.createEvaluationCategory(name)
      .then(category => createPossiblePoints(possiblePoints, category.id, props))
  }
}

function createPossiblePoints(possiblePoints, categoryId, props) {
  for (let key in possiblePoints) {
    api.createPossiblePoint(possiblePoints[key], categoryId)
      .then(() => {
        props.history.push('/eval_categories')
      })
  }
}

export function editEvalCategory(name, id, possiblePoints, props, currentPoints) {
  return function(dispatch) {
    api.editEvalCategory(name, id)
      .then(() => {
        editCurrentPoints(currentPoints)
      })
      .then(() => {
        if (Object.keys(possiblePoints).length > 0) {
          createPossiblePoints(possiblePoints, id, props)
        }
      })
      .then(() => props.history.push('/eval_categories'))
  }
}

//USED BY EDIT EVAL CATEGORY
function editCurrentPoints(currentPoints) {
  for (let key in currentPoints) {
    api.editCurrentPoint(currentPoints[key])
  }
}

export function setEvalCategories(payload) {
  return {
    type: 'SET_EVAL_CATEGORIES',
    payload
  }
}