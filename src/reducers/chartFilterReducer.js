function chartFilterReducer(state = { chartFilter: 'default' }, action) {
  switch (action.type) {
    case 'SET_CHART_FILTER':
      return Object.assign({}, state, { chartFilter: action.payload } )
    default:
      return state
  }
}

export default chartFilterReducer