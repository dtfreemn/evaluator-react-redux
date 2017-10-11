export function rootReducer(state = { users: [], evalItems: [] }, action) {
  switch (action.type) {
    //users actions
    case 'SET_ALL_USERS':
      return Object.assign({}, state, {users: action.payload})
    
    //evalItems actions
    case 'SET_ALL_EVAL_ITEMS':
      return Object.assign({}, state, {evalItems: action.payload})
    default:
      return state
  }
}