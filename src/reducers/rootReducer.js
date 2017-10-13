export function rootReducer(state = { users: [], evalItems: [] , chartFilter: 'default'}, action) {
  switch (action.type) {
    //users actions
    case 'SET_ALL_USERS':
      return Object.assign({}, state, {users: action.payload})
    
    //evalItems actions
    case 'SET_ALL_EVAL_ITEMS':
      return Object.assign({}, state, {evalItems: action.payload})

    //filter actions
    case 'SET_CHART_FILTER':
      return Object.assign({}, state, {chartFilter: action.payload})
    default:
      return state
  }
}