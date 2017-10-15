function usersReducer(state = { currentUser: localStorage.getItem('jwt'), currentOrg: localStorage.getItem('org'), users: [] }, action) {
  switch (action.type) {
    case 'SET_ALL_USERS':
      return Object.assign({}, state, { users: action.payload } )
    case 'SET_LOGGED_IN_USER_AND_ORG':
      return Object.assign({}, state, { currentUser: action.payload.jwt, currentOrg: action.payload.org_id } )
    case 'CLEAR_CURRENT_USER_AND_ORG':
      return Object.assign({}, state, { currentUser: '', currentOrg: '' } )
    default:
      return state
  }
}

export default usersReducer