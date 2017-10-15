function evalItemsReducer(state = { evalItems: [] }, action) {
  switch (action.type) {
    case 'SET_ALL_EVAL_ITEMS':
      return Object.assign({}, state, { evalItems: action.payload } )
    default:
      return state
  }
}

export default evalItemsReducer