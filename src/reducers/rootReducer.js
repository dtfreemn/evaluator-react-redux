export function rootReducer(state = { currentUser: localStorage.getItem('jwt'), currentOrg: localStorage.getItem('org'), users: [], evalItems: [] , chartFilter: 'default', isLoading: false, isReviewingScore: false, attemptingItemDelete: false }, action) {
  switch (action.type) {
    //users actions
    case 'SET_ALL_USERS':
      return Object.assign({}, state, { users: action.payload } )
    case 'SET_LOGGED_IN_USER_AND_ORG':
      return Object.assign({}, state, { currentUser: action.payload.jwt, currentOrg: action.payload.org_id } )
    case 'CLEAR_CURRENT_USER_AND_ORG':
      return Object.assign({}, state, { currentUser: '', currentOrg: '', users: [] } )
    
    //evalItems actions
    case 'SET_ALL_EVAL_ITEMS':
      return Object.assign({}, state, { evalItems: action.payload } )
    case 'CLEAR_ALL_EVAL_ITEMS':
      return Object.assign({}, state, { evalItems: [] } )
    case 'IS_DELETING_EVAL_ITEM':
      return Object.assign({}, state, { attemptingItemDelete: true })
    case 'IS_NOT_DELETING_EVAL_ITEM':
      return Object.assign({}, state, { attemptingItemDelete: false })
    //filter actions
    case 'SET_CHART_FILTER':
      return Object.assign({}, state, { chartFilter: action.payload } )

    //toggle loading
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, { isLoading: !state.isLoading } )

    //scores review page
    case 'IS_REVIEWING_SCORE':
      return Object.assign({}, state, { isReviewingScore: true } )
    case 'IS_NOT_REVIEWING_SCORE':
      return Object.assign({}, state, { isReviewingScore: false } )

    //default return current state
    default:
      return state
  }
}