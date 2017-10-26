import api from '../api'

export function fetchAllEvalItems() {
  return function(dispatch) {
    api.getEvalItems()
      .then(eval_items => {
        dispatch(setAllEvalItems(eval_items) )
      })
  }
}

export function createEvalItem(evalItem) {
  return function(dispatch) {
    api.createEvalItem(evalItem)
      .then((eval_items) => dispatch(setAllEvalItems(eval_items)) )
  }
}

export function editEvalItem(evalItem, id, props) {
  return function(dispatch) {
    api.editEvalItem(evalItem, id)
      .then(evalItems => dispatch(setAllEvalItems(evalItems)) )
      .then(() =>  props.history.push('/eval_items') )
  }
}

export function deleteEvalItem(item) {
  return function (dispatch) {
    api.deleteEvalItem(item.id)
      .then(evalItems => dispatch(setAllEvalItems(evalItems)))
  }
}

export function setAllEvalItems(payload) {
  return {
    type: 'SET_ALL_EVAL_ITEMS',
    payload
  }
}

export function clearAllEvalItems() {
  return {
    type: 'CLEAR_ALL_EVAL_ITEMS'
  }
}

export function startEvalItemDelete() {
  return {
    type: 'IS_DELETING_EVAL_ITEM'
  }
}

export function endEvalItemDelete() {
  return {
    type: 'IS_NOT_DELETING_EVAL_ITEM'
  }
}