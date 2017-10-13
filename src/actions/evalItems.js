import { baseURL } from '../urls'

export function fetchAllEvalItems() {
  return function(dispatch) {
    fetch(baseURL + '/eval_items', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(eval_items => dispatch(setAllEvalItems(eval_items)))
  }
}

export function createEvalItem(evalItem) {
  return function(dispatch) {
    const payload = JSON.stringify({name: evalItem.name, description: evalItem.description})
    fetch(baseURL + '/eval_items', {
      method: 'post',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then((eval_items) => dispatch(setAllEvalItems(eval_items)))
  }
}

export function deleteEvalItem(item) {
  return function (dispatch) {
    fetch(baseURL + '/eval_items/' + item.id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(evalItems => dispatch(setAllEvalItems(evalItems)))
  }
}

export function setAllEvalItems(payload) {
  return {
    type: 'SET_ALL_EVAL_ITEMS',
    payload
  }
}